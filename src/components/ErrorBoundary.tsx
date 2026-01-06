import { Component, ReactNode } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db, auth } from "@/lib/firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { categorizeError, extractErrorInfo, sanitizeErrorForLogging, shouldNotifySupport, type ErrorCategory } from "@/lib/utils/errorUtils";

interface ErrorBoundaryClassProps {
  children: ReactNode;
  navigate: NavigateFunction;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  errorCategory?: ErrorCategory;
  userMessage?: string;
  actionSuggestion?: string;
  retryable?: boolean;
}

class ErrorBoundaryClass extends Component<ErrorBoundaryClassProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryClassProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    const categorized = categorizeError(error);
    return { 
      hasError: true, 
      error,
      errorCategory: categorized.category,
      userMessage: categorized.userMessage,
      actionSuggestion: categorized.actionSuggestion,
      retryable: categorized.retryable,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    const errorDetails = extractErrorInfo(error, errorInfo);
    
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.group('🔴 ErrorBoundary caught an error');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.info('Categorized:', errorDetails);
      console.groupEnd();
    }

    // Always log to Firestore (development and production)
    // Only notify support for critical errors
    const notifySupport = shouldNotifySupport(error);
    
    try {
      const sanitizedError = sanitizeErrorForLogging(error);
      
      addDoc(collection(db, 'error_logs'), {
        ...errorDetails,
        error: sanitizedError,
        componentStack: errorInfo.componentStack,
        timestamp: serverTimestamp(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        userId: auth.currentUser?.uid || null,
        userEmail: auth.currentUser?.email || null,
        environment: import.meta.env.MODE,
        notifySupport,
        // Additional context
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
        referrer: document.referrer,
      }).catch((loggingError) => {
        // Log to console if Firestore logging fails
        console.error('Failed to log error to Firestore:', loggingError);
      });
    } catch (loggingError) {
      // Silently fail - don't want error logging to cause more errors
      console.error('Error in error logging:', loggingError);
    }

    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = (): void => {
    // Reset state first
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    // Navigate to refresh the current route and remount the component
    this.props.navigate(0);
  };

  handleGoHome = (): void => {
    // Reset state first
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    // Navigate to home without full page reload
    this.props.navigate('/');
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-destructive/5">
          <div className="max-w-2xl w-full">
            {/* Glass card with error message */}
            <div className="glass-card p-8 md:p-12 text-center">
              {/* Error icon with glow effect */}
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 blur-2xl opacity-30">
                  <div className="w-20 h-20 bg-destructive rounded-full mx-auto" />
                </div>
                <div className="relative w-20 h-20 bg-destructive/10 rounded-2xl flex items-center justify-center mx-auto border border-destructive/20">
                  <AlertTriangle className="h-10 w-10 text-destructive" />
                </div>
              </div>

              {/* Error heading */}
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
                {this.state.userMessage || 'Algo correu mal'}
              </h1>

              {/* Error description */}
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                {this.state.actionSuggestion || 'Encontrámos um erro inesperado. Por favor, tente novamente ou volte à página inicial.'}
              </p>

              {/* Error details in development */}
              {import.meta.env.DEV && this.state.error && (
                <div className="mb-8 p-4 bg-muted/50 rounded-xl border border-border text-left overflow-auto">
                  <p className="font-mono text-sm text-destructive mb-2">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <details className="mt-4">
                      <summary className="cursor-pointer text-sm font-medium mb-2">
                        Stack Trace
                      </summary>
                      <pre className="text-xs text-muted-foreground overflow-auto max-h-48">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {this.state.retryable && (
                  <Button
                    onClick={this.handleReset}
                    size="lg"
                    className="gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Tentar Novamente
                  </Button>
                )}
                <Button
                  onClick={this.handleGoHome}
                  variant={this.state.retryable ? "outline" : "default"}
                  size="lg"
                  className="gap-2"
                >
                  <Home className="h-4 w-4" />
                  Voltar ao Início
                </Button>
              </div>

              {/* Support message */}
              <p className="mt-8 text-sm text-muted-foreground">
                Se o problema persistir, por favor contacte o suporte técnico.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrapper function component that provides navigate to the class component
export function ErrorBoundary({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  return <ErrorBoundaryClass navigate={navigate}>{children}</ErrorBoundaryClass>;
}

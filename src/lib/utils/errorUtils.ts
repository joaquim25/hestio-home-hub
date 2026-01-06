/**
 * Error categorization and user-friendly message utilities
 */

export type ErrorCategory = 
  | 'network'
  | 'auth'
  | 'permission'
  | 'validation'
  | 'notfound'
  | 'firebase'
  | 'stripe'
  | 'unknown';

export interface CategorizedError {
  category: ErrorCategory;
  userMessage: string;
  technicalMessage: string;
  retryable: boolean;
  actionSuggestion?: string;
}

/**
 * Categorizes an error and returns user-friendly messages in Portuguese
 */
export function categorizeError(error: Error): CategorizedError {
  const errorMessage = error.message.toLowerCase();
  const errorStack = error.stack?.toLowerCase() || '';
  
  // Network errors
  if (
    errorMessage.includes('network') ||
    errorMessage.includes('fetch') ||
    errorMessage.includes('connection') ||
    errorMessage.includes('timeout') ||
    error.name === 'NetworkError'
  ) {
    return {
      category: 'network',
      userMessage: 'Problema de conexão com a internet',
      technicalMessage: error.message,
      retryable: true,
      actionSuggestion: 'Verifique sua conexão e tente novamente',
    };
  }

  // Authentication errors
  if (
    errorMessage.includes('auth') ||
    errorMessage.includes('unauthorized') ||
    errorMessage.includes('unauthenticated') ||
    errorMessage.includes('token') ||
    error.name === 'AuthError'
  ) {
    return {
      category: 'auth',
      userMessage: 'Sessão expirada ou não autorizada',
      technicalMessage: error.message,
      retryable: false,
      actionSuggestion: 'Por favor, faça login novamente',
    };
  }

  // Permission errors
  if (
    errorMessage.includes('permission') ||
    errorMessage.includes('forbidden') ||
    errorMessage.includes('access denied') ||
    errorMessage.includes('missing or insufficient permissions')
  ) {
    return {
      category: 'permission',
      userMessage: 'Sem permissão para aceder a este recurso',
      technicalMessage: error.message,
      retryable: false,
      actionSuggestion: 'Contacte o administrador se precisar de acesso',
    };
  }

  // Validation errors
  if (
    errorMessage.includes('validation') ||
    errorMessage.includes('invalid') ||
    errorMessage.includes('required') ||
    errorMessage.includes('must be') ||
    error.name === 'ValidationError'
  ) {
    return {
      category: 'validation',
      userMessage: 'Dados inválidos ou incompletos',
      technicalMessage: error.message,
      retryable: true,
      actionSuggestion: 'Verifique os dados inseridos e tente novamente',
    };
  }

  // Not found errors
  if (
    errorMessage.includes('not found') ||
    errorMessage.includes('404') ||
    errorMessage.includes('does not exist') ||
    error.name === 'NotFoundError'
  ) {
    return {
      category: 'notfound',
      userMessage: 'Recurso não encontrado',
      technicalMessage: error.message,
      retryable: false,
      actionSuggestion: 'O item que procura pode ter sido removido',
    };
  }

  // Firebase-specific errors
  if (
    errorMessage.includes('firebase') ||
    errorMessage.includes('firestore') ||
    errorStack.includes('firebase')
  ) {
    return {
      category: 'firebase',
      userMessage: 'Erro ao comunicar com o servidor',
      technicalMessage: error.message,
      retryable: true,
      actionSuggestion: 'Tente novamente em alguns momentos',
    };
  }

  // Stripe payment errors
  if (
    errorMessage.includes('stripe') ||
    errorMessage.includes('payment') ||
    errorMessage.includes('card')
  ) {
    return {
      category: 'stripe',
      userMessage: 'Erro no processamento do pagamento',
      technicalMessage: error.message,
      retryable: true,
      actionSuggestion: 'Verifique os dados do cartão e tente novamente',
    };
  }

  // Unknown errors
  return {
    category: 'unknown',
    userMessage: 'Ocorreu um erro inesperado',
    technicalMessage: error.message,
    retryable: true,
    actionSuggestion: 'Tente novamente ou contacte o suporte',
  };
}

/**
 * Extracts relevant information from error for logging
 */
export function extractErrorInfo(error: Error, errorInfo?: React.ErrorInfo) {
  const categorized = categorizeError(error);
  
  return {
    category: categorized.category,
    name: error.name,
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo?.componentStack,
    userMessage: categorized.userMessage,
    technicalMessage: categorized.technicalMessage,
    retryable: categorized.retryable,
    actionSuggestion: categorized.actionSuggestion,
  };
}

/**
 * Sanitizes error data for logging (removes sensitive information)
 */
export function sanitizeErrorForLogging(error: Error): Record<string, unknown> {
  let sanitizedStack = error.stack;

  // Remove potential sensitive data from stack trace
  if (sanitizedStack && typeof sanitizedStack === 'string') {
    // Remove absolute file paths that might expose system information
    sanitizedStack = sanitizedStack.replace(/\/Users\/[^\/]+/g, '/Users/***');
    sanitizedStack = sanitizedStack.replace(/\/home\/[^\/]+/g, '/home/***');
    sanitizedStack = sanitizedStack.replace(/C:\\Users\\[^\\]+/g, 'C:\\Users\\***');
    
    // Remove potential API keys or tokens in URLs
    sanitizedStack = sanitizedStack.replace(/[a-f0-9]{32,}/gi, '***');
  }

  return {
    name: error.name,
    message: error.message,
    stack: sanitizedStack,
  };
}

/**
 * Determines if error should trigger a notification to support
 */
export function shouldNotifySupport(error: Error): boolean {
  const categorized = categorizeError(error);
  
  // Don't notify for common user errors
  if (['validation', 'notfound', 'auth'].includes(categorized.category)) {
    return false;
  }

  // Notify for unexpected errors
  return true;
}

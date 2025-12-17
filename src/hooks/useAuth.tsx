import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User, UserRole } from '@/types';
import { mockUsers } from '@/lib/mock-data';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<boolean>;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    
    // For demo, create a tenant user if not found
    const demoUser: User = {
      id: 'demo',
      name: email.split('@')[0],
      email,
      role: 'tenant',
    };
    setUser(demoUser);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string, role: UserRole): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
    };
    setUser(newUser);
    return true;
  }, []);

  const switchRole = useCallback((role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    } else {
      // Create demo user with selected role
      const roleUser = mockUsers.find(u => u.role === role) || {
        id: 'demo',
        name: 'Demo User',
        email: 'demo@hestio.pt',
        role,
      };
      setUser(roleUser);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      register,
      switchRole,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

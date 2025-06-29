'use client';

import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types';
import { authenticateUser, getCurrentUser } from '@/lib/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        const user = getCurrentUser();
        setAuthState({
          user,
          isAuthenticated: !!user,
          loading: false,
          error: null,
        });
      } catch (error) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          loading: false,
          error: 'Failed to check authentication status',
        });
      }
    };

    checkAuth();
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const user = authenticateUser(email, password);
      
      if (user) {
        // Store user session (in production, use secure storage)
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        setAuthState({
          user,
          isAuthenticated: true,
          loading: false,
          error: null,
        });
        
        return true;
      } else {
        setAuthState(prev => ({
          ...prev,
          loading: false,
          error: 'Invalid email or password',
        }));
        
        return false;
      }
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: 'Authentication failed',
      }));
      
      return false;
    }
  }, []);

  const signOut = useCallback(() => {
    // Clear user session
    localStorage.removeItem('currentUser');
    
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });
  }, []);

  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...authState,
    signIn,
    signOut,
    clearError,
  };
}
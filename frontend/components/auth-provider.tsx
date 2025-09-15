'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/auth';
import { apiClient } from '@/lib/api';

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user, token, setLoading, logout } = useAuthStore();

  useEffect(() => {
    const validateToken = async () => {
      if (token && !user) {
        setLoading(true);
        try {
          const userData = await apiClient.getMe();
          useAuthStore.setState({ user: userData, isAuthenticated: true });
        } catch (error) {
          console.error('Token validation failed:', error);
          logout();
        } finally {
          setLoading(false);
        }
      }
    };

    validateToken();
  }, [token, user, setLoading, logout]);

  return <>{children}</>;
};

'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/auth/store';
import { withMinimumDelay } from '@/lib/utils';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const { initialize } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      await withMinimumDelay(
        new Promise<void>((resolve) => {
          initialize();
          resolve();
        }),
        600
      );
      setIsInitialized(true);
    };

    initializeAuth();
  }, [initialize]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

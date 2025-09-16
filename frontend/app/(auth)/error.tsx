'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import type { ErrorProps } from '@/lib/types';

export default function AuthError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Auth page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <AlertTriangle className="h-16 w-16 text-red-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Authentication Error
            </CardTitle>
            <CardDescription className="text-gray-600">
              Something went wrong with the authentication process.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {process.env.NODE_ENV === 'development' && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-left">
                <p className="text-sm text-red-800 font-mono">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-red-600 mt-1">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={reset} className="w-full sm:w-auto">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => (window.location.href = '/')}
                className="w-full sm:w-auto"
              >
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Please try signing in again or contact support if the issue
              persists.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

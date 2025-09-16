'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
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
import { getErrorContext } from '@/lib/utils';

export default function Error({ error, reset }: ErrorProps) {
  const pathname = usePathname();

  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  const { title, description, helpText, contextAction } =
    getErrorContext(pathname);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <AlertTriangle className="h-16 w-16 text-red-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {title}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {description}
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
            {contextAction && (
              <div className="pt-2">
                <Button
                  variant="ghost"
                  onClick={contextAction.action}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <contextAction.icon className="h-4 w-4 mr-2" />
                  {contextAction.label}
                </Button>
              </div>
            )}
            <p className="text-sm text-gray-500">{helpText}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

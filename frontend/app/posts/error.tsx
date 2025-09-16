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

export default function PostsError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Posts page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <AlertTriangle className="h-16 w-16 text-red-500" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Failed to Load Posts
              </CardTitle>
              <CardDescription className="text-gray-600">
                We encountered an error while loading the posts.
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
                This might be a temporary issue. Please try again in a moment.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

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
import {
  AlertTriangle,
  RefreshCw,
  Home,
  ArrowLeft,
  FileText,
  LogIn,
} from 'lucide-react';
import type { ErrorProps } from '@/lib/types';

export default function Error({ error, reset }: ErrorProps) {
  const pathname = usePathname();

  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  const getErrorContext = () => {
    if (pathname?.includes('/login') || pathname?.includes('/register')) {
      return {
        title: 'Authentication Error',
        description: 'Something went wrong with the authentication process.',
        helpText:
          'Please try signing in again or contact support if the issue persists.',
        contextAction: {
          label: 'Back to Login',
          icon: LogIn,
          action: () => (window.location.href = '/login'),
        },
      };
    }
    if (pathname?.includes('/posts/')) {
      return {
        title: 'Failed to Load Post',
        description:
          "We couldn't load this post. It might be temporarily unavailable.",
        helpText:
          'This might be a temporary issue. Please try again in a moment.',
        contextAction: {
          label: 'All Posts',
          icon: FileText,
          action: () => (window.location.href = '/posts'),
        },
      };
    }
    if (pathname?.includes('/posts')) {
      return {
        title: 'Failed to Load Posts',
        description: 'We encountered an error while loading the posts.',
        helpText:
          'This might be a temporary issue. Please try again in a moment.',
        contextAction: {
          label: 'Go Back',
          icon: ArrowLeft,
          action: () => window.history.back(),
        },
      };
    }

    return {
      title: 'Something went wrong!',
      description: 'An unexpected error occurred while loading this page.',
      helpText: 'If this problem persists, please contact support.',
      contextAction: {
        label: 'Go Back',
        icon: ArrowLeft,
        action: () => window.history.back(),
      },
    };
  };

  const { title, description, helpText, contextAction } = getErrorContext();

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

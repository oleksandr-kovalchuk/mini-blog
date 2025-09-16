import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { LogIn, FileText, ArrowLeft } from 'lucide-react';
import { ErrorContext, LoadingContext } from '../types';
import { Loader2, BookOpen, Settings, User } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getShortDescription(content: string, maxLength: number = 150) {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength).trim() + '...';
}

export function formatDateWithTime(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatRelativeTime(dateString: string) {
  const now = new Date();
  const postDate = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    return formatDate(dateString);
  }
}

export function getErrorContext(pathname: string | null): ErrorContext {
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
}

export function getLoadingContext(pathname: string | null): LoadingContext {
  if (pathname?.includes('/login') || pathname?.includes('/register')) {
    return {
      icon: LogIn,
      title: 'Loading...',
      message: 'Preparing authentication',
    };
  }
  if (pathname?.includes('/posts/new')) {
    return {
      icon: FileText,
      title: 'Loading...',
      message: 'Preparing editor',
    };
  }
  if (pathname?.includes('/posts/')) {
    return {
      icon: BookOpen,
      title: 'Loading...',
      message: 'Loading post',
    };
  }
  if (pathname?.includes('/posts')) {
    return {
      icon: BookOpen,
      title: 'Loading...',
      message: 'Loading posts',
    };
  }
  if (pathname?.includes('/user/edit')) {
    return {
      icon: Settings,
      title: 'Loading...',
      message: 'Loading profile',
    };
  }
  if (pathname?.includes('/user')) {
    return {
      icon: User,
      title: 'Loading...',
      message: 'Loading user profile',
    };
  }

  return {
    icon: Loader2,
    title: 'Loading...',
    message: 'Please wait while we load the page',
  };
}

export async function withMinimumDelay<T>(
  promise: Promise<T>,
  minDelay: number = 800
): Promise<T> {
  const [result] = await Promise.all([
    promise,
    new Promise((resolve) => setTimeout(resolve, minDelay)),
  ]);
  return result;
}

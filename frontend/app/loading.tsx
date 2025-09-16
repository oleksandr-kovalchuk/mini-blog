'use client';

import { usePathname } from 'next/navigation';
import {
  Loader2,
  LogIn,
  FileText,
  Settings,
  BookOpen,
  User,
} from 'lucide-react';

export default function Loading() {
  const pathname = usePathname();

  const getLoadingContext = () => {
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
  };

  const { icon: Icon, title, message } = getLoadingContext();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          {Icon === Loader2 ? (
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          ) : (
            <>
              <Icon className="h-8 w-8 text-primary mr-2" />
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </>
          )}
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}

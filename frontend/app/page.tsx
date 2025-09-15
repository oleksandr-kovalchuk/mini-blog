'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuthStore } from '@/lib/auth/store';
import { BookOpen, Plus, User } from 'lucide-react';

export default function Home() {
  const { user, isAuthenticated, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Mini Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A simple and elegant platform to share your thoughts and connect
            with others.
          </p>
        </div>

        {isAuthenticated && user ? (
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Welcome back, {user.name}!
                </CardTitle>
                <CardDescription>
                  You&apos;re signed in as {user.email}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Link href="/posts">
                    <Button>
                      <BookOpen className="h-4 w-4 mr-2" />
                      View Posts
                    </Button>
                  </Link>
                  <Link href="/posts/new">
                    <Button variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Post
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Get Started</CardTitle>
                <CardDescription>
                  Sign in to your account or create a new one to start blogging.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <Link href="/login">
                    <Button>Sign In</Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="outline">Sign Up</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

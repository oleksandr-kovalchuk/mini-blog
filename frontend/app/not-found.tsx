'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Home, Search, ArrowLeft, FileX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <FileX className="h-16 w-16 text-gray-400" />
            </div>
            <CardTitle className="text-4xl font-bold text-gray-900">
              404
            </CardTitle>
            <CardDescription className="text-xl text-gray-600">
              Page Not Found
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. It
              might have been moved, deleted, or you entered the wrong URL.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/">
                <Button className="w-full sm:w-auto">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
              </Link>
              <Link href="/posts">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Search className="h-4 w-4 mr-2" />
                  Browse Posts
                </Button>
              </Link>
            </div>
            <div className="pt-4">
              <Button
                variant="ghost"
                onClick={() => window.history.back()}
                className="text-gray-500 hover:text-gray-700"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

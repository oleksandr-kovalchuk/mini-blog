import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Home, Search, FileX, Plus } from 'lucide-react';

export default function PostsNotFound() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <FileX className="h-16 w-16 text-gray-400" />
              </div>
              <CardTitle className="text-4xl font-bold text-gray-900">
                404
              </CardTitle>
              <CardDescription className="text-xl text-gray-600">
                Post Not Found
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                The post you&apos;re looking for doesn&apos;t exist or has been
                removed.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/posts">
                  <Button className="w-full sm:w-auto">
                    <Search className="h-4 w-4 mr-2" />
                    All Posts
                  </Button>
                </Link>
                <Link href="/posts/new">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Post
                  </Button>
                </Link>
              </div>
              <div className="pt-4">
                <Link href="/">
                  <Button
                    variant="ghost"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Go Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

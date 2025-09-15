'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuthStore } from '@/lib/auth-store';
import { getPosts } from '@/lib/api';
import { Plus, Calendar, User } from 'lucide-react';
import type { Post } from '@/lib/types';

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
    fetchPosts();
  }, [initialize]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = (await getPosts()) as Post[];
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getShortDescription = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading posts...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800">
                Error Loading Posts
              </CardTitle>
              <CardDescription className="text-red-600">
                {error}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={fetchPosts} variant="outline">
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Posts</h1>
            <p className="text-gray-600 mt-2">
              Discover stories and insights from our community
            </p>
          </div>
          {isAuthenticated && (
            <Link href="/posts/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </Link>
          )}
        </div>

        {posts.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Posts Yet</CardTitle>
              <CardDescription>
                Be the first to share your thoughts with the community!
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isAuthenticated ? (
                <Link href="/posts/new">
                  <Button>Create First Post</Button>
                </Link>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Sign in to create your first post.
                  </p>
                  <div className="flex space-x-2">
                    <Link href="/login">
                      <Button variant="outline">Sign In</Button>
                    </Link>
                    <Link href="/register">
                      <Button>Sign Up</Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <Link href={`/posts/${post.id}`}>
                        <CardTitle className="text-xl hover:text-primary transition-colors cursor-pointer">
                          {post.title}
                        </CardTitle>
                      </Link>
                      <CardDescription className="mt-2">
                        {getShortDescription(post.content)}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        <span>{post.author.name}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                    </div>
                    <Link href={`/posts/${post.id}`}>
                      <Button variant="ghost" size="sm">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

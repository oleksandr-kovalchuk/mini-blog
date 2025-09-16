'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/lib/auth/store';
import { createPost } from '@/lib/api';
import { AuthGuard } from '@/components/auth-guard';
import { ArrowLeft, Save, Loader2, Eye, Plus, List } from 'lucide-react';

export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [createdPostId, setCreatedPostId] = useState<string | null>(null);
  const router = useRouter();
  const { user } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = (await createPost({
        title: title.trim(),
        content: content.trim(),
      })) as { post: { id: string } };

      setCreatedPostId(response.post.id);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (error) setError(null);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (error) setError(null);
  };

  if (success) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">
                  Post Created Successfully!
                </CardTitle>
                <CardDescription className="text-green-600">
                  Your post has been published and is now live.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-green-700">
                    What would you like to do next?
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {createdPostId && (
                      <Link href={`/posts/${createdPostId}`}>
                        <Button className="bg-green-600 hover:bg-green-700">
                          <Eye className="h-4 w-4 mr-2" />
                          View Post
                        </Button>
                      </Link>
                    )}
                    <Link href="/posts">
                      <Button
                        variant="outline"
                        className="border-green-300 text-green-700 hover:bg-green-100"
                      >
                        <List className="h-4 w-4 mr-2" />
                        All Posts
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="border-green-300 text-green-700 hover:bg-green-100"
                      onClick={() => {
                        setSuccess(false);
                        setCreatedPostId(null);
                        setTitle('');
                        setContent('');
                        setError(null);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Another
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <Link href="/posts">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Posts
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Create New Post
              </CardTitle>
              <CardDescription>
                Share your thoughts and ideas with the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter your post title..."
                    value={title}
                    onChange={handleTitleChange}
                    disabled={loading}
                    className="text-lg"
                    maxLength={200}
                  />
                  <p className="text-sm text-gray-500">
                    {title.length}/200 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <textarea
                    id="content"
                    placeholder="Write your post content here..."
                    value={content}
                    onChange={handleContentChange}
                    disabled={loading}
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed resize-vertical"
                  />
                  <p className="text-sm text-gray-500">
                    {content.length} characters
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4">
                  <div className="text-sm text-gray-500">
                    Publishing as{' '}
                    <span className="font-medium">{user?.name}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push('/posts')}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading || !title.trim() || !content.trim()}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Publishing...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Publish Post
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-6 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <h3 className="font-medium text-blue-900 mb-2">Writing Tips</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Use a clear and descriptive title</li>
                <li>• Break up long content with paragraphs</li>
                <li>• Be respectful and constructive in your writing</li>
                <li>• You can edit your post after publishing</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  );
}

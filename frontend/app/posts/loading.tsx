import { Loader2, BookOpen } from 'lucide-react';

export default function PostsLoading() {
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
        </div>

        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border shadow-sm p-6 animate-pulse"
            >
              <div className="flex items-center mb-4">
                <BookOpen className="h-5 w-5 text-gray-400 mr-2" />
                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex space-x-4">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
          <p className="text-gray-600">Loading posts...</p>
        </div>
      </div>
    </div>
  );
}

import { Loader2, Calendar, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PostLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <div className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="mb-6">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          </div>

          <div className="flex items-center space-x-6 mb-8 pb-6 border-b">
            <div className="flex items-center">
              <User className="h-4 w-4 text-gray-400 mr-2" />
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-gray-400 mr-2" />
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
          </div>

          <div className="prose max-w-none">
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                  {index % 3 === 0 && (
                    <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    </div>
  );
}

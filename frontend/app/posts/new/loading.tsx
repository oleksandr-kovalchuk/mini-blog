import { Loader2, FileText } from 'lucide-react';

export default function NewPostLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <FileText className="h-8 w-8 mr-3 text-primary" />
            Create New Post
          </h1>
          <p className="text-gray-600 mt-2">
            Share your thoughts with the community
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="space-y-6">
            <div>
              <div className="h-4 bg-gray-200 rounded w-16 mb-2 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>

            <div>
              <div className="h-4 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
              <div className="h-64 bg-gray-200 rounded w-full animate-pulse"></div>
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <div className="h-10 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
          <p className="text-gray-600">Preparing editor...</p>
        </div>
      </div>
    </div>
  );
}

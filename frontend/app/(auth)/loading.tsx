import { Loader2, LogIn } from 'lucide-react';

export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center mb-4">
              <LogIn className="h-8 w-8 text-primary" />
            </div>
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
            <h2 className="text-xl font-semibold text-gray-900">Loading...</h2>
            <p className="text-gray-600">Preparing authentication</p>
          </div>
        </div>
      </div>
    </div>
  );
}

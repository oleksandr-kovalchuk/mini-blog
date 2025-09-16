import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
  className?: string;
}

export function LoadingScreen({
  message = 'Loading...',
  className = 'min-h-screen flex items-center justify-center bg-gray-50',
}: LoadingScreenProps) {
  return (
    <div className={className}>
      <div className="flex items-center space-x-2">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span>{message}</span>
      </div>
    </div>
  );
}

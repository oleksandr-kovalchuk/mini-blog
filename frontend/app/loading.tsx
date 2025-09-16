'use client';

import { usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { getLoadingContext } from '@/lib/utils';

export default function Loading() {
  const pathname = usePathname();

  const { icon: Icon, title, message } = getLoadingContext(pathname);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          {Icon === Loader2 ? (
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          ) : (
            <>
              <Icon className="h-8 w-8 text-primary mr-2" />
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </>
          )}
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}

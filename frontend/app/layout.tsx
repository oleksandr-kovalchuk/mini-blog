import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { AuthNav } from '@/components/auth-nav';
import { AuthProvider } from '@/components/auth-provider';

export const metadata: Metadata = {
  title: 'Mini Blog',
  description: 'A full-stack mini blog application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <nav className="border-b bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <Link href="/" className="text-xl font-bold text-primary">
                    Mini Blog
                  </Link>
                </div>
                <AuthNav />
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}

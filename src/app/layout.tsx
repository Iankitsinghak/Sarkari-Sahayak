import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/components/auth-provider';

export const metadata: Metadata = {
  title: 'Sarkari Sahayak',
  description: 'Your AI-powered guide to government schemes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-gradient-to-br from-white via-blue-50 to-green-50 min-h-screen">
        <AuthProvider>
          <main className="relative z-10">
            {children}
          </main>
          <Toaster />
        </AuthProvider>

        {/* subtle animated gradient background */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-tr from-blue-200 via-green-100 to-white opacity-40 animate-pulse" />
      </body>
    </html>
  );
}

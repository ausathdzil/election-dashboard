import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import './globals.css';

import { SessionProvider } from '@/components/layout/session-provider';
import { QueryProvider } from '@/components/query-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { verifySession } from '@/lib/session';
import { cn } from '@/lib/utils';

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
});

export const metadata: Metadata = {
  title: 'Election Dashboard',
  description: 'Indonesia 2024 Election Dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionPromise = verifySession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(lexend.variable, 'font-sans antialiased')}>
        <SessionProvider sessionPromise={sessionPromise}>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              disableTransitionOnChange
              enableSystem
            >
              {children}
            </ThemeProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

import { NewspaperIcon } from 'lucide-react';

import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';

import { ModeToggle } from '@/components/mode-toggle';
import { QueryProvider } from '@/components/query-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          notoSansJP.variable,
          'font-sans antialiased'
        )}
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            <div className="flex min-h-screen flex-col items-center">
              <Header />
              {children}
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="flex w-full justify-center border-b border-dashed">
      <div className="flex w-full max-w-6xl items-center justify-between border-x border-dashed p-8">
        <div className="flex items-center gap-4">
          <NewspaperIcon className="stroke-primary" />
          <h1>Indonesia 2024 Election Dashboard</h1>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}

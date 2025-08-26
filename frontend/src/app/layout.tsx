import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import './globals.css';

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
      <body className={cn(notoSansJP.variable, 'font-sans antialiased')}>
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
      </body>
    </html>
  );
}

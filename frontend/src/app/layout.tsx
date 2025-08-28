import type { Metadata } from 'next';
import { Epilogue } from 'next/font/google';
import './globals.css';

import { UserProvider } from '@/components/layout/user-provider';
import { QueryProvider } from '@/components/query-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { verifySession } from '@/lib/session';
import { cn } from '@/lib/utils';

const epilogue = Epilogue({
  subsets: ['latin'],
  variable: '--font-epilogue',
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
  const userPromise = verifySession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(epilogue.variable, 'font-sans antialiased')}>
        <UserProvider userPromise={userPromise}>
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
        </UserProvider>
      </body>
    </html>
  );
}

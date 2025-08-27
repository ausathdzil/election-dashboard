import type { Metadata } from 'next';
import { Epilogue, Lexend, Outfit, Sora } from 'next/font/google';
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

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
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
      <body
        className={cn(
          epilogue.variable,
          lexend.variable,
          outfit.variable,
          sora.variable,
          'font-sans antialiased'
        )}
      >
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

import { NewspaperIcon } from 'lucide-react';
import Link from 'next/link';

import { ModeToggle } from '@/components/layout/mode-toggle';
import { UserButton } from '@/components/layout/user-button';
import { UserProvider } from '@/components/layout/user-provider';
import { verifySession } from '@/lib/session';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userPromise = verifySession();
  return (
    <UserProvider userPromise={userPromise}>
      <div className="flex min-h-screen flex-col items-center">
        <Header />
        {children}
      </div>
    </UserProvider>
  );
}

function Header() {
  return (
    <header className="flex w-full justify-center border-b border-dashed">
      <div className="flex w-full max-w-6xl items-center justify-between border-x border-dashed p-8">
        <Link href="/" className="flex items-center gap-4">
          <NewspaperIcon className="stroke-primary" />
          <h1 className="hover:text-primary">
            Indonesia 2024 Election Dashboard
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
}

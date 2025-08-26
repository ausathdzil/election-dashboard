import { NewspaperIcon } from 'lucide-react';

import { ModeToggle } from '@/components/mode-toggle';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <Header />
      {children}
    </div>
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

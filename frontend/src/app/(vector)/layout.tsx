import type { UrlObject } from 'node:url';
import Link from 'next/link';
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

const navItems = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Talenta',
    href: '#',
  },
  {
    label: 'Klien',
    href: '#',
  },
  {
    label: 'Mentor',
    href: '#',
  },
  {
    label: 'Kontak',
    href: '#',
  },
  {
    label: 'FaQ',
    href: '#',
  },
];

function Header() {
  return (
    <header className="relative flex w-full items-center justify-center px-20 font-sora shadow-xs">
      <div className="flex w-full items-center justify-between p-4">
        <Link className="flex items-center gap-2" href="/">
          <VectorLogo />
          <h1 className="font-bold text-lg">Vector</h1>
        </Link>
        <UserButton />
      </div>
      <nav className="absolute">
        <ul className="flex w-full justify-center gap-12 font-semibold">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                className="hover:text-primary"
                href={
                  item.href as
                    | UrlObject
                    | __next_route_internal_types__.RouteImpl<string>
                }
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function VectorLogo() {
  return (
    <svg
      fill="none"
      height="40"
      viewBox="0 0 27 40"
      width="27"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Vector Logo</title>
      <path
        d="M17.7761 15.5555V6.66663H-0.00170898V15.5555H17.7761Z"
        fill="#5575A5"
      />
      <path
        d="M17.7757 24.4443C12.8665 24.4443 8.88682 28.424 8.88682 33.3332L-0.000622996 33.3336L-0.000622994 33.1042C0.121538 23.4294 7.97192 15.6168 17.6613 15.5558L26.665 15.5562V33.334H17.7761L17.7757 24.4443Z"
        fill="#5575A5"
      />
    </svg>
  );
}

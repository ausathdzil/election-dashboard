import type { UrlObject } from 'node:url';
import Link from 'next/link';

import { UserButton } from '@/components/layout/user-button';
import { UserProvider } from '@/components/layout/user-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
        <Footer />
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
          <VortexLogo color="#5575A5" />
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

function VortexLogo({ color }: { color: string }) {
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
        fill={color}
      />
      <path
        d="M17.7757 24.4443C12.8665 24.4443 8.88682 28.424 8.88682 33.3332L-0.000622996 33.3336L-0.000622994 33.1042C0.121538 23.4294 7.97192 15.6168 17.6613 15.5558L26.665 15.5562V33.334H17.7761L17.7757 24.4443Z"
        fill={color}
      />
    </svg>
  );
}

const footerLinks = [
  {
    label: 'Product',
    links: [
      {
        name: 'Procurement',
        href: '#',
      },
      {
        name: 'Budgeting & Planning',
        href: '#',
      },
      {
        name: 'Financials',
        href: '#',
      },
      {
        name: 'Asset Managemenet',
        href: '#',
      },
    ],
  },
  {
    label: 'Company',
    links: [
      {
        name: 'About Us',
        href: '#',
      },
      {
        name: 'Get In Touch',
        href: '#',
      },
      {
        name: 'Privacy Policy',
        href: '#',
      },
      {
        name: 'Audit & Taxation',
        href: '#',
      },
    ],
  },
  {
    label: 'Resources',
    links: [
      {
        name: 'Read Our Blog',
        href: '#',
      },
      {
        name: 'MTEP Guide',
        href: '#',
      },
      {
        name: 'Guides',
        href: '#',
      },
      {
        name: 'Perks',
        href: '#',
      },
    ],
  },
  {
    label: 'Other',
    links: [
      {
        name: 'Whitelabel Solutions',
        href: '#',
      },
      {
        name: 'Our Partners',
        href: '#',
      },
      {
        name: 'Refer and Earn',
        href: '#',
      },
      {
        name: 'Perks',
        href: '#',
      },
    ],
  },
];

function Footer() {
  return (
    <footer className="flex min-h-[200px] w-full flex-col gap-20 bg-[#060522] px-24 py-20 font-epilogue text-primary-foreground">
      <div className="grid grid-cols-5 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <VortexLogo color="#fff" />
            <span className="font-bold text-lg">Vortex</span>
          </div>
          <p>201901035214 (1344544-U)</p>
          <address className="text-muted-foreground not-italic">
            Foundingbird Sdn. Bhd. 7-2, Plaza Danau 2, Jalan 2/109f, Taman Danau
            Desa, 58100 Kuala Lumpur, Malaysia.
          </address>
        </div>
        {footerLinks.map((link) => (
          <div className="space-y-6" key={link.label}>
            <h3 className="font-semibold text-xl">{link.label}</h3>
            <ul className="space-y-4 text-muted-foreground">
              {link.links.map((item) => (
                <li key={item.name}>
                  <Link
                    className="hover:text-primary-foreground"
                    href={
                      item.href as
                        | UrlObject
                        | __next_route_internal_types__.RouteImpl<string>
                    }
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex items-start justify-between">
        <article className="space-y-2">
          <h1 className="font-semibold text-2xl">Join Our App Newsletter</h1>
          <p className="text-muted-foreground">
            Get the latest news on starting & running your dream US business!
          </p>
        </article>
        <div className="relative w-full max-w-sm">
          <Input
            className="rounded-full bg-background px-4 pe-26 text-foreground"
            placeholder="Enter your email"
            type="email"
          />
          <div className="absolute inset-y-0 end-0 flex items-center justify-center pe-0.5">
            <Button
              className="rounded-full bg-[#1D1D1D]"
              size="sm"
              type="button"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

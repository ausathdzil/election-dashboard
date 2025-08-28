import type { UrlObject } from 'node:url';
import Link from 'next/link';

import { UserButton } from '@/components/layout/user-button';
import { UserProvider } from '@/components/layout/user-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { VortexLogo } from '@/components/votex-logo';
import { verifySession } from '@/lib/session';
import { MobileNav } from '@/components/layout/mobile-nav';

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
    <header className="relative flex w-full items-center justify-center lg:px-20 shadow-xs">
      <div className="flex w-full items-center justify-between p-4">
        <Link className="items-center gap-2 hidden lg:flex" href="/">
          <VortexLogo color="#5575A5" />
          <h1 className="font-bold text-lg">Vector</h1>
        </Link>
        <MobileNav navItems={navItems} />
        <UserButton />
      </div>
      <nav className="absolute hidden lg:block">
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
    <footer className="flex min-h-[200px] w-full flex-col gap-20 bg-[#060522] px-24 py-20 text-primary-foreground">
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

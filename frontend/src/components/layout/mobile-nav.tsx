'use client';

import { MenuIcon } from 'lucide-react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { logout } from '@/lib/actions/auth';
import { cn } from '@/lib/utils';
import { useUser } from './user-provider';

type MobileNavProps = {
  navItems: {
    label: string;
    href: __next_route_internal_types__.RouteImpl<string> | string;
  }[];
};

const authItems = [
  {
    label: 'Sign In',
    href: '/login',
  },
  {
    label: 'Sign Up',
    href: '/signup',
  },
];

const accountItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
];

export function MobileNav(props: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const user = useUser();

  const { navItems } = props;

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button className="lg:hidden" size="sm" variant="ghost">
          <MenuIcon />
          <span className="translate-y-0.5 text-xl">Menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        alignOffset={-16}
        className="no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none bg-background/90 p-0 shadow-none backdrop-blur duration-100"
        side="bottom"
        sideOffset={14}
      >
        <div className="flex flex-col gap-12 overflow-auto p-6">
          <nav className="flex flex-col gap-3">
            {navItems.map((item, index) => (
              <MobileLink
                href={
                  item.href as __next_route_internal_types__.RouteImpl<string>
                }
                key={index}
                onOpenChange={setOpen}
              >
                {item.label}
              </MobileLink>
            ))}
          </nav>
          {user ? (
            <div className="flex flex-col gap-4">
              <span className="font-medium text-muted-foreground text-sm">
                Account
              </span>
              <nav className="flex flex-col gap-3">
                {accountItems.map((item, index) => (
                  <MobileLink
                    href={
                      item.href as __next_route_internal_types__.RouteImpl<string>
                    }
                    key={index}
                    onOpenChange={setOpen}
                  >
                    {item.label}
                  </MobileLink>
                ))}
                <button
                  className="text-left font-medium text-2xl"
                  onClick={async () => {
                    setOpen(false);
                    await logout();
                  }}
                  type="button"
                >
                  Log Out
                </button>
              </nav>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <span className="font-medium text-muted-foreground text-sm">
                Get Started
              </span>
              <nav className="flex flex-col gap-3">
                {authItems.map((item, index) => (
                  <MobileLink
                    href={
                      item.href as __next_route_internal_types__.RouteImpl<string>
                    }
                    key={index}
                    onOpenChange={setOpen}
                  >
                    {item.label}
                  </MobileLink>
                ))}
              </nav>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
}: {
  href: __next_route_internal_types__.RouteImpl<string>;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const router = useRouter();
  return (
    <Link
      className={cn('font-medium text-2xl', className)}
      href={href}
      onClick={() => {
        router.push(href);
        onOpenChange?.(false);
      }}
    >
      {children}
    </Link>
  );
}

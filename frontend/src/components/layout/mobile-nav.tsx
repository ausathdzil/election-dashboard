'use client';

import { LogOutIcon, MenuIcon } from 'lucide-react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useUser } from './user-provider';
import { logout } from '@/lib/actions/auth';

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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="lg:hidden" size="sm" variant="ghost">
          <MenuIcon />
          <span className="translate-y-0.5">Menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-background/90 no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur duration-100"
        align="start"
        side="bottom"
        alignOffset={-16}
        sideOffset={14}
      >
        <div className="flex flex-col gap-12 overflow-auto p-6">
          <div className="flex flex-col gap-4">
            <span className="text-sm text-muted-foreground font-medium">
              Menu
            </span>
            <nav className="flex flex-col gap-3">
              {navItems.map((item, index) => (
                <MobileLink
                  key={index}
                  href={
                    item.href as __next_route_internal_types__.RouteImpl<string>
                  }
                  onOpenChange={setOpen}
                >
                  {item.label}
                </MobileLink>
              ))}
            </nav>
          </div>
          {user ? (
            <div className="flex flex-col gap-4">
              <span className="text-sm text-muted-foreground font-medium">
                Account
              </span>
              <nav className="flex flex-col gap-3">
                {accountItems.map((item, index) => (
                  <MobileLink
                    key={index}
                    href={
                      item.href as __next_route_internal_types__.RouteImpl<string>
                    }
                    onOpenChange={setOpen}
                  >
                    {item.label}
                  </MobileLink>
                ))}
                <button
                  className="text-left text-2xl font-medium"
                  onClick={async () => {
                    setOpen(false);
                    await logout();
                  }}
                >
                  Log Out
                </button>
              </nav>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <span className="text-sm text-muted-foreground font-medium">
                Get Started
              </span>
              <nav className="flex flex-col gap-3">
                {authItems.map((item, index) => (
                  <MobileLink
                    key={index}
                    href={
                      item.href as __next_route_internal_types__.RouteImpl<string>
                    }
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
      href={href}
      onClick={() => {
        router.push(href);
        onOpenChange?.(false);
      }}
      className={cn('text-2xl font-medium', className)}
    >
      {children}
    </Link>
  );
}

'use client';

import {
  ChartNoAxesColumnDecreasingIcon,
  HomeIcon,
  LogOutIcon,
  NewspaperIcon,
  ShieldIcon,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import type { UrlObject } from 'node:url';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { logout } from '@/lib/actions/auth';
import { useSession } from './session-provider';

const navItems = [
  {
    title: 'Home',
    url: '/',
    icon: HomeIcon,
  },
  {
    title: 'News',
    url: '/news',
    icon: NewspaperIcon,
  },
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: ChartNoAxesColumnDecreasingIcon,
  },
];

export function UserButton() {
  const session = useSession();

  if (!session?.user) {
    return (
      <div className="hidden items-center gap-4 lg:flex">
        <Link
          className={buttonVariants({ variant: 'ghost', size: 'rounded' })}
          href="/login"
        >
          Sign In
        </Link>
        <Link className={buttonVariants({ size: 'rounded' })} href="/signup">
          Sign Up
        </Link>
      </div>
    );
  }

  const user = session.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full" size="icon" variant="outline">
          <UserIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 p-2 text-left text-sm">
            <Avatar className="size-8">
              <AvatarFallback>
                {user.full_name?.charAt(0) ?? user.email.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {user.full_name ?? user.email.split('@')[0]}
              </span>
              <span className="truncate text-muted-foreground text-xs">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navItems.map((item) => (
            <DropdownMenuItem
              asChild
              className="cursor-pointer"
              key={item.title}
            >
              <Link
                href={
                  item.url as
                    | UrlObject
                    | __next_route_internal_types__.RouteImpl<string>
                }
              >
                <item.icon />
                {item.title}
              </Link>
            </DropdownMenuItem>
          ))}
          {user.is_superuser && (
            <DropdownMenuItem asChild className="cursor-pointer" key="admin">
              <Link href="/election/admin">
                <ShieldIcon />
                Admin Dashboard
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={async () => {
              await logout();
            }}
          >
            <LogOutIcon />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

'use client';

import { HomeIcon, LogOutIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';

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
import { logout } from '@/lib/actions';
import { useUser } from './user-provider';

const navItems = [
  {
    title: 'Profile',
    url: '/profile',
    icon: HomeIcon,
  },
];

export function UserButton() {
  const user = useUser();

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Link className={buttonVariants({ variant: 'outline' })} href="/login">
          Login
        </Link>
        <Link className={buttonVariants()} href="/signup">
          Sign up
        </Link>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <UserIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 text-left text-sm">
            <Avatar className="size-8 rounded-none">
              <AvatarFallback className="rounded-none">
                {user.full_name?.charAt(0) ?? user.email.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {user.full_name ?? user.email.split('@')[0]}
              </span>
              <span className="text-muted-foreground truncate text-xs">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {navItems.map((item) => (
            <DropdownMenuItem
              className="cursor-pointer"
              key={item.title}
              asChild
            >
              <Link href={item.url as any}>
                <item.icon />
                {item.title}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={async () => {
              await logout();
            }}
          >
            <LogOutIcon />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

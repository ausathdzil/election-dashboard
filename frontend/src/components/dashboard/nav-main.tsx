'use client';

import type { UrlObject } from 'node:url';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    // biome-ignore lint/suspicious/noExplicitAny: React component
    icon?: any;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className="group"
                isActive={pathname === item.url}
                tooltip={item.title}
              >
                <Link
                  href={
                    item.url as
                      | UrlObject
                      | __next_route_internal_types__.RouteImpl<string>
                  }
                >
                  <item.icon className="!size-5 fill-foreground group-data-[active=true]:fill-primary-foreground" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

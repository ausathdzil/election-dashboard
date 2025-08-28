import {
  BellIcon,
  ChartNoAxesColumnDecreasingIcon,
  ClockIcon,
  SearchIcon,
} from 'lucide-react';

import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { UserButton } from '@/components/layout/user-button';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        {children}
      </div>
    </SidebarProvider>
  );
}

function DashboardHeader() {
  return (
    <header className="flex justify-between border-b p-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="block lg:hidden" />
        <ChartNoAxesColumnDecreasingIcon
          aria-hidden="true"
          className="hidden size-6 stroke-primary lg:block"
          style={{ transform: 'rotate(90deg)' }}
        />
        <span className="font-medium text-xl">Dashboard</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-2 lg:flex">
          <ClockIcon className="size-5 stroke-muted-foreground" />
          <span className="text-muted-foreground text-sm">
            {new Date().toLocaleString('en-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
        <SearchIcon className="size-5 stroke-muted-foreground" />
        <BellIcon className="size-5 stroke-muted-foreground" />
        <UserButton />
      </div>
    </header>
  );
}

'use client';

import Link from 'next/link';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { VortexLogo } from '../votex-logo';
import { NavMain } from './nav-main';
import { NavSecondary } from './nav-secondary';

const sidebarData = {
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: DashboardIcon,
    },
    {
      title: 'Token',
      url: '#',
      icon: TokenIcon,
    },
  ],
  navData: [
    {
      title: 'Category',
      url: '#',
      icon: CategoryIcon,
    },
    {
      title: 'Source',
      url: '#',
      icon: SourceIcon,
    },
    {
      title: 'Gateway',
      url: '#',
      icon: GatewayIcon,
    },
    {
      title: 'Mapper',
      url: '#',
      icon: MapperIcon,
    },
  ],
  navGorilla: [
    {
      title: 'Module Prompt',
      url: '#',
      icon: GorillaIcon,
    },
  ],
  navSettings: [
    {
      title: 'User Management',
      url: '#',
      icon: UserManagementIcon,
    },
    {
      title: 'Role',
      url: '#',
      icon: RoleIcon,
    },
  ],
};

export function DashboardSidebar() {
  return (
    <Sidebar className="px-2">
      <SidebarHeader className="p-4">
        <Link className="flex items-center gap-2" href="/dashboard">
          <VortexLogo className="!size-10" />
          <span className="font-bold text-xl">Vortex</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
        <NavSecondary items={sidebarData.navData} title="DATA" />
        <NavSecondary items={sidebarData.navGorilla} title="GORILLA" />
        <NavSecondary items={sidebarData.navSettings} title="SETTINGS" />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="#fff"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Dashboard</title>
      <g clipPath="url(#clip0_4418_5052)">
        <path
          d="M7.24 2H5.34C3.15 2 2 3.15 2 5.33V7.23C2 9.41 3.15 10.56 5.33 10.56H7.23C9.41 10.56 10.56 9.41 10.56 7.23V5.33C10.57 3.15 9.42 2 7.24 2Z"
          fill="white"
          style={{ fill: 'var(--fillg)' }}
        />
        <path
          d="M18.6699 2H16.7699C14.5899 2 13.4399 3.15 13.4399 5.33V7.23C13.4399 9.41 14.5899 10.56 16.7699 10.56H18.6699C20.8499 10.56 21.9999 9.41 21.9999 7.23V5.33C21.9999 3.15 20.8499 2 18.6699 2Z"
          fill="white"
          opacity="0.4"
          style={{ fill: 'var(--fillg)' }}
        />
        <path
          d="M18.6699 13.4297H16.7699C14.5899 13.4297 13.4399 14.5797 13.4399 16.7597V18.6597C13.4399 20.8397 14.5899 21.9897 16.7699 21.9897H18.6699C20.8499 21.9897 21.9999 20.8397 21.9999 18.6597V16.7597C21.9999 14.5797 20.8499 13.4297 18.6699 13.4297Z"
          fill="white"
          style={{ fill: 'var(--fillg)' }}
        />
        <path
          d="M7.24 13.4297H5.34C3.15 13.4297 2 14.5797 2 16.7597V18.6597C2 20.8497 3.15 21.9997 5.33 21.9997H7.23C9.41 21.9997 10.56 20.8497 10.56 18.6697V16.7697C10.57 14.5797 9.42 13.4297 7.24 13.4297Z"
          fill="white"
          opacity="0.4"
          style={{ fill: 'var(--fillg)' }}
        />
      </g>
      <defs>
        <clipPath id="clip0_4418_5052">
          <rect fill="white" height="24" width="24" />
        </clipPath>
      </defs>
    </svg>
  );
}

function TokenIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="#fff"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Token</title>
      <g clipPath="url(#clip0_4418_169731)">
        <path
          d="M12 22.7504C8 22.7504 4.75 19.8804 4.75 16.3504V12.6504C4.75 12.2404 5.09 11.9004 5.5 11.9004C5.91 11.9004 6.25 12.2404 6.25 12.6504C6.25 15.2704 8.72 17.2504 12 17.2504C15.28 17.2504 17.75 15.2704 17.75 12.6504C17.75 12.2404 18.09 11.9004 18.5 11.9004C18.91 11.9004 19.25 12.2404 19.25 12.6504V16.3504C19.25 19.8804 16 22.7504 12 22.7504ZM6.25 16.4604C6.32 19.1104 8.87 21.2504 12 21.2504C15.13 21.2504 17.68 19.1104 17.75 16.4604C16.45 17.8704 14.39 18.7504 12 18.7504C9.61 18.7504 7.56 17.8704 6.25 16.4604Z"
          fill="white"
          style={{ fill: 'var(--fillg)' }}
        />
        <path
          d="M12 13.75C9.24 13.75 6.75999 12.51 5.54999 10.51C5.02999 9.66 4.75 8.67 4.75 7.65C4.75 5.93 5.52 4.31 6.91 3.09C8.27 1.9 10.08 1.25 12 1.25C13.92 1.25 15.72 1.9 17.09 3.08C18.48 4.31 19.25 5.93 19.25 7.65C19.25 8.67 18.97 9.65 18.45 10.51C17.24 12.51 14.76 13.75 12 13.75ZM12 2.75C10.44 2.75 8.98001 3.27 7.89001 4.23C6.83001 5.15 6.25 6.37 6.25 7.65C6.25 8.4 6.44999 9.1 6.82999 9.73C7.77999 11.29 9.76 12.25 12 12.25C14.24 12.25 16.22 11.28 17.17 9.73C17.56 9.1 17.75 8.4 17.75 7.65C17.75 6.37 17.17 5.15 16.1 4.21C15.01 3.27 13.56 2.75 12 2.75Z"
          fill="white"
          style={{ fill: 'var(--fillg)' }}
        />
        <path
          d="M12 18.75C7.87 18.75 4.75 16.13 4.75 12.65V7.65C4.75 4.12 8 1.25 12 1.25C13.92 1.25 15.72 1.9 17.09 3.08C18.48 4.31 19.25 5.93 19.25 7.65V12.65C19.25 16.13 16.13 18.75 12 18.75ZM12 2.75C8.83 2.75 6.25 4.95 6.25 7.65V12.65C6.25 15.27 8.72 17.25 12 17.25C15.28 17.25 17.75 15.27 17.75 12.65V7.65C17.75 6.37 17.17 5.15 16.1 4.21C15.01 3.27 13.56 2.75 12 2.75Z"
          fill="white"
          style={{ fill: 'var(--fillg)' }}
        />
      </g>
      <defs>
        <clipPath id="clip0_4418_169731">
          <rect fill="white" height="24" width="24" />
        </clipPath>
      </defs>
    </svg>
  );
}

function CategoryIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Category</title>
      <path
        d="M5.83329 6.66663H3.33329C2.41663 6.66663 1.66663 5.91663 1.66663 4.99996V3.33329C1.66663 2.41663 2.41663 1.66663 3.33329 1.66663H5.83329C6.74996 1.66663 7.49996 2.41663 7.49996 3.33329V4.99996C7.49996 5.91663 6.74996 6.66663 5.83329 6.66663Z"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M17.3334 5.83333H14.3334C13.7834 5.83333 13.3334 5.38332 13.3334 4.83332V3.50001C13.3334 2.95001 13.7834 2.5 14.3334 2.5H17.3334C17.8834 2.5 18.3334 2.95001 18.3334 3.50001V4.83332C18.3334 5.38332 17.8834 5.83333 17.3334 5.83333Z"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M17.3334 12.0833H14.3334C13.7834 12.0833 13.3334 11.6333 13.3334 11.0833V9.75001C13.3334 9.20001 13.7834 8.75 14.3334 8.75H17.3334C17.8834 8.75 18.3334 9.20001 18.3334 9.75001V11.0833C18.3334 11.6333 17.8834 12.0833 17.3334 12.0833Z"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M7.5 4.16663H13.3333"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M10.4166 4.16663V15C10.4166 15.9166 11.1666 16.6666 12.0833 16.6666H13.3333"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M10.4166 10.4166H13.3333"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M17.3334 18.3333H14.3334C13.7834 18.3333 13.3334 17.8833 13.3334 17.3333V16C13.3334 15.45 13.7834 15 14.3334 15H17.3334C17.8834 15 18.3334 15.45 18.3334 16V17.3333C18.3334 17.8833 17.8834 18.3333 17.3334 18.3333Z"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function SourceIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Source</title>
      <path
        d="M7.49996 18.3333H12.5C16.6666 18.3333 18.3333 16.6666 18.3333 12.5V7.49996C18.3333 3.33329 16.6666 1.66663 12.5 1.66663H7.49996C3.33329 1.66663 1.66663 3.33329 1.66663 7.49996V12.5C1.66663 16.6666 3.33329 18.3333 7.49996 18.3333Z"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M8.00002 7.47498L5.92502 9.54998C5.68336 9.79164 5.68336 10.2 5.92502 10.4416L8.00002 12.5166"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M12 7.47498L14.075 9.54998C14.3167 9.79164 14.3167 10.2 14.075 10.4416L12 12.5166"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function GatewayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.74996 13.3333H11.25C13.3333 13.3333 14.5833 11.8333 14.5833 9.99996V5.7583C14.5833 4.8833 13.8666 4.16663 12.9916 4.16663H7.01664C6.14164 4.16663 5.42497 4.8833 5.42497 5.7583V9.99996C5.41663 11.8333 6.66663 13.3333 8.74996 13.3333Z"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <title>Gateway</title>
      <path
        d="M7.91663 1.66663V4.16663"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M12.0834 1.66663V4.16663"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M10 18.3334V13.3334"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function MapperIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Mapper</title>
      <path
        d="M4.16663 7.5V13.3333"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M4.37496 7.08329C5.87073 7.08329 7.08329 5.87073 7.08329 4.37496C7.08329 2.87919 5.87073 1.66663 4.37496 1.66663C2.87919 1.66663 1.66663 2.87919 1.66663 4.37496C1.66663 5.87073 2.87919 7.08329 4.37496 7.08329Z"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M4.16663 18.3334C5.54734 18.3334 6.66663 17.2141 6.66663 15.8334C6.66663 14.4527 5.54734 13.3334 4.16663 13.3334C2.78591 13.3334 1.66663 14.4527 1.66663 15.8334C1.66663 17.2141 2.78591 18.3334 4.16663 18.3334Z"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M15.8334 18.3334C17.2141 18.3334 18.3334 17.2141 18.3334 15.8334C18.3334 14.4527 17.2141 13.3334 15.8334 13.3334C14.4527 13.3334 13.3334 14.4527 13.3334 15.8334C13.3334 17.2141 14.4527 18.3334 15.8334 18.3334Z"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M4.27502 7.5C4.65002 8.95833 5.98336 10.0417 7.55836 10.0333L10.4167 10.025C12.6 10.0167 14.4584 11.4167 15.1417 13.3667"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function GorillaIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Module Prompt</title>
      <path
        d="M5.7417 7.5C6.55837 7.90833 7.25837 8.525 7.7667 9.29167C8.05837 9.725 8.05837 10.2833 7.7667 10.7167C7.25837 11.475 6.55837 12.0917 5.7417 12.5"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M10.8334 12.5H14.1667"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M7.49996 18.3334H12.5C16.6666 18.3334 18.3333 16.6667 18.3333 12.5V7.50002C18.3333 3.33335 16.6666 1.66669 12.5 1.66669H7.49996C3.33329 1.66669 1.66663 3.33335 1.66663 7.50002V12.5C1.66663 16.6667 3.33329 18.3334 7.49996 18.3334Z"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function UserManagementIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>User Management</title>
      <path
        d="M10.1334 9.05835C10.05 9.05002 9.95005 9.05002 9.85838 9.05835C7.87505 8.99169 6.30005 7.36669 6.30005 5.36669C6.30005 3.32502 7.95005 1.66669 10 1.66669C12.0417 1.66669 13.7001 3.32502 13.7001 5.36669C13.6917 7.36669 12.1167 8.99169 10.1334 9.05835Z"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M5.96672 12.1333C3.95006 13.4833 3.95006 15.6833 5.96672 17.025C8.25839 18.5583 12.0167 18.5583 14.3084 17.025C16.3251 15.675 16.3251 13.475 14.3084 12.1333C12.0251 10.6083 8.26672 10.6083 5.96672 12.1333Z"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function RoleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Role</title>
      <path
        d="M17.425 9.26665C17.425 13.3416 14.4666 17.1583 10.425 18.275C10.15 18.35 9.84995 18.35 9.57495 18.275C5.53328 17.1583 2.57495 13.3416 2.57495 9.26665V5.6083C2.57495 4.92497 3.09163 4.14997 3.7333 3.89164L8.37494 1.99166C9.41661 1.56666 10.5916 1.56666 11.6333 1.99166L16.275 3.89164C16.9083 4.14997 17.4333 4.92497 17.4333 5.6083L17.425 9.26665Z"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        d="M10 10.4166C10.9205 10.4166 11.6667 9.67045 11.6667 8.74998C11.6667 7.82951 10.9205 7.08331 10 7.08331C9.07957 7.08331 8.33337 7.82951 8.33337 8.74998C8.33337 9.67045 9.07957 10.4166 10 10.4166Z"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
      <path
        d="M10 10.4166V12.9166"
        stroke="#33353D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="1.5"
      />
    </svg>
  );
}

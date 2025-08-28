'use client';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';

type PaginationLike = {
  count: number;
  page: number;
  size: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
};

export function SearchPagination(pageInfo: PaginationLike) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const pagination = generatePagination(pageInfo.page, pageInfo.total_pages);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    const newParams =
      `${pathname}?${params.toString()}` as __next_route_internal_types__.RouteImpl<string>;
    router.replace(newParams, { scroll: false });
  };

  return (
    <div className="flex flex-col lg:flex-row w-full items-start lg:items-center lg:justify-between gap-4">
      <p className="text-muted-foreground text-sm [&>span]:font-medium [&>span]:text-primary">
        Showing <span>{(pageInfo.page - 1) * pageInfo.size + 1}</span>-
        <span>{Math.min(pageInfo.page * pageInfo.size, pageInfo.count)} </span>
        of <span>{pageInfo.count}</span> results
      </p>
      <div className="flex flex-wrap items-center space-x-2">
        <Button
          className="hidden lg:block"
          disabled={!pageInfo.has_prev}
          onClick={() => handlePageChange(1)}
          size="icon"
          title="Go to first page"
          variant="ghost"
        >
          <ChevronsLeftIcon />
        </Button>
        <Button
          disabled={!pageInfo.has_prev}
          onClick={() => handlePageChange(pageInfo.page - 1)}
          size="icon"
          title="Go to previous page"
          variant="ghost"
        >
          <ChevronLeftIcon />
        </Button>
        {pagination.map((page, index) => (
          <Button
            disabled={page === '...'}
            key={`${page}-${index}`}
            onClick={() =>
              typeof page === 'number' ? handlePageChange(page) : undefined
            }
            size="icon"
            variant={page === pageInfo.page ? 'default' : 'ghost'}
          >
            {page}
          </Button>
        ))}
        <Button
          disabled={!pageInfo.has_next}
          onClick={() => handlePageChange(pageInfo.page + 1)}
          size="icon"
          title="Go to next page"
          variant="ghost"
        >
          <ChevronRightIcon />
        </Button>
        <Button
          className="hidden lg:block"
          disabled={!pageInfo.has_next}
          onClick={() => handlePageChange(pageInfo.total_pages)}
          size="icon"
          title="Go to last page"
          variant="ghost"
        >
          <ChevronsRightIcon />
        </Button>
      </div>
    </div>
  );
}

const MAX_VISIBLE_PAGES = 7;
const EARLY_PAGE_THRESHOLD = 3;
const LATE_PAGE_THRESHOLD = 2;
const FIRST_PAGE = 1;
const SECOND_PAGE = 2;
const THIRD_PAGE = 3;
const FOURTH_PAGE = 4;
const LAST_PAGE_OFFSET = 3;
const SECOND_LAST_PAGE_OFFSET = 2;
const THIRD_LAST_PAGE_OFFSET = 1;

function generatePagination(currentPage: number, totalPages: number) {
  if (totalPages <= MAX_VISIBLE_PAGES) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= EARLY_PAGE_THRESHOLD) {
    return [
      FIRST_PAGE,
      SECOND_PAGE,
      THIRD_PAGE,
      FOURTH_PAGE,
      '...',
      totalPages - 1,
      totalPages,
    ];
  }

  if (currentPage >= totalPages - LATE_PAGE_THRESHOLD) {
    return [
      FIRST_PAGE,
      SECOND_PAGE,
      '...',
      totalPages - LAST_PAGE_OFFSET,
      totalPages - SECOND_LAST_PAGE_OFFSET,
      totalPages - THIRD_LAST_PAGE_OFFSET,
      totalPages,
    ];
  }

  return [
    FIRST_PAGE,
    SECOND_PAGE,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages - 1,
    totalPages,
  ];
}

// biome-ignore-all lint/suspicious/noArrayIndexKey: Required for pagination keys

'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import type { GetNewsResponse } from '@/lib/types';

export function ArticlePagination(news: GetNewsResponse) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const pagination = generatePagination(news.page, news.total_pages);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex w-full items-center justify-between">
      <span className="text-muted-foreground text-sm">
        Showing {(news.page - 1) * news.size + 1}-
        {Math.min(news.page * news.size, news.count)} of {news.count} results
      </span>
      <div className="flex items-center space-x-2">
        <Button
          disabled={!news.has_prev}
          onClick={() => handlePageChange(news.page - 1)}
          size="sm"
          variant="outline"
        >
          Previous
        </Button>
        {pagination.map((page, index) => (
          <Button
            disabled={page === '...'}
            key={`${page}-${index}`}
            onClick={() =>
              typeof page === 'number' ? handlePageChange(page) : undefined
            }
            size="sm"
            variant={page === news.page ? 'default' : 'outline'}
          >
            {page}
          </Button>
        ))}
        <Button
          disabled={!news.has_next}
          onClick={() => handlePageChange(news.page + 1)}
          size="sm"
          variant="outline"
        >
          Next
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

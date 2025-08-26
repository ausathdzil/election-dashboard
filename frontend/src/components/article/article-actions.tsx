'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CardAction } from '@/components/ui/card';
import { PageSizeSelect } from '../search/page-size-select';

export function ArticleActions() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSizeChange = (size: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('size', size);
    const newParams =
      `${pathname}?${params.toString()}` as __next_route_internal_types__.RouteImpl<string>;
    router.replace(newParams, { scroll: false });
  };

  return (
    <CardAction className="flex items-center gap-2">
      <PageSizeSelect
        handleSizeChange={handleSizeChange}
        initialSize={searchParams.get('size')?.toString()}
        label="Articles per page:"
      />
    </CardAction>
  );
}

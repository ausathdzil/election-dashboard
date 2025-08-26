'use client';

import { SearchIcon } from 'lucide-react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { Input } from '@/components/ui/input';

const DEBOUNCE_TIME = 300;

export function SearchInput({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
      params.delete('page');
    }
    const newParams =
      `${pathname}?${params.toString()}` as __next_route_internal_types__.RouteImpl<string>;
    router.replace(newParams, { scroll: false });
  }, DEBOUNCE_TIME);

  return (
    <div className="relative">
      <Input
        className="peer ps-9 pe-9"
        defaultValue={searchParams.get('q')?.toString()}
        id="q"
        name="q"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        type="search"
      />
      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
        <SearchIcon size={16} />
      </div>
    </div>
  );
}

'use client';

import { SearchIcon } from 'lucide-react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const DEBOUNCE_TIME = 300;

export function SearchInput() {
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
    router.replace(`${pathname}?${params}`, { scroll: false });
  }, DEBOUNCE_TIME);

  const handleSizeChange = (size: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('size', size);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex w-full gap-4">
      <div className="relative flex-1">
        <Input
          className="peer ps-9 pe-9"
          defaultValue={searchParams.get('q')?.toString()}
          id="q"
          name="q"
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for an article..."
          type="search"
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
      </div>
      <Select
        defaultValue={searchParams.get('size')?.toString() ?? '5'}
        onValueChange={handleSizeChange}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Articles per page" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="5">5</SelectItem>
          <SelectItem value="10">10</SelectItem>
          <SelectItem value="20">20</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

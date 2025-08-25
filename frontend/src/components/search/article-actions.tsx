'use client';

import { CardAction } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
      />
    </CardAction>
  );
}

function PageSizeSelect({
  handleSizeChange,
  initialSize,
}: {
  handleSizeChange: (size: string) => void;
  initialSize: string | undefined;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Articles per page:</span>
      <Select
        defaultValue={initialSize ?? '5'}
        onValueChange={handleSizeChange}
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select size" />
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

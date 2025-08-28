'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export function PageSizeSelect({
  handleSizeChange,
  initialSize,
  label,
  className,
}: {
  handleSizeChange?: (size: string) => void;
  initialSize: string | undefined;
  label?: string;
  className?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-muted-foreground text-sm">{label}</span>}
      <Select
        defaultValue={initialSize ?? '5'}
        onValueChange={handleSizeChange}
      >
        <SelectTrigger className={cn('w-40', className)}>
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

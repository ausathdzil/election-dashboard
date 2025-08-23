// biome-ignore-all lint/style/noMagicNumbers: Date picker
'use client';

import { CalendarDaysIcon } from 'lucide-react';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function DatePicker({
  handleRangeChange,
}: {
  handleRangeChange: (range: DateRange) => void;
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(params.get('start_date') ?? '2023-01-01'),
    to: new Date(params.get('end_date') ?? '2023-12-10'),
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="flex w-60 items-center justify-start font-normal"
          id="dates"
          type="button"
          variant="outline"
        >
          <CalendarDaysIcon />
          {range?.from && range?.to
            ? `${range.from.toLocaleDateString(
                'id-ID'
              )} - ${range.to.toLocaleDateString('id-ID')}`
            : 'Select range'}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto overflow-hidden p-0">
        <Calendar
          captionLayout="dropdown"
          defaultMonth={new Date(2023, 0, 1)}
          disabled={{
            before: new Date(2023, 0, 1),
            after: new Date(2023, 11, 10),
          }}
          mode="range"
          onSelect={(selectedRange) => {
            setRange(selectedRange);
            if (selectedRange) {
              handleRangeChange(selectedRange);
            }
          }}
          selected={range}
        />
      </PopoverContent>
    </Popover>
  );
}

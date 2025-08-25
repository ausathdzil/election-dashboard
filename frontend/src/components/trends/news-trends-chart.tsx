// biome-ignore-all lint/complexity/noExcessiveLinesPerFunction: Handling params
'use client';

import { TrendingUpIcon } from 'lucide-react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { DateRange } from 'react-day-picker';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { useDebouncedCallback } from 'use-debounce';

import {
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { NewsTrend } from '@/lib/types';
import { DatePicker } from './date-picker';
import { Granularity } from './granularity';

const DEBOUNCE_TIME = 500;

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function NewsTrendsChart({ chartData }: { chartData: NewsTrend[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleRangeChange = useDebouncedCallback((range: DateRange) => {
    const params = new URLSearchParams(searchParams);
    if (range.from && range.to) {
      params.set('start_date', formatDate(range.from));
      params.set('end_date', formatDate(range.to));
    } else {
      params.set('start_date', '2023-01-01');
      params.set('end_date', '2023-12-10');
      params.set('granularity', 'monthly');
    }
    const newParams =
      `${pathname}?${params.toString()}` as __next_route_internal_types__.RouteImpl<string>;
    router.replace(newParams, { scroll: false });
  }, DEBOUNCE_TIME);

  const handleGranularityChange = useDebouncedCallback(
    (granularity: string) => {
      const params = new URLSearchParams(searchParams);
      if (granularity) {
        params.set('granularity', granularity);
      } else {
        params.set('granularity', 'monthly');
      }
      const newParams =
        `${pathname}?${params.toString()}` as __next_route_internal_types__.RouteImpl<string>;
      router.replace(newParams, { scroll: false });
    },
    DEBOUNCE_TIME
  );

  const chartConfig = {
    article_count: {
      label: 'Articles',
      color: 'var(--chart-1)',
    },
  } satisfies ChartConfig;

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <TrendingUpIcon />
          Article Trends{' '}
          {searchParams.get('province')
            ? `- ${searchParams.get('province')}`
            : ''}
        </CardTitle>
        <CardAction className="flex gap-4">
          <DatePicker handleRangeChange={handleRangeChange} />
          <Granularity handleGranularityChange={handleGranularityChange} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="aspect-auto h-[280px] w-full"
          config={chartConfig}
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillArticles" x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-article_count)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-article_count)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="bucket"
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day:
                    searchParams.get('granularity') === 'daily' ||
                    searchParams.get('granularity') === 'weekly'
                      ? 'numeric'
                      : undefined,
                });
              }}
              tickLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day:
                        searchParams.get('granularity') === 'daily' ||
                        searchParams.get('granularity') === 'weekly'
                          ? 'numeric'
                          : undefined,
                    });
                  }}
                />
              }
              cursor={false}
            />
            <Area
              dataKey="article_count"
              fill="url(#fillArticles)"
              stroke="var(--color-article_count)"
              type="linear"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </>
  );
}

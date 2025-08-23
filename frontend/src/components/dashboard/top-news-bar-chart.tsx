'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { NewsSource } from '@/lib/types';

export function TopNewsBarChart({ chartData }: { chartData: NewsSource[] }) {
  const chartConfig = {
    article_count: {
      label: 'Articles',
      color: 'var(--chart-1)',
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer className="h-[280px] w-full" config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="author"
          tickLine={false}
          tickMargin={10}
        />
        <ChartTooltip
          content={<ChartTooltipContent hideLabel />}
          cursor={false}
        />
        <Bar dataKey="article_count" fill="var(--color-article_count)" />
      </BarChart>
    </ChartContainer>
  );
}

'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { NewsSource } from '@/lib/types/news';

const chartColors = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

export function TopNewsBarChart({ data }: { data: NewsSource[] }) {
  const chartData = data.map((item, index) => ({
    source: item.author,
    articles: item.article_count,
    fill: chartColors[index % chartColors.length],
  }));

  const chartConfig = data.reduce((acc, item, index) => {
    acc[item.author] = {
      label: item.author,
      color: chartColors[index % chartColors.length],
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <ChartContainer className="h-[280px] w-full" config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="source"
          tickLine={false}
          tickMargin={10}
        />
        <ChartTooltip
          content={<ChartTooltipContent hideLabel />}
          cursor={false}
        />
        <Bar dataKey="articles" fill="var(--color-article_count)" />
      </BarChart>
    </ChartContainer>
  );
}

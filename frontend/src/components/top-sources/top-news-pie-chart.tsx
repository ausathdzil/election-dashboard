'use client';

import { Pie, PieChart } from 'recharts';

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { NewsSource } from '@/lib/types';

const chartColors = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

export function TopNewsPieChart({ data }: { data: NewsSource[] }) {
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
    <ChartContainer
      className="mx-auto aspect-square h-[280px] w-full max-w-none pb-0 [&_.recharts-pie-label-text]:fill-foreground"
      config={chartConfig}
    >
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <Pie data={chartData} dataKey="articles" label nameKey="source" />
        <ChartLegend
          className="flex-wrap gap-2 *:basis-1/4 *:justify-center"
          content={<ChartLegendContent nameKey="source" />}
        />
      </PieChart>
    </ChartContainer>
  );
}

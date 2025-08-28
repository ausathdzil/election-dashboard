'use client';

import ReactECharts from 'echarts-for-react';
import type { NewsSource } from '@/lib/types/news';

const NUMBER_FORMAT_THRESHOLD = 1000;

export function TopSourcesChart({ chartData }: { chartData: NewsSource[] }) {
  const formatNumberK = (raw: number | string) => {
    const val = typeof raw === 'string' ? Number(raw) : raw;
    if (Number.isNaN(val)) {
      return String(raw);
    }
    if (Math.abs(val) >= NUMBER_FORMAT_THRESHOLD) {
      const num = val / NUMBER_FORMAT_THRESHOLD;
      const isInt = Number.isInteger(num);
      return `${isInt ? num.toFixed(0) : num.toFixed(1)}k`;
    }
    return `${val}`;
  };

  const option = {
    grid: { left: 80, right: 40, top: 16, bottom: 32 },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: { color: '#e5e7eb' },
      },
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb',
      textStyle: { color: '#0f172a' },
      formatter: (
        params:
          | { axisValue: string; data: number }[]
          | { axisValue: string; data: number }
      ) => {
        const p = Array.isArray(params) ? params[0] : params;
        const label = p.axisValue;
        const val =
          typeof p.data === 'number' ? p.data.toLocaleString() : `${p.data}`;
        return `${label}<br/>Articles: ${val}`;
      },
    },
    xAxis: {
      type: 'value',
      position: 'bottom',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: true, lineStyle: { color: '#e2e8f0' } },
      axisLabel: {
        color: '#64748b',
        formatter: (val: number | string) => formatNumberK(val),
      },
    },
    yAxis: {
      type: 'category',
      data: chartData.map((item) => item.author).reverse(),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        formatter: (value: string) => value.slice(0, 10),
        margin: 8,
        color: '#64748b',
      },
      splitLine: { show: false },
    },
    series: [
      {
        name: 'Articles',
        data: chartData.map((item) => item.article_count).reverse(),
        type: 'bar',
        barWidth: '60%',
        barGap: '30%',
        barCategoryGap: '20%',
        label: { show: true, position: 'right', color: '#64748b' },
        itemStyle: { color: '#5575A5' },
        emphasis: { itemStyle: { color: '#5575A5' } },
      },
    ],
    color: ['#5575A5'],
  } as const;

  return (
    <ReactECharts option={option} style={{ height: 280, width: '100%' }} />
  );
}

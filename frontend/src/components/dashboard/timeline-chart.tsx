'use client';

import ReactECharts from 'echarts-for-react';
import type { ArticleTrend } from '@/lib/types/news';

const NUMBER_FORMAT_THRESHOLD = 1000;

export function TimelineChart({ chartData }: { chartData: ArticleTrend[] }) {
  const formatLabel = (value: string) => {
    const date = new Date(value);
    const label = date.toLocaleDateString('en-US', { month: 'short' });
    return label.toUpperCase();
  };

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
    grid: { left: 16, right: 40, top: 16, bottom: 32 },
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
        const label = formatLabel(p.axisValue);
        const val =
          typeof p.data === 'number' ? p.data.toLocaleString() : `${p.data}`;
        return `${label}<br/>Articles: ${val}`;
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: chartData.map((item) => item.bucket),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        formatter: (value: string) => formatLabel(value),
        margin: 8,
        color: '#64748b',
      },
      splitLine: { show: false },
    },
    yAxis: {
      type: 'value',
      position: 'right',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: true, lineStyle: { color: '#e2e8f0' } },
      axisLabel: {
        color: '#64748b',
        formatter: (val: number | string) => formatNumberK(val),
      },
    },
    series: [
      {
        name: 'Articles',
        data: chartData.map((item) => item.article_count),
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          width: 3,
          color: '#5575A5',
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(85, 117, 165, 0.45)' },
              { offset: 1, color: 'rgba(85, 117, 165, 0.05)' },
            ],
          },
        },
      },
    ],
    color: ['#5575A5'],
  } as const;

  return (
    <ReactECharts option={option} style={{ height: 280, width: '100%' }} />
  );
}

import { NewspaperIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getTopNewsSource } from '@/lib/data';
import { TopNewsBarChart } from './top-news-bar-chart';
import { TopNewsPieChart } from './top-news-pie-chart';

export async function TopNews() {
  const topNewsSource = await getTopNewsSource();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <NewspaperIcon />
          Top News Source
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
        <div className="min-w-0">
          <TopNewsBarChart chartData={topNewsSource.data} />
        </div>
        <div className="min-w-0">
          <TopNewsPieChart data={topNewsSource.data} />
        </div>
      </CardContent>
    </Card>
  );
}

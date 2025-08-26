import { NewspaperIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getTopNewsSource } from '@/lib/data';
import { TopNewsBarChart } from './top-news-bar-chart';
import { TopNewsPieChart } from './top-news-pie-chart';

type TopNewsProps = {
  province: string;
};

export async function TopNews(props: TopNewsProps) {
  const topNewsSource = await getTopNewsSource({ province: props.province });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <NewspaperIcon />
          Top News Source
          {props.province && <Badge>{props.province}</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
        <div className="min-w-0">
          <TopNewsBarChart data={topNewsSource.data} />
        </div>
        <div className="min-w-0">
          <TopNewsPieChart data={topNewsSource.data} />
        </div>
      </CardContent>
    </Card>
  );
}

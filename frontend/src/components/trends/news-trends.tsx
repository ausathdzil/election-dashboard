import { NewsTrendsChart } from '@/components/trends/news-trends-chart';
import { Card } from '@/components/ui/card';
import { getNewsTrends } from '@/lib/data';

type NewsTrendsProps = {
  searchParams: {
    start_date: string;
    end_date: string;
    granularity: string;
    province: string;
  };
};

export async function NewsTrends(props: NewsTrendsProps) {
  const newsTrends = await getNewsTrends(props.searchParams);

  return (
    <Card>
      <NewsTrendsChart chartData={newsTrends.data} />
    </Card>
  );
}

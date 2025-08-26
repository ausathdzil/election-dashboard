import { MapCard } from '@/components/map/map-card';
import { ArticleCard } from '@/components/article/article-card';
import { TopNews } from '@/components/top-sources/top-news';
import { NewsTrends } from '@/components/trends/news-trends';

type HomeProps = {
  searchParams: Promise<{
    q: string;
    page: string;
    size: string;
    start_date: string;
    end_date: string;
    granularity: string;
    province: string;
  }>;
};

export default async function Home(props: HomeProps) {
  const { q, page, size, start_date, end_date, granularity, province } =
    await props.searchParams;

  return (
    <main className="flex w-full max-w-6xl flex-1 flex-col gap-8 border-x border-dashed p-8">
      <MapCard />
      <NewsTrends
        searchParams={{ start_date, end_date, granularity, province }}
      />
      <TopNews province={province} />
      <ArticleCard searchParams={{ q, page, size, province }} />
    </main>
  );
}

import { MapCard } from '@/components/dashboard/map-card';
import { NewsTrends } from '@/components/dashboard/news-trends';
import { SearchArticle } from '@/components/dashboard/search-article';
import { TopNews } from '@/components/dashboard/top-news';

type HomeProps = {
  searchParams: Promise<{
    q: string;
    page: string;
    size: string;
    start_date: string;
    end_date: string;
    granularity: string;
  }>;
};

export default async function Home(props: HomeProps) {
  const { q, page, size, start_date, end_date, granularity } =
    await props.searchParams;

  return (
    <main className="flex w-full max-w-6xl flex-1 flex-col gap-8 border-x border-dashed p-8">
      <SearchArticle searchParams={{ q, page, size }} />
      <MapCard />
      <TopNews />
      <NewsTrends searchParams={{ start_date, end_date, granularity }} />
    </main>
  );
}

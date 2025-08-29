import { SearchIcon } from 'lucide-react';

import { Suspense } from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getNews } from '@/lib/data/news';
import { SearchInput } from '../search/search-input';
import { SearchPagination } from '../search/search-pagination';
import { Article } from './article';
import { ArticleActions } from './article-actions';

type ArticleCardProps = {
  searchParams: {
    q: string;
    page: string;
    size: string;
    province: string;
    topic_id: string;
  };
};
export async function ArticleCard(props: ArticleCardProps) {
  const news = await getNews(props.searchParams);

  return (
    <Card className="min-h-[910px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <SearchIcon />
          Search Articles
          {props.searchParams.province && (
            <Badge>{props.searchParams.province}</Badge>
          )}
        </CardTitle>
        <ArticleActions />
      </CardHeader>
      <CardContent className="space-y-4">
        <Suspense fallback={null}>
          <SearchInput placeholder="Search for an article..." />
        </Suspense>
        {news.data.map((article) => (
          <Article article={article} key={article.id} />
        ))}
      </CardContent>
      <CardFooter>
        <SearchPagination {...news} />
      </CardFooter>
    </Card>
  );
}

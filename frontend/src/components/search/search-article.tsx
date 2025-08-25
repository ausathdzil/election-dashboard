import { SearchIcon } from 'lucide-react';
import { Suspense } from 'react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getNews } from '@/lib/data';
import { Article } from './article';
import { ArticlePagination } from './article-pagination';
import { SearchInput } from './search-input';

type SearchArticleProps = {
  searchParams: {
    q: string;
    page: string;
    size: string;
  };
};
export async function SearchArticle(props: SearchArticleProps) {
  const news = await getNews(props.searchParams);

  return (
    <Card className="min-h-[910px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-4">
          <SearchIcon />
          Search Articles
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Suspense fallback={null}>
          <SearchInput />
        </Suspense>
        {news.data.map((article) => (
          <Article article={article} key={article.id} />
        ))}
      </CardContent>
      <CardFooter>
        <ArticlePagination {...news} />
      </CardFooter>
    </Card>
  );
}

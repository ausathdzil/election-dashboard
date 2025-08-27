import Link from 'next/link';

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Article as ArticleType } from '@/lib/types/news';

const ARTICLE_PREVIEW_LENGTH = 100;

export function Article({ article }: { article: ArticleType }) {
  const publishDate = new Date(article.publish_date);

  return (
    <Link
      href={article.url as __next_route_internal_types__.RouteImpl<string>}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Card className="hover:border-primary">
        <CardHeader>
          <CardTitle>{article.title}</CardTitle>
          <CardDescription>
            {article.article_text.slice(0, ARTICLE_PREVIEW_LENGTH)}...
          </CardDescription>
          {article.rank > 0 && (
            <CardAction className="text-xs">
              Search Rank: {article.rank.toFixed(2)}
            </CardAction>
          )}
        </CardHeader>
        <CardFooter className="space-x-2">
          <span>{article.author}</span>
          <span>&bull;</span>
          <span>
            {publishDate.toLocaleString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </span>
          {article.province && article.city && (
            <>
              <span>&bull;</span>
              <span>{article.city}</span>
              <span>&bull;</span>
              <span>{article.province}</span>
            </>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}

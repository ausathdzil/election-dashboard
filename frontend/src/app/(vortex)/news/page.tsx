import { ArrowUpRightIcon } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

import { SearchInput } from '@/components/search/search-input';
import { SearchPagination } from '@/components/search/search-pagination';
import { Button } from '@/components/ui/button';
import { getNews } from '@/lib/data/news';
import type { Article } from '@/lib/types/news';

type BlogPageProps = {
  searchParams: Promise<{
    q: string;
    page: string;
    size: string;
    province: string;
  }>;
};

export default async function BlogPage(props: BlogPageProps) {
  const searchParams = await props.searchParams;

  return (
    <main className="flex w-full flex-1 flex-col">
      <NewsHeader />
      <div className="flex w-full flex-col gap-8 border-t p-8 shadow-xs lg:flex-row lg:px-24">
        <NewsSection {...searchParams} />
        <RecommendationSection {...searchParams} />
      </div>
    </main>
  );
}

function NewsHeader() {
  return (
    <section className="flex flex-col gap-8 bg-[#FAFBFC] px-8 pt-8 lg:flex-row lg:justify-between lg:px-24 lg:pt-10">
      <article className="space-y-2 lg:max-w-[500px] lg:space-y-4">
        <h1 className="font-bold text-2xl">Read News Articles</h1>
        <p>
          Displays information, visualizations, graphics and text with a display
          that is more interesting to explore.
        </p>
        <Button className="mt-4 bg-[#141414]">Create a Topic</Button>
      </article>
      <Image
        alt="Blog Header"
        height={242}
        quality={100}
        src="/images/blog-header.png"
        width={315}
      />
    </section>
  );
}

type NewsSectionProps = {
  q: string;
  page: string;
  size: string;
  province: string;
};

async function NewsSection(props: NewsSectionProps) {
  const news = await getNews(props);

  return (
    <section className="space-y-8 lg:max-w-3/4">
      <Suspense fallback={null}>
        <SearchInput className="max-w-sm" placeholder="Search news articles" />
      </Suspense>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {news.data.map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </div>
      <SearchPagination
        count={news.count}
        has_next={news.has_next}
        has_prev={news.has_prev}
        page={news.page}
        size={news.size}
        total_pages={news.total_pages}
      />
    </section>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link className="group flex flex-col gap-2" href={`/news/${article.id}`}>
      {article.main_image ? (
        <div className="relative h-[200px] w-full">
          <Image
            alt={article.title}
            className="object-cover object-center"
            fill
            src={article.main_image}
          />
        </div>
      ) : (
        <div className="h-[200px] w-full bg-muted" />
      )}
      <p className="text-muted-foreground text-sm">{article.author}</p>
      <article>
        <h3 className="line-clamp-2 font-semibold text-lg group-hover:text-primary">
          {article.title}
        </h3>
        <p className="line-clamp-2 text-sm">{article.article_text}</p>
      </article>
      <time
        className="text-muted-foreground text-sm"
        dateTime={article.publish_date}
      >
        {new Date(article.publish_date).toLocaleString('en-ID', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </time>
    </Link>
  );
}

const recommendedTags = [
  {
    id: 1,
    name: 'Mental Health',
  },

  {
    id: 2,
    name: 'Software Development',
  },

  {
    id: 3,
    name: 'Startup',
  },
  {
    id: 4,
    name: 'Education',
  },
  {
    id: 5,
    name: 'Politic',
  },
];

const MAX_RECENT_NEWS = 3;

async function RecommendationSection(props: NewsSectionProps) {
  const news = await getNews(props);
  const recentNews = news.data.slice(0, MAX_RECENT_NEWS);

  return (
    <section className="space-y-8 border-t px-0 py-8 lg:border-t-0 lg:border-l lg:px-8">
      <div className="space-y-4">
        <h2 className="font-medium text-xl">Recommended Tags</h2>
        <div className="flex flex-wrap gap-2">
          {recommendedTags.map((tag) => (
            <Button
              key={tag.id}
              size="rounded"
              type="button"
              variant="secondary"
            >
              {tag.name}
            </Button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="font-medium text-xl">Recently Saved</h2>
        <div className="flex flex-col">
          {recentNews.map((article) => (
            <RecentlySavedCard article={article} key={article.id} />
          ))}
        </div>
      </div>
      <Button className="w-full" type="button" variant="outline">
        See all <ArrowUpRightIcon />
      </Button>
    </section>
  );
}

function RecentlySavedCard({ article }: { article: Article }) {
  return (
    <article className="flex flex-col gap-2 border-b py-2">
      <p className="text-muted-foreground text-sm">{article.author}</p>
      <p className="line-clamp-2 font-semibold">{article.title}</p>
      <time
        className="text-muted-foreground text-sm"
        dateTime={article.publish_date}
      >
        {new Date(article.publish_date).toLocaleString('en-ID', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </time>
    </article>
  );
}

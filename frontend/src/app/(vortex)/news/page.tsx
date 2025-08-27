import Image from 'next/image';
import { Suspense } from 'react';

import { SearchInput } from '@/components/search/search-input';
import { SearchPagination } from '@/components/search/search-pagination';
import { Button } from '@/components/ui/button';
import { getNews } from '@/lib/data/news';
import { Article } from '@/lib/types/news';

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
    <main className="w-full flex-1 flex flex-col font-outfit">
      <NewsHeader />
      <NewsSection {...searchParams} />
    </main>
  );
}

function NewsHeader() {
  return (
    <section className="bg-[#FAFBFC] px-24 pt-10 flex justify-between">
      <article className="space-y-4 max-w-[500px]">
        <h1 className="font-bold text-2xl">Read News Articles</h1>
        <p>
          Displays information, visualizations, graphics and text with a display
          that is more interesting to explore.
        </p>
        <Button className="bg-[#141414] mt-4">Create a Topic</Button>
      </article>
      <Image
        alt="Blog Header"
        height={242}
        src="/images/blog-header.png"
        width={315}
        quality={100}
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
    <section className="px-24 py-8 border-t shadow-xs space-y-8 max-w-3/4">
      <Suspense fallback={null}>
        <SearchInput className="max-w-sm" placeholder="Search news articles" />
      </Suspense>
      <div className="grid grid-cols-3 gap-8">
        {news.data.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
      <SearchPagination
        count={news.count}
        page={news.page}
        size={news.size}
        total_pages={news.total_pages}
        has_next={news.has_next}
        has_prev={news.has_prev}
      />
    </section>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <div className="flex flex-col gap-2">
      {article.main_image ? (
        <Image
          src={article.main_image}
          alt={article.title}
          width={295}
          height={166}
        />
      ) : (
        <div className="w-full h-[166px] bg-muted" />
      )}
      <p className="text-sm text-muted-foreground">{article.author}</p>
      <article>
        <h3 className="font-semibold text-lg line-clamp-2">{article.title}</h3>
        <p className="text-sm line-clamp-2">{article.article_text}</p>
      </article>
    </div>
  );
}

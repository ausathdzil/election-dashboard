import { getNewsById } from '@/lib/data/news';
import Image from 'next/image';

type NewsDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function NewsDetailPage(props: NewsDetailPageProps) {
  const { id } = await props.params;

  const article = await getNewsById({ id });

  return (
    <main className="flex w-full flex-1 flex-col p-16 max-w-4xl gap-8">
      <article className="flex flex-col items-center space-y-4">
        <h1 className="text-4xl text-center leading-snug font-medium text-primary">
          {article.title}
        </h1>
        <a>{article.author}</a>
        <time dateTime={article.publish_date}>
          {new Date(article.publish_date).toLocaleString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </time>
      </article>
      {article.main_image && (
        <div className="relative w-full h-[500px] overflow-hidden">
          <Image
            alt={article.title}
            className="object-cover object-center"
            fill
            src={article.main_image}
          />
        </div>
      )}
      <article>
        <p className="leading-relaxed">{article.article_text}</p>
      </article>
    </main>
  );
}

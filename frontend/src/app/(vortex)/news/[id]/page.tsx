import Image from 'next/image';
import { getNewsById } from '@/lib/data/news';

type NewsDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function NewsDetailPage(props: NewsDetailPageProps) {
  const { id } = await props.params;

  const article = await getNewsById({ id });

  return (
    <main className="flex w-full max-w-4xl flex-1 flex-col gap-8 p-16">
      <article className="flex flex-col items-center space-y-4">
        <h1 className="text-center font-medium text-4xl text-primary leading-snug">
          {article.title}
        </h1>
        <p>{article.author}</p>
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
        <div className="relative h-[500px] w-full overflow-hidden">
          <Image
            alt={article.title}
            className="object-cover object-center"
            fill
            src={article.main_image}
          />
        </div>
      )}
      <article>
        <p className="whitespace-pre-line leading-relaxed">
          {article.article_text}
        </p>
      </article>
    </main>
  );
}

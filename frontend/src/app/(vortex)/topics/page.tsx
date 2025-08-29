import { ClockIcon, LockIcon, LockOpenIcon, TagsIcon } from 'lucide-react';

import Link from 'next/link';

import type { Session } from '@/components/layout/session-provider';
import { SearchInput } from '@/components/search/search-input';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getTopics } from '@/lib/data/topic';
import { verifySession } from '@/lib/session';
import type { Topic } from '@/lib/types/topic';
import { cn } from '@/lib/utils';

type TopicsPageProps = {
  searchParams: Promise<{
    q: string | null;
  }>;
};

export default async function TopicsPage({ searchParams }: TopicsPageProps) {
  const session = await verifySession();
  const { q } = await searchParams;

  const topics = await getTopics(q ? { q } : undefined, session?.token);

  return (
    <main className="flex min-h-screen w-full flex-1 flex-col">
      <TopicsHeader session={session} />
      <div className="flex w-full flex-col gap-8 border-t p-8 shadow-xs lg:px-24">
        <div className="flex w-full items-center gap-4">
          <SearchInput className="min-w-sm" placeholder="Search topics" />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {topics.data.map((topic) => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
        </div>
        {topics.data.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <TagsIcon className="mb-4 size-12 text-muted-foreground" />
            <h3 className="mb-2 font-semibold text-lg">No topics found</h3>
            <p className="text-muted-foreground text-sm">
              {q
                ? 'Try adjusting your search terms.'
                : 'No topics are available at the moment.'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

function TopicsHeader({ session }: { session: Session | null }) {
  return (
    <section className="flex flex-col gap-8 bg-[#FAFBFC] p-8 lg:flex-row lg:justify-between lg:px-24">
      <article className="space-y-2 lg:max-w-[500px] lg:space-y-4">
        <h1 className="font-bold text-2xl">Explore Topics</h1>
        <p>
          Discover and explore various topics to find news articles that
          interest you. Browse through public topics or create your own to
          curate personalized content.
        </p>
        <Link
          className={cn(buttonVariants(), 'mt-4')}
          href={session ? '/dashboard/topics' : '/login'}
        >
          {session ? 'Manage My Topics' : 'Sign In'}
        </Link>
      </article>
    </section>
  );
}

function TopicCard({ topic }: { topic: Topic }) {
  return (
    <Link className="block" href={`/news/${topic.id}`}>
      <Card className="hover:border-primary">
        <CardHeader>
          <CardTitle className="space-y-2">
            <h3 className="line-clamp-2 font-semibold text-lg leading-tight">
              {topic.title}
            </h3>
            {topic.is_public ? (
              <Badge className="w-fit" variant="secondary">
                <LockOpenIcon className="mr-1 size-3" />
                Public
              </Badge>
            ) : (
              <Badge className="w-fit" variant="secondary">
                <LockIcon className="mr-1 size-3" />
                Private
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <TagsIcon className="size-4 text-muted-foreground" />
            <span className="font-medium text-sm">Tags</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {topic.tags.map((tag) => (
              <Badge className="text-xs" key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <Separator />
        <CardFooter>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <ClockIcon className="size-4" />
            <span>
              {new Date(topic.created_at).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

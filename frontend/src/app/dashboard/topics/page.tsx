import { ClockIcon, LockIcon, LockOpenIcon, TagsIcon } from 'lucide-react';

import { redirect } from 'next/navigation';

import { SearchInput } from '@/components/search/search-input';
import { DeleteTopicDialog } from '@/components/topic/delete-topic-dialog';
import { UpsertTopicDialog } from '@/components/topic/upsert-topic-dialog';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getTopics } from '@/lib/data/topic';
import { verifySession } from '@/lib/session';
import type { Topic } from '@/lib/types/topic';

type TopicsPageProps = {
  searchParams: Promise<{
    q: string | null;
  }>;
};

export default async function TopicsPage({ searchParams }: TopicsPageProps) {
  const session = await verifySession();
  if (!session) {
    redirect('/login');
  }

  const { q } = await searchParams;

  const topics = await getTopics(
    { q: q || undefined, owner_id: session.user.id },
    session.token
  );

  return (
    <main className="flex flex-1 flex-col gap-4 p-6">
      <div className="flex w-full items-center gap-2">
        <SearchInput className="min-w-sm" placeholder="Search topics" />
        <UpsertTopicDialog mode="create" token={session.token} />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {topics.data.map((topic) => (
          <TopicCard key={topic.id} token={session.token} topic={topic} />
        ))}
      </div>
    </main>
  );
}

function TopicCard({ topic, token }: { topic: Topic; token: string }) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="space-y-2">
          <h1>{topic.title}</h1>
          {topic.is_public ? (
            <Badge variant="secondary">
              <LockOpenIcon />
              Public
            </Badge>
          ) : (
            <Badge variant="secondary">
              <LockIcon />
              Private
            </Badge>
          )}
        </CardTitle>
        <CardAction>
          <UpsertTopicDialog mode="update" token={token} topic={topic} />
          <DeleteTopicDialog token={token} topicId={topic.id} />
        </CardAction>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2">
          <TagsIcon className="size-4" />
          <span className="text-sm">Tags</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {topic.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <Separator />
      <CardFooter>
        <div className="flex items-center gap-2">
          <ClockIcon className="size-4" />
          <p className="text-sm">
            Created at:{' '}
            <span className="font-medium text-primary">
              {new Date(topic.created_at).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}

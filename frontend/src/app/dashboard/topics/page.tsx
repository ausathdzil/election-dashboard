import { redirect } from 'next/navigation';

import { getTopics } from '@/lib/data/topic';
import { verifySession } from '@/lib/session';

export default async function TopicsPage() {
  const session = await verifySession();
  if (!session) {
    redirect('/login');
  }

  const topics = await getTopics(
    { q: null, owner_id: session.user.id },
    session.token
  );

  return (
    <main className="flex flex-1 flex-col gap-4 p-6">
      <h1>My Topics</h1>
      <pre>{JSON.stringify(topics, null, 2)}</pre>
    </main>
  );
}

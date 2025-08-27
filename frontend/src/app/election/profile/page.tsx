import { verifySession } from '@/lib/session';

export default async function ProfilePage() {
  const session = await verifySession();

  return (
    <main className="flex w-full max-w-6xl flex-1 flex-col gap-8 border-x border-dashed p-8">
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  );
}

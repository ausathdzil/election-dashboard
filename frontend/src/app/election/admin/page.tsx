import { SearchIcon } from 'lucide-react';

import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { UserTableActions } from '@/components/admin/user-table-actions';
import { SearchInput } from '@/components/search/search-input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getUsers } from '@/lib/data/user';
import { verifySession } from '@/lib/session';

type AdminPageProps = {
  searchParams: Promise<{
    q: string | null;
    page: string | null;
    size: string | null;
  }>;
};

export default async function AdminPage(props: AdminPageProps) {
  const searchParams = await props.searchParams;
  const session = await verifySession();

  if (!(session?.user.is_superuser && session.token)) {
    redirect('/login');
  }

  const users = await getUsers(session.token, searchParams);

  return (
    <main className="flex w-full max-w-6xl flex-1 flex-col gap-8 border-x border-dashed p-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <SearchIcon />
            Search Users
          </CardTitle>
          <UserTableActions />
        </CardHeader>
        <CardContent className="space-y-4">
          <Suspense fallback={null}>
            <SearchInput placeholder="Search for a user..." />
          </Suspense>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.data.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {user.full_name ? user.full_name : user.email.split('@')[0]}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.is_superuser ? 'Super User' : 'User'}
                  </TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString('en-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}

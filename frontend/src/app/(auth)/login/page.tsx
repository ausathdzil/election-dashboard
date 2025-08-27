'use client';

import Link from 'next/link';
import { useActionState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/lib/actions/auth';

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="w-full max-w-sm space-y-4">
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          defaultValue={state?.fields.email}
          id="email"
          maxLength={255}
          name="email"
          placeholder="Email"
          required
        />
        {state?.errors?.email && (
          <p className="text-destructive text-sm">{state.errors.email}</p>
        )}
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          defaultValue={state?.fields.password}
          id="password"
          name="password"
          required
          type="password"
        />
        {state?.errors?.password && (
          <div className="text-destructive text-sm">
            {state.errors.password}
          </div>
        )}
      </div>
      <Button disabled={pending} type="submit">
        Login
      </Button>
      <p className="text-sm">{state?.message}</p>
      <p className="text-sm">
        Don&apos;t have an account?{' '}
        <Link className="hover:underline" href="/signup">
          Sign up
        </Link>
      </p>
    </form>
  );
}

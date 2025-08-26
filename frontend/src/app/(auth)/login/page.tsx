'use client';

import { useActionState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '@/lib/actions';

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form className="w-full max-w-sm space-y-4" action={action}>
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="Email"
          defaultValue={state?.fields.email}
          maxLength={255}
          required
        />
        {state?.errors?.email && (
          <p className="text-destructive text-sm">{state.errors.email}</p>
        )}
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          defaultValue={state?.fields.password}
          required
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
    </form>
  );
}

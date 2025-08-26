'use client';

import Link from 'next/link';
import { useActionState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signup } from '@/lib/actions';

export default function SignupPage() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form action={action} className="w-full max-w-sm space-y-4">
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          defaultValue={state?.fields.name}
          id="name"
          maxLength={255}
          name="name"
          placeholder="John Doe"
        />
        {state?.errors?.name && (
          <p className="text-destructive text-sm">{state.errors.name}</p>
        )}
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          defaultValue={state?.fields.email}
          id="email"
          maxLength={255}
          name="email"
          placeholder="m@example.com"
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
          maxLength={40}
          minLength={8}
          name="password"
          required
          type="password"
        />
        {state?.errors?.password && (
          <div className="text-destructive text-sm">
            <p>Password must:</p>
            <ul className="list-disc pl-4">
              {state.errors.password.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          defaultValue={state?.fields.confirmPassword}
          id="confirm-password"
          name="confirm-password"
          required
          type="password"
        />
        {state?.errors?.confirmPassword && (
          <p className="text-destructive text-sm">
            {state.errors.confirmPassword[0]}
          </p>
        )}
      </div>
      <Button disabled={pending} type="submit">
        Sign Up
      </Button>
      <p className="text-sm">{state?.message}</p>
      <p className="text-sm">
        Already have an account?{' '}
        <Link className="hover:underline" href="/login">
          Login
        </Link>
      </p>
    </form>
  );
}

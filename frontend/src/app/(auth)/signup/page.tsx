'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signup } from '@/lib/actions';
import { useActionState } from 'react';

export default function SignupPage() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form className="w-full max-w-sm space-y-4" action={action}>
      <div className="grid gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="John Doe"
          defaultValue={state?.fields.name}
          maxLength={255}
        />
        {state?.errors?.name && (
          <p className="text-destructive text-sm">{state.errors.name}</p>
        )}
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="m@example.com"
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
          minLength={8}
          maxLength={40}
          required
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
          id="confirm-password"
          name="confirm-password"
          type="password"
          defaultValue={state?.fields.confirmPassword}
          required
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
    </form>
  );
}

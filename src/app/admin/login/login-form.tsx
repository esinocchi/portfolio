'use client';

import { useActionState } from 'react';
import { login } from '../actions';

export function LoginForm() {
  const [state, action, pending] = useActionState(login, {});
  return (
    <form action={action} className="mt-8 flex flex-col gap-3">
      <label htmlFor="password" className="text-sm text-muted">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        autoFocus
        className="h-11 rounded border border-border bg-background px-3 text-base outline-none focus:border-foreground"
      />
      {state.error && <p role="alert" className="text-sm text-error">{state.error}</p>}
      <button type="submit" disabled={pending} className="mt-2 h-11 rounded bg-foreground text-sm font-medium text-background disabled:opacity-60">
        {pending ? 'Checking…' : 'Sign in'}
      </button>
    </form>
  );
}

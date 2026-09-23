import { redirect } from 'next/navigation';
import { adminEnabled, isAdmin } from '@/lib/admin-auth';
import { LoginForm } from './login-form';

export default async function LoginPage() {
  if (await isAdmin()) redirect('/admin');
  return (
    <div className="mx-auto max-w-sm px-5 pt-24 sm:pt-32">
      <p className="section-label">Writing editor</p>
      <h1 className="mt-4 text-2xl font-medium tracking-tight">Sign in</h1>
      {adminEnabled() ? (
        <LoginForm />
      ) : (
        <p className="mt-6 text-sm leading-relaxed text-muted">The editor is turned off. Set <code>ADMIN_PASSWORD</code> in the environment to turn it on.</p>
      )}
    </div>
  );
}

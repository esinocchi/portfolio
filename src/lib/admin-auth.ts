import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE = 'admin_session';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export const adminEnabled = () => Boolean(process.env.ADMIN_PASSWORD);

// Signed with the password itself, so changing ADMIN_PASSWORD signs everyone out.
const sign = (value: string) => createHmac('sha256', `admin-session:${process.env.ADMIN_PASSWORD}`).update(value).digest('base64url');

const safeEqual = (a: string, b: string) => {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
};

export function passwordMatches(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  // Compare digests so the check takes the same time whatever the input length.
  const digest = (value: string) => createHmac('sha256', 'admin-password').update(value).digest('base64url');
  return safeEqual(digest(password), digest(expected));
}

export async function startSession() {
  const expires = Math.floor(Date.now() / 1000) + MAX_AGE_SECONDS;
  (await cookies()).set(COOKIE, `${expires}.${sign(String(expires))}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
  if (!adminEnabled()) return false;
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  const [expires, signature] = value.split('.');
  if (!expires || !signature || Number(expires) < Date.now() / 1000) return false;
  return safeEqual(signature, sign(expires));
}

/** Call at the top of every admin page and server action. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect('/admin/login');
}

/**
 * Counts failed attempts in memory. Counts are per server instance and reset when
 * the instance restarts, so this slows down guessing rather than hard-capping it.
 */
type Window = { count: number; resetAt: number };

export function createFailureLimiter({ max, windowMs }: { max: number; windowMs: number }) {
  const windows = new Map<string, Window>();

  const current = (key: string, now: number) => {
    const entry = windows.get(key);
    if (entry && entry.resetAt > now) return entry;
    windows.delete(key);
    return null;
  };

  return {
    /** Seconds until `key` may try again, or 0 if it is not blocked. */
    retryAfter(key: string, now = Date.now()) {
      const entry = current(key, now);
      return entry && entry.count >= max ? Math.ceil((entry.resetAt - now) / 1000) : 0;
    },
    fail(key: string, now = Date.now()) {
      const entry = current(key, now);
      if (entry) entry.count++;
      else windows.set(key, { count: 1, resetAt: now + windowMs });
      // Keep memory bounded if many addresses try.
      if (windows.size > 10_000) for (const [k, w] of windows) if (w.resetAt <= now) windows.delete(k);
    },
    reset(key: string) {
      windows.delete(key);
    },
  };
}

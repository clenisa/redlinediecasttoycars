'use client';

import { useState } from 'react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    // Simulate API call - replace with actual newsletter signup
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="bg-neutral-900 py-16 text-white dark:bg-black lg:py-24">
      <div className="mx-auto max-w-2xl px-4 text-center lg:px-8">
        <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">
          Join the Collector&apos;s Club
        </h2>
        <p className="mb-8 text-neutral-400">
          Get exclusive access to new releases, limited editions, and special offers.
        </p>

        {status === 'success' ? (
          <p className="text-green-400">Thanks for subscribing!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 rounded-none border border-neutral-700 bg-transparent px-4 py-3 text-white placeholder-neutral-500 focus:border-red-600 focus:outline-none"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="rounded-none bg-red-600 px-8 py-3 font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-neutral-500">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}

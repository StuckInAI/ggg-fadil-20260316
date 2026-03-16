'use client';

import { useState } from 'react';

export default function CallToAction() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json() as { message?: string; error?: string };

      if (res.ok) {
        setStatus('success');
        setMessage(data.message ?? 'Successfully subscribed!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error ?? 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <section
      id="signup"
      className="py-24 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="inline-block bg-white/10 text-white/90 text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-white/20">
          Get Started Today
        </span>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
          Ready to transform{' '}
          <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
            your workflow?
          </span>
        </h2>

        <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
          Join thousands of teams already using LaunchPad. Start free, no credit card required.
          Upgrade when you&apos;re ready.
        </p>

        {status === 'success' ? (
          <div className="bg-green-500/20 border border-green-400/30 rounded-2xl p-8 max-w-md mx-auto">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-white mb-2">You&apos;re on the list!</h3>
            <p className="text-white/80">{message}</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                required
                className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition text-lg"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-bold rounded-xl hover:from-yellow-300 hover:to-orange-300 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-yellow-500/30 text-lg whitespace-nowrap"
              >
                {status === 'loading' ? 'Signing up...' : 'Start for Free'}
              </button>
            </form>

            {message && status === 'error' && (
              <p className="text-red-300 text-sm font-medium">{message}</p>
            )}

            <p className="text-white/50 text-sm">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </>
        )}

        {/* Trust badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-8">
          {[
            { icon: '🔒', text: 'SOC 2 Certified' },
            { icon: '⚡', text: '99.9% Uptime SLA' },
            { icon: '🌍', text: 'GDPR Compliant' },
            { icon: '💳', text: 'No Credit Card' },
          ].map((badge) => (
            <div key={badge.text} className="flex items-center gap-2 text-white/70">
              <span className="text-xl">{badge.icon}</span>
              <span className="text-sm font-medium">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

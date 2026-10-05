import React, { useState } from 'react';
import { InstagramIcon } from './Icons';

const Contact: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="contact" className="py-16 scroll-animate">
      <div className="relative rounded-3xl p-8 sm:p-12 md:p-16 bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden shadow-2xl border border-white/10">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full filter blur-3xl -z-0 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-amber-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>CURRENTLY ACCEPTING COMMISSIONS & LONG-TERM ROLES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold tracking-tight text-white leading-tight mb-6">
            Have a project in mind?{' '}
            <span className="font-serif italic font-normal text-amber-400">
              Let's make it iconic.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mb-10 leading-relaxed">
            Whether you need a punchy 15-second viral reel hook, high-end keynote stage graphics, or an entire YouTube production overhaul, I deliver broadcast-ready results with fast turnarounds.
          </p>

          {/* Contact Direct Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {/* Phone */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-zinc-400">DIRECT PHONE / WHATSAPP</span>
                <div className="text-lg font-bold text-white mt-1">
                  +91 98349 82446
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <a
                  href="tel:+919834982446"
                  className="text-xs font-medium text-amber-400 hover:text-amber-300 underline"
                >
                  Call Now
                </a>
                <span className="text-zinc-500">·</span>
                <button
                  onClick={() => copyToClipboard('+919834982446', 'phone')}
                  className="text-xs text-zinc-400 hover:text-white"
                >
                  {copied === 'phone' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Email */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-zinc-400">OFFICIAL INBOX</span>
                <div className="text-lg font-bold text-white mt-1 truncate">
                  thenuman74@gmail.com
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <a
                  href="mailto:thenuman74@gmail.com"
                  className="text-xs font-medium text-amber-400 hover:text-amber-300 underline"
                >
                  Send Email
                </a>
                <span className="text-zinc-500">·</span>
                <button
                  onClick={() => copyToClipboard('thenuman74@gmail.com', 'email')}
                  className="text-xs text-zinc-400 hover:text-white"
                >
                  {copied === 'email' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Instagram */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-zinc-400">INSTAGRAM PORTFOLIO</span>
                <div className="text-lg font-bold text-white mt-1 flex items-center gap-2">
                  <InstagramIcon className="w-5 h-5 text-amber-400" />
                  <span>@numan.fx</span>
                </div>
              </div>
              <div className="mt-4">
                <a
                  href="https://www.instagram.com/numan.fx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-amber-400 hover:text-amber-300 underline inline-flex items-center gap-1"
                >
                  <span>Open Instagram Profile</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 font-mono gap-3">
            <div>© {new Date().getFullYear()} NUMAN PATEL · ALL RIGHTS RESERVED</div>
            <div>PROUDLY CRAFTED FOR SPEED & IMPACT</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

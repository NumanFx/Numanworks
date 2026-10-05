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
        <div className="relative z-10 max-w-4xl space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Have a project in mind?{' '}
            <span className="text-orange-500">
              Let's create together.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
            Whether you need short-form edits, cinematic videos, or motion graphics, I deliver high-quality visuals tailored to your audience.
          </p>

          {/* Contact Direct Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            {/* Phone */}
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between">
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Phone / WhatsApp</span>
                <div className="text-base sm:text-lg font-bold text-white mt-1">
                  +91 98349 82446
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="tel:+919834982446"
                  className="text-xs font-semibold text-orange-400 hover:text-orange-300 underline"
                >
                  Call
                </a>
                <span className="text-gray-500">·</span>
                <button
                  onClick={() => copyToClipboard('+919834982446', 'phone')}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  {copied === 'phone' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Email */}
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between">
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Email</span>
                <div className="text-base sm:text-lg font-bold text-white mt-1 truncate">
                  thenuman74@gmail.com
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="mailto:thenuman74@gmail.com"
                  className="text-xs font-semibold text-orange-400 hover:text-orange-300 underline"
                >
                  Send Email
                </a>
                <span className="text-gray-500">·</span>
                <button
                  onClick={() => copyToClipboard('thenuman74@gmail.com', 'email')}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  {copied === 'email' ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Instagram */}
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col justify-between">
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Instagram</span>
                <div className="text-base sm:text-lg font-bold text-white mt-1 flex items-center gap-2">
                  <InstagramIcon className="w-5 h-5 text-orange-400" />
                  <span>@numan.fx</span>
                </div>
              </div>
              <div className="mt-4">
                <a
                  href="https://www.instagram.com/numan.fx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-orange-400 hover:text-orange-300 underline inline-flex items-center gap-1"
                >
                  <span>View Profile &rarr;</span>
                </a>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-2">
            <div>© {new Date().getFullYear()} Numan Patel. All rights reserved.</div>
            <div>Video Editor & Motion Designer</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

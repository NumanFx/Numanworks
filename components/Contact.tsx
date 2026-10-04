
import React from 'react';
import { InstagramIcon } from './Icons';

const Contact: React.FC = () => {
  const contactInfo = [
    { label: "Phone", value: "+91 98349 82446", href: "tel:+919834982446" },
    { label: "Email", value: "thenuman74@gmail.com", href: "mailto:thenuman74@gmail.com" },
    {
      label: "Social",
      value: "Numan.fx",
      href: "https://www.instagram.com/numan.fx",
      icon: <InstagramIcon className="w-6 h-6 mr-2" />,
    },
  ];

  return (
    <section className="py-16 border-t border-black/10 dark:border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="scroll-animate">
          <h2 className="text-5xl font-bold">Contact</h2>
        </div>
        <div className="space-y-6 scroll-animate" style={{ transitionDelay: '150ms' }}>
          {contactInfo.map((info) => (
            <div key={info.label}>
              <h3 className="text-xl font-semibold text-gray-500 dark:text-white/70">{info.label}</h3>
              <a
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-lg text-gray-800 dark:text-white underline-offset-4 hover:underline hover:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300"
              >
                {info.icon}
                {info.value}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
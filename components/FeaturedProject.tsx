import React from 'react';
import { featuredProjectImages } from '../constants';
import InlineVideoCard from './InlineVideoCard';
import { cleanMediaUrl } from '../utils/video';

const FeaturedProject: React.FC = () => {
  const staticImage = featuredProjectImages.find((img) => !img.isVideo);
  const videoImages = featuredProjectImages.filter((img) => img.isVideo && img.videoUrl);

  return (
    <section className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-gray-100 to-blue-50 dark:from-[#0a2033] dark:to-black overflow-hidden border border-black/5 dark:border-white/10 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        <div className="lg:col-span-2 space-y-6 scroll-animate">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 font-semibold text-xs tracking-wider uppercase">
            Spotlight
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            Featured Project:<br />Kangana Ranaut Event
          </h2>
          <ul className="space-y-4 text-lg text-gray-600 dark:text-white/80">
            <li className="flex items-start">
              <span className="text-cyan-500 dark:text-cyan-400 mr-4 mt-1.5">&#9679;</span>
              <span>
                <strong>Intro Typography Video:</strong> Designed a striking, cinematic typography video to introduce the event, setting the tone for the audience.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 dark:text-cyan-400 mr-4 mt-1.5">&#9679;</span>
              <span>
                <strong>Event Coverage:</strong> Edited engaging, dynamic footage to capture the key moments of the event.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-cyan-500 dark:text-cyan-400 mr-4 mt-1.5">&#9679;</span>
              <span>
                <strong>Creative Motion Graphics:</strong> Added unique motion graphics to enhance the storytelling and visuals, making every clip memorable.
              </span>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3 space-y-6 scroll-animate" style={{ transitionDelay: '200ms' }}>
          {staticImage && (
            <div className="rounded-2xl overflow-hidden shadow-lg border border-black/10 dark:border-white/10 bg-neutral-900">
              <img
                src={cleanMediaUrl(staticImage.src)}
                alt={`Featured project visual ${staticImage.id}`}
                className="w-full h-auto object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          )}

          {/* Videos play automatically inline without opening a popup, showing thumbnail for 1st 1-3 sec */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {videoImages.map((image, idx) => (
              <InlineVideoCard
                key={image.id}
                id={image.id}
                thumbnail={cleanMediaUrl(image.src)}
                videoUrl={image.videoUrl!}
                title={`Kangana Ranaut Event Clip ${image.id}`}
                aspectRatioClass="aspect-video"
                previewDurationMs={2000}
                index={idx}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProject;


import React, { useState } from "react";
import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  href?: string;
  image?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

const FeatureCard = ({ icon, title, description, index, href, image, secondaryHref, secondaryLabel }: FeatureCardProps) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(image);
  const [triedRoot, setTriedRoot] = useState(false);

  const cardContent = (
    <>
      {imgSrc && (
        <div className="aspect-[16/9] w-full overflow-hidden rounded-lg mb-4 bg-gray-100">
          <img
            src={imgSrc}
            alt={title}
            className="w-full h-full object-cover"
            onError={() => {
              if (!triedRoot && imgSrc?.startsWith('/projects/')) {
                setTriedRoot(true);
                setImgSrc(imgSrc.replace('/projects/', '/'));
              } else {
                setImgSrc('/placeholder.svg');
              }
            }}
          />
        </div>
      )}
      <div className="rounded-full bg-pulse-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-pulse-500 mb-4 sm:mb-5">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{title}</h3>
      <p className="text-gray-600 text-sm sm:text-base">{description}</p>
      {secondaryHref && (
        <a
          href={secondaryHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium text-pulse-600 hover:text-pulse-800 transition-colors"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M3.18 23.76c.28.16.6.24.93.22.4-.03.78-.18 1.1-.42L17.5 16l-3.32-3.32L3.18 23.76zm17.6-13.03c.14-.27.22-.57.22-.88s-.08-.61-.22-.88L17.5 5.5l-3.5 3.5 3.5 3.5 3.28-1.85zM.98.3C.68.61.5 1.05.5 1.56v20.88c0 .51.18.95.48 1.26l.07.06L12.18 12.7v-.28L1.05.24.98.3zm12.2 11.1L5.2.68l-.02-.02c-.32-.24-.7-.4-1.1-.42-.33-.02-.65.06-.93.22L14.18 11.4z"/></svg>
          {secondaryLabel ?? "Play Store"}
        </a>
      )}
    </>
  );

  return (
    <Reveal delay={index * 120} className="h-full">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "feature-card glass-card p-4 sm:p-6 block h-full cursor-pointer",
            "lg:hover:bg-gradient-to-br lg:hover:from-white lg:hover:to-pulse-50",
            "transition-all duration-300"
          )}
          aria-label={`Open ${title}`}
        >
          {cardContent}
        </a>
      ) : (
        <div className={cn("feature-card glass-card p-4 sm:p-6 h-full", "transition-all duration-300")}>{cardContent}</div>
      )}
    </Reveal>
  );
};

const Features = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 pb-0 relative bg-gray-50" id="projects">
      <div className="section-container">
        <div className="text-center mb-10 sm:mb-16">
          <Reveal className="flex justify-center mb-3 sm:mb-4">
            <div className="pulse-chip">
              <span>Projects</span>
            </div>
          </Reveal>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>}
            title="Baaraakatta"
            description="React + Zustand app for the Telugu board game Baaraa Katta. Also available on the Play Store."
            href="https://baaraakatta.vercel.app/"
            image="Baaraakatta_tutorial_thumbnail.png"
            secondaryHref="https://play.google.com/store/apps/details?id=com.baaraakatta.app"
            secondaryLabel="Play Store"
            index={0}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M9 18v-6a2 2 0 0 1 2-2h6"/><path d="m13 6 3-3 3 3"/><path d="M9 6H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/></svg>}
            title="Kitchbot: Agentic Meal Planner"
            description="A pantry savvy chat assistant that plans meals, reduces waste, simplifies shopping, and answers cooking questions instantly."
            href="https://kitchbot.vercel.app/"
            image="kitchbot.png"
            index={1}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>}
            title="Samethalu.com: RAG Search"
            description="Low latency RAG search for Telugu proverbs with vector search + metadata filters; Dockerized API and web UI."
            href="https://www.samethalu.com/"
            image="samethalu.png"
            index={2}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M3 3v18h18"/><rect x="7" y="7" width="6" height="6"/><path d="M17 9v8"/></svg>}
            title="Social media Toxicity & Engagement Analysis"
            description="Analyzed 9M+ Reddit/4chan posts and concluded a correlation of 2.3x higher toxicity in top engagement."
            href="https://github.com/prakashnalubolu/Social-Media-Toxicity-and-Engagement-analysis"
            image="social_media.png"
            index={3}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>}
            title="Handwritten digits recognition: OCR"
            description="On device OCR prototype with PyTorch Mobile, CameraX."
            href="https://github.com/prakashnalubolu/Digit-recognition-via-mobile-application"
            image="handwrittendigits.png"
            index={4}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M3 12h18"/><path d="M12 3v18"/></svg>}
            title="TSA Checkpoint Advisor"
            description="Instant lookup for luggage items; fast, simple UI for international and domestic travellers."
            href="https://brutalist-checkpoint-guide.lovable.app/"
            image="tsa.png"
            index={5}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;

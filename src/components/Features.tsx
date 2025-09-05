
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  href?: string;
  image?: string;
}

const FeatureCard = ({ icon, title, description, index, href, image }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imgSrc, setImgSrc] = useState<string | undefined>(image);
  const [triedRoot, setTriedRoot] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const Inner = (
    <>
      {imgSrc && (
        <div className="aspect-[16/9] w-full overflow-hidden rounded-lg mb-4 bg-gray-100">
          <img
            src={imgSrc}
            alt={title}
            className="w-full h-full object-cover"
            onError={() => {
              // If the image is referenced under /projects but actually lives in /public root,
              // try swapping "/projects/" with "/" once before falling back to placeholder.
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
    </>
  );

  return (
    <div ref={cardRef} className="opacity-0" style={{ animationDelay: `${0.1 * index}s` }}>
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
          {Inner}
        </a>
      ) : (
        <div className={cn("feature-card glass-card p-4 sm:p-6", "transition-all duration-300")}>{Inner}</div>
      )}
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-fade-in");
              }, index * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section className="py-12 sm:py-16 md:py-20 pb-0 relative bg-gray-50" id="projects" ref={sectionRef}>
      <div className="section-container">
        <div className="text-center mb-10 sm:mb-16">
          <div className="pulse-chip mx-auto mb-3 sm:mb-4 opacity-0 fade-in-element">
            <span>Projects</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M9 18v-6a2 2 0 0 1 2-2h6"/><path d="m13 6 3-3 3 3"/><path d="M9 6H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/></svg>}
            title="Kitchbot: Agentic Meal Planner"
            description="A pantry savvy chat assistant that plans meals, reduces waste, simplifies shopping, and answers cooking questions instantly."
            href="https://github.com/prakashnalubolu/Kitchbot"
            image="kitchbot.png"
            index={0}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>}
            title="Samethalu.com: RAG Search"
            description="Low latency RAG search for Telugu proverbs with vector search + metadata filters; Dockerized API and web UI."
            href="https://www.samethalu.com/"
            image="samethalu.png"
            index={1}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M3 3v18h18"/><rect x="7" y="7" width="6" height="6"/><path d="M17 9v8"/></svg>}
            title="Social media Toxicity & Engagement Analysis"
            description="Analyzed 9M+ Reddit/4chan posts and concluded a correlation of 2.3x higher toxicity in top engagement."
            href="https://github.com/prakashnalubolu/Social-Media-Toxicity-and-Engagement-analysis"
            image="social_media.png"
            index={2}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>}
            title="Handwritten digits recognition: OCR"
            description="On device OCR prototype with PyTorch Mobile, CameraX."
            href="https://github.com/prakashnalubolu/Digit-recognition-via-mobile-application"
            image="handwrittendigits.png"
            index={3}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M3 12h18"/><path d="M12 3v18"/></svg>}
            title="TSA Checkpoint Advisor"
            description="Instant lookup for luggage items; fast, simple UI for international and domestic travellers."
            href="https://brutalist-checkpoint-guide.lovable.app/"
            image="tsa.png"
            index={4}
          />
          <FeatureCard
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M14 9l-5 3 5 3V9z"/><rect x="3" y="5" width="18" height="14" rx="2"/></svg>}
            title="Pokemon Battle Predictions"
            description="ML model predicting battle outcomes from Pokemon attributes."
            href="https://github.com/prakashnalubolu/Pokemon-battle-predictions"
            image="pokemon.jpeg"
            index={5}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;

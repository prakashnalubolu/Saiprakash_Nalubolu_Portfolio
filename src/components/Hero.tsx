import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Pause, Play } from "lucide-react";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isProfessional, setIsProfessional] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-switch between the two intros every 5 seconds (pausable)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIsProfessional((prev) => !prev);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !imageRef.current) return;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;
      imageRef.current.style.transform = `perspective(1000px) rotateY(${x * 2.5}deg) rotateX(${-y * 2.5}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    const handleMouseLeave = () => {
      if (!imageRef.current) return;
      imageRef.current.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.querySelectorAll('.parallax').forEach(el => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.dataset.speed || '0.1');
        const yPos = -scrollY * speed;
        element.style.setProperty('--parallax-y', `${yPos}px`);
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <section
      className="overflow-hidden relative bg-cover"
      id="hero"
      style={{
        backgroundImage: 'url("/Header-background.webp")',
        backgroundPosition: 'center 30%',
        padding: isMobile ? '100px 12px 40px' : '120px 20px 60px',
      }}
    >
      <div className="absolute -top-[10%] -right-[5%] w-1/2 h-[70%] bg-pulse-gradient opacity-20 blur-3xl rounded-full"></div>

      <div className="container px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div
          className={cn(
            "flex flex-col gap-6 lg:gap-12 items-center",
            isProfessional ? "lg:flex-row" : "lg:flex-row-reverse"
          )}
        >
          <div className="w-full lg:w-1/2">
            <div
              className="pulse-chip mb-3 sm:mb-6 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <span>About me</span>
            </div>

            <h1
              className="section-title text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight opacity-0 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              {isProfessional ? (
                <>Hi !!<br className="hidden sm:inline" />I am Saiprakash :) </>
              ) : (
                <>How I work &<br className="hidden sm:inline" />What I bring to team</>
              )}
            </h1>

            <p
              style={{ animationDelay: "0.5s" }}
              className="section-subtitle mt-3 sm:mt-6 mb-4 sm:mb-8 leading-relaxed opacity-0 animate-fade-in text-gray-950 font-normal text-base sm:text-lg text-left"
            >
              {isProfessional ? (
                <>
                  <span className="block">
                    ISTQB-certified SQA Engineer with 4 years across Fintech and Healthcare, specializing in UI and API automation testing. Looking for QA / SDET roles, ideally QA + AI hybrid teams. I've also published AI research and built agentic AI and RAG applications end-to-end.
                  </span>
                  <span className="block mt-1">
                    Tech I use: Selenium, Playwright, Cucumber/Behave (BDD), Postman/Bruno, Python, Java, SQL, Docker, Jenkins/GitHub Actions; plus LangChain, PyTorch and RAG.
                  </span>
                </>
              ) : (
                "I'm a QA engineer who thinks like a developer. I automate the tedious parts, write tests that mirror real users, and make quality measurable from day one. I build maintainable Selenium/Playwright + BDD frameworks, validate APIs and data end-to-end, and wire tests into CI/CD so regressions surface fast. Curious, collaborative, and steady under pressure: the teammate who turns fuzzy requirements into reliable, well-tested releases."
              )}
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.7s" }}
            >
              <a
                href="#details"
                className="flex items-center justify-center group w-full sm:w-auto text-center"
                style={{
                  backgroundColor: '#FE5C02',
                  borderRadius: '1440px',
                  boxSizing: 'border-box',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  fontSize: '14px',
                  lineHeight: '20px',
                  padding: '16px 24px',
                  border: '1px solid white',
                }}
              >
                Contact Me
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative mt-6 lg:mt-0">
            <div className="absolute inset-0 bg-dark-900 rounded-2xl sm:rounded-3xl -z-10 shadow-xl"></div>
            <div
              className="group relative transition-all duration-500 ease-out overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl cursor-pointer"
              onClick={() => setIsProfessional(!isProfessional)}
              role="button"
              tabIndex={0}
              aria-label="Switch between professional and personal intro"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsProfessional(!isProfessional);
                }
              }}
            >
              <img
                ref={imageRef}
                src={isProfessional ? "/hero-image.jpg" : "/hero-image-2.jpg"}
                alt={isProfessional ? "Professional Portrait" : "Personal Photo"}
                className="w-full h-auto object-cover transition-transform duration-500 ease-out"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isProfessional ? 'rotateY(0deg)' : 'rotateY(180deg)'
                }}
              />

              {/* Tap-to-flip hint */}
              <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium shadow-md transition-transform group-hover:scale-105">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Tap to flip
              </div>

              {/* Auto-rotate pause / play control */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPaused((prev) => !prev);
                }}
                aria-label={isPaused ? "Resume auto-switching" : "Pause auto-switching"}
                title={isPaused ? "Resume auto-switching" : "Pause auto-switching"}
                className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium shadow-md hover:bg-white transition-colors"
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                {isPaused ? 'Play' : 'Pause'}
              </button>

              {/* Dot indicators for the two intros */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5">
                <span className={cn("h-2 w-2 rounded-full transition-colors", isProfessional ? "bg-white" : "bg-white/40")}></span>
                <span className={cn("h-2 w-2 rounded-full transition-colors", !isProfessional ? "bg-white" : "bg-white/40")}></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block absolute bottom-0 left-1/4 w-64 h-64 bg-pulse-100/30 rounded-full blur-3xl -z-10 parallax" data-speed="0.05"></div>
    </section>
  );
};

export default Hero;


import React, { useEffect, useRef, useState } from "react";

const HumanoidSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ticking = useRef(false);
  const lastScrollY = useRef(0);

  // More responsive timing function with shorter duration
  const cardStyle = {
    height: '60vh',
    maxHeight: '600px',
    borderRadius: '20px',
    transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
    willChange: 'transform, opacity'
  };

  useEffect(() => {
    // Create intersection observer to detect when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 } // Start observing when 10% of element is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    // Optimized scroll handler using requestAnimationFrame
    const handleScroll = () => {
      if (!ticking.current) {
        lastScrollY.current = window.scrollY;
        
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          
          const sectionRect = sectionRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const totalScrollDistance = viewportHeight * 2;
          
          // Calculate the scroll progress
          let progress = 0;
          if (sectionRect.top <= 0) {
            progress = Math.min(1, Math.max(0, Math.abs(sectionRect.top) / totalScrollDistance));
          }
          
          // Determine which card should be visible based on progress
          if (progress >= 0.66) {
            setActiveCardIndex(2);
          } else if (progress >= 0.33) {
            setActiveCardIndex(1);
          } else {
            setActiveCardIndex(0);
          }
          
          ticking.current = false;
        });
        
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Card visibility based on active index instead of direct scroll progress
  const isFirstCardVisible = isIntersecting;
  const isSecondCardVisible = activeCardIndex >= 1;
  const isThirdCardVisible = activeCardIndex >= 2;

  return (
    <div 
      ref={sectionRef} 
      className="relative" 
      style={{ height: '300vh' }}
    >
      {/* Invisible anchors to allow direct navigation to each card state */}
      <div id="experience" style={{ position: 'absolute', top: '0vh', height: 1, width: 1 }} />
      <div id="education" style={{ position: 'absolute', top: '100vh', height: 1, width: 1 }} />
      <div id="achievements" style={{ position: 'absolute', top: '200vh', height: 1, width: 1 }} />
      <section className="w-full h-screen py-10 md:py-16 sticky top-0 overflow-hidden bg-white" id="why-me">
        <div className="container px-6 lg:px-8 mx-auto h-full flex flex-col">
          <div className="mb-2 md:mb-3">
            <div className="flex items-center gap-4 mb-2 md:mb-2 pt-8 sm:pt-6 md:pt-4">
              <div className="pulse-chip opacity-0 animate-fade-in" style={{
                animationDelay: "0.1s"
              }}>
                <span>Career Snapshot</span>
              </div>
            </div>
            
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-1 md:mb-2">
              Work, Study and Highlights
            </h2>
          </div>
          
          <div ref={cardsContainerRef} className="relative flex-1 perspective-1000">
            {/* First Card */}
            <div 
              className={`absolute inset-0 overflow-hidden shadow-xl ${isFirstCardVisible ? 'animate-card-enter' : ''}`} 
              style={{
                ...cardStyle,
                zIndex: 10,
                transform: `translateY(${isFirstCardVisible ? '90px' : '200px'}) scale(0.9)`,
                opacity: isFirstCardVisible ? 0.9 : 0
              }}
            >
              <div
                className="absolute inset-0 z-0 bg-gradient-to-b from-pulse-900/40 to-dark-900/80"
                style={{
                  backgroundImage: "url('/background-section1.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "top center",
                  backgroundBlendMode: "overlay"
                }}
              ></div>
              
              <div className="absolute top-4 right-4 z-20">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white">
                  <span className="text-sm font-medium">Experience</span>
                </div>
              </div>
              
              {/* Experience card content: bright, legible on blue using white + subtle shadow */}
              <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full flex items-start overflow-y-auto">
                <div className="w-full pr-2 md:pr-4">
                  <div className="space-y-4 text-white text-lg sm:text-xl leading-relaxed drop-shadow-[0_1px_1px_rgba(0,0,0,0.65)]">
                    <div>
                      <p className="font-semibold text-white">Software Development Engineer in Test (Intern), MiHIN (Remote, Michigan)</p>
                      <p className="text-white/95">Sep 2025 – Present</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Building Selenium/Behave and API test suites for MiHIN’s Health Information Exchange, validating interoperability on AWS.</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Research Assistant, Binghamton University</p>
                      <p className="text-white/95">Sep 2024 – May 2025</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Saved 33% processing time by automating histopathology image segmentation (contrast enhancement, H&amp;E deconvolution, watershed segmentation) for high‑resolution WSI images.</li>
                        <li>Developed a deep learning survival model for lung cancer by fusing TCGA clinical data with histopathology features; applied SHAP to explain drivers (TNM stage, ECOG, NLR/PLR, morphology).</li>
                        <li>Leveraged HPC GPU cluster for distributed training/inference of large‑scale histopathology models, optimizing runtime with PyTorch (FSDP) and CUDA on A100/H100/T4 GPUs.</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Software Engineer in Test Automation, Citi Bank (through TCS)</p>
                      <p className="text-white/95">Mar 2021 – Dec 2023</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Boosted automation coverage from 66% to 87% by engineering Selenium Java frameworks with Cucumber (BDD) and embedding into Jenkins/Maven CI/CD pipelines.</li>
                        <li>Prevented 400+ production defects by developing 1000+ automated tests for Citi's microservices‑based servicing platform.</li>
                        <li>Led a team of 5 to ensure accurate communication to 30M+ users by automating customer servicing message workflows.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Second Card */}
            <div 
              className={`absolute inset-0 overflow-hidden shadow-xl ${isSecondCardVisible ? 'animate-card-enter' : ''}`} 
              style={{
                ...cardStyle,
                zIndex: 20,
                transform: `translateY(${isSecondCardVisible ? activeCardIndex === 1 ? '55px' : '45px' : '200px'}) scale(0.95)`,
                opacity: isSecondCardVisible ? 1 : 0,
                pointerEvents: isSecondCardVisible ? 'auto' : 'none'
              }}
            >
              <div
                className="absolute inset-0 z-0 bg-gradient-to-b from-pulse-900/40 to-dark-900/80"
                style={{
                  backgroundImage: "url('/background-section2.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundBlendMode: "overlay"
                }}
              ></div>
              
              <div className="absolute top-4 right-4 z-20">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white">
                  <span className="text-sm font-medium">Education</span>
                </div>
              </div>
              
              <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full flex items-start justify-start pt-6 sm:pt-8 overflow-y-auto">
                <div className="w-full pr-2 md:pr-4">
                  <div className="space-y-4 text-white text-lg sm:text-xl leading-relaxed">
                    <div>
                      <p className="font-semibold text-white">Binghamton University, State University of New York</p>
                      <p className="text-white/80">M.S. in Computer Science (AI track) • Jan 2024 – Dec 2025 • CGPA: 3.84/4.00</p>
                      <p className="mt-2">Relevant Coursework: Machine Learning, Deep Learning, Artificial Intelligence, Human‑Computer Interaction, Design Patterns.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-white">Vellore Institute of Technology (VIT), Vellore</p>
                      <p className="text-white/80">B.Tech in Computer Science and Engineering • Jul 2016 – Jun 2020</p>
                      <p className="mt-2">Relevant Coursework: Data Structures &amp; Algorithms, Operating Systems, Database Management Systems, Software Engineering.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Third Card */}
            <div 
              className={`absolute inset-0 overflow-hidden shadow-xl ${isThirdCardVisible ? 'animate-card-enter' : ''}`} 
              style={{
                ...cardStyle,
                zIndex: 30,
                transform: `translateY(${isThirdCardVisible ? activeCardIndex === 2 ? '15px' : '0' : '200px'}) scale(1)`,
                opacity: isThirdCardVisible ? 1 : 0,
                pointerEvents: isThirdCardVisible ? 'auto' : 'none'
              }}
            >
              <div
                className="absolute inset-0 z-0 bg-gradient-to-b from-pulse-900/40 to-dark-900/80"
                style={{
                  backgroundImage: "url('/background-section3.png')",
                  backgroundSize: "cover",
                  backgroundPosition: "bottom center",
                  backgroundBlendMode: "overlay"
                }}
              ></div>
              
              <div className="absolute top-4 right-4 z-20">
                <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white">
                  <span className="text-sm font-medium">Achievements</span>
                </div>
              </div>
              
              <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full flex items-start justify-start pt-6 sm:pt-8 overflow-y-auto">
                <div className="w-full pr-2 md:pr-4">
                  <ul className="list-disc pl-5 space-y-2 text-white text-base sm:text-lg leading-relaxed">
                    <li>
                      Finalist, XFoundry Horizons challenge (NASA NEXPLORE 2040):
                      <span className="block">Defined a high-impact Earth and Mars/Moon problem; presented solutions to NASA leaders, industry experts, and inventors.</span>
                    </li>
                    <li>Shipped a TSA Checkpoint Advisor web app in 7 hours; instant search for items allowed in luggage for all types of travel.</li>
                    <li>Received 3 “On the Spot” awards from TCS.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HumanoidSection;

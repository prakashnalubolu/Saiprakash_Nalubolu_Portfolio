
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HumanoidSection from "@/components/HumanoidSection";
import DetailsSection from "@/components/DetailsSection";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  // Initialize intersection observer to detect when elements enter viewport
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
    
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    // This helps ensure smooth scrolling for the anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        // Offset equals current header height + small gap
        const header = document.querySelector('header') as HTMLElement | null;
        const offset = (header?.offsetHeight ?? 64) + 16;

        // Use document-relative position for accurate scrolling
        const rect = targetElement.getBoundingClientRect();
        const targetY = rect.top + window.scrollY - offset;

        window.scrollTo({
          top: targetY,
          behavior: 'smooth'
        });
      });
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="space-y-4 sm:space-y-8"> {/* Reduced space on mobile */}
        <Hero />
        {/* Experience, Education, Achievements cards */}
        <HumanoidSection />
        {/* Projects */}
        <Features />
        {/* References & Feedback */}
        <Testimonials />
        {/* Contact info and form at the bottom */}
        <DetailsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

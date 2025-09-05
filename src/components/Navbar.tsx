
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent background scrolling when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-2 sm:py-3 md:py-4 transition-all duration-300",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand + quick download links */}
        <div className="flex items-center gap-3">
          <a 
            href="#" 
            className="flex items-center space-x-2"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            aria-label="Saiprakash Nalubolu"
          >
            <img 
              src="/logo.svg" 
              alt="Saiprakash Nalubolu Logo" 
              className="h-7 sm:h-8" 
            />
          </a>

          {/* Desktop/Tablet quick actions */}
          <div className="hidden md:flex items-center gap-2 ml-1">
            <a
              href="/Saiprakash_Nalubolu_Resume.pdf"
              download
              className={cn(
                "text-xs font-medium px-2.5 py-1 rounded-md border",
                "border-gray-300 text-gray-700 hover:border-orange-500 hover:bg-orange-500 hover:text-white",
                "transition-colors transition-transform transform-gpu hover:scale-105 active:scale-95"
              )}
            >
              Resume/CV
            </a>
            <a
              href="/Saiprakash_Nalubolu_Cover_Letter.pdf"
              download
              className={cn(
                "text-xs font-medium px-2.5 py-1 rounded-md border",
                "border-gray-300 text-gray-700 hover:border-orange-500 hover:bg-orange-500 hover:text-white",
                "transition-colors transition-transform transform-gpu hover:scale-105 active:scale-95"
              )}
            >
              Cover Letter
            </a>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#hero" className="nav-link">About</a>
          <a href="#experience" className="nav-link">Experience</a>
          <a href="#education" className="nav-link">Education</a>
          <a href="#achievements" className="nav-link">Achievements</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#testimonials" className="nav-link">References</a>
          <a href="#details" className="nav-link">Contact</a>
        </nav>

        {/* Mobile menu button - increased touch target */}
        <button 
          className="md:hidden text-gray-700 p-3 focus:outline-none" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation - improved for better touch experience */}
      <div className={cn(
        "fixed inset-0 z-40 bg-white flex flex-col pt-16 px-6 md:hidden transition-all duration-300 ease-in-out",
        isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
      )}>
        <nav className="flex flex-col space-y-8 items-center mt-8">
          {/* Mobile quick actions */}
          <div className="flex items-center gap-3 w-full justify-center">
            <a
              href="/Saiprakash_Nalubolu_Resume.pdf"
              download
              className="text-sm font-medium py-2 px-4 rounded-lg border border-gray-300 text-gray-700 hover:border-orange-500 hover:bg-orange-500 hover:text-white transition-colors transition-transform transform-gpu hover:scale-105 active:scale-95"
              onClick={() => {
                setIsMenuOpen(false);
                document.body.style.overflow = '';
              }}
            >
              Resume/CV
            </a>
            <a
              href="/Saiprakash_Nalubolu_Cover_Letter.pdf"
              download
              className="text-sm font-medium py-2 px-4 rounded-lg border border-gray-300 text-gray-700 hover:border-orange-500 hover:bg-orange-500 hover:text-white transition-colors transition-transform transform-gpu hover:scale-105 active:scale-95"
              onClick={() => {
                setIsMenuOpen(false);
                document.body.style.overflow = '';
              }}
            >
              Cover Letter
            </a>
          </div>

          <a 
            href="#hero" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            About
          </a>
          <a 
            href="#experience" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Experience
          </a>
          <a 
            href="#education" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Education
          </a>
          <a 
            href="#achievements" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Achievements
          </a>
          <a 
            href="#projects" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Projects
          </a>
          <a 
            href="#testimonials" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            References
          </a>
          <a 
            href="#details" 
            className="text-xl font-medium py-3 px-6 w-full text-center rounded-lg hover:bg-gray-100" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

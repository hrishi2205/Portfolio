import React, { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ShimmerButton } from "./ui/ShimmerButton";
import { navLinks } from "../data";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const headerRef = useRef(null);

  // No changes needed for GSAP, it's already well-scoped.
  useGSAP(
    (context) => {
      const el = context.selector;

      gsap.from(headerRef.current, {
        y: -100,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(el(".nav-link"), {
        y: -30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5,
      });
    },
    { scope: headerRef }
  );

  // OPTIMIZATION 1: Throttled Scroll Handler
  useEffect(() => {
    let timeoutId = null;
    const throttleDuration = 150; // Run once every 150ms

    const handleScroll = () => {
      if (timeoutId) return; // If we're waiting, do nothing

      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 10);
        timeoutId = null; // Clear the timeout so it can be set again
      }, throttleDuration);
    };

    window.addEventListener("scroll", handleScroll, { passive: true }); // passive improves scroll performance

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <header
      ref={headerRef}
      // OPTIMIZATION 2: More specific CSS transitions
      className={`sticky top-0 z-50 transition-[background-color,backdrop-filter] duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between p-4 text-white">
        <a href="#" className="text-2xl font-bold tracking-tighter nav-link">
          Portfolio<span className="text-sky-500">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors duration-300 nav-link"
            >
              {link.name}
            </a>
          ))}
          <a href="#footer" className="nav-link">
            <ShimmerButton className="text-sm">Get In Touch</ShimmerButton>
          </a>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle menu" // Add aria-label for accessibility
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* OPTIMIZATION 3: Mobile menu animated with CSS classes */}
      <nav
        className={`md:hidden bg-black/90 backdrop-blur-lg w-full flex flex-col items-center gap-4 absolute top-full left-0 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-[150%]" // Slide in/out
        }`}
      >
        <div className="flex flex-col items-center gap-4 py-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors duration-300 nav-link text-lg"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#footer"
            className="nav-link"
            onClick={() => setIsOpen(false)}
          >
            <ShimmerButton className="text-sm">Get In Touch</ShimmerButton>
          </a>
        </div>
      </nav>
    </header>
  );
};

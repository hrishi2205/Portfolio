import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { socialLinks } from "../data";

gsap.registerPlugin(ScrollTrigger);

// OPTIMIZATION 3: Memoize the component
export const Footer = React.memo(() => {
  const footerRef = useRef(null);

  useGSAP(
    () => {
      const footer = footerRef.current;
      if (!footer) return;

      // OPTIMIZATION 1: Use a single, simpler .from() animation
      gsap.from(footer, {
        opacity: 0,
        y: 50,
        duration: 1, // Give it a clear duration
        ease: "power3.out",
        scrollTrigger: {
          trigger: footer,
          start: "top 95%", // Start animation when 95% of the footer is visible
          toggleActions: "play none none none", // Play the animation once and for all
        },
      });
    },
    { scope: footerRef }
  );

  return (
    <footer
      id="footer"
      ref={footerRef}
      className="py-6 border-t border-gray-800"
    >
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Hrishi Yadav. All rights reserved.
        </p>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          {socialLinks.map(({ name, icon: Icon, url }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label={name} // OPTIMIZATION 2: Add accessibility label
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
});

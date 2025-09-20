import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { socialLinks } from "../data";

gsap.registerPlugin(ScrollTrigger);

// OPTIMIZATION 2: Memoize the component
export const Contact = React.memo(() => {
  const contactRef = useRef(null);

  useGSAP(
    () => {
      const section = contactRef.current;
      if (!section) return;

      const title = section.querySelector(".section-title");
      const paragraph = section.querySelector(".animate-scroll-fade");
      const contactCard = section.querySelector(".contact-card");
      const socialIcons = section.querySelectorAll(".social-link");

      // OPTIMIZATION 1: Simplified, more performant animation logic
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 20%", // Adjust start trigger for a better feel
          end: "top top",
          scrub: 1,
        },
        defaults: {
          // Use timeline defaults for cleaner code
          ease: "power3.out",
        },
      });

      tl.from([title, paragraph], {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
      })
        .from(
          contactCard,
          {
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
          },
          "-=0.6"
        )
        // Use a single .from() tween. It's more declarative and performant.
        .from(
          socialIcons,
          {
            opacity: 0,
            scale: 0.5,
            stagger: 0.1,
            duration: 0.6,
          },
          "-=0.5"
        );
    },
    { scope: contactRef }
  );

  return (
    <section
      id="contact"
      ref={contactRef}
      className="h-screen flex flex-col items-center justify-center text-center overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl sm:text-4xl md:text-5xl">
          Get In Touch
        </h2>
        <p className="max-w-2xl mx-auto text-gray-300 text-lg mb-8 animate-scroll-fade">
          I'm currently open to new opportunities and collaborations. If you
          have a project in mind or just want to say hi, feel free to reach out.
          Let's build something amazing together!
        </p>

        <div className="contact-card max-w-lg mx-auto p-4">
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map(({ name, icon: Icon, url }) => {
              const hoverColor = {
                GitHub: "hover:text-white",
                LinkedIn: "hover:text-blue-500",
                Instagram: "hover:text-rose-500",
              }[name];

              return (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-link p-3 rounded-full text-gray-400 transition-colors duration-300 ${hoverColor}`}
                  aria-label={name} // Add aria-label for accessibility
                >
                  <Icon size={28} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

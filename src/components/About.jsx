import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// OPTIMIZATION 1: Wrap the component in React.memo
export const About = React.memo(() => {
  const aboutRef = useRef(null);

  useGSAP(
    () => {
      // OPTIMIZATION 2: Set defaults for the timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none none",
        },
        defaults: {
          duration: 0.6,
          ease: "power2.out",
        },
      });

      tl.from(".about-title", {
        y: 50,
        opacity: 0,
      }).from(
        ".about-text p",
        {
          y: 40,
          opacity: 0,
          stagger: 0.2,
        },
        "-=0.3"
      );
    },
    { scope: aboutRef }
  );

  return (
    <section id="about" ref={aboutRef} className="py-16 sm:py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title about-title text-3xl sm:text-4xl md:text-5xl">
          A Little About Me
        </h2>
        <div className="max-w-3xl mx-auto text-center text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed about-text mt-6 sm:mt-8">
          <p className="mb-4">
            I’m a passionate Frontend Developer with a love for crafting{" "}
            <strong>
              intuitive, visually appealing, and user-focused web experiences
            </strong>
            . My journey in tech began with curiosity about how things work, and
            it has grown into an ambition to become a Full Stack Developer,
            building end-to-end web applications from concept to deployment.
          </p>
          <p>
            From designing intuitive, responsive front-end interfaces to
            learning how to build robust back-end systems, I love turning ideas
            into seamless web experiences. I thrive in collaborative
            environments and am always eager to explore new technologies and
            tackle challenging problems.
          </p>
        </div>
      </div>
    </section>
  );
});

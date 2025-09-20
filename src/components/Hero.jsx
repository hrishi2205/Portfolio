import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send } from "lucide-react";
import { ShimmerButton } from "./ui/ShimmerButton";
import { MeteorBackground } from "./ui/MeteorBackground";
import { DesktopModel } from "./DesktopModel";

gsap.registerPlugin(SplitText, ScrollTrigger);

export const Hero = () => {
  const heroRef = useRef(null);
  const moonRef = useRef(null);
  const modelContainerRef = useRef(null);
  const scrollRef = useRef(null);

  useGSAP(
    () => {
      const heroTitle = heroRef.current.querySelector(".hero-title");
      const heroSubtitle = heroRef.current.querySelector(".hero-subtitle");
      const button = heroRef.current.querySelector(".hero-button");

      const titleSplit = new SplitText(heroTitle, { type: "chars" });
      const subtitleSplit = new SplitText(heroSubtitle, { type: "lines" });

      // =================================================================
      // === A SINGLE UNIFIED TIMELINE FOR PERFECT SYNC ===
      // =================================================================

      // Create one master timeline to control everything
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=1500", // The total scroll distance for all animations
          pin: true,
          scrub: 1, // Use a smooth scrub for all animations
        },
      });

      // 1. Add the 3D model animation first.
      //    We position it at the start and give it a relative duration.
      tl.to(
        modelContainerRef.current,
        {
          opacity: 0,
          scale: 0.8,
          ease: "power2.out",
          duration: 1, // This will happen during the first part of the scroll
        },
        0 // Start at the beginning
      )
        // 2. Add the moon, text, and button animations.
        //    They start slightly before the model has finished disappearing.
        .to(
          moonRef.current,
          { opacity: 1, scale: 1.05, ease: "none", duration: 2.5 }, // Let it last longer
          0.8 // Start this 0.8s into the timeline
        )
        .from(
          titleSplit.chars,
          { y: 60, opacity: 0, stagger: 0.05, ease: "power3.out" },
          "<" // Start at the same time as the moon
        )
        .from(
          subtitleSplit.lines,
          { y: 40, opacity: 0, stagger: 0.1, ease: "power2.out" },
          "<+0.3" // Start 0.3s after the title animation starts
        )
        .from(
          button,
          { y: 20, opacity: 0, ease: "power2.out" },
          "<+0.3" // Start 0.3s after the subtitle animation starts
        );

      // We no longer need the separate ScrollTrigger for the model.

      // === Scroll Down arrow fade out (No changes here) ===
      gsap.to(scrollRef.current, {
        opacity: 0,
        y: 20,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=300",
          scrub: true,
        },
      });
    },
    { scope: heroRef }
  );

  // === Smooth scroll handler (No changes here) ===
  const handleScrollToFooter = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[70vh] md:min-h-[80vh] lg:h-screen flex flex-col justify-center items-center text-center text-white overflow-hidden px-4"
    >
      <MeteorBackground />

      {/* 3D Model */}
      <div
        ref={modelContainerRef}
        className="absolute inset-0 z-10 flex items-center justify-center"
      >
        <DesktopModel />
      </div>

      {/* Moon overlay */}
      <div
        ref={moonRef}
        className="absolute inset-0 bg-cover bg-center opacity-0 z-0 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://framerusercontent.com/images/QwfNdX7XFiAjKddxd5P0l7rHtU8.png')",
        }}
      />

      {/* Hero text */}
      <div className="relative z-30 flex flex-col items-center max-w-3xl">
        <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter mb-4">
          Hrishi Yadav
        </h1>
        <p className="hero-subtitle text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8">
          Frontend Developer & UI/UX Enthusiast crafting seamless digital
          experiences from concept to cloud.
        </p>
        <div className="hero-button">
          <ShimmerButton onClick={handleScrollToFooter}>
            <Send className="mr-2" size={20} />
            Let's Connect
          </ShimmerButton>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <div
        ref={scrollRef}
        className="absolute bottom-16 sm:bottom-24 md:bottom-32 lg:bottom-40 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center">
          <span className="text-gray-300 mb-2 text-sm sm:text-base">
            Scroll Down
          </span>
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 animate-bounceArrow text-sky-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

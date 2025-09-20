import React, { forwardRef, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Send } from "lucide-react";
import { ShimmerButton } from "./ui/ShimmerButton";

export const HeroContentLayer = forwardRef(function HeroContentLayer(
  { onCtaClick },
  ref
) {
  const localRef = useRef(null);
  const containerRef = ref || localRef;

  useGSAP(() => {
    const root = containerRef.current;
    if (!root) return;
    const title = root.querySelector(".hero-title");
    const subtitle = root.querySelector(".hero-subtitle");
    const button = root.querySelector(".hero-button");

    const titleSplit = new SplitText(title, { type: "chars" });
    const subtitleSplit = new SplitText(subtitle, { type: "lines" });

    const tl = gsap.timeline();
    tl.from(titleSplit.chars, {
      y: 60,
      opacity: 0,
      stagger: 0.04,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        subtitleSplit.lines,
        {
          y: 40,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .from(
        button,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .eventCallback("onComplete", () => {
        titleSplit.revert();
        subtitleSplit.revert();
      });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-30 flex flex-col items-center max-w-3xl mx-auto"
    >
      {/* Background image behind content */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-100 -z-10 pointer-events-none"
        style={{
          backgroundImage:
            "url('https://framerusercontent.com/images/QwfNdX7XFiAjKddxd5P0l7rHtU8.png')",
        }}
      />

      <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter mb-4">
        Hrishi Yadav
      </h1>
      <p className="hero-subtitle text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8">
        Frontend Developer & UI/UX Enthusiast crafting seamless digital
        experiences from concept to cloud.
      </p>
      <div className="hero-button">
        <ShimmerButton onClick={onCtaClick}>
          <Send className="mr-2" size={20} />
          Let's Connect
        </ShimmerButton>
      </div>
    </div>
  );
});

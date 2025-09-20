import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "../data";
import { SkillCard } from "./SkillCard"; // Import the new component

gsap.registerPlugin(ScrollTrigger);

export const Skills = React.memo(() => {
  const skillsRef = useRef(null);

  // Reversible animation: play when top hits center, reverse on scroll back
  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const el = skillsRef.current;
        if (!el) return;

        const items = gsap.utils.toArray(el.querySelectorAll(".skill-item"));
        const grid = el.querySelector(".skills-grid");
        const title = el.querySelector(".skills-title");
        if (!grid || items.length === 0) return;

        // Build the timeline in a paused state
        const tl = gsap.timeline({ paused: true });
        tl.from(title, {
          y: 50,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        }).from(
          items,
          {
            x: (index, target) => {
              const gridBounds = grid.getBoundingClientRect();
              const itemBounds = target.getBoundingClientRect();
              const gridCenterX = gridBounds.left + gridBounds.width / 2;
              const itemCenterX = itemBounds.left + itemBounds.width / 2;
              return gridCenterX - itemCenterX;
            },
            y: (index, target) => {
              const gridBounds = grid.getBoundingClientRect();
              const itemBounds = target.getBoundingClientRect();
              const gridCenterY = gridBounds.top + gridBounds.height / 2;
              const itemCenterY = itemBounds.top + itemBounds.height / 2;
              return gridCenterY - itemCenterY;
            },
            opacity: 0,
            scale: 0.5,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.2"
        );

        // ScrollTrigger that toggles play/reverse at the middle
        const st = ScrollTrigger.create({
          trigger: el,
          start: "top center",
          onEnter: () => tl.play(),
          onLeaveBack: () => tl.reverse(),
        });

        // Set initial progress based on position
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        if (rect.top <= vh / 2) {
          tl.progress(1);
        } else {
          tl.progress(0);
        }

        return () => {
          st.kill();
          tl.kill();
        };
      }, skillsRef);
      return () => ctx.revert();
    },
    { scope: skillsRef, dependencies: [skills] }
  );

  return (
    <section
      id="skills"
      ref={skillsRef}
      className="py-16 sm:py-20 lg:py-32 bg-black/30 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title skills-title text-3xl sm:text-4xl md:text-5xl mb-10">
          My Tech Stack
        </h2>
        <div className="max-w-5xl mx-auto">
          <ul className="skills-grid flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            {/* Use the new SkillCard component in the map loop */}
            {skills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
});

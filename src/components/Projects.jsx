import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data";
import { Github, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// OPTIMIZATION 1: Reworked the entire card to use GSAP for smooth, performant animations
const TimelineProjectCard = React.memo(({ project }) => {
  const cardRef = useRef(null);

  // useGSAP is perfect for this kind of setup
  useGSAP(() => {
    const card = cardRef.current;
    if (!card) return;

    // Use GSAP's quickSetter for super-fast style updates
    const xTo = gsap.quickTo(card, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(card, "y", { duration: 0.2, ease: "power3" });
    const rotateXTo = gsap.quickTo(card, "rotationX", {
      duration: 0.8,
      ease: "power3",
    });
    const rotateYTo = gsap.quickTo(card, "rotationY", {
      duration: 0.8,
      ease: "power3",
    });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = card.getBoundingClientRect();
      const x = clientX - left;
      const y = clientY - top;

      // Move the card slightly towards the mouse
      const xMove = ((x - width / 2) / (width / 2)) * 15;
      const yMove = ((y - height / 2) / (height / 2)) * 15;
      xTo(xMove);
      yTo(yMove);

      // Apply 3D rotation
      const rotateY = -((x - width / 2) / (width / 2)) * 15;
      const rotateX = ((y - height / 2) / (height / 2)) * 15;
      rotateXTo(rotateX);
      rotateYTo(rotateY);

      // Radial gradient logic (no changes needed here)
      card.style.setProperty("--x", `${x}px`);
      card.style.setProperty("--y", `${y}px`);
      card.style.setProperty("--opacity", "1");
    };

    const handleMouseLeave = () => {
      // Smoothly animate back to the original state
      gsap.to(card, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      });
      card.style.setProperty("--opacity", "0");
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup listeners
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="group timeline-card relative rounded-xl bg-gray-900/50 border border-gray-800 w-full max-w-md mx-auto shadow-lg flex flex-col"
      style={{
        background: `
          radial-gradient(
            200px circle at var(--x, 50%) var(--y, 50%),
            rgba(14, 165, 233, calc(var(--opacity, 0) * 0.25)) 0%,
            transparent 60%
          )
        `,
        // Set perspective here for the 3D effect
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <img
        src={project.imageUrl}
        alt={project.title}
        className="w-full h-44 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-110 rounded-t-xl"
        style={{ transform: "translateZ(20px)" }} // Give image a little depth
      />
      <div
        className="p-4 sm:p-6 flex flex-col flex-1"
        style={{ transform: "translateZ(40px)" }}
      >
        {" "}
        {/* Text appears closer */}
        {/* ... rest of your card content (no changes needed) */}
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
          {project.title}
        </h3>
        <p className="text-gray-400 mb-3 text-sm sm:text-base leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="bg-sky-900/50 text-sky-300 text-xs sm:text-sm font-medium px-2 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 mt-auto">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-white hover:text-sky-400 transition-colors text-sm sm:text-base"
          >
            Live Demo <ArrowUpRight size={14} />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-white hover:text-sky-400 transition-colors text-sm sm:text-base"
          >
            GitHub <Github size={14} />
          </a>
        </div>
      </div>
    </div>
  );
});

export const Projects = React.memo(() => {
  const projectsRef = useRef(null);

  // No changes needed for the main timeline animation logic, it's already good.
  useGSAP(
    () => {
      const section = projectsRef.current;
      if (!section) return;

      const items = gsap.utils.toArray(".timeline-item");
      const timelineLine = section.querySelector(".timeline-line");
      const title = section.querySelector(".projects-title");

      const isMobile = window.innerWidth < 768;

      if (title) {
        gsap.from(title, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: title, start: "top 85%" },
        });
      }

      if (timelineLine && !isMobile) {
        gsap.from(timelineLine, {
          scaleY: 0,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });
      }

      items.forEach((item, index) => {
        const card = item.querySelector(".timeline-card");
        const dot = item.querySelector(".timeline-dot");
        const isLeft = index % 2 === 0;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 70%",
            end: "bottom 60%",
            toggleActions: "play reverse play reverse",
          },
        });

        if (card) {
          tl.from(card, {
            x: isMobile ? 0 : isLeft ? -60 : 60,
            y: 30,
            opacity: 0,
            scale: 0.95,
            duration: 0.8,
            ease: "power3.out",
          });
        }

        if (dot && !isMobile) {
          tl.from(
            dot,
            { scale: 0, duration: 0.5, ease: "back.out(1.8)" },
            "-=0.4"
          );
        }
      });
    },
    { scope: projectsRef }
  );

  return (
    <section
      id="projects"
      ref={projectsRef}
      className="py-16 sm:py-20 lg:py-32" // overflow-x-hidden might not be needed
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title projects-title text-3xl sm:text-4xl md:text-5xl">
          Things I've Built
        </h2>
      </div>

      <div className="container mx-auto relative mt-12 sm:mt-16 px-4 sm:px-6">
        <div className="timeline-line hidden md:block absolute top-0 left-1/2 w-0.5 h-full bg-sky-500/30 transform -translate-x-1/2"></div>
        <div className="relative space-y-16 sm:space-y-24">
          {projects.map((project, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={project.title}
                className="timeline-item w-full flex flex-col md:flex-row justify-center"
              >
                {isLeft ? (
                  <>
                    <div className="w-full md:w-1/2 md:pr-12 relative mb-8 md:mb-0 flex justify-center">
                      <div className="timeline-dot hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-sky-500 border-4 border-gray-900"></div>
                      <TimelineProjectCard project={project} />
                    </div>
                    <div className="w-0 md:w-1/2"></div>
                  </>
                ) : (
                  <>
                    <div className="w-0 md:w-1/2"></div>
                    <div className="w-full md:w-1/2 md:pl-12 relative flex justify-center">
                      <div className="timeline-dot hidden md:block absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-sky-500 border-4 border-gray-900"></div>
                      <TimelineProjectCard project={project} />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

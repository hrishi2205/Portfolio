import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const SkillCard = ({ skill }) => {
  const cardRef = useRef(null);
  const innerContentRef = useRef(null);

  useGSAP(() => {
    const card = cardRef.current;
    const innerContent = innerContentRef.current;
    if (!card || !innerContent) return;

    const xTo = gsap.quickTo(card, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(card, "y", { duration: 0.4, ease: "power3" });
    const rotateXTo = gsap.quickTo(card, "rotationX", {
      duration: 0.3,
      ease: "power3",
    });
    const rotateYTo = gsap.quickTo(card, "rotationY", {
      duration: 0.3,
      ease: "power3",
    });

    const innerRotateXTo = gsap.quickTo(innerContent, "rotationX", {
      duration: 0.3,
      ease: "power3",
    });
    const innerRotateYTo = gsap.quickTo(innerContent, "rotationY", {
      duration: 0.3,
      ease: "power3",
    });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = card.getBoundingClientRect();
      const x = clientX - left;
      const y = clientY - top;

      const xMove = ((x - width / 2) / (width / 2)) * 10;
      const yMove = ((y - height / 2) / (height / 2)) * 10;
      xTo(xMove);
      yTo(yMove);

      const rotateY = -((x - width / 2) / (width / 2)) * 15;
      const rotateX = ((y - height / 2) / (height / 2)) * 15;
      rotateXTo(rotateX);
      rotateYTo(rotateY);

      innerRotateXTo(-rotateX * 0.3);
      innerRotateYTo(-rotateY * 0.3);
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      });
      gsap.to(innerContent, {
        rotationX: 0,
        rotationY: 0,
        duration: 1,
        ease: "elastic.out(1, 0.5)",
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <li
      ref={cardRef}
      className="skill-item"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <div
        ref={innerContentRef}
        // REMOVED: hover:bg-gray-800 and hover:border-sky-500
        className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gray-800/50 border border-gray-700 rounded-xl flex-col gap-2"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="text-3xl sm:text-4xl md:text-5xl font-bold"
          style={{ color: "#0ea5e9", transform: "translateZ(40px)" }}
        >
          <skill.icon />
        </div>
        <span
          className="text-gray-300 text-sm sm:text-base"
          style={{ transform: "translateZ(30px)" }}
        >
          {skill.name}
        </span>
      </div>
    </li>
  );
};

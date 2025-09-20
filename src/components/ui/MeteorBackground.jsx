import React, { useEffect, memo } from "react";

export const MeteorBackground = memo(() => {
  useEffect(() => {
    const meteorContainer = document.querySelector(".meteor-container");
    if (!meteorContainer) return;

    if (meteorContainer.childElementCount > 0) return;

    const createMeteor = () => {
      const meteor = document.createElement("div");
      meteor.className = "meteor";

      // Randomize starting position and animation speed/delay
      meteor.style.left = `${Math.random() * 100}vw`;
      meteor.style.animationDuration = `${Math.random() * 1.5 + 2}s`; // 2-3.5s
      meteor.style.animationDelay = `${Math.random() * 7}s`; // 0-7s

      meteorContainer.appendChild(meteor);
    };

    const count = 25; // Slightly more meteors
    for (let i = 0; i < count; i++) createMeteor();

    const handleAnimationEnd = (event) => {
      if (event.target.classList.contains("meteor")) {
        event.target.remove();
        // Respawn a new one after a short delay
        setTimeout(createMeteor, Math.random() * 500);
      }
    };

    meteorContainer.addEventListener("animationend", handleAnimationEnd);

    return () => {
      meteorContainer.removeEventListener("animationend", handleAnimationEnd);
      const meteors = meteorContainer.querySelectorAll(".meteor");
      meteors.forEach((m) => m.remove());
    };
  }, []);

  return (
    <div
      className="meteor-container absolute inset-0 overflow-hidden w-full h-full"
      style={{ zIndex: -1 }} // Ensure it's behind all content
    ></div>
  );
});

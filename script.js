const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

// Toggle menu on hamburger click
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    !navLinks.contains(e.target) && // clicked outside nav links
    !menuBtn.contains(e.target) && // clicked outside menu button
    navLinks.classList.contains("active")
  ) {
    navLinks.classList.remove("active");
  }
});

// Typed.js animation
document.addEventListener("DOMContentLoaded", function () {
  new Typed("#typed-text", {
    strings: [
      "Hi, I'm Hrishi",
      "I am a Developer.",
      "I am a Designer.",
      "I am a Creator.",
    ],
    typeSpeed: 70, // typing speed
    backSpeed: 40, // backspacing speed
    backDelay: 1500, // pause before backspacing
    loop: true, // keep repeating
  });

  // Clone skill cards once → seamless infinite marquee
  const marquee = document.querySelector(".skills-marquee");
  if (marquee) {
    marquee.innerHTML += marquee.innerHTML;
  }
});

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
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
});

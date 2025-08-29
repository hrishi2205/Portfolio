const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (
    !navLinks.contains(e.target) &&
    !menuBtn.contains(e.target) &&
    navLinks.classList.contains("active")
  ) {
    navLinks.classList.remove("active");
  }
});

document.getElementById("cta-btn").addEventListener("click", function (e) {
  e.preventDefault();
  setTimeout(() => {
    document.querySelector("#contact").scrollIntoView({
      behavior: "smooth",
    });
  }, 600);
});

document.addEventListener("DOMContentLoaded", function () {
  new Typed("#typed-text", {
    strings: [
      "Hi, I'm Hrishi",
      "I am a Developer.",
      "I am a Designer.",
      "I am a Creator.",
    ],
    typeSpeed: 70,
    backSpeed: 40,
    backDelay: 1500,
    loop: true,
  });

  const marquee = document.querySelector(".skills-marquee");
  if (marquee) {
    marquee.innerHTML += marquee.innerHTML;
  }
});

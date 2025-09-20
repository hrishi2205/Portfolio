import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { TbBrandJavascript, TbBrandThreejs } from "react-icons/tb";
import {
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
} from "react-icons/si";

export const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
];

export const socialLinks = [
  { name: "GitHub", icon: FaGithub, url: "https://github.com/hrishi2205" },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    url: "https://linkedin.com/in/hrishiyadav",
  },
  {
    name: "Instagram",
    icon: FaInstagram,
    url: "https://instagram.com/hri_shhh",
  },
];

export const skills = [
  { name: "HTML", icon: SiHtml5 },
  { name: "CSS", icon: SiCss3 }, // fallback
  { name: "JavaScript", icon: TbBrandJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "React", icon: SiReact },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Three.js", icon: TbBrandThreejs },
  { name: "GSAP", icon: "GSAP" },
];

export const projects = [
  {
    title: "BuzzTalk - Secure Chat App",
    description:
      "A modern real-time chat application with email-based authentication, OTP verification, and secure end-to-end encryption using Web Crypto API. Features include profile customization with avatars, responsive design, and a hive-inspired UI built for seamless communication across devices.",
    technologies: ["React", "Node.js", "Express", "Tailwind", "Web Crypto API"],
    liveUrl: "https://buzztalk.me",
    githubUrl: "https://github.com/hrishi2205/buzztalk-frontend",
    imageUrl: "/images/buzztalk.png",
  },
  {
    title: "Nimbus - Weather App",
    description:
      "A responsive weather application that provides real-time forecasts, current conditions, and location-based updates using the OpenWeather API. Includes dynamic icons, search functionality, and a clean UI built for both desktop and mobile.",
    technologies: ["React", "TypeScript", "GSAP", "Three.js", "Tailwind"],
    liveUrl: "https://nimbuscloudweather.netlify.app/",
    githubUrl: "https://github.com/hrishi2205/Nimbus",
    imageUrl: "/images/Nimbus.png",
  },

  {
    title: "AI Chatbot - Gemini",
    description:
      "An AI-powered chatbot built with Vanilla JavaScript that integrates Gemini's REST API for real-time responses. Features a clean interface, smooth user experience, and lightweight implementation without external frameworks.",
    technologies: ["Vanilla JS", "REST API", "HTML", "CSS"],
    liveUrl: "https://aichat-bot-gemini.netlify.app/",
    githubUrl: "https://github.com/hrishi2205/Chat-Bot",
    imageUrl: "/images/AIchat.png",
  },
  {
    title: "TheGildedGlass - Menu App",
    description:
      "An interactive menu application built with smooth scroll-based animations and dynamic UI components. Designed for a seamless user experience using GSAP and ScrollTrigger.",
    technologies: ["React", "JSX", "GSAP", "ScrollTrigger"],
    liveUrl: "https://thegildedglass.netlify.app/",
    githubUrl: "https://github.com/hrishi2205/cocktail-app",
    imageUrl: "/images/MenuApp.png",
  },
  {
    title: "ActionBoard - To-Do App",
    description:
      "A minimalistic to-do application featuring Typed.js animations for dynamic headings. Built with Vanilla JavaScript, offering task creation, deletion, and status tracking with a clean and intuitive UI.",
    technologies: ["HTML", "CSS", "Vanilla JS", "Typed.js"],
    liveUrl: "hrishi-todo-list.netlify.app",
    githubUrl: "https://github.com/hrishi2205/Todo-List",
    imageUrl: "/images/Todo.png",
  },
  {
    title: "BillSplit - Expense Splitter",
    description:
      "A lightweight bill-splitting app with Typed.js-driven text effects for a modern touch. Built using Vanilla JavaScript to calculate and split expenses easily among groups with a responsive UI.",
    technologies: ["HTML", "CSS", "Vanilla JS", "Typed.js"],
    liveUrl: "bill-tip-splitter.netlify.app",
    githubUrl: "https://github.com/hrishi2205/Bill-and-tip-Splitter",
    imageUrl: "/images/Spliter.png",
  },
];

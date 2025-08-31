// Enhanced JavaScript with modern features

// DOM Elements
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const navbar = document.querySelector(".navbar");
const scrollProgress = document.querySelector(".scroll-progress");

// Mobile Menu Toggle
menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  menuBtn.classList.toggle("active");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    !navLinks.contains(e.target) &&
    !menuBtn.contains(e.target) &&
    navLinks.classList.contains("active")
  ) {
    navLinks.classList.remove("active");
    menuBtn.classList.remove("active");
  }
});

// Enhanced CTA Button with smooth scroll
document.getElementById("cta-btn").addEventListener("click", function (e) {
  e.preventDefault();
  setTimeout(() => {
    document.querySelector("#contact").scrollIntoView({
      behavior: "smooth",
    });
  }, 600);
});

// Scroll Progress Bar
function updateScrollProgress() {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + "%";
}

// Navbar Scroll Effects
function handleNavbarScroll() {
  const scrollTop = window.pageYOffset;
  
  if (scrollTop > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Close mobile menu after navigation
      navLinks.classList.remove("active");
      menuBtn.classList.remove("active");
    }
  });
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function () {
  // Initialize Typed.js
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

  // Duplicate marquee content for seamless loop
  const marquee = document.querySelector(".skills-marquee");
  if (marquee) {
    marquee.innerHTML += marquee.innerHTML;
  }

  // Add animation classes to elements
  const animatedElements = document.querySelectorAll('.about-content, .skills-content, .works-content, .contact-content');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Enhanced work card animations
  const workCards = document.querySelectorAll('.work-card');
  workCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // Skills card animations
  const skillsCards = document.querySelectorAll('.skills-card');
  skillsCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
});

// Enhanced Form Interactions
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.contact-form');
  const submitBtn = document.querySelector('.submit-btn');
  
  if (form && submitBtn) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Add loading state
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual form handling)
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #00ddeb, #5b42f3)';
        
        // Reset form
        setTimeout(() => {
          form.reset();
          submitBtn.innerHTML = 'Send Message';
          submitBtn.disabled = false;
          submitBtn.style.background = 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid))';
        }, 2000);
      }, 1500);
    });
  }
});

// Parallax Effect for Header (disabled for performance)
function handleParallax() {
  // Disabled for better performance
  return;
}

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Event Listeners with throttling
window.addEventListener('scroll', throttle(() => {
  updateScrollProgress();
  handleNavbarScroll();
  handleParallax();
}, 32)); // Reduced to 30fps for better performance

// Initialize on page load
window.addEventListener('load', () => {
  updateScrollProgress();
  handleNavbarScroll();
});

// Enhanced hover effects for skills cards (simplified)
document.addEventListener('DOMContentLoaded', function() {
  const skillsCards = document.querySelectorAll('.skills-card');
  
  skillsCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

// Smooth reveal animation for sections
function revealOnScroll() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset;
    
    if (scrollTop + windowHeight > sectionTop + sectionHeight * 0.3) {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }
  });
}

// Add reveal animation to sections
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  });
  
  // Initial reveal
  revealOnScroll();
});

// Enhanced scroll listener for reveal animations
window.addEventListener('scroll', throttle(revealOnScroll, 200));

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    menuBtn.classList.remove('active');
  }
});

// Touch gesture support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
  touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
  touchEndY = e.changedTouches[0].screenY;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartY - touchEndY;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe up - could be used for navigation
    } else {
      // Swipe down - could be used for navigation
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    once: false,
    mirror: true,
    offset: 50,
    easing: 'ease-out-cubic'
  });
  
  // Selectors
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('backToTop');
  const sections = document.querySelectorAll('section[id]');
  const contactForm = document.getElementById('contactForm');
  const statNumbers = document.querySelectorAll('.stat-number');
  const heroSection = document.querySelector('.hero');
  const projectCards = document.querySelectorAll('.project-card');
  
  // Custom cursor
  const cursor = document.createElement('div');
  const cursorCircle = document.createElement('div');
  const cursorTrail = [];
  cursor.classList.add('cursor-dot');
  cursorCircle.classList.add('cursor-circle');
  document.body.appendChild(cursor);
  document.body.appendChild(cursorCircle);
  
  // Create cursor trail elements
  for (let i = 0; i < 5; i++) {
    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');
    document.body.appendChild(trail);
    cursorTrail.push({
      element: trail,
      x: 0,
      y: 0
    });
  }

  // Custom cursor movement with trail
  let mouseX = 0;
  let mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
    
    // Show trails when moving
    cursorTrail.forEach(trail => {
      trail.element.style.opacity = '0.5';
    });
  });
  
  // Animate cursor and trails
  function animateCursors() {
    // Delayed circle follow
    cursorCircle.style.left = mouseX + 'px';
    cursorCircle.style.top = mouseY + 'px';
    
    // Animate trails with delay
    cursorTrail.forEach((trail, index) => {
      // Create delay effect based on index
      const delay = 5 * (index + 1);
      
      // Lerp (linear interpolation) the position
      trail.x += (mouseX - trail.x) / delay;
      trail.y += (mouseY - trail.y) / delay;
      
      // Update position
      trail.element.style.left = trail.x + 'px';
      trail.element.style.top = trail.y + 'px';
      
      // Scale and opacity based on distance from cursor
      const dx = mouseX - trail.x;
      const dy = mouseY - trail.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const scale = Math.max(0.3, 1 - distance / 100);
      const opacity = Math.max(0, 0.5 - distance / 200);
      
      trail.element.style.transform = `translate(-50%, -50%) scale(${scale})`;
      trail.element.style.opacity = opacity.toString();
    });
    
    requestAnimationFrame(animateCursors);
  }
  
  animateCursors();

  // Cursor effects on links and buttons
  const cursorTargets = document.querySelectorAll('a, button, .project-card, .experience-card, .skill-item, .contact-card');
  
  cursorTargets.forEach((target) => {
    target.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorCircle.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursorCircle.style.opacity = '0.2';
      cursorCircle.style.borderColor = 'var(--accent-color)';
    });
    
    target.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorCircle.style.transform = 'translate(-50%, -50%) scale(1)';
      cursorCircle.style.opacity = '0.5';
      cursorCircle.style.borderColor = 'var(--primary-color)';
    });
  });
  
  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    cursorCircle.style.opacity = '0';
    cursorTrail.forEach(trail => {
      trail.element.style.opacity = '0';
    });
  });
  
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    cursorCircle.style.opacity = '0.5';
  });

  // Toggle menu on mobile
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  });

  // Close menu when clicking on a nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.classList.remove('no-scroll');
    });
  });

  // Change navbar style on scroll
  window.addEventListener('scroll', () => {
    updateNavbar();
    highlightNavOnScroll();
    animateOnScroll();

    // Back to top button visibility
    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  
  // Initial navbar setup
  updateNavbar();

  // Stats Counter Animation
  countUp();

  // Functions
  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  function highlightNavOnScroll() {
    let scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').substring(1) === sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  function countUp() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        stat.textContent = Math.floor(current);
        
        if (current >= target) {
          stat.textContent = target;
          clearInterval(timer);
        }
      }, 16);
    });
  }

  // Parallax Effects on Scroll
  function animateOnScroll() {
    const scrollPosition = window.scrollY;
    
    // Parallax for hero section
    if (heroSection && scrollPosition < heroSection.offsetHeight) {
      const heroImage = document.querySelector('.hero-image');
      const heroText = document.querySelector('.hero-text');
      
      if (heroImage) {
        heroImage.style.transform = `translateY(${scrollPosition * 0.05}px) rotate(${scrollPosition * 0.01}deg)`;
      }
      
      if (heroText) {
        heroText.style.transform = `translateY(${scrollPosition * 0.02}px)`;
      }
    }
    
    // Check if skills section is visible
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
      const sectionTop = skillsSection.offsetTop;
      const windowBottom = scrollPosition + window.innerHeight;
      
      if (windowBottom > sectionTop && !skillsSection.classList.contains('animated')) {
        animateSkills();
        skillsSection.classList.add('animated');
      }
    }
  }
  
  // Initial animation check
  setTimeout(animateOnScroll, 500);

  // Glitch effect enhancement
  const glitchText = document.querySelector('.glitch-text');
  if (glitchText) {
    setInterval(() => {
      glitchText.classList.add('active');
      setTimeout(() => {
        glitchText.classList.remove('active');
      }, 200);
    }, 3000);
  }

  // Skill progress animation
  const skillProgresses = document.querySelectorAll('.skill-progress');
  
  function animateSkills() {
    skillProgresses.forEach(progress => {
      progress.style.animation = 'grow-bar 1.5s ease forwards';
    });
  }

  // Smooth scrolling for all internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      
      const targetPosition = targetElement.offsetTop - 80;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  // Project cards hover effect
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      projectCards.forEach(c => c.classList.add('dimmed'));
      card.classList.remove('dimmed');
      card.classList.add('active');
    });
    
    card.addEventListener('mouseleave', () => {
      projectCards.forEach(c => {
        c.classList.remove('dimmed');
        c.classList.remove('active');
      });
    });
  });

  // Add this to help with mobile experience
  if (window.innerWidth <= 768) {
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', function() {
        const link = this.querySelector('.project-link');
        if (link) {
          link.click();
        }
      });
    });
  }

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
    
    AOS.refresh();
  });

  // Refresh AOS animations when all images are loaded
  window.addEventListener('load', () => {
    AOS.refresh();
    animateOnScroll();
  });

  // Back to top button functionality
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Form submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const formValues = Object.fromEntries(formData.entries());
      
      // Here you would typically send the form data to a backend service
      // For now, we'll just log it and show a success message
      console.log('Form submitted:', formValues);
      
      // Display success message (you'd replace this with your own UI feedback)
      const successMessage = document.createElement('div');
      successMessage.className = 'form-success';
      successMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
      
      contactForm.reset();
      contactForm.appendChild(successMessage);
      
      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    });
  }

  // Create particles for hero and contact sections
  createParticles();
});

// Create interactive particles
function createParticles() {
  const heroParticles = document.querySelector('.hero-particles');
  const contactParticles = document.querySelector('.contact-particles');
  
  if (heroParticles) {
    generateParticles(heroParticles, 20, 'hero');
  }
  
  if (contactParticles) {
    generateParticles(contactParticles, 15, 'contact');
  }
}

function generateParticles(container, count, type) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random properties
    const size = Math.random() * 8 + 2; // 2-10px
    const posX = Math.random() * 100; // 0-100%
    const posY = Math.random() * 100; // 0-100%
    const delay = Math.random() * 4; // 0-4s
    const duration = Math.random() * 6 + 4; // 4-10s
    
    // Different colors based on section
    let color;
    if (type === 'hero') {
      color = i % 3 === 0 ? 'var(--primary-color)' : 
              i % 3 === 1 ? 'var(--accent-color)' : 'var(--accent-secondary)';
    } else {
      color = i % 3 === 0 ? 'var(--accent-color)' : 
              i % 3 === 1 ? 'var(--primary-color)' : 'var(--accent-tertiary)';
    }
    
    // Set styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.background = color;
    particle.style.opacity = (Math.random() * 0.6 + 0.2).toString();
    particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
    particle.style.boxShadow = `0 0 ${size}px ${color}`;
    
    // Append to container
    container.appendChild(particle);
    
    // Add mouseover effect
    particle.addEventListener('mouseover', function() {
      this.style.transform = 'scale(1.5)';
      this.style.opacity = '0.8';
    });
    
    particle.addEventListener('mouseout', function() {
      this.style.transform = 'scale(1)';
      this.style.opacity = (Math.random() * 0.6 + 0.2).toString();
    });
  }
}

// Enhanced cursor effects
document.addEventListener('DOMContentLoaded', function() {
  const cursor = document.querySelector('.cursor-dot');
  const cursorCircle = document.querySelector('.cursor-circle');
  const cursorTrail = document.querySelector('.cursor-trail');
  const links = document.querySelectorAll('a, button, .btn');

  let cursorX = 0;
  let cursorY = 0;
  let circleX = 0;
  let circleY = 0;
  let trailX = 0;
  let trailY = 0;

  // Create trail elements
  const trails = [];
  const trailCount = 5;
  
  for (let i = 0; i < trailCount; i++) {
    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');
    trail.style.opacity = 0.4 - (i * 0.08);
    trail.style.width = `${12 - (i * 2)}px`;
    trail.style.height = `${12 - (i * 2)}px`;
    document.body.appendChild(trail);
    trails.push({
      element: trail,
      x: 0,
      y: 0
    });
  }

  document.addEventListener('mousemove', e => {
    cursorX = e.clientX;
    cursorY = e.clientY;
  });

  // Handle link hover effects
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-active');
      cursorCircle.classList.add('cursor-active');
    });

    link.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-active');
      cursorCircle.classList.remove('cursor-active');
    });
  });

  // Animation loop for smooth cursor
  function animateCursors() {
    // Smooth cursor movement with easing
    const easeAmount = 0.2;
    
    // Main cursor dot
    if (cursor) {
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    }
    
    // Circle follows with smoothing
    if (cursorCircle) {
      circleX += (cursorX - circleX) * easeAmount;
      circleY += (cursorY - circleY) * easeAmount;
      cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px)`;
    }
    
    // Update trail positions with different delay for each
    for (let i = 0; i < trails.length; i++) {
      const trail = trails[i];
      trail.x += (cursorX - trail.x) * (easeAmount / (i + 1.5));
      trail.y += (cursorY - trail.y) * (easeAmount / (i + 1.5));
      trail.element.style.transform = `translate(${trail.x}px, ${trail.y}px) scale(1)`;
    }
    
    requestAnimationFrame(animateCursors);
  }
  
  animateCursors();
  
  // Hide default cursor
  document.body.style.cursor = 'none';
  
  // Show default cursor when leaving window
  document.addEventListener('mouseleave', () => {
    document.body.style.cursor = 'auto';
    if (cursor) cursor.style.opacity = 0;
    if (cursorCircle) cursorCircle.style.opacity = 0;
    trails.forEach(trail => {
      trail.element.style.opacity = 0;
    });
  });
  
  // Restore custom cursor when entering window
  document.addEventListener('mouseenter', () => {
    document.body.style.cursor = 'none';
    if (cursor) cursor.style.opacity = 1;
    if (cursorCircle) cursorCircle.style.opacity = 1;
    trails.forEach((trail, i) => {
      trail.element.style.opacity = 0.4 - (i * 0.08);
    });
  });
});

// Skill progress bar animation
function animateSkills() {
  const skillItems = document.querySelectorAll('.skill-item');
  
  skillItems.forEach(item => {
    const progress = item.querySelector('.skill-progress');
    const width = progress.style.width;
    
    // Reset width to 0 for animation
    progress.style.width = '0';
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Set width back to the original value with transition
          setTimeout(() => {
            progress.style.width = width;
          }, 200);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(item);
  });
}

// Stats animation
function animateStats() {
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200; // The lower the faster
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    let count = 0;
    
    const updateCount = () => {
      const increment = target / speed;
      
      if (count < target) {
        count += increment;
        counter.innerText = Math.floor(count);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCount();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(counter);
  });
}

// Initialize AOS (Animate on scroll)
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
}

// Particle animation for hero and contact sections
function initParticles() {
  const heroParticles = document.querySelector('.hero-particles');
  const contactParticles = document.querySelector('.contact-particles');
  
  if (heroParticles) createParticles(heroParticles, 20);
  if (contactParticles) createParticles(contactParticles, 15);
  
  function createParticles(container, count) {
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random size
      const size = Math.random() * 6 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      
      // Random opacity
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      
      // Random animation duration
      const duration = Math.random() * 20 + 10;
      particle.style.animation = `float ${duration}s infinite ease-in-out`;
      
      // Random delay
      particle.style.animationDelay = `${Math.random() * 10}s`;
      
      container.appendChild(particle);
    }
  }
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }
  
  // Active nav link on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 150) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });
  
  // Initialize animations
  animateSkills();
  animateStats();
  initAOS();
  initParticles();
});

// Add fancy hover effects to project cards
document.addEventListener('DOMContentLoaded', function() {
  const projects = document.querySelectorAll('.project-card');
  
  projects.forEach(project => {
    project.addEventListener('mousemove', e => {
      const rect = project.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const angleX = (y - centerY) / 15;
      const angleY = (centerX - x) / 15;
      
      project.style.transform = `scale(1.03) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
      project.style.boxShadow = `0 15px 30px rgba(0, 0, 0, 0.3),
                              0 0 20px rgba(0, 230, 118, 0.3),
                              ${angleY * 0.5}px ${angleX * 0.5}px 10px rgba(0, 0, 0, 0.2)`;
    });
    
    project.addEventListener('mouseleave', () => {
      project.style.transform = 'scale(1)';
      project.style.boxShadow = '';
    });
  });
});

// Add floating shapes to hero section
document.addEventListener('DOMContentLoaded', function() {
  const hero = document.querySelector('.hero');
  if (hero) {
    const floatingShapes = document.createElement('div');
    floatingShapes.className = 'floating-shapes';
    
    // Create shapes
    const shapes = [
      { className: 'floating-shape shape-1' },
      { className: 'floating-shape shape-2' },
      { className: 'floating-shape shape-3' },
      { className: 'floating-shape shape-4' }
    ];
    
    shapes.forEach(shape => {
      const element = document.createElement('div');
      element.className = shape.className;
      floatingShapes.appendChild(element);
    });
    
    hero.appendChild(floatingShapes);
  }
  
  // Add animated gradient
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    const gradient = document.createElement('div');
    gradient.className = 'animated-gradient';
    section.appendChild(gradient);
  });
  
  // Add circuit background
  const body = document.body;
  const circuit = document.createElement('div');
  circuit.className = 'circuit-background';
  body.appendChild(circuit);
});

// Magnetic buttons effect
document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate distance from center
      const buttonCenterX = rect.width / 2;
      const buttonCenterY = rect.height / 2;
      
      // Max move is 5px
      const moveX = (x - buttonCenterX) / buttonCenterX * 5;
      const moveY = (y - buttonCenterY) / buttonCenterY * 5;
      
      // Apply transform
      this.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
});

// 3D tilt effect for project cards with mouse movement
document.addEventListener('DOMContentLoaded', function() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate position relative to center (in percentage)
      const xPercent = ((x / rect.width) - 0.5) * 2; // -1 to 1
      const yPercent = ((y / rect.height) - 0.5) * 2; // -1 to 1
      
      // Limit rotation angle
      const maxRotation = 8;
      const xRotation = -yPercent * maxRotation; // Invert for correct tilt direction
      const yRotation = xPercent * maxRotation;
      
      // Apply rotation and scale up
      this.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale3d(1.02, 1.02, 1.02)`;
      
      // Move highlight based on mouse position
      const overlay = this.querySelector('.project-overlay');
      if (overlay) {
        overlay.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, transparent 50%)`;
      }
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
      const overlay = this.querySelector('.project-overlay');
      if (overlay) {
        overlay.style.backgroundImage = '';
      }
    });
  });
});

// Enhanced skill boxes animation
document.addEventListener('DOMContentLoaded', function() {
  const skillBoxes = document.querySelectorAll('.skill-box');
  
  skillBoxes.forEach(box => {
    box.addEventListener('mouseenter', function() {
      // Create a glowing effect
      const glow = document.createElement('div');
      glow.className = 'skill-glow';
      glow.style.position = 'absolute';
      glow.style.top = '0';
      glow.style.left = '0';
      glow.style.width = '100%';
      glow.style.height = '100%';
      glow.style.borderRadius = '10px';
      glow.style.boxShadow = '0 0 20px 5px rgba(0, 255, 136, 0.3)';
      glow.style.opacity = '0';
      glow.style.zIndex = '-1';
      glow.style.transition = 'opacity 0.3s ease';
      
      this.appendChild(glow);
      
      // Trigger animation
      setTimeout(() => {
        glow.style.opacity = '1';
      }, 10);
    });
    
    box.addEventListener('mouseleave', function() {
      const glow = this.querySelector('.skill-glow');
      if (glow) {
        glow.style.opacity = '0';
        
        // Remove the element after animation completes
        setTimeout(() => {
          if (glow && glow.parentNode === this) {
            this.removeChild(glow);
          }
        }, 300);
      }
    });
  });
});

// Text effects
document.addEventListener('DOMContentLoaded', function() {
  // Convert some text elements to magical text
  const sectionsHeaders = document.querySelectorAll('.section-header h2');
  sectionsHeaders.forEach(header => {
    // Keep only the span with gradient-text class unchanged
    const gradientText = header.querySelector('.gradient-text');
    if (gradientText) {
      const textContent = header.textContent.replace(gradientText.textContent, '');
      header.innerHTML = '';
      const newSpan = document.createElement('span');
      newSpan.className = 'magical-text';
      newSpan.textContent = textContent;
      header.appendChild(newSpan);
      header.appendChild(gradientText);
    }
  });
  
  // Add flickering effect to some elements
  const footerName = document.querySelector('.footer-name');
  if (footerName) {
    footerName.classList.add('flicker-text');
  }
});

// Interactive timeline points
document.addEventListener('DOMContentLoaded', function() {
  const timelinePoints = document.querySelectorAll('.timeline-point');
  const timelineBar = document.querySelector('.timeline-bar');
  
  if (timelinePoints.length > 0 && timelineBar) {
    // Initial animation
    timelineBar.style.width = '100%';
    
    // Add interaction
    timelinePoints.forEach((point, index) => {
      point.addEventListener('click', function() {
        // Highlight this point
        timelinePoints.forEach(p => p.classList.remove('current'));
        this.classList.add('current');
        
        // Calculate percentage based on position
        const percentage = 100 - (index / (timelinePoints.length - 1)) * 100;
        timelineBar.style.width = `${percentage}%`;
      });
    });
  }
});

// Education section enhancements
document.addEventListener('DOMContentLoaded', function() {
  // View toggle functionality
  const viewBtns = document.querySelectorAll('.view-btn');
  const educationCardsContainer = document.querySelector('.education-cards');
  const educationTimeline = document.querySelector('.education-timeline-view');
  
  if (viewBtns.length > 0 && educationCardsContainer && educationTimeline) {
    viewBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Update active button
        viewBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Show/hide appropriate view
        const view = this.getAttribute('data-view');
        if (view === 'cards') {
          educationCardsContainer.style.display = 'grid';
          educationTimeline.style.display = 'none';
          educationCardsContainer.classList.add('view-active');
        } else if (view === 'timeline') {
          educationCardsContainer.style.display = 'none';
          educationTimeline.style.display = 'block';
          
          // Trigger timeline animation
          setTimeout(() => {
            educationTimeline.classList.add('timeline-animate');
          }, 100);
        }
      });
    });
  }
  
  // Interactive Card Highlighting
  const educationCardElements = document.querySelectorAll('.education-card');
  
  educationCardElements.forEach(card => {
    // Highlight points of interest on hover
    const highlights = card.querySelectorAll('.highlight-item');
    
    highlights.forEach((highlight, index) => {
      highlight.addEventListener('mouseenter', function() {
        // Add hover effect to this highlight
        this.classList.add('highlight-active');
        
        // Create and add glow effect
        const glow = document.createElement('div');
        glow.className = 'highlight-glow';
        glow.style.position = 'absolute';
        glow.style.top = '0';
        glow.style.left = '0';
        glow.style.width = '100%';
        glow.style.height = '100%';
        glow.style.borderRadius = '10px';
        glow.style.boxShadow = '0 0 20px 5px rgba(0, 255, 136, 0.15)';
        glow.style.opacity = '0';
        glow.style.zIndex = '-1';
        glow.style.transition = 'opacity 0.3s ease';
        
        highlight.appendChild(glow);
        
        // Fade in glow
        setTimeout(() => {
          glow.style.opacity = '1';
        }, 10);
        
        // Highlight corresponding icon
        const icon = this.querySelector('.highlight-icon');
        if (icon) {
          icon.style.transform = 'scale(1.2)';
          icon.style.background = 'rgba(0, 255, 136, 0.2)';
        }
      });
      
      highlight.addEventListener('mouseleave', function() {
        // Remove hover effect
        this.classList.remove('highlight-active');
        
        // Remove glow effect
        const glow = this.querySelector('.highlight-glow');
        if (glow) {
          glow.style.opacity = '0';
          setTimeout(() => {
            if (glow.parentNode === this) {
              this.removeChild(glow);
            }
          }, 300);
        }
        
        // Reset icon
        const icon = this.querySelector('.highlight-icon');
        if (icon) {
          icon.style.transform = '';
          icon.style.background = '';
        }
      });
    });
  });
  
  // Animated Tags
  const subjectTags = document.querySelectorAll('.subject-tag');
  
  subjectTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      // Animate tag
      this.style.transform = 'translateY(-5px)';
      
      // Create and add glow
      const glow = document.createElement('div');
      glow.className = 'tag-glow';
      glow.style.position = 'absolute';
      glow.style.top = '0';
      glow.style.left = '0';
      glow.style.width = '100%';
      glow.style.height = '100%';
      glow.style.borderRadius = '20px';
      glow.style.boxShadow = '0 0 10px 2px rgba(0, 255, 136, 0.15)';
      glow.style.opacity = '0';
      glow.style.zIndex = '-1';
      glow.style.transition = 'opacity 0.2s ease';
      
      this.style.position = 'relative';
      this.appendChild(glow);
      
      // Fade in glow
      setTimeout(() => {
        glow.style.opacity = '1';
      }, 10);
    });
    
    tag.addEventListener('mouseleave', function() {
      // Reset animation
      this.style.transform = '';
      
      // Remove glow
      const glow = this.querySelector('.tag-glow');
      if (glow) {
        glow.style.opacity = '0';
        setTimeout(() => {
          if (glow.parentNode === this) {
            this.removeChild(glow);
          }
        }, 200);
      }
    });
  });
  
  // Initialize timeline display
  function initEducationTimeline() {
    const timeline = document.querySelector('.advanced-timeline');
    if (!timeline) return;
    
    // Add interactive hover effects to timeline events
    const events = document.querySelectorAll('.timeline-event');
    
    events.forEach(event => {
      event.addEventListener('mouseenter', function() {
        const dot = this.querySelector('.event-dot');
        if (dot) {
          dot.style.transform = 'scale(1.3)';
        }
        
        const content = this.querySelector('.event-content');
        if (content) {
          content.style.transform = 'translateY(-5px)';
          content.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3), 0 0 10px rgba(0, 255, 136, 0.2)';
          content.style.borderColor = 'rgba(0, 255, 136, 0.3)';
        }
      });
      
      event.addEventListener('mouseleave', function() {
        const dot = this.querySelector('.event-dot');
        if (dot) {
          dot.style.transform = '';
        }
        
        const content = this.querySelector('.event-content');
        if (content) {
          content.style.transform = '';
          content.style.boxShadow = '';
          content.style.borderColor = '';
        }
      });
    });
  }
  
  initEducationTimeline();
}); 
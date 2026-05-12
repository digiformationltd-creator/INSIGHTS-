// ===== PARTICLES ANIMATION =====

const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 40;

  // Initialize particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#1E6FFF' : '#00E5FF'
    });
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Draw connections
      particles.slice(i + 1).forEach(p2 => {
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(30, 111, 255, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(drawParticles);
  }

  drawParticles();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ===== HEADER SCROLL ===== 

const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ===== MOBILE MENU =====

const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

// Close menu when clicking a link
document.querySelectorAll('.mobile-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
  });
});

// ===== SMOOTH SCROLLING & NAVIGATION =====

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    
    if (href === '#') return;

    e.preventDefault();

    const targetId = href.substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      // Hide all sections except the target
      document.querySelectorAll('[id="home"], [id="contact"], [id="about"]').forEach(section => {
        if (section.id === 'home' && targetId === 'home') {
          section.classList.add('active');
        } else if (section.id !== 'home' && section.id === targetId) {
          section.classList.add('active');
        } else if (section.id !== 'home') {
          section.classList.remove('active');
        }
      });

      // For home page sections (smooth scroll within hero)
      if (targetId === 'home') {
        document.querySelectorAll('.contact-section, .about-section').forEach(s => s.classList.remove('active'));
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (targetId === 'contact') {
        document.querySelector('.contact-section').classList.add('active');
        document.querySelector('.about-section').classList.remove('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (targetId === 'about') {
        document.querySelector('.about-section').classList.add('active');
        document.querySelector('.contact-section').classList.remove('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Scroll within home page
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ===== TYPEWRITER EFFECT =====

function typewriterEffect(element, text, speed = 50, startDelay = 0) {
  if (!element) return;

  setTimeout(() => {
    element.textContent = '';
    let index = 0;

    function type() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    }

    type();
  }, startDelay);
}

// Apply typewriter to subtext after page load
window.addEventListener('load', () => {
  const subtext = document.querySelector('.hero-subtext');
  if (subtext) {
    const originalText = subtext.textContent;
    typewriterEffect(subtext, originalText, 30, 1200);
  }
});

// ===== COUNTER ANIMATION =====

function animateCounters() {
  const counters = document.querySelectorAll('.counter');

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-value'));
    const isDecimal = counter.getAttribute('data-value').includes('.');
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && current === 0) {
        const startTime = Date.now();

        function updateCounter() {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          current = Math.floor(progress * target * 10) / 10;

          if (isDecimal) {
            counter.textContent = current.toFixed(1);
          } else {
            counter.textContent = Math.floor(current);
          }

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          }
        }

        updateCounter();
      }
    }, { threshold: 0.5 });

    observer.observe(counter);
  });
}

// Call when page is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', animateCounters);
} else {
  animateCounters();
}

// ===== SCROLL REVEAL - GLASS CARDS =====

function revealOnScroll() {
  const cards = document.querySelectorAll('.glass-card, .service-card, .sample-card, .testimonial-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.animation = 'slideUp 0.6s ease forwards';
        }, index * 50);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', revealOnScroll);
} else {
  revealOnScroll();
}

// ===== STEP LINE REVEAL =====

function revealStepLines() {
  const stepLines = document.querySelectorAll('.step-line');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.3 });

  stepLines.forEach(line => {
    observer.observe(line);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', revealStepLines);
} else {
  revealStepLines();
}

// ===== FORM HANDLING =====

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name').value,
      company: document.getElementById('company').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      service: document.getElementById('service').value,
      message: document.getElementById('message').value
    };

    console.log('Form submitted:', formData);

    // Show success message
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #1E6FFF, #00E5FF);
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      z-index: 1000;
      animation: slideUp 0.6s ease forwards;
    `;
    successMsg.textContent = '✓ Thank you! We\'ll be in touch within 4 hours.';
    document.body.appendChild(successMsg);

    // Reset form
    contactForm.reset();

    // Remove message after 5 seconds
    setTimeout(() => {
      successMsg.style.animation = 'fadeOut 0.6s ease forwards';
      setTimeout(() => successMsg.remove(), 600);
    }, 5000);
  });
}

// ===== ANNOUNCEMENT BAR ROTATION =====

const messages = [
  "📊 Free Analytics Sample — See What Your Data Is Really Telling You",
  "⚡ 48-Hour Sample Delivery — Request Yours Today",
  "🤖 AI-Powered Insights For UK Businesses — No Commitment Needed"
];

let messageIndex = 0;
const announcementMessage = document.querySelector('.announcement-message');

if (announcementMessage) {
  setInterval(() => {
    announcementMessage.style.animation = 'slideUp 0.5s ease forwards';
    
    setTimeout(() => {
      messageIndex = (messageIndex + 1) % messages.length;
      announcementMessage.textContent = messages[messageIndex];
      announcementMessage.style.animation = 'slideUp 0.5s ease forwards';
    }, 500);
  }, 4000);
}

// ===== MARQUEE DUPLICATION FOR SMOOTH LOOP =====

const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  const items = marqueeTrack.querySelectorAll('.marquee-item');
  const clone = marqueeTrack.cloneNode(true);
  marqueeTrack.parentNode.appendChild(clone.querySelector('.marquee-track') || clone);

  // Duplicate items for seamless loop
  items.forEach(item => {
    const duplicate = item.cloneNode(true);
    marqueeTrack.appendChild(duplicate);
  });
}

// ===== SMOOTH FADE IN ON PAGE LOAD =====

window.addEventListener('load', () => {
  document.body.style.animation = 'fadeIn 0.8s ease forwards';
});

// ===== TOUCH FRIENDLY HOVER STATES =====

if (window.matchMedia('(pointer: coarse)').matches) {
  document.querySelectorAll('.btn, .glass-card, .tool-chip').forEach(element => {
    element.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.98)';
    });
    element.addEventListener('touchend', function() {
      this.style.transform = '';
    });
  });
}

// ===== KEYBOARD NAVIGATION =====

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    mobileNav.classList.remove('open');
  }
});

// ===== SCROLL TO TOP BUTTON (optional) =====

let scrollTopBtn = document.querySelector('.scroll-to-top');
if (!scrollTopBtn) {
  scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'scroll-to-top';
  scrollTopBtn.innerHTML = '↑';
  scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, #1E6FFF, #00E5FF);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 99;
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  document.body.appendChild(scrollTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.style.opacity = '1';
      scrollTopBtn.style.pointerEvents = 'auto';
    } else {
      scrollTopBtn.style.opacity = '0';
      scrollTopBtn.style.pointerEvents = 'none';
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== PREVENT FORM SUBMISSION ON ENTER IN SPECIFIC FIELDS =====

document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]').forEach(input => {
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const form = input.closest('form');
      if (form) form.dispatchEvent(new Event('submit'));
    }
  });
});

console.log('✓ All animations and interactions loaded successfully!');

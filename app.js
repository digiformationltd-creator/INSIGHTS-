// ROUTING
const routes = ['home','services','data-analytics','ml-models','bi-dashboards','predictive-analytics','consulting','samples','about','contact','faq','privacy'];
const pageShells = document.querySelectorAll('.page-shell');
const navLinks = document.querySelectorAll('[data-route]');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const menuClose = document.getElementById('menuClose');
const header = document.getElementById('siteHeader');
const dropdownToggle = document.querySelector('.dropdown-toggle');
const dropdownItem = document.querySelector('.nav-item-dropdown');

function setActiveRoute(route) {
  const normalized = route && routes.includes(route) ? route : 'home';
  pageShells.forEach(shell => {
    shell.classList.toggle('active', shell.dataset.route === normalized);
  });
  navLinks.forEach(link => {
    const target = link.dataset.route || link.getAttribute('href').replace('#','');
    link.classList.toggle('active', target === normalized);
  });
  const bottomItems = document.querySelectorAll('.bn-item');
  bottomItems.forEach(item => {
    item.classList.toggle('active', item.dataset.route === normalized);
  });
  window.scrollTo(0, 0);
}

function navigateFromHash() {
  const hash = window.location.hash.replace('#','');
  setActiveRoute(hash);
}

function openMobileMenu() {
  mobileMenu.classList.add('open');
  hamburger.classList.add('active');
  document.body.style.overflow = 'hidden';
  mobileMenu.setAttribute('aria-hidden', 'false');
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('active');
  document.body.style.overflow = '';
  mobileMenu.setAttribute('aria-hidden', 'true');
}

function handleScroll() {
  const scrollY = window.scrollY;
  header.classList.toggle('scrolled', scrollY > 20);
}

function toggleDropdown(event) {
  event.stopPropagation();
  const expanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
  dropdownToggle.setAttribute('aria-expanded', String(!expanded));
  dropdownItem.classList.toggle('is-open', !expanded);
}

function closeDropdown() {
  dropdownToggle.setAttribute('aria-expanded', 'false');
  dropdownItem.classList.remove('is-open');
}

window.addEventListener('hashchange', navigateFromHash);
window.addEventListener('load', navigateFromHash);
window.addEventListener('scroll', handleScroll);

hamburger.addEventListener('click', openMobileMenu);
menuClose.addEventListener('click', closeMobileMenu);
mobileMenu.querySelectorAll('.mobile-nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    closeMobileMenu();
  });
});

if (dropdownToggle) {
  dropdownToggle.addEventListener('click', toggleDropdown);
}

window.addEventListener('click', event => {
  if (dropdownItem && !dropdownItem.contains(event.target) && event.target !== dropdownToggle) {
    closeDropdown();
  }
});

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    const targetRoute = link.dataset.route || link.getAttribute('href').replace('#','');
    if (routes.includes(targetRoute)) {
      event.preventDefault();
      window.location.hash = targetRoute;
      closeMobileMenu();
      closeDropdown();
    }
  });
});

// BOTTOM NAV
const bnItems = document.querySelectorAll('.bn-item');
bnItems.forEach(item => {
  item.addEventListener('click', () => {
    bnItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
  });
});

// FAQ ACCORDION
const faqItems = document.querySelectorAll('.faq-item');
const faqQuestions = document.querySelectorAll('.faq-question, .faq-toggle');

faqQuestions.forEach(question => {
  question.addEventListener('click', function() {
    const faqItem = this.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all other items
    faqItems.forEach(item => {
      if (item !== faqItem) {
        item.classList.remove('active');
      }
    });
    
    // Toggle current item
    faqItem.classList.toggle('active', !isActive);
  });
});

// FILTER TABS
const filterTabs = document.querySelectorAll('.filter-tab');
const filterTabsContainer = document.querySelector('.faq-filters');

filterTabs.forEach(tab => {
  tab.addEventListener('click', function() {
    const category = this.dataset.category || this.getAttribute('data-filter');
    
    // Update active tab
    document.querySelectorAll('.filter-tab').forEach(t => {
      t.classList.remove('active');
    });
    this.classList.add('active');
    
    // Filter items
    if (document.querySelectorAll('.faq-item').length > 0) {
      // FAQ page
      const faqItems = document.querySelectorAll('.faq-item');
      faqItems.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
          item.classList.add('show');
        } else {
          item.classList.remove('show');
        }
      });
    } else if (document.querySelectorAll('.sample-showcase').length > 0) {
      // Samples page
      const samples = document.querySelectorAll('.sample-showcase');
      samples.forEach(sample => {
        if (category === 'all' || sample.classList.contains(category)) {
          sample.classList.add('show');
        } else {
          sample.classList.remove('show');
        }
      });
    }
  });
});

// Initialize filter tabs - show all on load
window.addEventListener('load', () => {
  const activeTab = document.querySelector('.filter-tab.active');
  if (activeTab) {
    activeTab.click();
  }
});

// CONTACT FORM
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Log form data (in production, send to server)
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your enquiry! We\'ll be in touch within 4 business hours.');
    this.reset();
  });
}

// SAMPLE REQUEST FORM
const sampleForms = document.querySelectorAll('.sample-form');
sampleForms.forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    console.log('Sample request:', data);
    alert('Thank you! We\'ll prepare your sample and contact you within 48 hours.');
    this.reset();
  });
});

// PARTICLES CANVAS
function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth * window.devicePixelRatio;
  canvas.height = canvas.offsetHeight * window.devicePixelRatio;
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  
  const particles = [];
  const particleCount = window.innerWidth < 768 ? 20 : 40;
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.offsetWidth;
      this.y = Math.random() * canvas.offsetHeight;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.radius = Math.random() * 1.5 + 0.5;
      this.color = Math.random() > 0.5 ? 'rgba(30,111,255,0.4)' : 'rgba(0,229,255,0.4)';
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < 0 || this.x > canvas.offsetWidth) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.offsetHeight) this.vy *= -1;
    }
    
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          ctx.strokeStyle = `rgba(0,229,255,${0.1 * (1 - distance / 150)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

// Initialize on home page load
if (document.getElementById('particlesCanvas')) {
  window.addEventListener('load', initParticles);
}

// COUNTER ANIMATION
function animateCounters() {
  const counters = document.querySelectorAll('.count');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    let current = 0;
    const increment = target / 30;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 30);
  });
}

// SAMPLE SHOWCASE DEFAULT DISPLAY
function initSampleShowcase() {
  const showcases = document.querySelectorAll('.sample-showcase');
  showcases.forEach(showcase => {
    if (showcase.classList.contains('all')) {
      showcase.classList.add('show');
    }
  });
}

window.addEventListener('load', () => {
  initSampleShowcase();
});

// HERO TITLE ANIMATION
function animateHeroTitle() {
  const titleLines = document.querySelectorAll('.hero-title-line:not(.hero-title-gradient)');
  titleLines.forEach(line => {
    const words = line.querySelectorAll('span');
    words.forEach((word, index) => {
      word.style.display = 'inline-block';
      word.style.animation = `slideUp 0.6s ease ${0.3 + index * 0.12}s both`;
    });
  });
  
  const gradientLine = document.querySelector('.hero-title-gradient');
  if (gradientLine) {
    gradientLine.style.animation = 'scaleIn 0.8s ease 0.7s both';
  }
}

// Add keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes slideUp {
    from { 
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.8);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
document.head.appendChild(style);

window.addEventListener('load', animateHeroTitle);

// LOGO ANIMATION
function animateLogos() {
  const logos = document.querySelectorAll('.logo-mark');
  logos.forEach(logo => {
    const paths = logo.querySelectorAll('path');
    paths.forEach(path => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      path.style.animation = `drawStroke 1.5s ease forwards`;
    });
  });
}

window.addEventListener('load', animateLogos);

// INTERSECTION OBSERVER FOR LAZY ANIMATIONS
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.glass-card, .testimonial-card, .service-detail-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// TESTIMONIAL CAROUSEL (optional)
function initTestimonials() {
  const testimonials = document.querySelectorAll('.testimonial-card');
  if (testimonials.length === 0) return;
  
  // Rotate testimonials on click
  testimonials.forEach((card, index) => {
    card.addEventListener('click', function() {
      testimonials.forEach(c => c.style.opacity = '0.5');
      this.style.opacity = '1';
    });
  });
}

window.addEventListener('load', initTestimonials);

// ACTIVE NAV LINK HIGHLIGHTING
function updateActiveNavLink() {
  const currentRoute = window.location.hash.replace('#', '') || 'home';
  navLinks.forEach(link => {
    const linkRoute = link.dataset.route || link.getAttribute('href').replace('#', '');
    if (linkRoute === currentRoute) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

window.addEventListener('hashchange', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// SMOOTH SCROLL FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// ============== ENHANCED HEADING ANIMATIONS ==============
function animateHeadings() {
  const headings = document.querySelectorAll('h1, h2, h3, h4');
  headings.forEach((heading, index) => {
    // Skip already animated hero titles
    if (heading.classList.contains('hero-title')) return;
    
    // Apply staggered animation
    const delay = 0.1 + (index % 8) * 0.08;
    heading.style.animation = `slideUp 0.7s ease-out ${delay}s both`;
    heading.style.transformOrigin = 'left';
  });
}

// ============== LETTER-BY-LETTER HEADING ANIMATION ==============
function animateHeadingLetters() {
  const headings = document.querySelectorAll('h2');
  headings.forEach(heading => {
    // Skip if already has special classes
    if (heading.classList.contains('hero-title')) return;
    
    const text = heading.textContent;
    heading.textContent = '';
    heading.style.display = 'inline-block';
    
    [...text].forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.className = 'char-animate';
      span.style.animationDelay = `${i * 0.03}s`;
      heading.appendChild(span);
    });
  });
}

// ============== ANIMATED DASHBOARD CARDS ==============
function animateDashboardCards() {
  const dashboardCards = document.querySelectorAll('.dashboard-card');
  dashboardCards.forEach((card, index) => {
    card.classList.add('dashboard-card-enhanced');
    
    // Animate chart bars
    const bars = card.querySelectorAll('.chart-bar');
    bars.forEach((bar, barIndex) => {
      bar.style.animation = `slideUp 0.6s ease-out ${0.3 + barIndex * 0.08}s both`;
      bar.style.opacity = '0';
    });
    
    // Animate metric chips
    const chips = card.querySelectorAll('.metric-chip');
    chips.forEach((chip, chipIndex) => {
      chip.style.animation = `fadeInScale 0.6s ease-out ${0.6 + chipIndex * 0.1}s both`;
      chip.style.opacity = '0';
    });
  });
}

// ============== STAGGERED SERVICE CARDS ==============
function animateServiceCards() {
  const serviceCards = document.querySelectorAll('.glass-card, .service-card, .service-detail-card');
  serviceCards.forEach((card, index) => {
    const delay = (index % 4) * 0.12;
    card.style.animation = `slideUp 0.7s ease-out ${delay}s both`;
    card.style.opacity = '0';
  });
}

// ============== STAT CARDS ANIMATION WITH STAGGER ==============
function animateStatCards() {
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach((card, index) => {
    const delay = 0.3 + (index * 0.1);
    card.style.animation = `elasticBounce 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s both`;
    card.style.opacity = '0';
  });
}

// ============== SCROLL-TRIGGERED ANIMATIONS ==============
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate headings on scroll
        if (entry.target.tagName.match(/h[1-4]/i)) {
          entry.target.style.animation = `slideUp 0.7s ease-out both`;
        }
        
        // Animate cards on scroll
        if (entry.target.classList.contains('glass-card') || 
            entry.target.classList.contains('service-detail-card') ||
            entry.target.classList.contains('testimonial-card')) {
          entry.target.style.animation = `slideUp 0.7s ease-out both`;
          entry.target.style.opacity = '1';
        }
        
        // Animate pricing cards with glow
        if (entry.target.classList.contains('pricing-card')) {
          entry.target.style.animation = `glowPulse 2s ease-in-out infinite`;
        }
        
        scrollObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe all elements that should animate on scroll
  document.querySelectorAll(
    'h2, h3, .glass-card, .service-detail-card, .testimonial-card, .pricing-card, .faq-item'
  ).forEach(el => {
    el.style.transition = 'all 0.6s ease';
    scrollObserver.observe(el);
  });
}

// ============== BUTTON HOVER ANIMATIONS ==============
function enhanceButtonAnimations() {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.animation = 'pulse 0.6s ease-in-out';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.animation = 'none';
    });
  });
}

// ============== ACCORDION ANIMATIONS ==============
function animateAccordionItems() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item, index) => {
    item.style.animation = `slideUp 0.6s ease-out ${0.2 + index * 0.06}s both`;
    item.style.opacity = '0';
  });
}

// ============== FORM VALIDATION
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^[\d\s\-\+\(\)]+$/.test(phone) && phone.length >= 10;
}

document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    const emailInput = this.querySelector('input[type="email"]');
    const phoneInput = this.querySelector('input[type="tel"]');
    
    if (emailInput && !validateEmail(emailInput.value)) {
      e.preventDefault();
      alert('Please enter a valid email address');
      return;
    }
    
    if (phoneInput && phoneInput.value && !validatePhone(phoneInput.value)) {
      e.preventDefault();
      alert('Please enter a valid phone number');
      return;
    }
  });
});

// HIDE FAQ DEFAULT
function hideAllFaqItems() {
  document.querySelectorAll('.faq-item').forEach(item => {
    item.classList.remove('show');
  });
  
  // Show all items by default (they have 'all' class)
  document.querySelectorAll('.faq-item.all').forEach(item => {
    item.classList.add('show');
  });
}

window.addEventListener('load', hideAllFaqItems);

// ============== INITIALIZE ALL ENHANCED ANIMATIONS ==============
window.addEventListener('load', () => {
  // Delay animations slightly for better visual impact
  setTimeout(() => {
    animateHeadings();
    animateHeadingLetters();
    animateDashboardCards();
    animateServiceCards();
    animateStatCards();
    animateAccordionItems();
    initScrollAnimations();
    enhanceButtonAnimations();
  }, 100);
});

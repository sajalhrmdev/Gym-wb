/* ============================================================
   IRONFORGE GYM — Animations JavaScript
   ============================================================
   TABLE OF CONTENTS:
   1. Custom Cursor
   2. Mouse Glow Effect
   3. Scroll Reveal (Intersection Observer)
   4. Animated Counters
   5. Progress Bar Animation
   6. Hero Particles
   7. Parallax Effect
   8. Text Split Animation
   9. Page Transition
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ======================== 1. CUSTOM CURSOR ========================
  const cursor = document.getElementById('cursor');
  const cursorFollower = document.getElementById('cursorFollower');

  if (window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      cursorFollower.style.left = followerX + 'px';
      cursorFollower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    };
    animateFollower();

    // Cursor hover effect on interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, .btn, .whyus__card, .program-card, .trainer-card, .pricing__card, .gallery__item'
    );

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        cursorFollower.classList.add('active');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
      });
    });
  }

  // ======================== 2. MOUSE GLOW EFFECT ========================
  const mouseGlow = document.getElementById('mouseGlow');

  if (mouseGlow && window.innerWidth > 768) {
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      glowX += (e.clientX - glowX) * 0.05;
      glowY += (e.clientY - glowY) * 0.05;
      mouseGlow.style.left = glowX + 'px';
      mouseGlow.style.top = glowY + 'px';
    });
  }

  // ======================== 3. SCROLL REVEAL ========================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // Text reveal
  const textRevealElements = document.querySelectorAll('.reveal-text');

  const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        textObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });

  textRevealElements.forEach(el => textObserver.observe(el));

  // ======================== 4. ANIMATED COUNTERS ========================
  const counterNumbers = document.querySelectorAll('.hero__trust-number, .stats__number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseInt(target.dataset.target || target.dataset.count || target.textContent.replace(/[^0-9]/g, ''));
        const duration = 2000;
        const startTime = performance.now();
        const startValue = 0;

        const updateCounter = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOut);

          target.textContent = currentValue.toLocaleString();

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            target.textContent = targetValue.toLocaleString();
            target.classList.add('count-pop');
            setTimeout(() => target.classList.remove('count-pop'), 300);
          }
        };

        requestAnimationFrame(updateCounter);
        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counterNumbers.forEach(el => counterObserver.observe(el));

  // ======================== 5. PROGRESS BAR ANIMATION ========================
  const progressBars = document.querySelectorAll('.program-card__progress');

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressFill = entry.target.querySelector('.program-card__progress-fill');
        const width = progressFill.style.width || '0%';
        progressFill.style.width = '0%';
        setTimeout(() => {
          progressFill.style.width = width;
        }, 200);
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  progressBars.forEach(el => progressObserver.observe(el));

  // ======================== 6. HERO PARTICLES ========================
  const heroParticles = document.getElementById('heroParticles');

  if (heroParticles) {
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 80);

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 10 + 10;

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 107, 0, ${Math.random() * 0.4 + 0.1});
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        animation: particleFloat ${duration}s ease-in-out ${delay}s infinite;
        pointer-events: none;
      `;

      heroParticles.appendChild(particle);
    }

    // Particle keyframes injected via JS
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes particleFloat {
        0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
        25% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1.2); opacity: 0.8; }
        50% { transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) scale(0.8); opacity: 0.5; }
        75% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1.1); opacity: 0.7; }
      }
    `;
    document.head.appendChild(styleSheet);
  }

  // ======================== 7. PARALLAX EFFECT ========================
  const parallaxElements = document.querySelectorAll('.about__visual, .hero__content, .stats__item');

  const handleParallax = () => {
    if (window.innerWidth < 768) return;

    parallaxElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const center = window.innerHeight / 2;
      const offset = (rect.top + rect.height / 2 - center) / center;
      const speed = parseFloat(el.dataset.speed || 0.05);
      el.style.transform = `translateY(${offset * speed * 30}px)`;
    });
  };

  let parallaxRaf;
  window.addEventListener('scroll', () => {
    if (parallaxRaf) cancelAnimationFrame(parallaxRaf);
    parallaxRaf = requestAnimationFrame(handleParallax);
  }, { passive: true });

  // ======================== 8. TEXT SPLIT ANIMATION ========================
  const splitTargets = document.querySelectorAll('.hero__title-line--accent');

  splitTargets.forEach(target => {
    const text = target.textContent;
    target.textContent = '';
    const chars = text.split('');

    chars.forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.animation = `letterReveal 0.6s cubic-bezier(0.77, 0, 0.18, 1) ${0.6 + i * 0.04}s both`;
      target.appendChild(span);
    });
  });

  // ======================== 9. PAGE TRANSITION ========================
  const transitionOverlay = document.createElement('div');
  transitionOverlay.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: var(--clr-bg);
    transform: translateY(-100%);
    transition: transform 0.6s cubic-bezier(0.77, 0, 0.18, 1);
    pointer-events: none;
  `;
  document.body.appendChild(transitionOverlay);

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target && window.innerWidth > 768) {
        // Subtle transition effect
      }
    });
  });

  // ======================== WINDOW RESIZE HANDLER ========================
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth <= 768) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
        mouseGlow.style.display = 'none';
      } else {
        cursor.style.display = 'block';
        cursorFollower.style.display = 'block';
        mouseGlow.style.display = 'block';
      }
    }, 250);
  });

});

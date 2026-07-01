/* ============================================================
   IRONFORGE GYM — Main JavaScript
   ============================================================
    TABLE OF CONTENTS:
   1. Navbar (Scroll, Hamburger)
   2. Programs Tabs
   3. Pricing Toggle (Monthly/Yearly)
   4. Pricing Card Mouse Tracking
   5. Gallery Filter
   6. Testimonials Slider
   7. FAQ Accordion
   8. BMI Calculator
   9. Contact Form Validation
   10. Newsletter Form
   11. Back to Top Button
   12. Smooth Scroll
   13. Magnetic Buttons
   14. Image Zoom Effect
   15. Section 3D Tilt
   16. Video Modal
   17. Hero Slider
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ======================== 1. NAVBAR ========================
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navbarNav = document.getElementById('navbarNav');
  const navLinks = document.querySelectorAll('.navbar__link');

  const handleScroll = () => {
    const heroHeight = document.getElementById('hero').offsetHeight;
    if (window.scrollY > heroHeight * 0.3) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbarNav.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', navbarNav.classList.contains('active'));
    document.body.style.overflow = navbarNav.classList.contains('active') ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navbarNav.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ======================== 2. PROGRAMS TABS ========================
  const tabs = document.querySelectorAll('.programs__tab');
  const panels = document.querySelectorAll('.programs__panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      panels.forEach(p => p.classList.remove('active'));
      const targetPanel = document.getElementById(tab.dataset.tab);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // ======================== 3. PRICING TOGGLE ========================
  const pricingToggle = document.getElementById('pricingToggle');
  const labels = document.querySelectorAll('.pricing__toggle-label');
  const amounts = document.querySelectorAll('.pricing__amount');
  const periods = document.querySelectorAll('.pricing__period');

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const updatePricing = (isYearly) => {
    labels.forEach(label => {
      label.classList.toggle('active', label.dataset.period === (isYearly ? 'yearly' : 'monthly'));
    });

    amounts.forEach(amount => {
      const value = isYearly ? amount.dataset.yearly : amount.dataset.monthly;
      amount.textContent = formatNumber(parseInt(value));
    });

    periods.forEach(period => {
      period.textContent = isYearly ? '/yr' : '/mo';
    });
  };

  pricingToggle.addEventListener('change', () => {
    updatePricing(pricingToggle.checked);
  });

  // ======================== 4. PRICING CARD MOUSE TRACKING ========================
  const pricingCards = document.querySelectorAll('.pricing__card');

  pricingCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ======================== 5. GALLERY FILTER ========================
  const filterBtns = document.querySelectorAll('.gallery__filter');
  const galleryItems = document.querySelectorAll('.gallery__item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ======================== 6. TESTIMONIALS SLIDER ========================
  const track = document.getElementById('testimonialsTrack');
  const slides = track.querySelectorAll('.testimonial-card');
  const prevBtn = document.getElementById('testPrev');
  const nextBtn = document.getElementById('testNext');
  const dotsContainer = document.getElementById('testDots');
  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoSlideInterval;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.classList.add('testimonials__dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.testimonials__dot');

  const goToSlide = (index) => {
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[currentSlide].classList.add('active');
  };

  const nextSlide = () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
  };

  const prevSlide = () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
  };

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
  });

  const startAutoSlide = () => {
    autoSlideInterval = setInterval(nextSlide, 4000);
  };

  const resetAutoSlide = () => {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  };

  startAutoSlide();

  // Touch support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
      resetAutoSlide();
    }
  }, { passive: true });

  // ======================== 7. FAQ ACCORDION ========================
  const faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) item.classList.add('active');
      question.setAttribute('aria-expanded', !isActive);
    });
  });

  // ======================== 8. BMI CALCULATOR ========================
  const bmiBtn = document.getElementById('bmiBtn');
  const bmiValue = document.getElementById('bmiValue');
  const bmiCategory = document.getElementById('bmiCategory');
  const bmiScaleFill = document.getElementById('bmiScaleFill');
  const bmiHeight = document.getElementById('bmiHeight');
  const bmiWeight = document.getElementById('bmiWeight');
  const bmiAge = document.getElementById('bmiAge');

  const calculateBMI = () => {
    const height = parseFloat(bmiHeight.value) / 100;
    const weight = parseFloat(bmiWeight.value);

    if (!height || !weight || height <= 0 || weight <= 0) {
      bmiValue.textContent = '--';
      bmiCategory.textContent = 'Enter valid height & weight';
      bmiScaleFill.style.width = '0%';
      return;
    }

    const bmi = weight / (height * height);
    bmiValue.textContent = bmi.toFixed(1);

    let category, scalePercent, color;
    if (bmi < 18.5) {
      category = 'Underweight — Let\'s build you up!';
      scalePercent = (bmi / 40) * 100;
      color = '#3b82f6';
    } else if (bmi < 25) {
      category = 'Normal — Great shape!';
      scalePercent = (bmi / 40) * 100;
      color = '#22c55e';
    } else if (bmi < 30) {
      category = 'Overweight — Time to transform!';
      scalePercent = (bmi / 40) * 100;
      color = '#f59e0b';
    } else {
      category = 'Obese — Let\'s start your journey!';
      scalePercent = Math.min((bmi / 40) * 100, 100);
      color = '#ef4444';
    }

    bmiCategory.textContent = category;
    bmiScaleFill.style.width = Math.min(scalePercent, 100) + '%';
    bmiScaleFill.style.background = `linear-gradient(90deg, ${color}, var(--clr-accent-2))`;
  };

  bmiBtn.addEventListener('click', calculateBMI);
  [bmiHeight, bmiWeight].forEach(input => {
    input.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') calculateBMI();
    });
  });

  // ======================== 9. CONTACT FORM VALIDATION ========================
  const contactForm = document.getElementById('contactForm');

  const showError = (id) => {
    const error = document.getElementById(id);
    if (error) error.classList.add('visible');
  };

  const hideError = (id) => {
    const error = document.getElementById(id);
    if (error) error.classList.remove('visible');
  };

  const validateForm = (e) => {
    e.preventDefault();
    let isValid = true;

    const name = document.getElementById('formName');
    const phone = document.getElementById('formPhone');
    const email = document.getElementById('formEmail');
    const message = document.getElementById('formMessage');

    // Name
    if (!name.value.trim()) {
      showError('nameError');
      name.classList.add('error');
      isValid = false;
    } else {
      hideError('nameError');
      name.classList.remove('error');
    }

    // Phone
    const phoneRegex = /^[+]?[\d\s()-]{10,15}$/;
    if (!phone.value.trim() || !phoneRegex.test(phone.value.trim())) {
      showError('phoneError');
      phone.classList.add('error');
      isValid = false;
    } else {
      hideError('phoneError');
      phone.classList.remove('error');
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
      showError('emailError');
      email.classList.add('error');
      isValid = false;
    } else {
      hideError('emailError');
      email.classList.remove('error');
    }

    // Message
    if (!message.value.trim()) {
      showError('messageError');
      message.classList.add('error');
      isValid = false;
    } else {
      hideError('messageError');
      message.classList.remove('error');
    }

    if (isValid) {
      const submitBtn = contactForm.querySelector('.contact__submit');
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      const text = [
        'Hi IronForge! 👋',
        '',
        '*New Enquiry*',
        '',
        `*Name:* ${name.value.trim()}`,
        `*Phone:* ${phone.value.trim()}`,
        `*Email:* ${email.value.trim()}`,
        `*Message:* ${message.value.trim()}`
      ].join('\n');
      window.open(`https://wa.me/918001454303?text=${encodeURIComponent(text)}`, '_blank');

      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        contactForm.reset();
        alert('Thank you! We\'ll get back to you shortly. 💪');
      }, 1500);
    }
  };

  contactForm.addEventListener('submit', validateForm);

  // Real-time validation clearing
  contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const errorId = input.id.replace('form', '').toLowerCase() + 'Error';
      hideError(errorId);
    });
  });

  // ======================== 10. NEWSLETTER FORM ========================
  const newsletterForm = document.getElementById('newsletterForm');
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    if (input.value.trim()) {
      alert('Subscribed! Welcome to the IronForge family. 💪');
      newsletterForm.reset();
    }
  });

  // ======================== 11. BACK TO TOP ========================
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ======================== 12. SMOOTH SCROLL ========================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ======================== 13. MAGNETIC BUTTONS ========================
  const magneticBtns = document.querySelectorAll('.btn--primary, .btn--outline');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 768) return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ======================== 14. IMAGE ZOOM EFFECT ========================
  const galleryImages = document.querySelectorAll('.gallery__item-image');
  galleryImages.forEach(img => {
    img.addEventListener('mousemove', (e) => {
      const rect = img.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    });
  });

  // ======================== 15. SECTION 3D TILT ========================
  const tiltCards = document.querySelectorAll('.whyus__card, .trainer-card, .program-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 768) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;
      card.style.transform =
        `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ======================== 16. VIDEO MODAL ========================
  const playBtn = document.getElementById('playVideoBtn');
  const videoModal = document.getElementById('videoModal');
  const videoOverlay = document.getElementById('videoModalOverlay');
  const videoClose = document.getElementById('videoModalClose');
  const videoIframe = document.getElementById('videoIframe');
  const videoSrc = 'https://www.youtube.com/embed/Z63w5PefxTQ?autoplay=1&rel=0&showinfo=0';

  const openModal = () => {
    videoModal.classList.add('active');
    videoIframe.src = videoSrc;
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    videoModal.classList.remove('active');
    videoIframe.src = '';
    document.body.style.overflow = '';
  };

  // ======================== 17. HERO SLIDER ========================
  const heroSlides = document.querySelectorAll('.hero__slide');
  let heroCurrentSlide = 0;
  let heroSlideInterval;

  const showHeroSlide = (index) => {
    heroSlides.forEach(s => {
      s.classList.remove('hero__slide--active', 'zooming');
    });
    heroSlides[index].classList.add('hero__slide--active');
    setTimeout(() => heroSlides[index].classList.add('zooming'), 100);
  };

  const nextHeroSlide = () => {
    heroCurrentSlide = (heroCurrentSlide + 1) % heroSlides.length;
    showHeroSlide(heroCurrentSlide);
  };

  const startHeroSlider = () => {
    heroSlideInterval = setInterval(nextHeroSlide, 5000);
  };

  if (heroSlides.length > 1) {
    heroSlides[0].classList.add('hero__slide--active');
    setTimeout(() => heroSlides[0].classList.add('zooming'), 200);
    startHeroSlider();
  }

  playBtn.addEventListener('click', openModal);
  videoOverlay.addEventListener('click', closeModal);
  videoClose.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
      closeModal();
    }
  });

});
/**
 * ============================================================================
 * JAY SAMBHU — PERSONAL PORTFOLIO SCRIPTS
 * Pure Vanilla JavaScript (No Frameworks, No Dependencies)
 * Handles Theme Toggling, Smooth Scroll, Typing Effect, Count-Up Stats,
 * IntersectionObserver Reveals, and Interactive Form Handling.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. THEME SWITCHER (LIGHT / DARK MODE)
     -------------------------------------------------------------------------- */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Determine initial theme: saved preference -> system preference -> fallback to dark
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      return savedTheme;
    }
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    return prefersLight ? 'light' : 'dark';
  };

  const setTheme = (theme) => {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  };

  // Initialize theme
  setTheme(getInitialTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  // React to OS-level theme change if user hasn't explicitly set one
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      if (!localStorage.getItem('portfolio-theme')) {
        setTheme(e.matches ? 'light' : 'dark');
      }
    });
  }

  /* --------------------------------------------------------------------------
     2. SCROLL PROGRESS BAR & ACTIVE NAV LINK SYNC
     -------------------------------------------------------------------------- */
  const scrollProgress = document.getElementById('scroll-progress');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  let isTicking = false;

  const onScroll = () => {
    // 1. Update Scroll Progress Bar
    const winScroll = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;

    if (scrollProgress) {
      scrollProgress.style.width = `${Math.min(scrolled, 100)}%`;
    }

    // 2. Active Nav Link on Scroll
    const scrollPos = winScroll + 150;
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active-link');
          } else {
            link.classList.remove('active-link');
          }
        });
      }
    });

    isTicking = false;
  };

  window.addEventListener('scroll', () => {
    if (!isTicking) {
      window.requestAnimationFrame(onScroll);
      isTicking = true;
    }
  }, { passive: true });

  /* --------------------------------------------------------------------------
     3. MOBILE NAVIGATION MENU (HAMBURGER TOGGLE)
     -------------------------------------------------------------------------- */
  const navToggleBtn = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggleBtn && navMenu) {
    const toggleMenu = (open) => {
      const isOpen = typeof open === 'boolean' ? open : !navMenu.classList.contains('open');
      navMenu.classList.toggle('open', isOpen);
      navToggleBtn.setAttribute('aria-expanded', String(isOpen));
    };

    navToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // Close menu on click outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !navToggleBtn.contains(e.target)) {
        toggleMenu(false);
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        toggleMenu(false);
        navToggleBtn.focus();
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. HERO TYPING EFFECT
     -------------------------------------------------------------------------- */
  const typingElement = document.getElementById('typing-text');
  const roles = [
    'Web Developer',
    'Creative Designer',
    'Video Creator',
    'Problem Solver'
  ];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typingElement) {
    if (prefersReducedMotion) {
      typingElement.textContent = roles[0];
    } else {
      let roleIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      const typeSpeed = 90;
      const deleteSpeed = 45;
      const holdTime = 1800;

      const typeLoop = () => {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
          charIndex--;
          typingElement.textContent = currentRole.substring(0, charIndex);
        } else {
          charIndex++;
          typingElement.textContent = currentRole.substring(0, charIndex);
        }

        let delay = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
          delay = holdTime;
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          delay = 350;
        }

        setTimeout(typeLoop, delay);
      };

      typeLoop();
    }
  }

  /* --------------------------------------------------------------------------
     5. SCROLL-REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('active'));
    } else {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      });

      revealElements.forEach((el) => revealObserver.observe(el));
    }
  }

  /* --------------------------------------------------------------------------
     6. ANIMATED COUNT-UP NUMBERS
     -------------------------------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number');

  const animateCountUp = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10) || 0;
    const duration = 1800; // milliseconds
    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic formula
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeOutProgress * target);

      element.textContent = currentVal.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    };

    requestAnimationFrame(updateCounter);
  };

  if (statNumbers.length > 0) {
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      statNumbers.forEach((el) => {
        el.textContent = el.getAttribute('data-target') || '0';
      });
    } else {
      let statsCounted = false;
      const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsCounted) {
            statNumbers.forEach((num) => animateCountUp(num));
            statsCounted = true;
            observer.disconnect();
          }
        });
      }, { threshold: 0.25 });

      const statsContainer = document.querySelector('.stats-wrapper');
      if (statsContainer) {
        statsObserver.observe(statsContainer);
      }
    }
  }

  /* --------------------------------------------------------------------------
     7. CLIPBOARD COPY FOR EMAIL
     -------------------------------------------------------------------------- */
  const btnCopyEmail = document.getElementById('btn-copy-email');
  const copyTooltip = document.getElementById('copy-tooltip');
  const emailTextEl = document.getElementById('email-text');

  if (btnCopyEmail && copyTooltip && emailTextEl) {
    btnCopyEmail.addEventListener('click', async () => {
      const email = emailTextEl.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
        copyTooltip.textContent = 'Copied!';
        copyTooltip.style.opacity = '1';

        setTimeout(() => {
          copyTooltip.textContent = 'Copy';
          copyTooltip.style.opacity = '';
        }, 2200);
      } catch (err) {
        // Fallback for older environments
        const textArea = document.createElement('textarea');
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          copyTooltip.textContent = 'Copied!';
          copyTooltip.style.opacity = '1';
        } catch (e) {
          copyTooltip.textContent = 'Failed';
        }
        document.body.removeChild(textArea);

        setTimeout(() => {
          copyTooltip.textContent = 'Copy';
          copyTooltip.style.opacity = '';
        }, 2200);
      }
    });
  }

  /* --------------------------------------------------------------------------
     8. CONTACT FORM (CLIENT-SIDE VALIDATION & MAILTO LAUNCH)
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const subjectInput = document.getElementById('form-subject');
    const messageInput = document.getElementById('form-message');

    const validateEmail = (val) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    };

    const validateField = (input, isValid) => {
      const group = input.closest('.form-group');
      if (!group) return isValid;

      if (!isValid) {
        group.classList.add('has-error');
      } else {
        group.classList.remove('has-error');
      }
      return isValid;
    };

    // Live validation on blur & input
    [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
      if (!input) return;
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group && group.classList.contains('has-error')) {
          if (input.type === 'email') {
            validateField(input, validateEmail(input.value.trim()));
          } else {
            validateField(input, input.value.trim().length > 0);
          }
        }
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const subjectVal = subjectInput.value.trim();
      const messageVal = messageInput.value.trim();

      const isNameValid = validateField(nameInput, nameVal.length > 0);
      const isEmailValid = validateField(emailInput, validateEmail(emailVal));
      const isSubjectValid = validateField(subjectInput, subjectVal.length > 0);
      const isMessageValid = validateField(messageInput, messageVal.length > 0);

      if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // Construct pre-filled mailto URL
        const recipient = 'dellizulter@gmail.com';
        const formattedSubject = encodeURIComponent(`[Portfolio Inquiry] ${subjectVal}`);
        const formattedBody = encodeURIComponent(
          `Hi Jay,\n\n${messageVal}\n\n---\nFrom: ${nameVal}\nEmail: ${emailVal}`
        );

        const mailtoUrl = `mailto:${recipient}?subject=${formattedSubject}&body=${formattedBody}`;

        // Feedback on submit button
        const submitBtn = document.getElementById('btn-submit-form');
        if (submitBtn) {
          const originalText = submitBtn.innerHTML;
          submitBtn.innerHTML = `<span>Opening Mail Client...</span>`;
          submitBtn.disabled = true;

          setTimeout(() => {
            window.location.href = mailtoUrl;
            submitBtn.innerHTML = `<span>Message Prepared!</span>`;
            setTimeout(() => {
              submitBtn.innerHTML = originalText;
              submitBtn.disabled = false;
              contactForm.reset();
            }, 3000);
          }, 350);
        } else {
          window.location.href = mailtoUrl;
        }
      }
    });
  }

  /* --------------------------------------------------------------------------
     9. DYNAMIC COPYRIGHT YEAR
     -------------------------------------------------------------------------- */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

});

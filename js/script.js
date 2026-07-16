/**
 * Fincode Institute - Main JavaScript Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initCursorSpotlight();
  initScrollReveal();
  initCourseFilter();
  initContactFormValidation();
});

/**
 * 1. Sticky Header
 * Adds styling to the navigation bar when the user scrolls down.
 */
function initStickyHeader() {
  const header = document.querySelector('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initially on load
}

/**
 * 2. Mobile Menu Handling
 * Toggles the visibility of the mobile menu panel and animating the hamburger button.
 */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburger || !navMenu) return;

  const toggleMenu = () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  };

  hamburger.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
}

/**
 * 3. Custom Cursor Spotlight Effect
 * Dynamically creates a cursor light element and coordinates its movements.
 */
function initCursorSpotlight() {
  // Check if we are on a touch device
  if (matchMedia('(pointer: coarse)').matches) return;

  const cursorLight = document.createElement('div');
  cursorLight.className = 'cursor-light';
  document.body.appendChild(cursorLight);
  document.body.classList.add('cursor-active');

  document.addEventListener('mousemove', (e) => {
    cursorLight.style.left = `${e.clientX}px`;
    cursorLight.style.top = `${e.clientY}px`;
  });

  document.addEventListener('mouseenter', () => {
    cursorLight.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    cursorLight.style.opacity = '0';
  });
}

/**
 * 4. Scroll Reveal Animations
 * Uses IntersectionObserver to trigger smooth page entries when components come into view.
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Trigger once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * 5. Course Categorization Filter (Dynamic Filtering)
 * Filters courses based on selection on courses.html page.
 */
function initCourseFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const courseCards = document.querySelectorAll('.course-card');

  if (filterBtns.length === 0 || courseCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1. Update Active Filter Button state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedFilter = btn.getAttribute('data-filter');

      // 2. Filter Cards with animations
      courseCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (selectedFilter === 'all' || cardCategory === selectedFilter) {
          card.classList.remove('hide');
          // Re-trigger visual entry transition
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.classList.add('hide');
        }
      });
    });
  });
}

/**
 * 6. Contact Form Validation
 * Live form verification and validation for contact.html contact submission.
 */
function initContactFormValidation() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const phoneInput = document.getElementById('phone');
  const messageInput = document.getElementById('message');

  const validators = {
    name: (val) => val.trim().length >= 3,
    email: (val) => {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailPattern.test(val.trim());
    },
    phone: (val) => {
      const phoneDigits = val.replace(/\D/g, '');
      return phoneDigits.length >= 7 && phoneDigits.length <= 15;
    },
    message: (val) => val.trim().length >= 10
  };

  const validateInput = (input, validator, errorId) => {
    const isValid = validator(input.value);
    const errorMsg = document.getElementById(errorId);

    if (isValid) {
      input.classList.remove('invalid');
      input.classList.add('valid');
      if (errorMsg) errorMsg.style.display = 'none';
    } else {
      input.classList.remove('valid');
      input.classList.add('invalid');
      if (errorMsg) errorMsg.style.display = 'block';
    }
    return isValid;
  };

  // Attach listeners for live validation on blur
  if (nameInput) {
    nameInput.addEventListener('blur', () => validateInput(nameInput, validators.name, 'nameError'));
    nameInput.addEventListener('input', () => { if (nameInput.classList.contains('invalid')) validateInput(nameInput, validators.name, 'nameError'); });
  }

  if (emailInput) {
    emailInput.addEventListener('blur', () => validateInput(emailInput, validators.email, 'emailError'));
    emailInput.addEventListener('input', () => { if (emailInput.classList.contains('invalid')) validateInput(emailInput, validators.email, 'emailError'); });
  }

  if (phoneInput) {
    phoneInput.addEventListener('blur', () => validateInput(phoneInput, validators.phone, 'phoneError'));
    phoneInput.addEventListener('input', () => { if (phoneInput.classList.contains('invalid')) validateInput(phoneInput, validators.phone, 'phoneError'); });
  }

  if (messageInput) {
    messageInput.addEventListener('blur', () => validateInput(messageInput, validators.message, 'messageError'));
    messageInput.addEventListener('input', () => { if (messageInput.classList.contains('invalid')) validateInput(messageInput, validators.message, 'messageError'); });
  }

  // Handle Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateInput(nameInput, validators.name, 'nameError');
    const isEmailValid = validateInput(emailInput, validators.email, 'emailError');
    const isPhoneValid = validateInput(phoneInput, validators.phone, 'phoneError');
    const isMessageValid = validateInput(messageInput, validators.message, 'messageError');

    if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
      // Form is fully validated
      showSuccessState(form);
    }
  });
}

/**
 * Shows a beautiful success screen on the form card when submitted.
 */
function showSuccessState(form) {
  const formCard = form.parentElement;
  formCard.style.opacity = '0';
  formCard.style.transform = 'translateY(10px)';

  setTimeout(() => {
    formCard.innerHTML = `
      <div style="text-align: center; padding: 40px 20px;">
        <div style="width: 80px; height: 80px; background: rgba(16, 185, 129, 0.1); color: hsl(140, 70%, 50%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px auto; font-size: 2.5rem; border: 1px solid rgba(16, 185, 129, 0.2);">
          ✓
        </div>
        <h3 style="font-size: 1.8rem; margin-bottom: 12px; font-family: var(--font-heading);">Message Sent!</h3>
        <p style="color: var(--text-secondary); margin-bottom: 24px; font-size: 0.95rem;">
          Thank you for contacting Fincode Institute. Our admissions advisors will reach out to you within 24 hours.
        </p>
        <button onclick="location.reload()" class="btn btn-secondary" style="font-size: 0.9rem; padding: 10px 20px;">
          Send Another Message
        </button>
      </div>
    `;
    formCard.style.transition = 'all 0.5s ease';
    formCard.style.opacity = '1';
    formCard.style.transform = 'translateY(0)';
  }, 300);
}

/* ===========================================================
   Recipe Secrets — Shared Script
   =========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollReveal();
  initFooterYear();
  initReservationForm();
  initContactForm();
});

/* ---------- Mobile nav toggle + active link ---------- */
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Highlight active page in nav based on current file name
  const currentPage = (window.location.pathname.split('/').pop() || 'index.html') || 'index.html';
  document.querySelectorAll('.main-nav a').forEach((link) => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ---------- Fade-in on scroll ---------- */
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window) || revealEls.length === 0) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* ---------- Footer year ---------- */
function initFooterYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/* ---------- Shared validation helpers ---------- */
function showFieldError(field, message) {
  const group = field.closest('.form-group');
  if (!group) return;
  group.classList.add('invalid');
  const errorEl = group.querySelector('.error-message');
  if (errorEl && message) {
    errorEl.textContent = message;
  }
}

function clearFieldError(field) {
  const group = field.closest('.form-group');
  if (!group) return;
  group.classList.remove('invalid');
}

function validateRequired(field) {
  if (!field.value || !field.value.trim()) {
    showFieldError(field, 'This field is required.');
    return false;
  }
  clearFieldError(field);
  return true;
}

function validateEmail(field) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(field.value.trim())) {
    showFieldError(field, 'Please enter a valid email address.');
    return false;
  }
  clearFieldError(field);
  return true;
}

/* ---------- Reservation form ---------- */
function initReservationForm() {
  const form = document.getElementById('reservation-form');
  if (!form) return;

  const dateField = form.querySelector('#res-date');
  if (dateField) {
    const today = new Date().toISOString().split('T')[0];
    dateField.setAttribute('min', today);
  }

  form.addEventListener('submit', (event) => {
    let isValid = true;

    const name = form.querySelector('#res-name');
    const email = form.querySelector('#res-email');
    const phone = form.querySelector('#res-phone');
    const date = form.querySelector('#res-date');
    const time = form.querySelector('#res-time');
    const guests = form.querySelector('#res-guests');

    if (!validateRequired(name)) isValid = false;

    if (!validateRequired(email)) {
      isValid = false;
    } else if (!validateEmail(email)) {
      isValid = false;
    }

    if (!validateRequired(phone)) isValid = false;

    if (!validateRequired(date)) {
      isValid = false;
    } else {
      const todayStr = new Date().toISOString().split('T')[0];
      if (date.value < todayStr) {
        showFieldError(date, 'Please choose today or a future date.');
        isValid = false;
      } else {
        clearFieldError(date);
      }
    }

    if (!validateRequired(time)) isValid = false;

    if (!validateRequired(guests)) {
      isValid = false;
    } else {
      const guestCount = Number(guests.value);
      if (guestCount < 1 || guestCount > 12) {
        showFieldError(guests, 'Party size must be between 1 and 12.');
        isValid = false;
      } else {
        clearFieldError(guests);
      }
    }

    if (!isValid) {
      event.preventDefault();
      return;
    }

    // Placeholder Formspree endpoint: client-side validation passes, so
    // let the form submit normally to Formspree. We additionally show a
    // friendly inline confirmation for the case where the page isn't
    // redirected away (e.g. Formspree AJAX is configured later).
    event.preventDefault();
    submitToFormspree(form, 'reservation-confirmation');
  });
}

/* ---------- Contact page form ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    let isValid = true;

    const name = form.querySelector('#contact-name');
    const email = form.querySelector('#contact-email');
    const message = form.querySelector('#contact-message');

    if (!validateRequired(name)) isValid = false;

    if (!validateRequired(email)) {
      isValid = false;
    } else if (!validateEmail(email)) {
      isValid = false;
    }

    if (!validateRequired(message)) isValid = false;

    if (!isValid) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    submitToFormspree(form, 'contact-confirmation');
  });
}

/* ---------- Submit to Formspree via fetch, with confirmation UI ---------- */
function submitToFormspree(form, confirmationId) {
  const confirmationEl = document.getElementById(confirmationId);
  const action = form.getAttribute('action') || '';

  const finish = () => {
    form.reset();
    form.hidden = true;
    if (confirmationEl) {
      confirmationEl.classList.add('visible');
      confirmationEl.focus();
    }
  };

  // If the Formspree ID placeholder hasn't been replaced yet, skip the
  // network call and just show the confirmation so the flow can be tested.
  if (action.includes('YOUR_FORM_ID')) {
    finish();
    return;
  }

  fetch(action, {
    method: 'POST',
    body: new FormData(form),
    headers: { Accept: 'application/json' },
  })
    .then(() => finish())
    .catch(() => finish());
}

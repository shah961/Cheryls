/**
 * CHERYL'S COMPANY - MAIN JAVASCRIPT ENGINE
 * Handles Navigation, Modal Drawers, Filters, Accordions, and Forms
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAppointmentModal();
  initFAQAccordion();
  initServiceFilters();
  initFormValidation();
  initSmoothScroll();
});

/* Navigation & Mobile Drawer Toggle */
function initNavigation() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isActive = navMenu.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isActive);
    });

    // Close mobile menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* Appointment Modal Drawer System */
function initAppointmentModal() {
  const modalOverlay = document.getElementById('bookingModal');
  const openButtons = document.querySelectorAll('.js-open-modal');
  const closeButtons = document.querySelectorAll('.js-close-modal');

  if (!modalOverlay) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const predefinedService = btn.getAttribute('data-service') || '';
      const serviceSelect = document.getElementById('modalService');
      if (serviceSelect && predefinedService) {
        serviceSelect.value = predefinedService;
      }
      modalOverlay.classList.add('active');
      modalOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

/* Accordion Component */
function initFAQAccordion() {
  const faqTriggers = document.querySelectorAll('.faq-trigger');

  faqTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const parent = trigger.parentElement;
      const isActive = parent.classList.contains('active');

      // Close other accordions
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const trig = item.querySelector('.faq-trigger');
        if (trig) trig.setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        parent.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* Service Filtering Engine (No External Frameworks) */
function initServiceFilters() {
  const filterBtns = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service-card-item');

  if (!filterBtns.length || !serviceCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* Form Handling & Dynamic Validation */
function initFormValidation() {
  const forms = document.querySelectorAll('.js-validate-form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const requiredInputs = form.querySelectorAll('[required]');

      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#e53e3e';
        } else {
          input.style.borderColor = 'var(--border-light)';
        }
      });

      if (!isValid) return;

      const alertContainer = form.querySelector('.form-alert') || createAlertContainer(form);
      alertContainer.innerHTML = `
        <div style="background-color: #f0fff4; border: 1px solid #68d391; color: #22543d; padding: 1rem; border-radius: 4px; margin-top: 1rem;">
          Thank you! Your appointment query has been submitted. Our team will contact you shortly to confirm availability.
        </div>
      `;
      form.reset();
    });
  });

  function createAlertContainer(form) {
    const div = document.createElement('div');
    div.className = 'form-alert';
    form.appendChild(div);
    return div;
  }
}

/* Smooth Navigation Scroll Helper */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

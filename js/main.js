/* ====================================================================
   AUTOMATAIZ – Core Interaction & Navigation Framework
   (js/main.js)
   ==================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileNav();
  initAccordions();
  initTabs();
  initDemoModal();
  initScrollReveals();
  highlightActiveNav();
});

// --- Sticky Navigation with dynamic shrink and backdrop blur ---
function initNavbar() {
  const nav = document.querySelector('.site-nav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });
}

// --- Active Link Highlighting ---
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// --- Mobile Navigation Drawer ---
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');

  if (!toggleBtn || !drawer) return;

  function closeDrawer() {
    drawer.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    document.body.classList.remove('drawer-open');
  }

  function openDrawer() {
    drawer.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
    document.body.classList.add('drawer-open');
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  // Close drawer when clicking any link inside it
  drawer.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Close when clicking outside drawer
  document.addEventListener('click', (e) => {
    if (drawer.classList.contains('open') && !drawer.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeDrawer();
    }
  });

  // Auto-close on viewport resize > 1080px
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1080 && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

// --- Accordions (FAQ & Expandable Breakdown) ---
function initAccordions() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other accordion items in the same container
      const parent = item.parentElement;
      if (parent) {
        parent.querySelectorAll('.faq-item').forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
      }

      item.classList.toggle('active', !isActive);
    });
  });
}

// --- Tab Controls ---
function initTabs() {
  const tabContainers = document.querySelectorAll('[data-tabs]');

  tabContainers.forEach(container => {
    const buttons = container.querySelectorAll('.tab-btn');
    const panels = container.querySelectorAll('.tab-content-panel');

    buttons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        if (targetId) {
          const targetPanel = container.querySelector(targetId);
          if (targetPanel) targetPanel.classList.add('active');
        } else if (panels[index]) {
          panels[index].classList.add('active');
        }
      });
    });
  });
}

// --- Universal Book a Demo Modal System ---
function initDemoModal() {
  // Inject modal into DOM if not present
  if (!document.getElementById('demoModal')) {
    const modalHTML = `
      <div class="modal-overlay" id="demoModal" aria-hidden="true">
        <div class="modal-window">
          <button class="modal-close" id="closeDemoModal" aria-label="Close Modal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <div class="modal-content-inner">
            <span class="badge-tag green"><span class="pulse-dot"></span> Schedule an Executive Briefing</span>
            <h3 style="margin-bottom: 0.5rem;">Experience Automataiz Live</h3>
            <p style="color: var(--text-muted); font-size: 0.925rem; margin-bottom: 1.75rem;">
              See how our autonomous AI Business OS replaces 10+ disjointed SaaS tools and runs your entire enterprise operations.
            </p>

            <form id="demoBookingForm">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                <div class="form-group">
                  <label class="form-label">First Name *</label>
                  <input type="text" class="form-input" placeholder="e.g. Alex" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Last Name *</label>
                  <input type="text" class="form-input" placeholder="e.g. Vance" required>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Work Email *</label>
                <input type="email" class="form-input" placeholder="alex@company.com" required>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                <div class="form-group">
                  <label class="form-label">Company Size</label>
                  <select class="form-select">
                    <option>1 - 20 Employees</option>
                    <option>21 - 100 Employees</option>
                    <option>101 - 500 Employees</option>
                    <option>500+ Enterprise</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Primary Interest</label>
                  <select class="form-select">
                    <option>Complete 8-Module Suite</option>
                    <option>Autonomous AI Sales & CRM</option>
                    <option>WhatsApp & Voice AI Agents</option>
                    <option>Workflow Automation Engine</option>
                    <option>Finance & Operations OS</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Preferred Date & Time</label>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
                  <input type="date" class="form-input" required id="demoDate">
                  <select class="form-select">
                    <option>10:00 AM EST</option>
                    <option>01:00 PM EST</option>
                    <option>03:30 PM EST</option>
                    <option>06:00 PM EST</option>
                  </select>
                </div>
              </div>

              <button type="submit" class="btn btn-primary btn-lg" style="width: 100%; margin-top: 10px;">
                Confirm Executive Demo Slot
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
              
              <div style="text-align: center; margin-top: 12px; font-size: 0.775rem; color: var(--text-muted); display: flex; align-items: center; justify-content: center; gap: 8px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#19B000" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                SOC2 Type II & HIPAA Certified • 100% Confidential
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Set minimum date to tomorrow
    const dateInput = document.getElementById('demoDate');
    if (dateInput) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      dateInput.value = tomorrow.toISOString().split('T')[0];
      dateInput.min = tomorrow.toISOString().split('T')[0];
    }
  }

  const modal = document.getElementById('demoModal');
  const closeBtn = document.getElementById('closeDemoModal');
  const form = document.getElementById('demoBookingForm');

  // Universal Modal Trigger System (Demo & Strategy Modals)
  document.addEventListener('click', (e) => {
    // Open modal triggers
    const trigger = e.target.closest('[data-modal]');
    if (trigger) {
      e.preventDefault();
      const targetModalId = trigger.getAttribute('data-modal');
      const targetModal = document.getElementById(targetModalId);
      if (targetModal) {
        targetModal.classList.add('open', 'active');
        targetModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
      return;
    }

    // Close button triggers
    const closeTrigger = e.target.closest('[data-close], .modal-close-btn, .modal-close');
    if (closeTrigger) {
      e.preventDefault();
      const modalToClose = closeTrigger.closest('.modal-overlay, .modal-backdrop');
      if (modalToClose) {
        closeModal(modalToClose);
      }
    }
  });

  // Close when clicking on backdrop
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay') || e.target.classList.contains('modal-backdrop')) {
      closeModal(e.target);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModals = document.querySelectorAll('.modal-overlay.open, .modal-backdrop.active, .modal-backdrop.open');
      activeModals.forEach(m => closeModal(m));
    }
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(modal);
      showToast('Demo request received! A Senior Solution Architect has reserved your slot and sent confirmation to your email.', 'green');
      form.reset();
    });
  }
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('open', 'active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// --- Toast Notification Engine ---
function showToast(message, type = 'green') {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  const icon = type === 'yellow' ? 
    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFC61A" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>` : 
    `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#19B000" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;

  toast.innerHTML = `${icon}<span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

// --- Scroll Reveal Animations ---
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.card-glass, .section-header, .module-card, .comp-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });
}

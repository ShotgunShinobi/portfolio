import './style.css';
import { inject } from '@vercel/analytics';
import { initCanvasBackground } from './canvas-bg.js';
import { openDrawer } from './drawer.js';

// Initialize Vercel Analytics
inject();

document.addEventListener('DOMContentLoaded', () => {
  initCanvasBackground();
  initAnimations();
  initSpotlightEffect();
  initScrollSpy();
});

// Toast notification trigger
function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="toast-notification" id="toastNotification">
        <span id="toastMsg">${message}</span>
      </div>
    `);
    toast = document.getElementById('toastNotification');
  } else {
    document.getElementById('toastMsg').textContent = message;
  }

  toast.classList.add('active');
  setTimeout(() => {
    toast.classList.remove('active');
  }, 2500);
}

// 1-Click Copy Email logic
document.addEventListener('click', (e) => {
  const copyBtn = e.target.closest('.copy-email-btn');
  if (copyBtn) {
    e.preventDefault();
    const email = 'mariangeorgek2015@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast('✓ Email copied to clipboard: mariangeorgek2015@gmail.com');
    }).catch(() => {
      showToast('Email: mariangeorgek2015@gmail.com');
    });
  }
});

// 1-Click Slide-Over Drawer logic on project card click
document.addEventListener('click', (e) => {
  const card = e.target.closest('.project-card');
  if (card) {
    const projectId = card.getAttribute('data-id');
    if (projectId) {
      openDrawer(projectId);
    }
  }
});

// Filter Pill logic
document.addEventListener('click', (e) => {
  const filterBtn = e.target.closest('.filter-btn');
  if (filterBtn) {
    const filterValue = filterBtn.getAttribute('data-filter');
    const projects = document.querySelectorAll('.project-card');

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-secondary');
    });
    filterBtn.classList.remove('btn-secondary');
    filterBtn.classList.add('btn-primary');

    projects.forEach(project => {
      const categoryAttr = project.getAttribute('data-category') || '';
      const categories = categoryAttr.split(',').map(c => c.trim().toLowerCase());

      if (filterValue === 'all' || categories.includes(filterValue.toLowerCase())) {
        project.style.display = 'flex';
      } else {
        project.style.display = 'none';
      }
    });
  }
});

// Scrollspy for Floating Dock
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

// Intersection Observer for Animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

function initAnimations() {
  document.querySelectorAll('.fade-in-up').forEach(el => {
    observer.observe(el);
  });
}

function initSpotlightEffect() {
  document.querySelectorAll('.hud-card, .project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

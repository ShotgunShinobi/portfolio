import './style.css';

const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Intersection Observer for scroll animations
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

// Initial load
initAnimations();

// View Transitions Router
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (!link) return;
  
  const href = link.getAttribute('href');
  // Only intercept internal links
  if (href && href.startsWith('/') && !href.startsWith('#') && link.target !== '_blank') {
    e.preventDefault();
    navigateTo(href);
  }
});

window.addEventListener('popstate', () => {
  navigateTo(window.location.pathname, false);
});

async function navigateTo(url, pushState = true) {
  const response = await fetch(url);
  const text = await response.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');
  
  const newMain = doc.querySelector('main').innerHTML;
  const newTitle = doc.querySelector('title').innerText;
  
  if (!document.startViewTransition) {
    updateDOM(newMain, newTitle, url, pushState);
    return;
  }
  
  document.startViewTransition(() => {
    updateDOM(newMain, newTitle, url, pushState);
  });
}

function updateDOM(newMain, newTitle, url, pushState) {
  document.querySelector('main').innerHTML = newMain;
  document.title = newTitle;
  
  if (pushState) {
    window.history.pushState({}, '', url);
  }
  
  window.scrollTo(0, 0);
  initAnimations();
  
  // Update active class in header
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '/' && href === '/index.html')) {
      link.classList.add('active');
    }
  });
}

// Modal Logic
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.open-modal-btn');
  if (btn) {
    e.preventDefault();
    const title = btn.getAttribute('data-title');
    const desc = btn.getAttribute('data-desc');
    const github = btn.getAttribute('data-github');
    
    const titleEl = document.getElementById('modalTitle');
    const descEl = document.getElementById('modalDesc');
    const linkEl = document.getElementById('modalGithubLink');
    
    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;
    if (linkEl) {
      if (github && github !== '#') {
        linkEl.href = github;
        linkEl.style.display = '';
      } else {
        linkEl.style.display = 'none';
      }
    }
    
    const modal = document.getElementById('projectModal');
    if (modal) modal.classList.add('active');
  }

  const contactBtn = e.target.closest('a[href="#contact"]') || e.target.closest('.open-contact-modal');
  if (contactBtn) {
    e.preventDefault();
    let modal = document.getElementById('contactModal');
    if (!modal) {
      // Inject modal into DOM dynamically so it works across all pages
      document.body.insertAdjacentHTML('beforeend', `
        <div class="modal-overlay" id="contactModal">
          <div class="modal-content" style="text-align: center;">
            <button class="modal-close" id="closeContactModal">&times;</button>
            <h3 class="modal-title" style="margin-bottom: 1rem;">Let's Connect</h3>
            <p class="modal-desc" style="margin-bottom: 1.5rem;">Feel free to reach out via email or LinkedIn!</p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <a href="mailto:mariangeorgek2015@gmail.com" class="btn btn-primary">Email Me</a>
              <a href="https://www.linkedin.com/in/mariangeo/" target="_blank" class="btn btn-secondary">LinkedIn</a>
            </div>
          </div>
        </div>
      `);
      modal = document.getElementById('contactModal');
    }
    modal.classList.add('active');
  }

  if (e.target.closest('#closeModal') || (e.target.classList.contains('modal-overlay') && e.target.id === 'projectModal')) {
    const modal = document.getElementById('projectModal');
    if (modal) modal.classList.remove('active');
  }

  if (e.target.closest('#closeContactModal') || (e.target.classList.contains('modal-overlay') && e.target.id === 'contactModal')) {
    const modal = document.getElementById('contactModal');
    if (modal) modal.classList.remove('active');
  }
});

// Filter Logic
document.addEventListener('click', (e) => {
  const filterBtn = e.target.closest('.filter-btn');
  if (filterBtn) {
    const filterValue = filterBtn.getAttribute('data-filter');
    const projects = document.querySelectorAll('.project-card');
    
    // Update active state of buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-secondary');
    });
    filterBtn.classList.remove('btn-secondary');
    filterBtn.classList.add('btn-primary');

    projects.forEach(project => {
      if (filterValue === 'all') {
        project.style.display = '';
      } else {
        const categoryAttr = project.getAttribute('data-category') || '';
        const categories = categoryAttr.split(',').map(c => c.trim());
        if (categories.includes(filterValue)) {
          project.style.display = '';
        } else {
          project.style.display = 'none';
        }
      }
    });
  }
});

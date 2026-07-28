import './style.css';
import { inject } from '@vercel/analytics';
import { initCanvasBackground } from './canvas-bg.js';
import { openDrawer, projectsData } from './drawer.js';

// Initialize Vercel Analytics
inject();

// Pre-cached GitHub Repos fallback array
const PRECACHED_REPOS = [
  {
    name: 'portfolio',
    description: 'My portfolio website : )',
    language: 'HTML',
    updated_at: '2026-07-28T18:11:25Z',
    stargazers_count: 0,
    html_url: 'https://github.com/ShotgunShinobi/portfolio',
    topics: ['portfolio', 'vite', 'javascript']
  },
  {
    name: 'ExifRemover',
    description: 'A python script to remove the EXIF data from image files before uploading to various sites, for obvious privacy reasons.',
    language: 'Python',
    updated_at: '2026-07-28T16:23:21Z',
    stargazers_count: 0,
    html_url: 'https://github.com/ShotgunShinobi/ExifRemover',
    topics: ['security', 'privacy', 'python']
  },
  {
    name: 'Ethereum-Hunter',
    description: 'Express server & Alchemy SDK tool for querying Ethereum smart contract transactions & storage in SQLite.',
    language: 'JavaScript',
    updated_at: '2026-07-19T18:15:35Z',
    stargazers_count: 2,
    html_url: 'https://github.com/ShotgunShinobi/Ethereum-Hunter',
    topics: ['web3', 'ethereum', 'blockchain']
  },
  {
    name: 'odysseus',
    description: 'Self-hosted AI workspace environment for autonomous agents and private code indexes.',
    language: 'Python',
    updated_at: '2026-07-15T09:31:26Z',
    stargazers_count: 0,
    html_url: 'https://github.com/ShotgunShinobi/odysseus',
    topics: ['ai', 'workspace', 'llm']
  },
  {
    name: 'GeoMemoir',
    description: 'Privacy-focused alternative geo-tagging app built with Kotlin & OpenSource maps.',
    language: 'Kotlin',
    updated_at: '2026-07-01T14:43:40Z',
    stargazers_count: 0,
    html_url: 'https://github.com/ShotgunShinobi/GeoMemoir',
    topics: ['android', 'maps', 'open-source', 'mobile']
  },
  {
    name: 'openclaude',
    description: 'Claude Code opened to any LLM — OpenAI, Gemini, DeepSeek, Ollama, and 200+ models.',
    language: 'Python',
    updated_at: '2026-04-02T18:33:32Z',
    stargazers_count: 0,
    html_url: 'https://github.com/ShotgunShinobi/openclaude',
    topics: ['nlp', 'llm', 'ai-agent']
  },
  {
    name: 'SimilarSiteExtenstion',
    description: 'Chrome extension to find similar websites to the active tab in real time.',
    language: 'JavaScript',
    updated_at: '2025-05-29T11:33:39Z',
    stargazers_count: 0,
    html_url: 'https://github.com/ShotgunShinobi/SimilarSiteExtenstion',
    topics: ['chrome-extension', 'tools', 'automation']
  },
  {
    name: 'Auto_Jobs_Applier',
    description: 'Autonomous AI agent automating job application submissions and customized form parsing.',
    language: 'Python',
    updated_at: '2024-12-29T21:05:14Z',
    stargazers_count: 0,
    html_url: 'https://github.com/ShotgunShinobi/Auto_Jobs_Applier',
    topics: ['automation', 'nlp', 'ai-agent']
  },
  {
    name: 'StockAI',
    description: 'Real-time financial market analytics and time-series quantitative predictive ML engine.',
    language: 'Jupyter Notebook',
    updated_at: '2024-11-07T15:10:51Z',
    stargazers_count: 0,
    html_url: 'https://github.com/ShotgunShinobi/StockAI',
    topics: ['finance', 'fintech', 'machine-learning']
  },
  {
    name: 'AI-Text-Summarizer',
    description: 'Text summarization engine powered by Llama-2 chat model and LangChain pipelines.',
    language: 'Jupyter Notebook',
    updated_at: '2024-11-07T15:02:13Z',
    stargazers_count: 0,
    html_url: 'https://github.com/ShotgunShinobi/AI-Text-Summarizer',
    topics: ['nlp', 'llama-2', 'langchain']
  }
];

// Whitelist of GitHub repository names to display on your website.
// Add repository names here to filter, or set to null / [] to display all public repos.
const FEATURED_REPOS = null;


document.addEventListener('DOMContentLoaded', () => {
  initCanvasBackground();
  initAnimations();
  initSpotlightEffect();
  initScrollSpy();
  initGitHubReposSync();
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
  }, 2800);
}

// Map repository names to categories for filtering
function getRepoCategories(repo) {
  const name = repo.name.toLowerCase();
  const desc = (repo.description || '').toLowerCase();
  const lang = (repo.language || '').toLowerCase();
  const topics = (repo.topics || []).map(t => t.toLowerCase());

  const categories = ['live-github', 'all'];

  if (name.includes('nlp') || name.includes('summarizer') || name.includes('openclaude') || desc.includes('llm') || desc.includes('gpt') || topics.includes('nlp')) {
    categories.push('nlp');
  }
  if (name.includes('stock') || name.includes('finance') || desc.includes('stock') || topics.includes('finance')) {
    categories.push('finance');
  }
  if (name.includes('eth') || name.includes('ethereum') || desc.includes('blockchain') || topics.includes('web3')) {
    categories.push('web3');
  }
  if (name.includes('geo') || lang === 'kotlin' || topics.includes('android') || topics.includes('mobile')) {
    categories.push('mobile');
  }
  if (name.includes('exif') || desc.includes('privacy') || desc.includes('security') || topics.includes('security')) {
    categories.push('security');
  }
  if (name.includes('job') || name.includes('extension') || name.includes('similar') || desc.includes('agent') || desc.includes('automation')) {
    categories.push('automation');
  }

  return categories.join(', ');
}

// Map repo name to drawer dossier key if available
function getDrawerIdForRepo(repoName) {
  const name = repoName.toLowerCase();
  if (name === 'exifremover') return 'exifremover';
  if (name === 'geomemoir') return 'geomemoir';
  if (name === 'openclaude') return 'openclaude';
  if (name === 'ethereum-hunter') return 'eth';
  if (name === 'stockai') return 'dataviz';
  if (name === 'ai-text-summarizer') return 'nlp';
  if (name.includes('similarsite')) return 'similarsite';
  if (name.includes('jobs')) return 'autojobs';
  return null;
}

function applyActiveFilter() {
  const activeBtn = document.querySelector('.filter-btn.btn-primary');
  const filterVal = activeBtn ? activeBtn.getAttribute('data-filter').toLowerCase() : 'featured';
  const projects = document.querySelectorAll('.project-card');

  projects.forEach(project => {
    const categoryAttr = (project.getAttribute('data-category') || '').toLowerCase();
    const categories = categoryAttr.split(',').map(c => c.trim());

    if (filterVal === 'all' || categories.includes(filterVal)) {
      project.style.display = 'flex';
    } else {
      project.style.display = 'none';
    }
  });
}

// Fetch & Render GitHub Repositories
async function initGitHubReposSync() {
  const container = document.getElementById('live-github-container');
  const countBadge = document.getElementById('gh-repo-count');
  const syncBtn = document.getElementById('sync-github-btn');

  if (!container) return;

  async function fetchAndRender() {
    let repos = PRECACHED_REPOS;
    try {
      const response = await fetch('https://api.github.com/users/ShotgunShinobi/repos?sort=updated&per_page=30');
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          repos = data;
        }
      }
    } catch (err) {
      console.log('GitHub API fetch using cached fallback');
    }

    if (FEATURED_REPOS && FEATURED_REPOS.length > 0) {
      const featuredSet = new Set(FEATURED_REPOS.map(name => name.toLowerCase()));
      repos = repos.filter(repo => featuredSet.has(repo.name.toLowerCase()));
    }

    if (countBadge) {
      countBadge.textContent = `Indexing ${repos.length} Repositories`;
    }

    container.innerHTML = repos.map((repo, idx) => {
      const categories = getRepoCategories(repo);
      const drawerId = getDrawerIdForRepo(repo.name);
      const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const language = repo.language || 'Code';
      const stars = repo.stargazers_count || 0;

      return `
        <div class="project-card glass-panel hud-card gh-repo-card fade-in-up visible" 
             data-id="${drawerId || ''}" 
             data-url="${repo.html_url}"
             data-category="${categories}" 
             style="transition-delay: ${(idx % 6) * 0.05}s;">
          <div class="project-content" style="padding-top: 1.8rem;">
            <div class="project-tags">
              <span class="tag" style="background: rgba(6, 182, 212, 0.15); border-color: rgba(6, 182, 212, 0.4);">
                <span class="gh-lang-dot"></span> ${language}
              </span>
              ${stars > 0 ? `<span class="tag" style="color: var(--imperial-gold); border-color: rgba(245, 158, 11, 0.4);">★ ${stars}</span>` : ''}
              <span class="tag">Live GitHub Repo</span>
            </div>

            <h3 class="project-title" style="font-size: 1.45rem;">${repo.name}</h3>
            <p class="project-desc">${repo.description || 'Public GitHub repository by @ShotgunShinobi.'}</p>

            <div class="project-action-bar" style="margin-top: 1.2rem;">
              <span>${drawerId ? 'View Telemetry Dossier &rarr;' : 'View Source on GitHub &rarr;'}</span>
              <span style="color: var(--imperial-gold);">[ GH REPO ]</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    initSpotlightEffect();
    applyActiveFilter();
  }

  fetchAndRender();

  if (syncBtn) {
    syncBtn.addEventListener('click', async () => {
      syncBtn.textContent = 'Syncing... ⏳';
      syncBtn.disabled = true;
      await fetchAndRender();
      syncBtn.textContent = 'Sync GitHub Repos 🔄';
      syncBtn.disabled = false;
      showToast('✓ Successfully synced public repositories from GitHub @ShotgunShinobi');
    });
  }
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

// 1-Click Slide-Over Drawer logic or GitHub navigation on project card click
document.addEventListener('click', (e) => {
  const card = e.target.closest('.project-card');
  if (card) {
    const projectId = card.getAttribute('data-id');
    const repoUrl = card.getAttribute('data-url');

    if (projectId && projectsData[projectId]) {
      openDrawer(projectId);
    } else if (repoUrl) {
      window.open(repoUrl, '_blank');
    }
  }
});

// Filter Pill logic
document.addEventListener('click', (e) => {
  const filterBtn = e.target.closest('.filter-btn');
  if (filterBtn) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('btn-primary');
      btn.classList.add('btn-secondary');
    });
    filterBtn.classList.remove('btn-secondary');
    filterBtn.classList.add('btn-primary');

    applyActiveFilter();
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


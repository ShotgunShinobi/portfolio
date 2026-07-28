// Slide-Over Drawer Component for Case Studies & Telemetry
export const projectsData = {
  nlp: {
    id: 'nlp',
    title: 'Automated Document Summarization Engine',
    subtitle: 'NLP Pipeline & Llama-2 Fine-Tuning',
    category: ['NLP', 'Machine Learning'],
    tags: ['NLP', 'LangChain', 'FastAPI', 'HuggingFace', 'Llama-2'],
    img: '/project_nlp_1777611335087.png',
    metrics: [
      { label: 'Time Reduction', value: '50%' },
      { label: 'Summary Accuracy', value: '95%' },
      { label: 'Avg Doc Length', value: '10,000+ words' }
    ],
    executiveSummary: 'An automated document summarization engine engineered to condense ultra-long-form enterprise documents. Powered by fine-tuned Large Language Models and custom LangChain pipelines to accelerate executive information extraction.',
    problem: 'Enterprise teams manually reviewing 10,000+ word technical documents face extreme operational latency, bottlenecking rapid executive decision-making.',
    solution: 'Built a modular NLP pipeline combining recursive token chunking and vector embedding search with open-source LLMs hosted on Hugging Face. The high-throughput backend microservice is implemented in Python using FastAPI.',
    github: 'https://github.com/ShotgunShinobi/AI-Text-Summarizer'
  },
  exifremover: {
    id: 'exifremover',
    title: 'ExifRemover - Privacy Metadata Stripper',
    subtitle: 'Automated Image EXIF Metadata Sanitizer',
    category: ['Security', 'Python'],
    tags: ['Security', 'Python', 'Privacy', 'CLI', 'Image Processing'],
    img: '/project_exifremover.png',
    metrics: [
      { label: 'Data Stripped', value: '100% EXIF' },
      { label: 'Format Support', value: 'JPG / PNG / TIFF' },
      { label: 'Processing Speed', value: '< 10ms' }
    ],
    executiveSummary: 'A high-speed Python privacy utility engineered to strip sensitive EXIF metadata (GPS location coordinates, device IDs, camera serial numbers, and timestamps) from image files prior to web publication.',
    problem: 'Modern smartphones and DSLR cameras embed precise GPS coordinates, timestamps, and device telemetry into photo headers, exposing user location privacy when sharing media online.',
    solution: 'Engineered an automated Python script utilizing image header decoding routines to strip all EXIF tags cleanly while maintaining 100% original image visual fidelity and resolution.',
    github: 'https://github.com/ShotgunShinobi/ExifRemover'
  },
  geomemoir: {
    id: 'geomemoir',
    title: 'GeoMemoir - Privacy-First Geo-Tagging App',
    subtitle: 'Android App & Open-Source Mapping Engine',
    category: ['Mobile', 'Open Source'],
    tags: ['Kotlin', 'Android', 'OpenStreetMap', 'Privacy', 'Mobile App'],
    img: '/project_geomemoir.png',
    metrics: [
      { label: 'Platform', value: 'Android / Kotlin' },
      { label: 'Map Engine', value: 'OpenSource Maps' },
      { label: 'Data Storage', value: '100% Local' }
    ],
    executiveSummary: 'A privacy-focused native Android mobile application engineered as an open-source alternative to commercial saved-places tools. Keeps all location data strictly local on-device without third-party telemetry.',
    problem: 'Commercial map applications track location telemetry and monetize user saved locations and search histories.',
    solution: 'Built a native Android app in Kotlin integrating OpenSource maps, allowing users to drop custom location markers, log memories, and search geographic notes offline.',
    github: 'https://github.com/ShotgunShinobi/GeoMemoir'
  },
  openclaude: {
    id: 'openclaude',
    title: 'OpenClaude - Multi-LLM Agent Shim',
    subtitle: 'Universal Provider Bridge for Claude Code',
    category: ['NLP', 'Automation'],
    tags: ['LLM', 'AI Agent', 'OpenAI API', 'Gemini', 'DeepSeek', 'Python'],
    img: '/project_openclaude.png',
    metrics: [
      { label: 'Supported Models', value: '200+ LLMs' },
      { label: 'API Shim', value: 'OpenAI Specs' },
      { label: 'Overhead', value: 'Zero Latency' }
    ],
    executiveSummary: 'An open-source shim expanding AI CLI developer tools to communicate with any model provider including OpenAI, Gemini, DeepSeek, Ollama, and local open-weights LLMs.',
    problem: 'Proprietary CLI AI tools are vendor-locked to a single API provider, preventing engineers from using custom fine-tuned models or self-hosted local LLMs.',
    solution: 'Created an OpenAI-compatible API translation proxy that intercept and translates agent requests, enabling multi-provider routing and local offline inference.',
    github: 'https://github.com/ShotgunShinobi/openclaude'
  },
  dataviz: {
    id: 'dataviz',
    title: 'AI Stock Market Analytics Engine',
    subtitle: 'FinTech & Real-Time Predictive Modeling',
    category: ['Finance', 'Machine Learning'],
    tags: ['FinTech', 'Python', 'Yahoo Finance', 'Selenium', 'Predictive ML'],
    img: '/project_dataviz_1777611351904.png',
    metrics: [
      { label: 'Forecast Lead', value: 'Real-time' },
      { label: 'Pipeline Automation', value: '100%' },
      { label: 'Data Sources', value: 'Multiple Feeds' }
    ],
    executiveSummary: 'An AI-driven real-time financial market telemetry and analytics engine. Engineered to improve price trend forecasting accuracy and deliver continuous quantitative signals.',
    problem: 'Automated trading systems require high-fidelity data aggregation pipelines that synthesize high-frequency price movements and sentiment indicators in real time without lag.',
    solution: 'Built an automated data ingestion network using Python, Yahoo Finance API, and Selenium headless crawlers for real-time web telemetry. Features dynamic data cleaning, time-series feature engineering, and predictive ML models.',
    github: 'https://github.com/ShotgunShinobi/StockAI'
  },
  eth: {
    id: 'eth',
    title: 'Ethereum Hunter Blockchain Analyzer',
    subtitle: 'Web3 Intelligence & Transaction Telemetry',
    category: ['Web3'],
    tags: ['Web3', 'Blockchain', 'Ethereum', 'Express JS', 'Alchemy SDK', 'SQLite'],
    img: '/eth_hunter_project.png',
    metrics: [
      { label: 'Blockchain', value: 'Ethereum' },
      { label: 'Analysis Speed', value: '< 200ms' },
      { label: 'Query Engine', value: 'Alchemy SDK' }
    ],
    executiveSummary: 'A specialized Web3 intelligence system built with Express.js and Alchemy SDK for analyzing Ethereum smart contract interactions, wallet transfers, and real-time ledger events.',
    problem: 'Navigating raw blockchain data streams and contract calls manually is inefficient for tracking wallet movements and detecting smart contract events.',
    solution: 'Engineered a high-performance backend analytics engine interfacing with Ethereum nodes to query, decode, and store internal transaction logs in SQLite.',
    github: 'https://github.com/ShotgunShinobi/Ethereum-Hunter'
  },
  similarsite: {
    id: 'similarsite',
    title: 'SimilarSite Web Extension',
    subtitle: 'Chrome Extension for Real-Time Site Discovery',
    category: ['Tools', 'Automation'],
    tags: ['JavaScript', 'Chrome Extension', 'Browser API', 'Web Scraping'],
    img: '/project_similarsite.png',
    metrics: [
      { label: 'Manifest', value: 'Version 3' },
      { label: 'Discovery Time', value: 'Instant' },
      { label: 'UX', value: '1-Click Popup' }
    ],
    executiveSummary: 'A Manifest V3 browser extension built to discover and recommend alternative websites and documentation based on the currently open tab.',
    problem: 'Finding related tools or competitive benchmarks while browsing requires manual search queries and context switching.',
    solution: 'Developed a lightweight JavaScript extension that reads active tab host metadata and queries web similarity APIs for instant recommendations.',
    github: 'https://github.com/ShotgunShinobi/SimilarSiteExtenstion'
  },
  autojobs: {
    id: 'autojobs',
    title: 'Auto Jobs Applier AI Agent',
    subtitle: 'Autonomous Job Application Bot',
    category: ['Automation', 'NLP'],
    tags: ['AI Agent', 'Python', 'Selenium', 'LLM', 'Automation'],
    img: '/yt_summary_project.png',
    metrics: [
      { label: 'Automation', value: '100% Autonomous' },
      { label: 'Resume Matching', value: 'Dynamic AI' },
      { label: 'Form Parsing', value: 'Real-time' }
    ],
    executiveSummary: 'An autonomous AI agent that automates the job application process, customizing responses and submitting applications based on user profile telemetry.',
    problem: 'Manual job application submissions require repetitive form filling and custom response drafting, consuming hundreds of hours.',
    solution: 'Utilized Python, Selenium, and LLM text generation to automate job search filtering, form parsing, and personalized response generation.',
    github: 'https://github.com/ShotgunShinobi/Auto_Jobs_Applier'
  },
  yt: {
    id: 'yt',
    title: 'YouTube Transcript Summarizer',
    subtitle: 'Cloud Speech Analytics & Summarization',
    category: ['Automation', 'Cloud'],
    tags: ['Automation', 'Azure Speech', 'Cloud', 'Python', 'NLP'],
    img: '/yt_summary_project.png',
    metrics: [
      { label: 'Extraction Efficiency', value: '+50%' },
      { label: 'Speech API', value: 'Azure AI' },
      { label: 'Processing Speed', value: 'Instant' }
    ],
    executiveSummary: 'A cloud-native web application leveraging Azure Speech Services for automated transcript extraction and key-point synthesis from video streams.',
    problem: 'Consuming multi-hour technical video lectures and webinars to extract key takeaways consumes valuable engineer hours.',
    solution: 'Integrated Azure Speech Services with NLP summarization routines to automatically parse audio transcripts and synthesize structured key highlights.',
    github: 'https://github.com/ShotgunShinobi'
  }
};

export function initDrawer() {
  if (document.getElementById('projectDrawer')) return;

  const drawerHTML = `
    <div class="drawer-overlay" id="drawerOverlay">
      <div class="drawer-panel glass-hud" id="drawerPanel">
        <button class="drawer-close" id="closeDrawer" title="Close Drawer (ESC)">&times;</button>
        <div class="drawer-body" id="drawerBody">
          <!-- Dynamic Content Injected Here -->
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', drawerHTML);

  const overlay = document.getElementById('drawerOverlay');
  const closeBtn = document.getElementById('closeDrawer');

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.closest('#closeDrawer')) {
      close();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      close();
    }
  });
}

export function openDrawer(projectId) {
  const data = projectsData[projectId];
  if (!data) return;

  initDrawer();

  const overlay = document.getElementById('drawerOverlay');
  const body = document.getElementById('drawerBody');

  body.innerHTML = `
    <div class="drawer-header">
      <span class="status-badge"><span class="status-dot"></span> TELEMETRY DOSSIER</span>
      <h2 class="drawer-title">${data.title}</h2>
      <p class="drawer-subtitle">${data.subtitle}</p>
      <div class="project-tags" style="margin-top: 1rem;">
        ${data.tags.map(t => `<span class="tag">${t}</span>`).join('')}
      </div>
    </div>

    <img src="${data.img}" alt="${data.title}" class="drawer-img" />

    <div class="drawer-metrics-grid">
      ${data.metrics.map(m => `
        <div class="drawer-metric-card">
          <div class="metric-value">${m.value}</div>
          <div class="metric-label">${m.label}</div>
        </div>
      `).join('')}
    </div>

    <div class="drawer-section">
      <h3 class="drawer-section-heading">Executive Summary</h3>
      <p class="drawer-text">${data.executiveSummary}</p>
    </div>

    <div class="drawer-section">
      <h3 class="drawer-section-heading">The Challenge</h3>
      <p class="drawer-text">${data.problem}</p>
    </div>

    <div class="drawer-section">
      <h3 class="drawer-section-heading">Architecture & Solution</h3>
      <p class="drawer-text">${data.solution}</p>
    </div>

    <div class="drawer-actions">
      <a href="${data.github}" target="_blank" class="btn btn-gold" style="width: 100%;">View Source Code on GitHub &rarr;</a>
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

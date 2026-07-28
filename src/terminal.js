// Interactive Cyber Command Terminal (CTRL+K / CMD+K)
export function initTerminal() {
  // Create terminal HTML overlay if not present
  if (document.getElementById('terminalOverlay')) return;

  const terminalHTML = `
    <div class="terminal-overlay" id="terminalOverlay">
      <div class="terminal-container glass-hud">
        <div class="terminal-header">
          <div class="terminal-title">
            <span class="terminal-dot red"></span>
            <span class="terminal-dot yellow"></span>
            <span class="terminal-dot green"></span>
            <span class="terminal-name">[ SYS_OVERRIDE :: MARIAN_NEXUS_V2.6 ]</span>
          </div>
          <button class="terminal-close" id="closeTerminal">&times;</button>
        </div>
        <div class="terminal-body" id="terminalBody">
          <div class="terminal-line system-msg">
            <span class="text-gold">✦ MARIAN_NEXUS CORE ONLINE.</span> Type <span class="text-cyan">'help'</span> for available system directives.
          </div>
        </div>
        <div class="terminal-input-row">
          <span class="terminal-prompt">user@marian-nexus:~$</span>
          <input type="text" id="terminalInput" class="terminal-input" placeholder="type 'help', 'skills', 'projects', 'matrix'..." autocomplete="off" spellcheck="false" />
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', terminalHTML);

  const overlay = document.getElementById('terminalOverlay');
  const input = document.getElementById('terminalInput');
  const body = document.getElementById('terminalBody');
  const closeBtn = document.getElementById('closeTerminal');

  function openTerminal() {
    overlay.classList.add('active');
    setTimeout(() => input.focus(), 100);
  }

  function closeTerminal() {
    overlay.classList.remove('active');
  }

  // Keyboard listener for CTRL+K / CMD+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (overlay.classList.contains('active')) {
        closeTerminal();
      } else {
        openTerminal();
      }
    }
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeTerminal();
    }
  });

  // Global delegate for terminal launch buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('.open-terminal-btn')) {
      e.preventDefault();
      openTerminal();
    }
    if (e.target.closest('#closeTerminal') || (e.target === overlay)) {
      closeTerminal();
    }
  });

  // Command handling
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = input.value.trim().toLowerCase();
      input.value = '';

      if (!command) return;

      appendLine(`user@marian-nexus:~$ ${command}`, 'user-command');

      executeCommand(command);
    }
  });

  function appendLine(text, className = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.innerHTML = text;
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
  }

  function executeCommand(cmd) {
    switch (cmd) {
      case 'help':
        appendLine(`
          <div class="terminal-help">
            <div><span class="text-cyan">help</span> - Display system directives</div>
            <div><span class="text-cyan">whoami</span> - Display Systems Engineer profile</div>
            <div><span class="text-cyan">skills</span> - Output technical capabilities breakdown</div>
            <div><span class="text-cyan">projects</span> - List highlighted AI/ML projects</div>
            <div><span class="text-cyan">matrix</span> - Toggle full-screen matrix stream overlay</div>
            <div><span class="text-cyan">contact</span> - Open direct contact modal</div>
            <div><span class="text-cyan">clear</span> - Purge terminal console output</div>
          </div>
        `, 'system-msg');
        break;

      case 'whoami':
        appendLine(`
          <span class="text-gold">MARIAN GEORGE</span> - Systems Engineer @ TCS<br/>
          B.Tech CS (AI & ML Specialization) @ VIT.<br/>
          Building scalable, intelligent NLP, Computer Vision, and LLM applications.
        `, 'info-msg');
        break;

      case 'skills':
        appendLine(`
          <div class="skills-output">
            <div>[AI/ML]      PyTorch ████████████████ 95% | LangChain ██████████████░░ 88%</div>
            <div>[Backend]    Python  ████████████████ 96% | FastAPI   ██████████████░░ 88%</div>
            <div>[Cloud/Ops]  Azure   ██████████████░░ 85% | OpenCV    ██████████████░░ 87%</div>
          </div>
        `, 'info-msg');
        break;

      case 'projects':
        appendLine(`
          1. <a href="/project-nlp.html" class="term-link">[NLP] Automated Document Summarization</a> (Llama-2 / LangChain / HuggingFace) - 95% accuracy<br/>
          2. <a href="/project-dataviz.html" class="term-link">[FINTECH] AI Stock Analysis Tool</a> (Python / Selenium / Predictive ML)
        `, 'info-msg');
        break;

      case 'matrix':
        window.__matrixMode = !window.__matrixMode;
        appendLine(`<span class="text-gold">✦ MATRIX STREAM OVERLAY ${window.__matrixMode ? 'ENGAGED' : 'DISENGAGED'}.</span>`, 'success-msg');
        break;

      case 'contact':
        closeTerminal();
        const contactBtn = document.querySelector('a[href="#contact"]');
        if (contactBtn) contactBtn.click();
        break;

      case 'clear':
        body.innerHTML = `
          <div class="terminal-line system-msg">
            <span class="text-gold">✦ MARIAN_NEXUS CONSOLE PURGED.</span> Type <span class="text-cyan">'help'</span> for directives.
          </div>
        `;
        break;

      default:
        appendLine(`Command not recognized: '<span class="text-red">${cmd}</span>'. Type <span class="text-cyan">'help'</span> for directives.`, 'error-msg');
    }
  }
}

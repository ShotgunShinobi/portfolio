// Interactive Sand Grain Text Particle Engine
// Renders text as thousands of reactive sand particles with physics-based cursor displacement and spring return

export function initSandTextParticles() {
  const container = document.getElementById('sand-hero-container');
  const canvas = document.getElementById('sand-text-canvas');

  if (!container || !canvas) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  let width = 0;
  let height = 0;
  let particles = [];
  let mouse = { x: -1000, y: -1000, radius: 90 };
  let isHovered = false;

  function setDimensions() {
    const rect = container.getBoundingClientRect();
    width = canvas.width = Math.max(rect.width, 300);
    // Determine canvas height for 3 lines of sand text without dead space
    const isMobile = window.innerWidth <= 600;
    const isTablet = window.innerWidth <= 900;
    height = canvas.height = isMobile ? 180 : isTablet ? 230 : 275;
    
    particles = createSandParticles();
  }

  function createSandParticles() {
    const offCanvas = document.createElement('canvas');
    const offCtx = offCanvas.getContext('2d');
    offCanvas.width = width;
    offCanvas.height = height;

    const isMobile = width < 550;
    const isTablet = width < 850;

    // Calculate massive, impactful font sizes without clipping
    const fontSize = isMobile ? Math.min(width * 0.11, 42) : isTablet ? 58 : 76;
    const fontFamily = "'Bricolage Grotesque', 'Outfit', 'Plus Jakarta Sans', sans-serif";

    offCtx.font = `800 ${fontSize}px ${fontFamily}`;
    offCtx.textBaseline = 'top';
    offCtx.fillStyle = '#FFFFFF';

    const lineGap = fontSize * 1.14;

    // Draw Line 1: "Architecting"
    offCtx.fillText('Architecting', 0, 5);

    // Draw Line 2: "Autonomous AI"
    offCtx.fillText('Autonomous AI', 0, 5 + lineGap);

    // Draw Line 3: "& LLM Solutions"
    offCtx.fillText('& LLM Solutions', 0, 5 + lineGap * 2);

    // Sample pixel data to convert 3-line text shape into high-density sand grains
    const imgData = offCtx.getImageData(0, 0, width, height);
    const data = imgData.data;
    const newParticles = [];

    // Ultra-high density sampling step (2px step size for maximum particle density)
    const step = 2;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const index = (y * width + x) * 4;
        const alpha = data[index + 3];

        if (alpha > 100) {
          const colorAlpha = (alpha / 255).toFixed(2);
          const color = `rgba(255, 255, 255, ${colorAlpha})`;

          newParticles.push({
            x: x + (Math.random() - 0.5) * 1.2,
            y: y + (Math.random() - 0.5) * 1.2,
            originX: x,
            originY: y,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            color: color,
            size: Math.random() * 0.7 + 1.25, // Solid, fine sand grain size
            friction: 0.86 + Math.random() * 0.05,
            ease: 0.07 + Math.random() * 0.04
          });
        }
      }
    }

    return newParticles;
  }

  // Handle Mouse Events for Sand Displacement
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x >= -50 && x <= width + 50 && y >= -50 && y <= height + 50) {
      mouse.x = x;
      mouse.y = y;
      isHovered = true;
    } else {
      isHovered = false;
      mouse.x = -1000;
      mouse.y = -1000;
    }
  });

  window.addEventListener('mouseleave', () => {
    isHovered = false;
    mouse.x = -1000;
    mouse.y = -1000;
  });

  // Touch Support for Mobile
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      if (x >= 0 && x <= width && y >= 0 && y <= height) {
        mouse.x = x;
        mouse.y = y;
        isHovered = true;
      }
    }
  });

  window.addEventListener('touchend', () => {
    isHovered = false;
    mouse.x = -1000;
    mouse.y = -1000;
  });

  window.addEventListener('resize', () => {
    setDimensions();
  });

  setDimensions();

  // Animation Loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    const len = particles.length;
    for (let i = 0; i < len; i++) {
      const p = particles[i];

      // Physics: Calculate distance to cursor
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const distSq = dx * dx + dy * dy;
      const radiusSq = mouse.radius * mouse.radius;

      // Disperse sand grains away from mouse cursor
      if (distSq < radiusSq && isHovered) {
        const dist = Math.sqrt(distSq);
        const force = (mouse.radius - dist) / mouse.radius;
        const angle = Math.atan2(dy, dx);
        
        p.vx += Math.cos(angle) * force * 5.5;
        p.vy += Math.sin(angle) * force * 5.5;
      }

      // Spring force returning sand grains to origin text position
      const dxOrigin = p.originX - p.x;
      const dyOrigin = p.originY - p.y;
      
      p.vx += dxOrigin * p.ease;
      p.vy += dyOrigin * p.ease;

      // Apply friction damping
      p.vx *= p.friction;
      p.vy *= p.friction;

      // Update positions
      p.x += p.vx;
      p.y += p.vy;

      // Draw sand grain
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    }

    requestAnimationFrame(animate);
  }

  animate();
}

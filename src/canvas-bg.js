// High-Performance Technical Blueprint & Aerodynamic Wind-Tunnel Interactive Background
// Optimized with offscreen grid caching, batched path rendering, and fast distance checks

export function initCanvasBackground() {
  let canvas = document.getElementById('bg-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    canvas.style.transform = 'translateZ(0)'; // GPU hardware acceleration hint
    document.body.prepend(canvas);
  }

  const ctx = canvas.getContext('2d', { alpha: false });
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouse = { x: width * 0.5, y: height * 0.4, targetX: width * 0.5, targetY: height * 0.4, active: true };

  // Throttle mousemove for maximum rendering responsiveness
  let mouseTicking = false;
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    if (!mouseTicking) {
      mouseTicking = true;
      requestAnimationFrame(() => {
        mouseTicking = false;
      });
    }
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = true;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    renderOffscreenGrid();
    initStreamlines();
    initDraftingNodes();
  });

  // --- 1. OFFSCREEN CACHED GRID RENDERER ---
  const offscreenGridCanvas = document.createElement('canvas');
  const offscreenGridCtx = offscreenGridCanvas.getContext('2d', { alpha: false });

  function renderOffscreenGrid() {
    offscreenGridCanvas.width = width;
    offscreenGridCanvas.height = height;

    // Fill dark obsidian gradient ONCE into offscreen buffer
    const bgGrad = offscreenGridCtx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#060913');
    bgGrad.addColorStop(0.5, '#0A0F1D');
    bgGrad.addColorStop(1, '#0F172A');
    offscreenGridCtx.fillStyle = bgGrad;
    offscreenGridCtx.fillRect(0, 0, width, height);

    const gridSize = 75;

    // Batch all grid line paths into a single GPU draw call
    offscreenGridCtx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    offscreenGridCtx.lineWidth = 0.6;
    offscreenGridCtx.beginPath();
    for (let x = 0; x < width; x += gridSize) {
      offscreenGridCtx.moveTo(x, 0);
      offscreenGridCtx.lineTo(x, height);
    }
    for (let y = 0; y < height; y += gridSize) {
      offscreenGridCtx.moveTo(0, y);
      offscreenGridCtx.lineTo(width, y);
    }
    offscreenGridCtx.stroke();

    // Batch all '+' tick marks into a single GPU draw call
    offscreenGridCtx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
    offscreenGridCtx.lineWidth = 1.0;
    offscreenGridCtx.beginPath();
    for (let x = 0; x < width; x += gridSize) {
      for (let y = 0; y < height; y += gridSize) {
        offscreenGridCtx.moveTo(x - 5, y);
        offscreenGridCtx.lineTo(x + 5, y);
        offscreenGridCtx.moveTo(x, y - 5);
        offscreenGridCtx.lineTo(x, y + 5);
      }
    }
    offscreenGridCtx.stroke();
  }

  // --- 2. AERODYNAMIC WIND-TUNNEL STREAMLINES ---
  const streamlineCount = Math.min(Math.floor(height / 50), 20);
  let streamlines = [];

  class Streamline {
    constructor(yBase, isAccent = false, accentColor = '') {
      this.yBase = yBase;
      this.isAccent = isAccent;
      this.accentColor = accentColor;
      this.speed = Math.random() * 0.8 + 0.6;
      this.phase = Math.random() * Math.PI * 2;
      this.frequency = Math.random() * 0.005 + 0.003;
      this.amplitude = Math.random() * 9 + 4;
      this.width = isAccent ? 1.8 : 0.9;
    }

    draw(time) {
      ctx.beginPath();
      ctx.lineWidth = this.width;
      ctx.strokeStyle = this.isAccent ? this.accentColor : 'rgba(148, 163, 184, 0.12)';

      const points = 24; // Optimized control point count
      const step = width / points;
      const radiusSq = 32400; // 180 * 180

      for (let i = 0; i <= points; i++) {
        const x = i * step;
        let y = this.yBase + Math.sin(x * this.frequency + time * this.speed + this.phase) * this.amplitude;

        // Aerodynamic deflection around cursor (wind-tunnel effect)
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq);
          const force = 1 - dist / 180;
          const deflectionSign = dy >= 0 ? 1 : -1;
          y += force * force * 55 * deflectionSign;
        }

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();

      // Flow particle traveling along the streamline
      const particleX = ((time * 60 * this.speed + this.phase * 100) % (width + 200)) - 100;
      let particleY = this.yBase + Math.sin(particleX * this.frequency + time * this.speed + this.phase) * this.amplitude;

      const pdx = particleX - mouse.x;
      const pdy = particleY - mouse.y;
      const pdistSq = pdx * pdx + pdy * pdy;

      if (pdistSq < radiusSq) {
        const pdist = Math.sqrt(pdistSq);
        const pforce = 1 - pdist / 180;
        const deflectionSign = pdy >= 0 ? 1 : -1;
        particleY += pforce * pforce * 55 * deflectionSign;
      }

      ctx.beginPath();
      ctx.arc(particleX, particleY, this.isAccent ? 2.5 : 1.5, 0, Math.PI * 2);
      ctx.fillStyle = this.isAccent ? this.accentColor : 'rgba(248, 250, 252, 0.35)';
      ctx.fill();
    }
  }

  function initStreamlines() {
    streamlines = [];
    const spacing = height / (streamlineCount + 1);

    const accentColors = [
      'rgba(245, 158, 11, 0.85)',   // Vibrant Golden Amber
      'rgba(56, 189, 248, 0.85)',   // Cyber Electric Cyan
      'rgba(249, 115, 22, 0.80)'    // Deep Sunset Orange
    ];

    for (let i = 1; i <= streamlineCount; i++) {
      const y = i * spacing;
      const isAccent = (i % 5 === 1 || i % 5 === 3);
      const accentColor = isAccent ? accentColors[i % accentColors.length] : '';
      streamlines.push(new Streamline(y, isAccent, accentColor));
    }
  }

  // --- 3. TECHNICAL DRAFTING NODES ---
  const nodeCount = Math.min(Math.floor((width * height) / 22000), 28);
  let draftingNodes = [];

  class DraftingNode {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.size = Math.random() * 2 + 1;
      this.isMajor = Math.random() > 0.82;
      this.label = this.isMajor ? `P-${Math.floor(Math.random() * 900 + 100)}` : '';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.isMajor ? 'rgba(245, 158, 11, 0.7)' : 'rgba(248, 250, 252, 0.35)';
      ctx.fill();

      if (this.isMajor) {
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(this.x - 5, this.y);
        ctx.lineTo(this.x + 5, this.y);
        ctx.moveTo(this.x, this.y - 5);
        ctx.lineTo(this.x, this.y + 5);
        ctx.stroke();

        ctx.font = "8px 'JetBrains Mono', monospace";
        ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
        ctx.fillText(this.label, this.x + 7, this.y + 3);
      }
    }
  }

  function initDraftingNodes() {
    draftingNodes = [];
    for (let i = 0; i < nodeCount; i++) {
      draftingNodes.push(new DraftingNode());
    }
  }

  renderOffscreenGrid();
  initStreamlines();
  initDraftingNodes();

  // --- 4. REACTIVE HUD DRAFTING CROSSHAIR ---
  function drawReactiveHUD() {
    ctx.save();

    // Smooth lerp mouse interpolation
    mouse.x += (mouse.targetX - mouse.x) * 0.15;
    mouse.y += (mouse.targetY - mouse.y) * 0.15;

    const x = mouse.x;
    const y = mouse.y;

    // Tracking ring
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.stroke();

    // Center crosshair
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(x - 30, y);
    ctx.lineTo(x + 30, y);
    ctx.moveTo(x, y - 30);
    ctx.lineTo(x, y + 30);
    ctx.stroke();

    // Telemetry readout box
    const text = `AERO_VEC // X:${Math.round(x)} Y:${Math.round(y)}`;
    ctx.font = "9px 'JetBrains Mono', monospace";
    const textWidth = ctx.measureText(text).width;

    ctx.fillStyle = 'rgba(10, 15, 29, 0.9)';
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.8)';
    ctx.lineWidth = 1;
    ctx.fillRect(x + 12, y - 24, textWidth + 10, 16);
    ctx.strokeRect(x + 12, y - 24, textWidth + 10, 16);

    ctx.fillStyle = '#F8FAFC';
    ctx.fillText(text, x + 17, y - 13);

    ctx.restore();
  }

  // --- 5. MAIN HIGH-SPEED ANIMATION LOOP ---
  let time = 0;

  function animate() {
    // Single fast GPU texture blit for static background + grid
    ctx.drawImage(offscreenGridCanvas, 0, 0);

    time += 0.012;
    for (let i = 0; i < streamlines.length; i++) {
      streamlines[i].draw(time);
    }

    // Fast node distance check using distSq (avoids Math.sqrt)
    const maxDistSq = 110 * 110;
    for (let i = 0; i < draftingNodes.length; i++) {
      draftingNodes[i].update();
      draftingNodes[i].draw();

      for (let j = i + 1; j < draftingNodes.length; j++) {
        const dx = draftingNodes[i].x - draftingNodes[j].x;
        const dy = draftingNodes[i].y - draftingNodes[j].y;
        const distSq = dx * dx + dy * dy;

        if (distSq < maxDistSq) {
          const dist = Math.sqrt(distSq);
          ctx.beginPath();
          ctx.moveTo(draftingNodes[i].x, draftingNodes[i].y);
          ctx.lineTo(draftingNodes[j].x, draftingNodes[j].y);
          const alpha = (1 - dist / 110) * 0.15;
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    drawReactiveHUD();

    requestAnimationFrame(animate);
  }

  animate();
}

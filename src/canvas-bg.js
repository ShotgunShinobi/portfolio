// Interactive Cyber-Royal Particle & Constellation Background
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
    document.body.prepend(canvas);
  }

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouse = { x: width / 2, y: height / 2, active: false };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  });

  // Particle configuration
  const particleCount = Math.min(Math.floor((width * height) / 12000), 90);
  let particles = [];

  const colors = [
    'rgba(157, 78, 221, ',   // Amethyst Purple
    'rgba(112, 0, 255, ',    // Royal Violet
    'rgba(0, 245, 212, ',    // Cyber Cyan
    'rgba(255, 183, 3, '     // Imperial Gold
  ];

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2 + 1;
      this.colorBase = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.5 + 0.2;
      this.pulseSpeed = Math.random() * 0.02 + 0.005;
      this.pulseFactor = 0;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      this.pulseFactor += this.pulseSpeed;
      this.currentAlpha = this.alpha + Math.sin(this.pulseFactor) * 0.2;

      // Mouse attraction / drift
      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (180 - dist) / 180;
          this.x += (dx / dist) * force * 0.8;
          this.y += (dy / dist) * force * 0.8;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.colorBase + Math.max(0.1, this.currentAlpha) + ')';
      ctx.shadowBlur = 12;
      ctx.shadowColor = this.colorBase + '0.8)';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  initParticles();

  // Matrix rain effect overlay state
  window.__matrixMode = false;
  const matrixChars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ$%#@&';
  let matrixDrops = [];
  const fontSize = 14;

  function initMatrix() {
    const columns = Math.floor(width / fontSize);
    matrixDrops = [];
    for (let i = 0; i < columns; i++) {
      matrixDrops[i] = Math.floor(Math.random() * -100);
    }
  }
  initMatrix();

  function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 5, 24, 0.15)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#00F5D4';
    ctx.font = `${fontSize}px 'JetBrains Mono', monospace`;

    for (let i = 0; i < matrixDrops.length; i++) {
      const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
      ctx.fillText(text, i * fontSize, matrixDrops[i] * fontSize);

      if (matrixDrops[i] * fontSize > height && Math.random() > 0.975) {
        matrixDrops[i] = 0;
      }
      matrixDrops[i]++;
    }
  }

  function animate() {
    if (window.__matrixMode) {
      drawMatrix();
    } else {
      ctx.clearRect(0, 0, width, height);

      // Ambient radial dark royal glows
      const grad1 = ctx.createRadialGradient(width * 0.2, height * 0.3, 50, width * 0.2, height * 0.3, 500);
      grad1.addColorStop(0, 'rgba(112, 0, 255, 0.12)');
      grad1.addColorStop(1, 'rgba(10, 5, 24, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 50, width * 0.8, height * 0.7, 600);
      grad2.addColorStop(0, 'rgba(157, 78, 221, 0.1)');
      grad2.addColorStop(1, 'rgba(10, 5, 24, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            const lineAlpha = (1 - dist / 130) * 0.25;
            ctx.strokeStyle = `rgba(157, 78, 221, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

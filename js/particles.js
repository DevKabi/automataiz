/* ====================================================================
   AUTOMATAIZ – Ambient Particle & Glow Canvas System
   Palettes: Green (#19B000), Mustard Yellow (#FFC61A)
   Strictly Zero Blue/Cyan/Purple/Pink
   ==================================================================== */

(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'ambient-canvas';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  const colors = [
    { r: 25, g: 176, b: 0 },    // #19B000 Primary Green
    { r: 76, g: 175, b: 0 },    // #4CAF00 Secondary Green
    { r: 255, g: 198, b: 26 },  // #FFC61A Primary Mustard Yellow
    { r: 255, g: 212, b: 59 }   // #FFD43B Golden Yellow
  ];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.baseAlpha = Math.random() * 0.35 + 0.15;
      this.alpha = this.baseAlpha;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Mouse interaction
      if (mouse.x && mouse.y) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.alpha = Math.min(0.8, this.baseAlpha + force * 0.5);
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        } else {
          this.alpha = this.baseAlpha;
        }
      } else {
        this.alpha = this.baseAlpha;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.alpha * 0.8})`;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Initialize particles
  const particleCount = Math.min(window.innerWidth < 768 ? 35 : 75, 90);
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw ambient corner gradients
    const grad1 = ctx.createRadialGradient(width * 0.2, height * 0.1, 10, width * 0.2, height * 0.1, 450);
    grad1.addColorStop(0, 'rgba(25, 176, 0, 0.045)');
    grad1.addColorStop(1, 'transparent');
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, width, height);

    const grad2 = ctx.createRadialGradient(width * 0.8, height * 0.8, 10, width * 0.8, height * 0.8, 500);
    grad2.addColorStop(0, 'rgba(255, 198, 26, 0.035)');
    grad2.addColorStop(1, 'transparent');
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, width, height);

    // Mouse ambient flashlight
    if (mouse.x && mouse.y) {
      const mouseGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 240);
      mouseGrad.addColorStop(0, 'rgba(25, 176, 0, 0.05)');
      mouseGrad.addColorStop(0.5, 'rgba(255, 198, 26, 0.025)');
      mouseGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = mouseGrad;
      ctx.fillRect(0, 0, width, height);
    }

    // Connect close particles with delicate glowing lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const lineAlpha = (1 - dist / 110) * 0.12;
          ctx.strokeStyle = `rgba(25, 176, 0, ${lineAlpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(render);
  }

  render();
})();

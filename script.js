// === NAVBAR SCROLL ANIMATION ===
const navBar = document.querySelector('.nav-bar');
window.addEventListener('scroll', () => {
  navBar.classList.toggle('scrolled', window.scrollY > 50);
});

// === SCROLL REVEAL EFFECT ===
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(elem => {
  observer.observe(elem);
});

// === GLYPH BACKGROUND EFFECT ===
const canvas = document.createElement('canvas');
canvas.id = 'glyph-canvas';
document.getElementById('hero').appendChild(canvas);

const ctx = canvas.getContext('2d');
const glyphs = '░▒▓█▘▝▗#%?*!1234567890'.split('');
let width, height;

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function drawGlyphWave(t) {
  ctx.clearRect(0, 0, width, height);

  const cols = 140;
  const rows = 80;
  const cellW = width / cols;
  const cellH = height / rows;

  ctx.font = `${Math.floor(cellH * 0.95)}px IBM Plex Mono`;
  ctx.fillStyle = '#999';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      // Onde rallentate
      const shape1 = Math.sin(x * 0.15 + t * 0.0012);
      const shape2 = Math.cos(y * 0.21 + t * 0.0016);
      const shape3 = Math.sin((x + y) * 0.17 + t * 0.0014);
      const noise = Math.sin(x * 0.5 + t * 0.0004) * Math.cos(y * 0.4 - t * 0.0006);
      const combined = shape1 + shape2 + shape3 + noise;

      const index = Math.floor(Math.abs(combined * 4)) % glyphs.length;
      const char = glyphs[index];

      ctx.fillText(char, x * cellW + cellW / 2, y * cellH + cellH / 2);
    }
  }
}

function animateGlyphs(time) {
  drawGlyphWave(time);
  requestAnimationFrame(animateGlyphs);
}
animateGlyphs(0);

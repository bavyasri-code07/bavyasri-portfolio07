/* =========================================================
   script.js
   All interactive behaviour for Bavya Sri's portfolio.
   Organized into small, commented sections so it's easy
   to read, learn from, and extend later.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  setFooterYear();
  setupNav();
  setupMobileMenu();
  setupScrollSpy();
  setupTypingAnimation();
  setupScrollReveal();
  setupNeuralBackground();
});

/* ---------------------------------------------------------
   Footer year
--------------------------------------------------------- */
function setFooterYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ---------------------------------------------------------
   Nav bar background on scroll
--------------------------------------------------------- */
function setupNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ---------------------------------------------------------
   Mobile hamburger menu
--------------------------------------------------------- */
function setupMobileMenu() {
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.classList.toggle('is-open', isOpen);
  });

  // Close the menu after a link is tapped (mobile UX nicety)
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------------------------------------------------------
   Highlight the active nav link based on scroll position
--------------------------------------------------------- */
function setupScrollSpy() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navLinks.length) return;

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => spy.observe(section));
}

/* ---------------------------------------------------------
   Hero typing animation — cycles through a few short lines
--------------------------------------------------------- */
function setupTypingAnimation() {
  const target = document.getElementById('typing-target');
  if (!target) return;

  const lines = [
    'BCA Student & AI Enthusiast',
    'Learning to build with code.',
    'Exploring Artificial Intelligence.',
  ];

  // Respect users who prefer reduced motion — just show the first line.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    target.textContent = lines[0];
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const TYPE_SPEED = 55;
  const DELETE_SPEED = 30;
  const PAUSE_AFTER_TYPE = 1400;
  const PAUSE_AFTER_DELETE = 300;

  function tick() {
    const current = lines[lineIndex];

    if (!deleting) {
      charIndex++;
      target.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, PAUSE_AFTER_TYPE);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      target.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % lines.length;
        setTimeout(tick, PAUSE_AFTER_DELETE);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  tick();
}

/* ---------------------------------------------------------
   Scroll-reveal — fades/slides elements in as they enter view
--------------------------------------------------------- */
function setupScrollReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach((el) => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Small stagger for items that enter together
          const delay = Number(entry.target.dataset.revealDelay || 0);
          setTimeout(() => entry.target.classList.add('in-view'), delay);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  items.forEach((el, i) => {
    // Stagger cards that share a grid row very slightly
    el.dataset.revealDelay = (i % 4) * 70;
    observer.observe(el);
  });
}

/* ---------------------------------------------------------
   Ambient neural-network canvas background
   Lightweight particle field with connecting lines — evokes
   AI/neural networks without being a distracting animation.
--------------------------------------------------------- */
function setupNeuralBackground() {
  const canvas = document.getElementById('net-bg');
  if (!canvas) return;

  // Skip entirely for reduced-motion users
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
    return;
  }

  const ctx = canvas.getContext('2d');
  let width, height, nodes;
  const NODE_COLOR = 'rgba(94, 234, 212, 0.55)';
  const LINE_COLOR = 'rgba(94, 234, 212, 0.12)';
  const LINK_DISTANCE = 150;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    const count = Math.min(70, Math.floor((width * height) / 22000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    // Move + draw nodes
    nodes.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > width) n.vx *= -1;
      if (n.y < 0 || n.y > height) n.vy *= -1;

      ctx.beginPath();
      ctx.arc(n.x, n.y, 1.6, 0, Math.PI * 2);
      ctx.fillStyle = NODE_COLOR;
      ctx.fill();
    });

    // Draw connecting lines between nearby nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DISTANCE) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = LINE_COLOR;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(step);
  }

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(step);
}

// ── Scroll fade-in ──────────────────────────────────────────
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

// ── Compteurs animés ─────────────────────────────────────────
const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el     = e.target;
    const target = +el.dataset.target;
    const dur    = 1600;
    const start  = performance.now();
    const tick   = now => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round((1 - Math.pow(1 - p, 3)) * target);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countObs.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-value[data-target]').forEach(el => countObs.observe(el));

// script.js
// All JS kjøres i en IIFE for å unngå global scope
(function() {
  // --- Nedtelling til bryllupet ---
  // Sett dato og tid for bryllupet her:
  const weddingDate = new Date('2024-08-12T19:00:00+02:00'); // Endre til ønsket dato/tid
  const countdownEl = document.getElementById('countdown');

  function updateCountdown() {
    const now = new Date();
    const diff = weddingDate - now;
    if (diff <= 0) {
      countdownEl.textContent = 'Det er bryllupsdag!';
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    countdownEl.textContent = `${days} dager ${hours}t ${mins}m ${secs}s igjen`;
  }
  if (countdownEl) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // --- Fade-in scroll animasjon ---
  function onScrollFadeIn() {
    document.querySelectorAll('.fade-in').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', onScrollFadeIn);
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('section, .timeline-day, .gallery-grid').forEach(el => {
      el.classList.add('fade-in');
    });
    onScrollFadeIn();
  });
})();
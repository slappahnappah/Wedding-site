// script.js
// All JS kjøres i en IIFE for å unngå global scope
(function() {
  'use strict';

  // --- Mobil navigasjon ---
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Lukk meny når man klikker på en lenke
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // --- Smooth scroll for navigasjonslenker ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80; // Juster for navbar høyde
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // --- Nedtelling til bryllupet ---
  // Sett dato og tid for bryllupet her:
  const weddingDate = new Date('2026-06-12T19:00:00+02:00'); // Endre til ønsket dato/tid
  const countdownEl = document.getElementById('countdown');

  function updateCountdown() {
    if (!countdownEl) return;
    
    const now = new Date();
    const diff = weddingDate - now;
    
    if (diff <= 0) {
      countdownEl.innerHTML = '<div class="wedding-day">Det er bryllupsdag! 🎉</div>';
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);
    
    countdownEl.innerHTML = `
      <div class="countdown-grid">
        <div class="countdown-item">
          <span class="countdown-number">${days}</span>
          <span class="countdown-label">dager</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-number">${hours}</span>
          <span class="countdown-label">timer</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-number">${mins}</span>
          <span class="countdown-label">minutter</span>
        </div>
        <div class="countdown-item">
          <span class="countdown-number">${secs}</span>
          <span class="countdown-label">sekunder</span>
        </div>
      </div>
    `;
  }

  if (countdownEl) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // --- Fade-in scroll animasjon ---
  function onScrollFadeIn() {
    const elements = document.querySelectorAll('.fade-in');
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.8;

    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const elementTop = rect.top;
      
      if (elementTop < triggerPoint) {
        el.classList.add('visible');
      }
    });
  }

  // --- Navbar scroll effekt ---
  function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }

  // --- Event listeners ---
  window.addEventListener('scroll', () => {
    onScrollFadeIn();
    handleNavbarScroll();
  });

  window.addEventListener('DOMContentLoaded', () => {
    // Legg til fade-in klasse på elementer
    const fadeElements = document.querySelectorAll('section, .timeline-day, .info-card, .rsvp-form, .gallery-placeholder');
    fadeElements.forEach(el => {
      el.classList.add('fade-in');
    });
    
    // Kjør første gang
    onScrollFadeIn();
    handleNavbarScroll();
  });

  // --- Form handling ---
  const rsvpForm = document.querySelector('.rsvp-form');
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
      // Her kan du legge til ekstra validering hvis nødvendig
      console.log('RSVP form submitted');
    });
  }

})();
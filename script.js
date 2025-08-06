// script.js
// All JS kjøres i en IIFE for å unngå global scope
(function() {
  'use strict';

  // --- Mobil navigasjon ---
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Lukk meny når man klikker på en lenke
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.setAttribute('aria-expanded', 'false');
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
  const weddingDate = new Date('2026-06-12T19:00:00'); // UTC time for better timezone handling
  const countdownEl = document.getElementById('countdown');
  let countdownInterval;

  function updateCountdown() {
    if (!countdownEl) return;
    
    const now = new Date();
    const diff = weddingDate - now;
    
    if (diff <= 0) {
      countdownEl.innerHTML = '<div class="wedding-day">Det er bryllupsdag! 🎉</div>';
      clearCountdownInterval();
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
    countdownInterval = setInterval(updateCountdown, 1000);
  }
  
  // Clear interval when countdown reaches zero
  function clearCountdownInterval() {
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
  }

  // --- Throttling function for scroll events ---
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
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

  // --- Event listeners with throttling ---
  const throttledScrollHandler = throttle(() => {
    onScrollFadeIn();
    handleNavbarScroll();
  }, 16); // ~60fps
  
  window.addEventListener('scroll', throttledScrollHandler, { passive: true });

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

  // --- Form handling with validation ---
  const rsvpForm = document.querySelector('.rsvp-form');
  const formStatus = document.getElementById('form-status');
  
  function showFormMessage(message, type) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  
  function hideFormMessage() {
    if (!formStatus) return;
    formStatus.className = 'form-status';
  }
  
  function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + '-error');
    if (field && errorEl) {
      field.classList.add('error');
      errorEl.textContent = message;
      errorEl.classList.add('show');
    }
  }
  
  function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(fieldId + '-error');
    if (field && errorEl) {
      field.classList.remove('error');
      errorEl.classList.remove('show');
    }
  }
  
  function clearAllErrors() {
    ['navn', 'epost', 'antall'].forEach(clearFieldError);
  }
  
  function validateForm(formData) {
    let isValid = true;
    clearAllErrors();
    
    // Validate navn
    const navn = formData.get('navn')?.trim();
    if (!navn || navn.length < 2) {
      showFieldError('navn', 'Vennligst skriv inn ditt fulle navn');
      isValid = false;
    }
    
    // Validate epost
    const epost = formData.get('epost')?.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!epost || !emailRegex.test(epost)) {
      showFieldError('epost', 'Vennligst skriv inn en gyldig e-postadresse');
      isValid = false;
    }
    
    // Validate antall
    const antall = formData.get('antall');
    if (!antall) {
      showFieldError('antall', 'Vennligst velg antall personer');
      isValid = false;
    }
    
    return isValid;
  }
  
  if (rsvpForm) {
    // Real-time validation
    ['navn', 'epost', 'antall'].forEach(fieldId => {
      const field = document.getElementById(fieldId);
      if (field) {
        field.addEventListener('blur', () => {
          const formData = new FormData(rsvpForm);
          validateForm(formData);
        });
        
        field.addEventListener('input', () => {
          clearFieldError(fieldId);
        });
      }
    });
    
    rsvpForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = new FormData(rsvpForm);
      
      if (!validateForm(formData)) {
        showFormMessage('Vennligst rett opp feilene over', 'error');
        return;
      }
      
      const submitButton = rsvpForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      const formspreeUrl = rsvpForm.dataset.formspree;
      
      // Check if we have a valid Formspree URL (not the placeholder)
      const hasValidFormspree = formspreeUrl && !formspreeUrl.includes('xyz123');
      
      if (!hasValidFormspree) {
        // Fallback to email client
        const navn = formData.get('navn') || '';
        const epost = formData.get('epost') || '';
        const antall = formData.get('antall') || '';
        const allergier = formData.get('allergier') || '';
        const romLesalles = formData.get('rom-lesalles') || '';
        const romRabiega = formData.get('rom-rabiega') || '';
        
        const subject = encodeURIComponent('RSVP - Bryllup Kristine & Halfdan');
        const body = encodeURIComponent(`Hei!

Her er mitt svar på bryllupsinvitasjonen:

Navn: ${navn}
E-post: ${epost}
Antall personer: ${antall}
Allergier/kosthold: ${allergier}
Rom på Château des Salles: ${romLesalles}
Rom på Domaine Rabiega: ${romRabiega}

Med vennlig hilsen,
${navn}`);
        
        const mailtoUrl = `mailto:halvdan.bigset@gmail.com?subject=${subject}&body=${body}`;
        window.location.href = mailtoUrl;
        
        showFormMessage('E-postklienten din åpnes nå. Send e-posten for å bekrefte din deltakelse.', 'success');
        return;
      }
      
      // Try Formspree if we have a valid endpoint
      try {
        submitButton.disabled = true;
        submitButton.textContent = 'Sender...';
        showFormMessage('Sender ditt svar...', 'loading');
        
        const response = await fetch(formspreeUrl, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          showFormMessage('Takk for ditt svar! Vi ser frem til å feire med dere.', 'success');
          rsvpForm.reset();
          clearAllErrors();
        } else {
          throw new Error('Server error');
        }
      } catch (error) {
        console.error('Form submission error:', error);
        showFormMessage('Sender via e-post i stedet...', 'loading');
        
        // Fallback to email if Formspree fails
        setTimeout(() => {
          const navn = formData.get('navn') || '';
          const subject = encodeURIComponent('RSVP - Bryllup Kristine & Halfdan');
          const body = encodeURIComponent(`Hei! Her er mitt RSVP-svar. (Automatisk e-post)`);
          window.location.href = `mailto:halvdan.bigset@gmail.com?subject=${subject}&body=${body}`;
          showFormMessage('E-postklienten din åpnes. Vennligst send e-posten.', 'success');
        }, 1000);
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    });
  }

  
  // --- Cleanup on page unload ---
  window.addEventListener('beforeunload', () => {
    clearCountdownInterval();
  });
  
})();
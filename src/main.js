const menu = document.getElementById('menu');
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

function updateNavbarState() {
  navbar.classList.toggle('is-scrolled', window.scrollY > 24);
}

updateNavbarState();
window.addEventListener('scroll', updateNavbarState, { passive: true });

function closeMenu() {
  menu.classList.add('hidden');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menú');
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menu.classList.toggle('hidden', isOpen);
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
});

menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => {
  if (window.innerWidth >= 1024) closeMenu();
});

const gallery = document.getElementById('fotosQuinta');
const slides = [...gallery.querySelectorAll('.carousel-item')];
const indicators = [...gallery.querySelectorAll('[data-slide-to]')];
let currentSlide = 0;
const slideTransitionMs = 450;
let slideTimeout;

slides[currentSlide].classList.add('is-active');

function showSlide(index) {
  const nextSlide = (index + slides.length) % slides.length;
  if (nextSlide === currentSlide) return;

  const outgoingSlide = slides[currentSlide];
  const incomingSlide = slides[nextSlide];
  clearTimeout(slideTimeout);
  incomingSlide.hidden = false;
  incomingSlide.classList.remove('is-leaving');

  requestAnimationFrame(() => {
    incomingSlide.classList.add('is-active');
    outgoingSlide.classList.remove('is-active');
    outgoingSlide.classList.add('is-leaving');
  });

  slideTimeout = window.setTimeout(() => {
    outgoingSlide.hidden = true;
    outgoingSlide.classList.remove('is-leaving');
  }, reducedMotion.matches ? 0 : slideTransitionMs);

  currentSlide = nextSlide;
  indicators.forEach((indicator, indicatorIndex) => {
    if (indicatorIndex === currentSlide) {
      indicator.setAttribute('aria-current', 'true');
    } else {
      indicator.removeAttribute('aria-current');
    }
  });
}

indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => showSlide(index));
});
gallery.querySelectorAll('[data-slide-direction]').forEach(button => {
  button.addEventListener('click', () => {
    showSlide(currentSlide + (button.dataset.slideDirection === 'next' ? 1 : -1));
  });
});
gallery.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    showSlide(currentSlide + (event.key === 'ArrowRight' ? 1 : -1));
  }
});

let swipeStartX = 0;
gallery.addEventListener('pointerdown', event => {
  swipeStartX = event.clientX;
});
gallery.addEventListener('pointerup', event => {
  const swipeDistance = event.clientX - swipeStartX;
  if (Math.abs(swipeDistance) < 45) return;
  showSlide(currentSlide + (swipeDistance < 0 ? 1 : -1));
});

const faq = document.getElementById('faq');
faq.querySelectorAll('.accordion-button').forEach(button => {
  button.addEventListener('click', () => {
    const wasOpen = button.getAttribute('aria-expanded') === 'true';
    faq.querySelectorAll('.accordion-button').forEach(otherButton => {
      otherButton.setAttribute('aria-expanded', 'false');
      document.getElementById(otherButton.getAttribute('aria-controls')).hidden = true;
    });
    if (!wasOpen) {
      button.setAttribute('aria-expanded', 'true');
      document.getElementById(button.getAttribute('aria-controls')).hidden = false;
    }
  });
});

const modal = document.getElementById('reserva');
let previouslyFocused = null;

function openModal() {
  previouslyFocused = document.activeElement;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  modal.querySelector('[data-modal-close]').focus();
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
  previouslyFocused?.focus();
}

document.querySelectorAll('[data-modal-open="reserva"]').forEach(button => {
  button.addEventListener('click', openModal);
});
modal.querySelectorAll('[data-modal-close]').forEach(button => {
  button.addEventListener('click', closeModal);
});
modal.addEventListener('click', event => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', event => {
  if (modal.hidden) return;
  if (event.key === 'Escape') closeModal();
  if (event.key !== 'Tab') return;

  const focusable = [...modal.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')];
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const whatsappFloat = document.querySelector('.whatsapp-float');

if ('IntersectionObserver' in window) {
  const heroObserver = new IntersectionObserver(entries => {
    whatsappFloat.classList.toggle('is-visible', !entries[0].isIntersecting);
  }, { threshold: 0.2 });
  heroObserver.observe(document.querySelector('.hero'));
} else {
  whatsappFloat.classList.add('is-visible');
}

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.experience, .amenity, .stay-copy').forEach((element, index) => {
    element.classList.add('reveal');
    element.style.transitionDelay = `${(index % 4) * 90}ms`;
    observer.observe(element);
  });
}

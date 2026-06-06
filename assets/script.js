/* ── Language toggle (sliding pill) ───────────────────────── */
const html = document.documentElement;

document.querySelectorAll('.lang-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    html.lang = html.lang === 'es' ? 'en' : 'es';
    // CSS handles all visual state — no DOM text update needed
  });
});

/* ── Hamburger / mobile menu ───────────────────────────────── */
const hamburgerBtn   = document.getElementById('hamburger-btn');
const mobileCloseBtn = document.getElementById('mobile-close-btn');
const mobileMenu     = document.getElementById('mobile-menu');

function openMenu() {
  mobileMenu.classList.add('open');
  mobileMenu.setAttribute('aria-hidden', 'false');
  hamburgerBtn.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburgerBtn.addEventListener('click', openMenu);
mobileCloseBtn.addEventListener('click', closeMenu);
mobileMenu.querySelectorAll('.mobile-nav-link').forEach(a => {
  a.addEventListener('click', closeMenu);
});
// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
});

/* ── Navbar scroll pill ────────────────────────────────────── */
const navbar = document.getElementById('navbar');

function updateNavbar() {
  if (window.scrollY > 20) {
    navbar.classList.remove('transparent');
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
    navbar.classList.add('transparent');
  }
}
window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

/* ── Hero animation ────────────────────────────────────────── */
const heroContent = document.getElementById('hero-content');
const heroVideo   = document.getElementById('hero-video');

function showHeroContent() {
  heroContent.classList.add('visible');
}

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (heroVideo && !prefersReduced) {
  heroVideo.addEventListener('error', showHeroContent);
  heroVideo.addEventListener('ended', () => {
    heroVideo.style.opacity = '0';
    heroVideo.style.transition = 'opacity 0.5s';
    showHeroContent();
  });
  // If video somehow stalls for > 6s, show content anyway
  const fallbackTimer = setTimeout(showHeroContent, 6000);
  heroVideo.addEventListener('ended', () => clearTimeout(fallbackTimer));
  // If video can't load at all
  if (heroVideo.readyState === 0) {
    heroVideo.load();
  }
} else {
  if (heroVideo) heroVideo.style.display = 'none';
  // Short fade-in for reduced-motion
  setTimeout(showHeroContent, 150);
}

/* ── Countdown ─────────────────────────────────────────────── */
const TARGET_DATE = new Date('2026-11-14T22:00:00Z'); // 4 PM UTC-6 = 22:00 UTC

function pad(n) { return String(n).padStart(2, '0'); }

function updateCountdown() {
  const now  = new Date();
  const diff = TARGET_DATE - now;

  if (diff <= 0) {
    ['cd-days','cd-hours','cd-minutes'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '00';
    });
    return;
  }

  const days    = Math.floor(diff / 86400000);
  const hours   = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);

  const dEl = document.getElementById('cd-days');
  const hEl = document.getElementById('cd-hours');
  const mEl = document.getElementById('cd-minutes');

  if (dEl) dEl.textContent = pad(days);
  if (hEl) hEl.textContent = pad(hours);
  if (mEl) mEl.textContent = pad(minutes);
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ── Copy to clipboard ─────────────────────────────────────── */
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.dataset.value || '';
    if (!value || value.includes('PENDIENTE')) return;

    navigator.clipboard.writeText(value).then(() => {
      const original = btn.textContent;
      btn.textContent = html.lang === 'es' ? '¡Copiado!' : 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('copied');
      }, 2000);
    });
  });
});

/* ── Registry expandable ───────────────────────────────────── */
const bankToggle  = document.getElementById('bank-toggle');
const bankDetails = document.getElementById('bank-details');

if (bankToggle && bankDetails) {
  bankToggle.addEventListener('click', () => {
    const open = bankDetails.classList.toggle('open');
    const isEs = html.lang === 'es';
    bankToggle.querySelector('.toggle-label-es').textContent =
      open ? 'Ocultar detalles' : 'Detalles bancarios';
    bankToggle.querySelector('.toggle-label-en').textContent =
      open ? 'Hide details' : 'Bank details';
    bankToggle.querySelector('.toggle-icon').textContent = open ? '−' : '+';
  });
}

/* ── Polaroid image fallback ───────────────────────────────── */
document.querySelectorAll('.polaroid img').forEach(img => {
  img.addEventListener('error', function () {
    const placeholder = document.createElement('div');
    placeholder.className = 'polaroid-placeholder';
    this.replaceWith(placeholder);
  });
});

/* ── Hero background image fallback ───────────────────────── */
const heroBg = document.getElementById('hero-bg');
if (heroBg) {
  heroBg.addEventListener('error', () => { heroBg.style.display = 'none'; });
}

/* ── Illustration fallback ─────────────────────────────────── */
document.querySelectorAll('.illustration-img').forEach(img => {
  img.addEventListener('error', function () {
    this.closest('.illustration-wrap')?.remove();
  });
});

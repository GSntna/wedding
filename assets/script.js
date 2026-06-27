/* ── Intro animation (mobile only) ────────────────────────── */
(function () {
  const logo = document.getElementById('intro-logo');
  if (!logo) return;

  if (window.innerWidth >= 640) {
    logo.remove();
    return;
  }

  window.scrollTo(0, 0);
  document.body.classList.add('intro-active');

  const navbarH = 52;
  const logoFinalH = 66;
  const logoFinalTop = navbarH * 0.5 - logoFinalH * 0.3;

  setTimeout(() => {
    logo.style.top = logoFinalTop + 'px';
    logo.style.left = '50%';
    logo.style.width = logoFinalH * (185 / 142) + 'px';
    logo.style.maxWidth = 'none';
    logo.style.transform = 'translate(-50%, 0)';

    setTimeout(() => {
      logo.classList.add('in-navbar');
      const navbar = document.getElementById('navbar');
      const venue = document.getElementById('hero-venue');
      const content = document.getElementById('hero-content');
      if (navbar) navbar.classList.add('navbar-visible');
      if (venue) venue.classList.add('hero-visible');
      setTimeout(() => {
        if (content) content.classList.add('hero-visible');
        document.body.classList.remove('intro-active');
      }, 450);
    }, 1700);
  }, 1000);
})();

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

/* ── Countdown ─────────────────────────────────────────────── */
const TARGET_DATE = new Date('2026-11-14T22:00:00Z'); // 4 PM UTC-6 = 22:00 UTC

function pad(n) { return String(n).padStart(2, '0'); }

function updateCountdown() {
  const now  = new Date();
  const diff = TARGET_DATE - now;

  const aEl = document.getElementById('cd-a');
  const bEl = document.getElementById('cd-b');
  const cEl = document.getElementById('cd-c');
  const setLabels = (aEs, aEn, bEs, bEn, cEs, cEn) => {
    document.getElementById('cd-a-es').textContent = aEs;
    document.getElementById('cd-a-en').textContent = aEn;
    document.getElementById('cd-b-es').textContent = bEs;
    document.getElementById('cd-b-en').textContent = bEn;
    document.getElementById('cd-c-es').textContent = cEs;
    document.getElementById('cd-c-en').textContent = cEn;
  };

  if (diff <= 0) {
    if (aEl) aEl.textContent = '00';
    if (bEl) bEl.textContent = '00';
    if (cEl) cEl.textContent = '00';
    return;
  }

  const totalDays = Math.floor(diff / 86400000);

  if (totalDays >= 100) {
    // Mode: Meses / Días / Horas
    let months = (TARGET_DATE.getFullYear() - now.getFullYear()) * 12
               + TARGET_DATE.getMonth() - now.getMonth();
    const afterMonths = new Date(now.getFullYear(), now.getMonth() + months, now.getDate(),
                                 now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    if (afterMonths > TARGET_DATE) months--;
    const remainder = new Date(now.getFullYear(), now.getMonth() + months, now.getDate(),
                               now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    const remDiff = TARGET_DATE - remainder;
    const days  = Math.floor(remDiff / 86400000);
    const hours = Math.floor((remDiff % 86400000) / 3600000);

    if (aEl) aEl.textContent = pad(months);
    if (bEl) bEl.textContent = pad(days);
    if (cEl) cEl.textContent = pad(hours);
    setLabels('Meses','Months','Días','Days','Horas','Hours');
  } else {
    // Mode: Días / Horas / Minutos
    const hours   = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);

    if (aEl) aEl.textContent = pad(totalDays);
    if (bEl) bEl.textContent = pad(hours);
    if (cEl) cEl.textContent = pad(minutes);
    setLabels('Días','Days','Horas','Hours','Minutos','Minutes');
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ── Copy to clipboard ─────────────────────────────────────── */
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.dataset.value || '';
    if (!value || value.includes('PENDIENTE')) return;

    navigator.clipboard.writeText(value).then(() => {
      const original = btn.innerHTML;
      btn.textContent = html.lang === 'es' ? '¡Copiado!' : 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerHTML = original;
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
    bankToggle.querySelector('.toggle-label-es').textContent =
      open ? 'Ocultar detalles' : 'Detalles bancarios';
    bankToggle.querySelector('.toggle-label-en').textContent =
      open ? 'Hide details' : 'Bank details';
    bankToggle.querySelector('.toggle-icon').textContent = open ? '−' : '+';
  });
}

/* ── Illustration fallback ─────────────────────────────────── */
document.querySelectorAll('.illustration-img').forEach(img => {
  img.addEventListener('error', function () {
    this.closest('.illustration-wrap')?.remove();
  });
});

/* ── Illustration fade-in on scroll ───────────────────────── */
const illustrationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      illustrationObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.section-illustration, #hero-venue').forEach(img => {
  if (img.id === 'hero-venue' && window.innerWidth < 640) return;
  illustrationObserver.observe(img);
});

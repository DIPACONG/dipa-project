// main.js — perilaku yang dipakai di semua halaman: navigasi mobile & filter tab

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initFilterTabs();
  markActiveNavLink();
});

/* ---------- Navigasi mobile (hamburger) ---------- */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const overlay = document.getElementById('nav-overlay');
  const body = document.body;
  if (!toggle || !overlay) return;

  const closeNav = () => {
    overlay.classList.remove('is-open');
    toggle.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('no-scroll');
  };

  const openNav = () => {
    overlay.classList.add('is-open');
    toggle.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    body.classList.add('no-scroll');
  };

  toggle.addEventListener('click', () => {
    const isOpen = overlay.classList.contains('is-open');
    isOpen ? closeNav() : openNav();
  });

  overlay.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeNav);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeNav();
  });
}

/* ---------- Penanda halaman aktif di nav ---------- */
function markActiveNavLink() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav-link]').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === current) {
      link.setAttribute('aria-current', 'page');
      link.classList.add('opacity-100');
      link.classList.remove('opacity-60');
    }
  });
}

/* ---------- Filter tab generik (dipakai di Galeri & Proyek) ----------
   Struktur HTML yang diharapkan:
   <button data-filter-btn data-filter="semua|kategori">...</button>
   <div data-filter-item data-category="kategori">...</div>
*/
function initFilterTabs() {
  const buttons = document.querySelectorAll('[data-filter-btn]');
  const items = document.querySelectorAll('[data-filter-item]');
  if (!buttons.length || !items.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      buttons.forEach((b) => {
        const active = b === btn;
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
        b.classList.toggle('bg-black', active);
        b.classList.toggle('text-white', active);
        b.classList.toggle('text-black', !active);
      });

      items.forEach((item) => {
        const category = item.getAttribute('data-category');
        const show = filter === 'semua' || category === filter;
        item.classList.toggle('is-hidden', !show);
      });

      const grid = items[0].closest('[data-filter-grid]');
      if (grid) {
        grid.setAttribute(
          'aria-label',
          filter === 'semua' ? 'Menampilkan semua item' : `Menampilkan kategori ${filter}`
        );
      }
    });
  });
}

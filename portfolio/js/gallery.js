// gallery.js — Tugas JavaScript: lightbox galeri foto
// Fitur: buka gambar dalam mode besar, navigasi berikutnya/sebelumnya,
// tutup dengan Escape/klik luar/tombol, kunci scroll, kembalikan fokus,
// dan hanya menavigasi foto yang sedang terlihat (mengikuti filter aktif).

document.addEventListener('DOMContentLoaded', () => {
  const triggers = Array.from(document.querySelectorAll('[data-lightbox-trigger]'));
  const lightbox = document.getElementById('lightbox');
  if (!triggers.length || !lightbox) return;

  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const btnClose = document.getElementById('lightbox-close');
  const btnNext = document.getElementById('lightbox-next');
  const btnPrev = document.getElementById('lightbox-prev');
  const backdrop = document.getElementById('lightbox-backdrop');

  let currentIndex = 0;
  let lastFocusedTrigger = null;

  function visibleTriggers() {
    // hanya foto yang tidak sedang disembunyikan oleh filter aktif
    return triggers.filter((t) => {
      const item = t.closest('[data-filter-item]');
      return !item || !item.classList.contains('is-hidden');
    });
  }

  function openLightbox(trigger) {
    const list = visibleTriggers();
    currentIndex = list.indexOf(trigger);
    if (currentIndex === -1) currentIndex = 0;
    lastFocusedTrigger = trigger;
    render(list);
    lightbox.classList.add('is-open');
    document.body.classList.add('no-scroll');
    btnClose.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    document.removeEventListener('keydown', onKeydown);
    if (lastFocusedTrigger) lastFocusedTrigger.focus();
  }

  function render(list) {
    const trigger = list[currentIndex];
    if (!trigger) return;
    const fullSrc = trigger.getAttribute('data-full') || trigger.querySelector('img').src;
    const title = trigger.getAttribute('data-title') || '';
    const meta = trigger.getAttribute('data-meta') || '';

    lightboxImg.style.opacity = '0';
    const swap = () => {
      lightboxImg.src = fullSrc;
      lightboxImg.alt = title;
      lightboxImg.onload = () => { lightboxImg.style.opacity = '1'; };
    };
    setTimeout(swap, 120);

    lightboxCaption.textContent = [title, meta].filter(Boolean).join(' — ');
    lightboxCounter.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(list.length).padStart(2, '0')}`;
  }

  function step(delta) {
    const list = visibleTriggers();
    if (!list.length) return;
    currentIndex = (currentIndex + delta + list.length) % list.length;
    render(list);
  }

  function onKeydown(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(trigger);
    });
  });

  btnClose.addEventListener('click', closeLightbox);
  backdrop.addEventListener('click', closeLightbox);
  btnNext.addEventListener('click', () => step(1));
  btnPrev.addEventListener('click', () => step(-1));
});

(() => {
  const modal = document.getElementById('contactModal');
  if (!modal) return;

  const form = modal.querySelector('form');
  const status = modal.querySelector('.formStatus');
  const closeBtn = modal.querySelector('.closeModal');

  const openers = document.querySelectorAll('.finalCta .btn.email, .siteFooter .chip.email');
  const open = () => {
    modal.classList.add('is-open');
    document.body.classList.add('no-scroll');
    modal.setAttribute('aria-hidden', 'false');
    // focus first field
    const first = modal.querySelector('input, textarea, button');
    if (first) first.focus();
  };
  const close = () => {
    modal.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    modal.setAttribute('aria-hidden', 'true');
    if (status) {
      status.textContent = '';
      status.classList.remove('success');
    }
    if (form) form.reset();
  };

  // Open on email buttons
  openers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      open();
    });
  });

  // Close handlers
  closeBtn?.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
  });
  // Backdrop click (only when clicking outside the card)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  // Simple confirmation on submit (no real submission)
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (status) {
      status.textContent = "Thanks! Your message has been noted. I'll get back to you shortly.";
      status.classList.add('success');
    }
    // Optional: simulate sending delay then close
    setTimeout(close, 1400);
  });
})();
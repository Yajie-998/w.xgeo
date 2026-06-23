// FAQ 折叠交互
document.querySelectorAll('.faq-q').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    item.classList.toggle('open');
  });
});

// 滚动入场动画
const revealEls = document.querySelectorAll('.feature, .grid-card, .price-card, .faq-item, .section-title, .section-sub, .hero-card');
revealEls.forEach((el) => el.classList.add('reveal'));

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => io.observe(el));

// 数字滚动动画
function animateNumber(el) {
  const target = parseFloat(el.dataset.num);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const start = performance.now();
  const isFloat = !Number.isInteger(target);
  function tick(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const val = target * eased;
    el.textContent = (isFloat ? val.toFixed(1) : Math.round(val)) + suffix;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
document.querySelectorAll('[data-num]').forEach((el) => {
  const raw = el.textContent.trim();
  const match = raw.match(/^([\d.]+)(.*)$/);
  if (match) {
    el.dataset.num = match[1];
    el.dataset.suffix = match[2];
    el.textContent = '0' + match[2];
    const io2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            animateNumber(el);
            io2.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    io2.observe(el);
  }
});

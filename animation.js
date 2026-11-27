/* OYT script animations. Load after script.js */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !document.body.animate) return;
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const ease = 'cubic-bezier(.22,1,.36,1)';
  const colours = ['#eec7c9', '#d3c6df', '#b5d6ee', '#efd1b9', '#f2e59c', '#c7d5b5'];
  /* Temporary decorative element that removes itself after animating */
  function particle(css, frames, options) {
    const el = document.createElement('span');
    el.setAttribute('aria-hidden', 'true');
    el.style.cssText = 'position:fixed;pointer-events:none;z-index:50;' + css;
    document.body.append(el);
    el.animate(frames, options).onfinish = () => el.remove();
  }

  /* 1. Scroll reveal with stagger */
  if ('IntersectionObserver' in window) {
    const groups = [
      ['.head, .lead, .closing, .quote .in > *, .news', { opacity: 0, translate: '0 40px' }],
      ['.cat, .prod, .theme', { opacity: 0, translate: '0 50px', scale: '.9' }],
      ['.steps li, .yours article, .rev, .foot > div', { opacity: 0, translate: '0 40px' }],
      ['.plist', { opacity: 0, translate: '-40px 0' }],
      ['.panel, .why dl > div', { opacity: 0, translate: '40px 0' }]
    ];
    const start = new Map();
    const observer = new IntersectionObserver(entries => {
      entries.filter(e => e.isIntersecting).forEach((entry, i) => {
        const el = entry.target;
        observer.unobserve(el);
        el.style.opacity = '';
        el.animate([start.get(el), { opacity: 1, translate: '0 0', scale: '1' }],
          { duration: 800, delay: i * 110, easing: ease, fill: 'backwards' });
      });
    }, { threshold: 0.12 });
    groups.forEach(([selector, from]) => $$(selector).forEach(el => {
      el.style.animation = 'none';  /* replaces the CSS scroll effect */
      el.style.opacity = '0';
      start.set(el, from);
      observer.observe(el);
    }));
    /* Keyboard users: never leave a focused item hidden */
    document.addEventListener('focusin', e => {
      for (let el = e.target; el; el = el.parentElement) if (start.has(el)) el.style.opacity = '';
    });
  }

  /* 2. Scroll progress bar and header shadow */
  const bar = document.createElement('div');
  bar.setAttribute('aria-hidden', 'true');
  bar.style.cssText = 'position:fixed;top:0;left:0;right:0;height:4px;z-index:60;pointer-events:none;transform-origin:left;background:linear-gradient(90deg,' + colours.join() + ')';
  document.body.append(bar);
  const header = $('header');
  header.style.transition = 'box-shadow .3s';
  function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
    header.style.boxShadow = scrollY > 60 ? '0 8px 24px rgba(0,0,0,.07)' : 'none';
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  /* 3. Journal tilts toward the mouse */
  const studio = $('#studio'), cover = $('#cover');
  if (matchMedia('(hover: hover)').matches) {
    cover.style.transition = 'background-color .35s, transform .2s ease-out';
    studio.addEventListener('pointermove', e => {
      const r = $('#book').getBoundingClientRect();
      const clamp = v => Math.max(-.5, Math.min(.5, v));
      const x = clamp((e.clientX - r.left) / r.width - .5);
      const y = clamp((e.clientY - r.top) / r.height - .5);
      cover.style.transform = `perspective(900px) rotateY(${x * 18}deg) rotateX(${-y * 14}deg)`;
    });
    studio.addEventListener('pointerleave', () => cover.style.transform = '');
  }

  /* 4. Sparkle burst and cover wobble on colour change */
  $$('.sw').forEach(sw => sw.addEventListener('click', () => {
    cover.animate([{ scale: '1' }, { scale: '.95', rotate: '-2deg' }, { scale: '1.03', rotate: '1deg' }, { scale: '1', rotate: '0deg' }],
      { duration: 500, easing: 'ease-out' });
    const r = cover.getBoundingClientRect();
    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2;
      const size = 14 + Math.random() * 14;
      particle(`left:${r.left + r.width / 2}px;top:${r.top + r.height / 2}px;width:${size}px;height:${size}px;background:${i % 7 === 6 ? '#545454' : colours[i % 6]};clip-path:polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%)`,
        [{ translate: '0 0', opacity: 1, scale: '.4' },
         { translate: `${Math.cos(angle) * 210}px ${Math.sin(angle) * 230}px`, opacity: 0, scale: '1.2', rotate: '180deg' }],
        { duration: 900, easing: ease });
    }
  }));

  /* 5. Name bounces while typing, new tabs follow */
  $('#name').addEventListener('input', () =>
    $('#bname').animate([{ translate: '0 6px', opacity: .4 }, { translate: '0 0', opacity: 1 }], { duration: 250, easing: ease }));

  /* 6. Add to cart: dot flies to the cart, then the icon bounces */
  $$('.add').forEach(btn => btn.addEventListener('click', () => {
    const a = btn.getBoundingClientRect(), b = $('#cart').getBoundingClientRect();
    const dx = b.left - a.left - a.width / 2 + b.width / 2;
    const dy = b.top - a.top - a.height / 2 + b.height / 2;
    particle(`left:${a.left + a.width / 2 - 10}px;top:${a.top + a.height / 2 - 10}px;width:20px;height:20px;border-radius:50%;background:#eec7c9;border:2px solid #000`,
      [{ translate: '0 0', scale: '1' }, { translate: `${dx * .5}px ${dy * .5 - 90}px`, scale: '1.2' }, { translate: `${dx}px ${dy}px`, scale: '.3' }],
      { duration: 800, easing: 'ease-in-out' });
    setTimeout(() => $('#cart').animate([{ rotate: '0deg' }, { rotate: '-18deg', scale: '1.3' }, { rotate: '14deg' }, { rotate: '0deg', scale: '1' }],
      { duration: 500 }), 750);
  }));

  /* 7. Ripple on button clicks */
  document.addEventListener('pointerdown', e => {
    if (!e.target.closest('.btn, .chip, .plist button')) return;
    particle(`left:${e.clientX - 10}px;top:${e.clientY - 10}px;width:20px;height:20px;border-radius:50%;background:rgba(211,198,223,.75)`,
      [{ scale: '.3', opacity: 1 }, { scale: '5', opacity: 0 }], { duration: 550, easing: 'ease-out' });
  });
})();
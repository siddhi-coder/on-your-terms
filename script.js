const $ = s => document.querySelector(s);
        let tt; function toast(m) { const t = $('#toast'); t.textContent = m; t.hidden = false; clearTimeout(tt); tt = setTimeout(() => t.hidden = true, 2800) }
        const C = { Pink: '#eec7c9', Purple: '#d3c6df', Blue: '#b5d6ee', Peach: '#efd1b9', Yellow: '#f2e59c', Green: '#c7d5b5' };
        /* hero journal studio */
        Object.entries(C).forEach(([n, c], i) => { const b = document.createElement('button'); b.className = 'sw'; b.style.setProperty('--c', c); b.ariaLabel = n + ' cover'; b.setAttribute('aria-pressed', !i); b.onclick = () => { document.querySelectorAll('.sw').forEach(x => x.setAttribute('aria-pressed', x === b)); $('#cover').style.backgroundColor = c }; $('#swatches').append(b) });
        const S = [['Plan', C.Blue], ['Track', C.Yellow], ['Reflect', C.Purple], ['Money', C.Green], ['Study', C.Peach]], on = new Set(['Plan', 'Track', 'Reflect']);
        function tabs() { $('#tabs').innerHTML = S.filter(s => on.has(s[0])).map(s => `<i style="background:${s[1]};filter:saturate(1.3) brightness(.97)">${s[0]}</i>`).join('') }
        S.forEach(([n]) => { const b = document.createElement('button'); b.className = 'chip'; b.textContent = n; b.setAttribute('aria-pressed', on.has(n)); b.onclick = () => { on.has(n) ? on.delete(n) : on.add(n); b.setAttribute('aria-pressed', on.has(n)); tabs() }; $('#sections').append(b) }); tabs();
        $('#name').oninput = e => $('#bname').textContent = e.target.value.trim() || 'You';
        $('#create').onclick = () => setTimeout(() => $('#name').focus({ preventScroll: true }), 500);
        /* cover artwork, CSS only */
        const A = {
            floral: `radial-gradient(circle,#f2e59c 0 5px,transparent 6px) 0 0/48px 48px,radial-gradient(circle at 50% 28%,#eec7c9 0 8px,transparent 9px) 0 0/48px 48px,radial-gradient(circle at 72% 50%,#eec7c9 0 8px,transparent 9px) 0 0/48px 48px,radial-gradient(circle at 50% 72%,#eec7c9 0 8px,transparent 9px) 0 0/48px 48px,radial-gradient(circle at 28% 50%,#eec7c9 0 8px,transparent 9px) 0 0/48px 48px,#c7d5b5`,
            bhagwan: `repeating-radial-gradient(circle at 50% 38%,transparent 0 13px,rgba(255,255,255,.75) 14px 16px),radial-gradient(circle at 50% 38%,#f2e59c,#efd1b9 75%)`,
            minimal: `linear-gradient(#545454,#545454) 50% 20%/40% 1px no-repeat,#f1efec`,
            colour: `conic-gradient(from 20deg at 60% 40%,#eec7c9 0 60deg,#f2e59c 0 120deg,#c7d5b5 0 180deg,#b5d6ee 0 240deg,#d3c6df 0 300deg,#efd1b9 0)`,
            pastel: `linear-gradient(160deg,#eec7c9,#d3c6df 50%,#b5d6ee)`,
            vintage: `repeating-linear-gradient(90deg,#efd1b9 0 18px,#e4c3a8 18px 20px,#c7d5b5 20px 26px,#efd1b9 26px 30px)`,
            dots: `radial-gradient(#fff 3px,transparent 4px) 0 0/20px 20px,#b5d6ee`,
            grid: `linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px) 0 0/18px 18px,linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px) 0 0/18px 18px,#d3c6df`
        };
        const P = [['Daily Planner', 'Planners', 'Priorities and schedules in one place.', A.dots], ['Reflection Journal', 'Journals', 'Room for thoughts, gratitude and ideas.', A.floral], ['Habit Tracker', 'Trackers', 'Follow your routines month by month.', A.grid], ['Gift Combo', 'Gift Combo', 'A matching set to give someone special.', A.pastel]];
        $('#prods').innerHTML = P.map(p => `<article class="prod"><div class="shot"><div class="mini" style="--art:${p[3].replace(/"/g, "'")}"><span>${p[0]}</span></div></div><h3>${p[0]}</h3><p>${p[2]}</p><button class="btn alt add" data-n="${p[0]}">Add to cart</button></article>`).join('');
        let n = 0; document.querySelectorAll('.add').forEach(b => b.onclick = () => { $('#count').textContent = ++n; toast(b.dataset.n + ' added to cart') });
        $('#cart').onclick = () => toast(n ? `${n} item${n > 1 ? 's' : ''} in your cart. Checkout connects when the store goes live` : 'Your cart is empty');
        const U = [['Productivity', C.Blue, 'Get clear on what matters and follow through.', ['Daily planner', 'To-do lists', 'Goal pages']], ['Wellness', C.Green, 'Make time to check in with your routines and yourself.', ['Habit tracker', 'Gratitude pages', 'Sleep and water logs']], ['Finances', C.Yellow, 'Keep your spending and savings goals in view.', ['Budget planner', 'Expense tracker', 'Savings goals']], ['Studies', C.Peach, 'Organise subjects, deadlines and revision.', ['Study planner', 'Exam countdown', 'Reading log']], ['Personal Growth', C.Purple, 'Reflect on where you are and where you want to go.', ['Reflection journal', 'Vision pages', 'Monthly reviews']], ['Self-expression', C.Pink, 'A free space for ideas, memories and dreams.', ['Free-writing pages', 'Memory pages', 'Dream list']]];
        function pick(i) { const u = U[i]; $('#panel').style.setProperty('--c', u[1]); $('#panel').innerHTML = `<h3 style="font-size:2.2rem">${u[0]}</h3><p>${u[2]}</p><ul>${u[3].map(x => `<li>${x}</li>`).join('')}</ul><a class="btn" href="#popular">Explore Collections</a>`; document.querySelectorAll('#plist button').forEach((b, j) => b.setAttribute('aria-selected', i == j)) }
        U.forEach((u, i) => { const b = document.createElement('button'); b.role = 'tab'; b.textContent = u[0]; b.style.setProperty('--c', u[1]); b.onclick = () => pick(i); $('#plist').append(b) }); pick(0);
        const T = [['Bhagwan', 'Devotional calm for every day', A.bhagwan], ['Floral', 'Soft blooms and fresh energy', A.floral], ['Minimalist', 'Clean, quiet and clutter-free', A.minimal], ['Colourful', 'Bright pages, bold moods', A.colour], ['Pastel', 'Gentle shades that soothe', A.pastel], ['Vintage', 'Old-school charm', A.vintage], ['Dotted', 'Playful and light', A.dots]];
        $('#tgrid').innerHTML = T.map(t => `<a class="theme" href="#studio" style="--art:${t[2]}"><div><h3>${t[0]}</h3><p>${t[1]}</p></div></a>`).join('') + '<div class="theme last"><h3>Something of your own?</h3><a class="btn" href="#studio">Create Your Journal</a></div>';
        $('#menu').onclick = e => { const o = $('#links').classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', o) };
        $('#links').onclick = () => $('#links').classList.remove('open');
        $('#sbtn').onclick = () => { const s = $('#search'); s.hidden = !s.hidden; $('#sbtn').setAttribute('aria-expanded', !s.hidden); if (!s.hidden) $('#q').focus() };
        const I = [...P.map(p => [p[0], '#popular']), ...T.map(t => [t[0] + ' theme', '#themes']), ...U.map(u => [u[0], '#purposes'])];
        $('#q').oninput = e => { const v = e.target.value.toLowerCase().trim(), m = I.filter(i => i[0].toLowerCase().includes(v)); $('#results').innerHTML = !v ? '' : m.length ? m.map(i => `<a class="chip" href="${i[1]}">${i[0]}</a>`).join('') : 'No matches. Try “planner” or “floral”.' };
        document.querySelectorAll('[data-msg]').forEach(b => b.onclick = () => toast(b.dataset.msg));
        $('#sub').onsubmit = e => { e.preventDefault(); toast('Preview only: signup is not connected yet, so your email was not saved') };


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
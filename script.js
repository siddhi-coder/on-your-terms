const $=s=>document.querySelector(s);
let tt;function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(tt);tt=setTimeout(()=>t.hidden=true,2800)}
const C={Pink:'#eec7c9',Purple:'#d3c6df',Blue:'#b5d6ee',Peach:'#efd1b9',Yellow:'#f2e59c',Green:'#c7d5b5'};
/* hero journal studio */
Object.entries(C).forEach(([n,c],i)=>{const b=document.createElement('button');b.className='sw';b.style.setProperty('--c',c);b.ariaLabel=n+' cover';b.setAttribute('aria-pressed',!i);b.onclick=()=>{document.querySelectorAll('.sw').forEach(x=>x.setAttribute('aria-pressed',x===b));$('#cover').style.backgroundColor=c};$('#swatches').append(b)});
const S=[['Plan',C.Blue],['Track',C.Yellow],['Reflect',C.Purple],['Money',C.Green],['Study',C.Peach]],on=new Set(['Plan','Track','Reflect']);
function tabs(){$('#tabs').innerHTML=S.filter(s=>on.has(s[0])).map(s=>`<i style="background:${s[1]};filter:saturate(1.3) brightness(.97)">${s[0]}</i>`).join('')}
S.forEach(([n])=>{const b=document.createElement('button');b.className='chip';b.textContent=n;b.setAttribute('aria-pressed',on.has(n));b.onclick=()=>{on.has(n)?on.delete(n):on.add(n);b.setAttribute('aria-pressed',on.has(n));tabs()};$('#sections').append(b)});tabs();
$('#name').oninput=e=>$('#bname').textContent=e.target.value.trim()||'You';
$('#create').onclick=()=>setTimeout(()=>$('#name').focus({preventScroll:true}),500);
/* cover artwork, CSS only */
const A={floral:`radial-gradient(circle,#f2e59c 0 5px,transparent 6px) 0 0/48px 48px,radial-gradient(circle at 50% 28%,#eec7c9 0 8px,transparent 9px) 0 0/48px 48px,radial-gradient(circle at 72% 50%,#eec7c9 0 8px,transparent 9px) 0 0/48px 48px,radial-gradient(circle at 50% 72%,#eec7c9 0 8px,transparent 9px) 0 0/48px 48px,radial-gradient(circle at 28% 50%,#eec7c9 0 8px,transparent 9px) 0 0/48px 48px,#c7d5b5`,
bhagwan:`repeating-radial-gradient(circle at 50% 38%,transparent 0 13px,rgba(255,255,255,.75) 14px 16px),radial-gradient(circle at 50% 38%,#f2e59c,#efd1b9 75%)`,
minimal:`linear-gradient(#545454,#545454) 50% 20%/40% 1px no-repeat,#f1efec`,
colour:`conic-gradient(from 20deg at 60% 40%,#eec7c9 0 60deg,#f2e59c 0 120deg,#c7d5b5 0 180deg,#b5d6ee 0 240deg,#d3c6df 0 300deg,#efd1b9 0)`,
pastel:`linear-gradient(160deg,#eec7c9,#d3c6df 50%,#b5d6ee)`,
vintage:`repeating-linear-gradient(90deg,#efd1b9 0 18px,#e4c3a8 18px 20px,#c7d5b5 20px 26px,#efd1b9 26px 30px)`,
dots:`radial-gradient(#fff 3px,transparent 4px) 0 0/20px 20px,#b5d6ee`,
grid:`linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px) 0 0/18px 18px,linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px) 0 0/18px 18px,#d3c6df`};
const P=[['Daily Planner','Planners','Priorities and schedules in one place.',A.dots],['Reflection Journal','Journals','Room for thoughts, gratitude and ideas.',A.floral],['Habit Tracker','Trackers','Follow your routines month by month.',A.grid],['Gift Combo','Gift Combo','A matching set to give someone special.',A.pastel]];
$('#prods').innerHTML=P.map(p=>`<article class="prod"><div class="shot"><div class="mini" style="--art:${p[3].replace(/"/g,"'")}"><span>${p[0]}</span></div></div><h3>${p[0]}</h3><p>${p[2]}</p><button class="btn alt add" data-n="${p[0]}">Add to cart</button></article>`).join('');
let n=0;document.querySelectorAll('.add').forEach(b=>b.onclick=()=>{$('#count').textContent=++n;toast(b.dataset.n+' added to cart')});
$('#cart').onclick=()=>toast(n?`${n} item${n>1?'s':''} in your cart. Checkout connects when the store goes live`:'Your cart is empty');
/* Explore by Purpose */
const U=[
 ['Productivity',C.Blue,'Plan with focus','Get clear on what matters and follow through.',['Daily planner','To-do lists','Goal pages'],"Today's focus",['Top three priorities','Finish one big task','Reply to messages','Plan tomorrow'],'<path d="M13 3 5 14h6l-1 7 9-12h-6z"/>'],
 ['Wellness',C.Green,'Care for yourself','Make time to check in with your routines and yourself.',['Habit tracker','Gratitude pages','Sleep and water logs'],'My daily check-in',['Drink enough water','Move my body','Write one gratitude','Sleep on time'],'<path d="M12 20S4 15 4 9a4.300 4.300 0 0 1 8-2.200A4.300 4.300 0 0 1 20 9c0 6-8 11-8 11z"/>'],
 ['Finances',C.Yellow,'Track your money','Keep your spending and savings goals in view.',['Budget planner','Expense tracker','Savings goals'],'Money notes',['Set this month’s budget','Note today’s spends','Check upcoming bills','Add to savings'],'<rect x="3" y="6" width="18" height="13" rx="3"/><path d="M3 10h18M15 15h3"/>'],
 ['Studies',C.Peach,'Stay exam ready','Organise subjects, deadlines and revision.',['Study planner','Exam countdown','Reading log'],'Study plan',['Revise one chapter','Practise questions','Submit assignment','Update exam countdown'],'<path d="m2 9 10-5 10 5-10 5zM6 11v6c3 3 9 3 12 0v-6M22 9v6"/>'],
 ['Personal Growth',C.Purple,'Reflect and grow','Reflect on where you are and where you want to go.',['Reflection journal','Vision pages','Monthly reviews'],'Monthly reflection',['What went well','What I learned','What I will change','My next step'],'<path d="M12 21v-9M12 13C6 13 4 9 4 5c5 0 8 2 8 8zM12 15c0-5 3-7 8-7 0 4-2 7-8 7z"/>'],
 ['Self-expression',C.Pink,'Write freely','A free space for ideas, memories and dreams.',['Free-writing pages','Memory pages','Dream list'],'Just for me',['A thought on my mind','A memory to keep','An idea to try','A dream of mine'],'<path d="m4 20 1-5L16 4l4 4L9 19zM14 6l4 4"/>']
];
function pick(i){
 const [name,colour,,text,items,page,rows]=U[i],panel=$('#panel');
 panel.style.setProperty('--c',colour);
 panel.setAttribute('aria-labelledby','ptab'+i);
 panel.innerHTML=`<div class="pinfo"><h3>${name}</h3><p>${text}</p><ul>${items.map(x=>`<li>${x}</li>`).join('')}</ul><a class="btn" href="#popular">Explore Collections</a></div><div class="sheet"><h4>${page}</h4><ul class="rows">${rows.map((x,j)=>`<li${j<2?' class="done"':''}>${x}</li>`).join('')}</ul><p>Sample page preview</p></div>`;
 document.querySelectorAll('#plist button').forEach((b,j)=>{b.setAttribute('aria-selected',i===j);b.tabIndex=i===j?0:-1});
}
U.forEach((u,i)=>{
 const b=document.createElement('button');
 b.type='button';b.id='ptab'+i;b.setAttribute('role','tab');b.setAttribute('aria-controls','panel');
 b.style.setProperty('--c',u[1]);
 b.innerHTML=`<span class="pico"><svg viewBox="0 0 24 24" aria-hidden="true">${u[7]}</svg></span><span class="ptext"><b>${u[0]}</b><small>${u[2]}</small></span>`;
 b.onclick=()=>pick(i);
 b.onkeydown=e=>{const d={ArrowDown:1,ArrowRight:1,ArrowUp:-1,ArrowLeft:-1}[e.key];if(!d)return;e.preventDefault();const j=(i+d+U.length)%U.length;pick(j);$('#ptab'+j).focus()};
 $('#plist').append(b);
});
pick(0);
const T=[['Bhagwan','Devotional calm for every day',A.bhagwan],['Floral','Soft blooms and fresh energy',A.floral],['Minimalist','Clean, quiet and clutter-free',A.minimal],['Colourful','Bright pages, bold moods',A.colour],['Pastel','Gentle shades that soothe',A.pastel],['Vintage','Old-school charm',A.vintage],['Dotted','Playful and light',A.dots]];
$('#tgrid').innerHTML=T.map(t=>`<a class="theme" href="#studio" style="--art:${t[2]}"><div><h3>${t[0]}</h3><p>${t[1]}</p></div></a>`).join('')+'<div class="theme last"><h3>Something of your own?</h3><a class="btn" href="#studio">Create Your Journal</a></div>';
$('#menu').onclick=e=>{const o=$('#links').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',o)};
$('#links').onclick=()=>$('#links').classList.remove('open');
$('#sbtn').onclick=()=>{const s=$('#search');s.hidden=!s.hidden;$('#sbtn').setAttribute('aria-expanded',!s.hidden);if(!s.hidden)$('#q').focus()};
const I=[...P.map(p=>[p[0],'#popular']),...T.map(t=>[t[0]+' theme','#themes']),...U.map(u=>[u[0],'#purposes'])];
$('#q').oninput=e=>{const v=e.target.value.toLowerCase().trim(),m=I.filter(i=>i[0].toLowerCase().includes(v));$('#results').innerHTML=!v?'':m.length?m.map(i=>`<a class="chip" href="${i[1]}">${i[0]}</a>`).join(''):'No matches. Try “planner” or “floral”.'};
document.querySelectorAll('[data-msg]').forEach(b=>b.onclick=()=>toast(b.dataset.msg));
$('#sub').onsubmit=e=>{e.preventDefault();toast('Preview only: signup is not connected yet, so your email was not saved')};


(() => {
  const $ = (s, r = document) => r.querySelector(s);

  /* Mobile menu */
  const menu = $('#menu'), links = $('#links');
  menu?.addEventListener('click', () => {
    menu.setAttribute('aria-expanded', links.classList.toggle('open'));
  });

  /* Toast */
  const toastEl = $('#toast');
  let tt;
  const toast = msg => {
    toastEl.textContent = msg; toastEl.hidden = false;
    clearTimeout(tt); tt = setTimeout(() => toastEl.hidden = true, 3200);
  };

  /* Show / hide password */
  document.querySelectorAll('[data-toggle]').forEach(b => b.addEventListener('click', () => {
    const i = document.getElementById(b.dataset.toggle);
    const show = i.type === 'password';
    i.type = show ? 'text' : 'password';
    b.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  }));

  /* Validation */
  const rules = {
    required: (el, l) => el.value.trim() ? '' : `Enter your ${l}.`,
    email:    el => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(el.value.trim()) ? '' : 'Enter a valid email address.',
    min:      (el, l, n) => el.value.length >= +n ? '' : `Use at least ${n} characters.`,
    match:    (el, l, id) => el.value === document.getElementById(id).value ? '' : 'Passwords do not match.',
    checked:  el => el.checked ? '' : 'Please accept the terms to continue.'
  };

  function show(el, text) {
    const f = el.closest('.field'), m = $('.msg', f);
    f.classList.toggle('err', !!text);
    el.setAttribute('aria-invalid', !!text);
    m.textContent = text; m.hidden = !text;
    return !text;
  }

  function validate(el) {
    const label = el.dataset.label || 'value';
    for (const r of (el.dataset.rules || '').split(' ').filter(Boolean)) {
      const [name, arg] = r.split(':');
      const msg = rules[name](el, label, arg);
      if (msg) return show(el, msg);
    }
    return show(el, '');
  }

  /* Password strength */
  const meter = $('.meter'), mLabel = $('.meter-label');
  const words = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  function strength(v) {
    let s = 0;
    if (v.length >= 8) s++;
    if (/[a-z]/.test(v) && /[A-Z]/.test(v)) s++;
    if (/\d/.test(v)) s++;
    if (/[^A-Za-z0-9]/.test(v) || v.length >= 14) s++;
    return v ? Math.max(s, 1) : 0;
  }

  document.querySelectorAll('form[data-auth]').forEach(form => {
    const fields = [...form.querySelectorAll('[data-rules]')];

    fields.forEach(el => {
      const ev = el.type === 'checkbox' ? 'change' : 'blur';
      el.addEventListener(ev, () => validate(el));
      el.addEventListener('input', () => {
        if (el.closest('.field').classList.contains('err')) validate(el);
        if (el.id === 'password') {
          if (meter) { const s = strength(el.value); meter.dataset.s = s; mLabel.textContent = words[s]; }
          const c = $('#confirm'); if (c && c.value) validate(c);
        }
      });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      const bad = fields.filter(el => !validate(el));
      if (bad.length) { bad[0].focus(); return; }

      const btn = $('button[type=submit]', form);
      btn.setAttribute('aria-busy', 'true');
      // TODO: replace with your real request (fetch / WooCommerce / WP endpoint)
      setTimeout(() => {
        btn.removeAttribute('aria-busy');
        toast(form.dataset.success || 'Done!');
      }, 900);
    });
  });
})();
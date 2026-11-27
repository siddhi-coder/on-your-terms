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
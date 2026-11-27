/* OYT "How It Works" new design. Self-contained: CSS + JS.
   Add after your other scripts, before </body>. */
(() => {
const list = document.querySelector('ol.steps');
if (!list || list.classList.contains('oyt-how')) return;
list.classList.add('oyt-how');
list.closest('section').classList.add('oyt-how-section');

const style = document.createElement('style');
style.textContent = `
.oyt-how-section { background: radial-gradient(35% 55% at 100% 5%, rgba(238,199,201,.4), transparent 70%), radial-gradient(35% 55% at 0% 95%, rgba(199,213,181,.45), transparent 70%); overflow-x: clip }
ol.oyt-how { gap: 26px; align-items: stretch }
ol.oyt-how li { position: relative; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 12px; border: 0; padding: 0; min-width: 0 }
ol.oyt-how li:hover { transform: none }

/* numbered marker and dotted path */
ol.oyt-how li::before, ol.oyt-how li:hover::before {
  width: 54px; height: 54px; flex: none; background: var(--c); border: 1.5px solid #000; box-shadow: 3px 4px 0 #000;
  position: relative; z-index: 2; transform: none
}
ol.oyt-how li:hover::before { rotate: -10deg }
ol.oyt-how li:not(:last-child)::after {
  content: ""; position: absolute; top: 26px; left: calc(50% + 40px); width: calc(100% - 54px); height: 3px;
  background: repeating-linear-gradient(90deg, #000 0 7px, transparent 7px 15px)
}

.oyt-card { flex: 1; width: 100%; margin-top: 14px; background: #fff; border: 2px solid var(--c); border-radius: 160px 160px 24px 24px; padding: 14px 14px 28px; display: flex; flex-direction: column; gap: 12px; box-shadow: 0 22px 38px -24px rgba(0,0,0,.35); transition: translate .35s, box-shadow .35s }
ol.oyt-how li:hover .oyt-card { translate: 0 -10px; box-shadow: 0 30px 42px -22px rgba(0,0,0,.4) }
.oyt-art { aspect-ratio: 1; width: 100%; max-width: 230px; margin: 0 auto; border-radius: 50%; background: var(--c); display: grid; place-items: center }
.oyt-art svg { width: 74%; height: 74%; overflow: visible; fill: #fff; stroke: #000; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round }
.oyt-art svg * { transform-box: fill-box; transform-origin: center }
.oyt-card h3 { font-size: 1.5rem; margin-top: 6px }
.oyt-card p { font-size: 15px; padding: 0 8px; color: #333 }

@media (prefers-reduced-motion: no-preference) {
  ol.oyt-how li:not(:last-child)::after { animation: oyt-path 1s linear infinite }
  .oyt-a { animation: oyt-bob 3s ease-in-out infinite }
  .oyt-b { animation: oyt-bob 3s ease-in-out -1.5s infinite }
  .oyt-s { animation: oyt-twinkle 2s ease-in-out infinite }
  .oyt-pen { animation: oyt-write 2.4s ease-in-out infinite }
  @keyframes oyt-path { to { background-position: 15px 0 } }
  @keyframes oyt-bob { 50% { translate: 0 -6px } }
  @keyframes oyt-twinkle { 50% { scale: .5; rotate: 45deg } }
  @keyframes oyt-write { 50% { translate: -16px 5px; rotate: -7deg } }
}

@media (max-width: 960px) {
  ol.oyt-how { row-gap: 40px }
  ol.oyt-how li:nth-child(2)::after { display: none }
}
@media (max-width: 620px) {
  ol.oyt-how li:not(:last-child)::after { display: block; top: auto; bottom: -40px; left: calc(50% - 1px); width: 3px; height: 40px; background: repeating-linear-gradient(#000 0 7px, transparent 7px 15px); animation: none }
  .oyt-card { max-width: 330px }
}`;
document.head.append(style);

const star = (x, y) => `<path class="oyt-s" fill="#000" stroke="none" d="M${x} ${y-8}l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>`;
const art = [
  /* Choose: three journals */
  `<rect x="14" y="30" width="34" height="52" rx="4" fill="#d3c6df" transform="rotate(-12)"/>
   <rect x="54" y="32" width="34" height="52" rx="4" fill="#b5d6ee" style="rotate:12deg"/>
   <g class="oyt-a"><rect x="30" y="22" width="40" height="60" rx="5"/><path d="M37 22v60M46 40h16M46 48h10"/></g>${star(82,16)}${star(16,18)}`,
  /* Customise: cover with colour choices */
  `<rect x="14" y="14" width="46" height="66" rx="5"/><path d="M22 14v66"/><rect x="30" y="30" width="22" height="16" rx="3" fill="#f2e59c"/>
   <circle class="oyt-a" cx="78" cy="28" r="10" fill="#eec7c9"/><circle class="oyt-b" cx="78" cy="52" r="10" fill="#b5d6ee"/><circle class="oyt-a" cx="78" cy="76" r="10" fill="#c7d5b5"/>${star(41,66)}`,
  /* Order: wrapped parcel */
  `<g class="oyt-a"><rect x="18" y="42" width="64" height="44" rx="4"/><rect x="13" y="30" width="74" height="15" rx="4" fill="#efd1b9"/><path d="M50 30v56" stroke-width="5"/>
   <path d="M50 30C38 10 24 18 33 28c4 4 17 2 17 2zM50 30c12-20 26-12 17-2-4 4-17 2-17 2z" fill="#eec7c9"/></g>${star(88,14)}${star(12,16)}`,
  /* Make it yours: open journal and pen */
  `<path d="M50 34C38 25 22 25 8 29v52c14-4 30-4 42 5 12-9 28-9 42-5V29c-14-4-30-4-42 5zM50 34v52"/>
   <path d="M17 42c8-2 16-1 24 2M17 53c8-2 16-1 24 2M17 64c8-2 16-1 24 2M59 44c8-3 16-4 24-2"/>
   <g class="oyt-pen"><path d="M64 62l24-40 9 5-24 40-11 7z" fill="#f2e59c"/><path d="M64 62l9 5"/></g>${star(24,14)}`
];

[...list.children].forEach((li, i) => {
  const card = document.createElement('div');
  card.className = 'oyt-card';
  card.innerHTML = `<div class="oyt-art"><svg viewBox="0 0 100 100" aria-hidden="true">${art[i % art.length]}</svg></div>`;
  card.append(...li.childNodes);  /* keeps your heading and text */
  li.append(card);
});
})();
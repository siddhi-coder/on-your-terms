
/* =========================================
   OYT - ON YOUR TERMS
   Main Website JavaScript
========================================= */


/* =========================================
   1. COMMON FUNCTIONS
========================================= */

const $ = selector => document.querySelector(selector);

let tt;

function toast(message) {
    const toastElement = $('#toast');

    toastElement.textContent = message;
    toastElement.hidden = false;

    clearTimeout(tt);

    tt = setTimeout(() => {
        toastElement.hidden = true;
    }, 2800);
}


/* =========================================
   2. BRAND COLOURS
========================================= */

const C = {
    Pink: '#eec7c9',
    Purple: '#d3c6df',
    Blue: '#b5d6ee',
    Peach: '#efd1b9',
    Yellow: '#f2e59c',
    Green: '#c7d5b5'
};


/* =========================================
   3. HERO JOURNAL STUDIO
========================================= */

// Colour swatches
Object.entries(C).forEach(([name, colour], index) => {

    const button = document.createElement('button');

    button.className = 'sw';
    button.style.setProperty('--c', colour);
    button.setAttribute('aria-label', name + ' cover');
    button.setAttribute('aria-pressed', index === 0);

    button.onclick = () => {

        document.querySelectorAll('.sw').forEach(item => {
            item.setAttribute('aria-pressed', item === button);
        });

        $('#cover').style.backgroundColor = colour;

    };

    $('#swatches').append(button);

});


// Journal sections
const S = [
    ['Plan', C.Blue],
    ['Track', C.Yellow],
    ['Reflect', C.Purple],
    ['Money', C.Green],
    ['Study', C.Peach]
];

const on = new Set(['Plan', 'Track', 'Reflect']);


// Display journal tabs
function tabs() {

    $('#tabs').innerHTML = S
        .filter(section => on.has(section[0]))
        .map(section => `
            <i style="
                background:${section[1]};
                filter:saturate(1.3) brightness(.97);
            ">
                ${section[0]}
            </i>
        `).join('');

}


// Create journal section buttons
S.forEach(([name]) => {

    const button = document.createElement('button');

    button.className = 'chip';
    button.textContent = name;

    button.setAttribute('aria-pressed', on.has(name));

    button.onclick = () => {

        if (on.has(name)) {
            on.delete(name);
        } else {
            on.add(name);
        }

        button.setAttribute('aria-pressed', on.has(name));

        tabs();

    };

    $('#sections').append(button);

});

tabs();


// Journal name
$('#name').oninput = event => {

    $('#bname').textContent =
        event.target.value.trim() || 'You';

};


// Create journal button
$('#create').onclick = () => {

    setTimeout(() => {
        $('#name').focus({ preventScroll: true });
    }, 500);

};


/* =========================================
   4. COVER ARTWORK
========================================= */

const A = {

    floral: `
        radial-gradient(circle,#f2e59c 0 5px,transparent 6px) 0 0/48px 48px,
        radial-gradient(circle at 50% 28%,#eec7c9 0 8px,transparent 9px) 0 0/48px 48px,
        radial-gradient(circle at 72% 50%,#eec7c9 0 8px,transparent 9px) 0 0/48px 48px,
        radial-gradient(circle at 50% 72%,#eec7c9 0 8px,transparent 9px) 0 0/48px 48px,
        radial-gradient(circle at 28% 50%,#eec7c9 0 8px,transparent 9px) 0 0/48px 48px,
        #c7d5b5
    `,

    bhagwan: `
        repeating-radial-gradient(
            circle at 50% 38%,
            transparent 0 13px,
            rgba(255,255,255,.75) 14px 16px
        ),
        radial-gradient(circle at 50% 38%,#f2e59c,#efd1b9 75%)
    `,

    minimal: `
        linear-gradient(#545454,#545454) 50% 20%/40% 1px no-repeat,
        #f1efec
    `,

    colour: `
        conic-gradient(
            from 20deg at 60% 40%,
            #eec7c9 0 60deg,
            #f2e59c 0 120deg,
            #c7d5b5 0 180deg,
            #b5d6ee 0 240deg,
            #d3c6df 0 300deg,
            #efd1b9 0
        )
    `,

    pastel: `
        linear-gradient(160deg,#eec7c9,#d3c6df 50%,#b5d6ee)
    `,

    vintage: `
        repeating-linear-gradient(
            90deg,
            #efd1b9 0 18px,
            #e4c3a8 18px 20px,
            #c7d5b5 20px 26px,
            #efd1b9 26px 30px
        )
    `,

    dots: `
        radial-gradient(#fff 3px,transparent 4px) 0 0/20px 20px,
        #b5d6ee
    `,

    grid: `
        linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px) 0 0/18px 18px,
        linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px) 0 0/18px 18px,
        #d3c6df
    `

};


/* =========================================
   5. PRODUCT SECTION
========================================= */

const P = [

    [
        'Daily Planner',
        'Planners',
        'Priorities and schedules in one place.',
        A.dots
    ],

    [
        'Reflection Journal',
        'Journals',
        'Room for thoughts, gratitude and ideas.',
        A.floral
    ],

    [
        'Habit Tracker',
        'Trackers',
        'Follow your routines month by month.',
        A.grid
    ],

    [
        'Gift Combo',
        'Gift Combo',
        'A matching set to give someone special.',
        A.pastel
    ]

];


// Generate product cards
$('#prods').innerHTML = P.map(product => `

    <article class="prod">

        <div class="shot">

            <div class="mini" style="--art:${product[3]}">

                <span>${product[0]}</span>

            </div>

        </div>

        <h3>${product[0]}</h3>

        <p>${product[2]}</p>

        <button
            class="btn alt add"
            data-n="${product[0]}"
        >
            Add to cart
        </button>

    </article>

`).join('');


// Cart functionality
let n = 0;

document.querySelectorAll('.add').forEach(button => {

    button.onclick = () => {

        n++;

        $('#count').textContent = n;

        toast(button.dataset.n + ' added to cart.');

    };

});


// Cart notification
$('#cart').onclick = () => {

    toast(
        n
            ? `${n} item${n > 1 ? 's' : ''} added to your cart.`
            : 'Your cart is empty.'
    );

};


/* =========================================
   6. PURPOSE SECTION
========================================= */

const U = [

    [
        'Productivity',
        C.Blue,
        'Get clear on what matters and follow through.',
        ['Daily planner', 'To-do lists', 'Goal pages']
    ],

    [
        'Wellness',
        C.Green,
        'Make time to check in with your routines and yourself.',
        ['Habit tracker', 'Gratitude pages', 'Sleep and water logs']
    ],

    [
        'Finances',
        C.Yellow,
        'Keep your spending and savings goals in view.',
        ['Budget planner', 'Expense tracker', 'Savings goals']
    ],

    [
        'Studies',
        C.Peach,
        'Organise subjects, deadlines and revision.',
        ['Study planner', 'Exam countdown', 'Reading log']
    ],

    [
        'Personal Growth',
        C.Purple,
        'Reflect on where you are and where you want to go.',
        ['Reflection journal', 'Vision pages', 'Monthly reviews']
    ],

    [
        'Self-expression',
        C.Pink,
        'A free space for ideas, memories and dreams.',
        ['Free-writing pages', 'Memory pages', 'Dream list']
    ]

];


// Purpose tab selection
function pick(index) {

    const purpose = U[index];

    $('#panel').style.setProperty('--c', purpose[1]);

    $('#panel').innerHTML = `

        <h3 style="font-size:2.2rem">
            ${purpose[0]}
        </h3>

        <p>${purpose[2]}</p>

        <ul>
            ${purpose[3].map(item => `<li>${item}</li>`).join('')}
        </ul>

        <a class="btn" href="#popular">
            Explore Collections
        </a>

    `;

    document.querySelectorAll('#plist button').forEach((button, i) => {

        button.setAttribute('aria-selected', index === i);

    });

}


// Generate purpose buttons
U.forEach((purpose, index) => {

    const button = document.createElement('button');

    button.setAttribute('role', 'tab');

    button.textContent = purpose[0];

    button.style.setProperty('--c', purpose[1]);

    button.onclick = () => pick(index);

    $('#plist').append(button);

});

pick(0);


/* =========================================
   7. JOURNAL THEMES
========================================= */

const T = [

    ['Bhagwan', 'Devotional calm for every day', A.bhagwan],

    ['Floral', 'Soft blooms and fresh energy', A.floral],

    ['Minimalist', 'Clean, quiet and clutter-free', A.minimal],

    ['Colourful', 'Bright pages, bold moods', A.colour],

    ['Pastel', 'Gentle shades that soothe', A.pastel],

    ['Vintage', 'Old-school charm', A.vintage],

    ['Dotted', 'Playful and light', A.dots]

];


// Generate theme cards
$('#tgrid').innerHTML = T.map(theme => `

    <a class="theme" href="#studio" style="--art:${theme[2]}">

        <div>

            <h3>${theme[0]}</h3>

            <p>${theme[1]}</p>

        </div>

    </a>

`).join('') + `

    <div class="theme last">

        <h3>Something of your own?</h3>

        <a class="btn" href="#studio">
            Create Your Journal
        </a>

    </div>

`;


/* =========================================
   8. MOBILE MENU
========================================= */

$('#menu').onclick = event => {

    const isOpen = $('#links').classList.toggle('open');

    event.currentTarget.setAttribute('aria-expanded', isOpen);

};

$('#links').onclick = () => {

    $('#links').classList.remove('open');

    $('#menu').setAttribute('aria-expanded', 'false');

};


/* =========================================
   9. SEARCH FUNCTIONALITY
========================================= */

$('#sbtn').onclick = () => {

    const search = $('#search');

    search.hidden = !search.hidden;

    $('#sbtn').setAttribute('aria-expanded', !search.hidden);

    if (!search.hidden) {
        $('#q').focus();
    }

};


// Searchable items
const I = [

    ...P.map(product => [
        product[0],
        '#popular'
    ]),

    ...T.map(theme => [
        theme[0] + ' theme',
        '#themes'
    ]),

    ...U.map(purpose => [
        purpose[0],
        '#purposes'
    ])

];


// Search results
$('#q').oninput = event => {

    const value = event.target.value.toLowerCase().trim();

    const matches = I.filter(item =>
        item[0].toLowerCase().includes(value)
    );

    $('#results').innerHTML = !value
        ? ''
        : matches.length
            ? matches.map(item => `
                <a class="chip" href="${item[1]}">
                    ${item[0]}
                </a>
            `).join('')
            : 'No matches. Try “planner” or “floral”.';

};


/* =========================================
   10. DATA MESSAGE BUTTONS
========================================= */

document.querySelectorAll('[data-msg]').forEach(button => {

    button.onclick = () => {

        toast(button.dataset.msg);

    };

});


/* =========================================
   END OF OYT MAIN SCRIPT
========================================= */


/* =========================================
   1. REPEAT ANIMATION EVERY TIME SECTION
      ENTERS THE VIEWPORT
========================================= */

if ('IntersectionObserver' in window) {

    const groups = [
        ['.head, .lead, .closing, .quote .in > *, .news',
            { opacity: 0, translate: '0 40px' }],

        ['.cat, .prod, .theme',
            { opacity: 0, translate: '0 50px', scale: '.9' }],

        ['.steps li, .yours article, .rev, .foot > div',
            { opacity: 0, translate: '0 40px' }],

        ['.plist',
            { opacity: 0, translate: '-40px 0' }],

        ['.panel, .why dl > div',
            { opacity: 0, translate: '40px 0' }]
    ];

    const start = new Map();

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            const el = entry.target;

            if (entry.isIntersecting) {

                // Cancel previous animation
                el.getAnimations().forEach(animation => {
                    animation.cancel();
                });

                // Remove hidden state
                el.style.opacity = '';

                // Play animation every time it enters
                el.animate(
                    [
                        start.get(el),
                        {
                            opacity: 1,
                            translate: '0 0',
                            scale: '1'
                        }
                    ],
                    {
                        duration: 800,
                        easing: ease,
                        fill: 'both'
                    }
                );

            } else {

                // Reset animation after leaving viewport
                el.getAnimations().forEach(animation => {
                    animation.cancel();
                });

                el.style.opacity = '0';

            }

        });

    }, {
        threshold: 0.15,
        rootMargin: '0px'
    });

    // Initialize all animated elements
    groups.forEach(([selector, from]) => {

        $$(selector).forEach(el => {

            el.style.animation = 'none';
            el.style.opacity = '0';

            start.set(el, from);

            observer.observe(el);

        });

    });

    // Keep keyboard-focused content visible
    document.addEventListener('focusin', e => {

        for (let el = e.target; el; el = el.parentElement) {

            if (start.has(el)) {
                el.style.opacity = '';
            }

        }

    });

}

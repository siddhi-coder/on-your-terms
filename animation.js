
/* 1. Scroll reveal with stagger - REPEAT ON EVERY SCROLL */

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

    const observer = new IntersectionObserver(entries => {

        entries.forEach((entry, i) => {

            const el = entry.target;

            // Element enters viewport
            if (entry.isIntersecting) {

                // Remove previous animation
                el.getAnimations().forEach(animation => {
                    animation.cancel();
                });

                el.style.opacity = '';

                // Play animation again
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
                        delay: i * 100,
                        easing: ease,
                        fill: 'backwards'
                    }
                );

            } else {

                // Reset when element leaves viewport
                el.getAnimations().forEach(animation => {
                    animation.cancel();
                });

                el.style.opacity = '0';

            }

        });

    }, {
        threshold: 0.12
    });

    groups.forEach(([selector, from]) => {

        $$(selector).forEach(el => {

            el.style.animation = 'none';
            el.style.opacity = '0';

            start.set(el, from);

            observer.observe(el);

        });

    });

    // Accessibility: reveal focused elements
    document.addEventListener('focusin', e => {

        for (let el = e.target; el; el = el.parentElement) {

            if (start.has(el)) {
                el.style.opacity = '';
            }

        }

    });

}

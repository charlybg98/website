(function () {
    'use strict';

    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                if (href === '#') return;

                const targetElement = document.querySelector(href);

                if (targetElement) {
                    e.preventDefault();

                    const nav = document.querySelector('.nav');
                    const navHeight = nav ? nav.offsetHeight : 0;

                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - navHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    function initFadeInObserver() {
        const fadeElements = document.querySelectorAll('.fade-in');

        if (!('IntersectionObserver' in window)) {
            fadeElements.forEach(el => el.classList.add('visible'));
            return;
        }

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const fadeInObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.dataset.delay || 0;

                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);

                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach((el, index) => {
            const section = el.closest('section, header');
            if (section) {
                const siblings = section.querySelectorAll('.fade-in');
                const siblingIndex = Array.from(siblings).indexOf(el);
                el.dataset.delay = siblingIndex * 100;
            }

            fadeInObserver.observe(el);
        });
    }

    function initNavScroll() {
        const nav = document.querySelector('.nav');

        if (!nav) return;

        let lastScrollY = window.scrollY;
        let ticking = false;

        function updateNav() {
            const scrollY = window.scrollY;

            if (scrollY > 100) {
                nav.style.background = 'rgba(0, 0, 0, 0.95)';
            } else {
                nav.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, transparent 100%)';
            }

            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateNav);
                ticking = true;
            }
        });
    }

    function initParallax() {
        const heroBg = document.querySelector('.hero__bg');

        if (!heroBg) return;

        let ticking = false;

        function updateParallax() {
            const scrollY = window.scrollY;
            const heroHeight = document.querySelector('.hero').offsetHeight;

            if (scrollY < heroHeight) {
                const yOffset = scrollY * 0.3;
                heroBg.style.transform = `translateY(${yOffset}px)`;
            }

            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    function init() {
        initSmoothScroll();
        initFadeInObserver();
        initNavScroll();
        initParallax();

        console.log('Charlyfive Producer Site initialized');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

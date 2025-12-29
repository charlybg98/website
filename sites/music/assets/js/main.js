/**
 * Charlyfive EPK - Main JavaScript
 * Handles smooth scrolling and fade-in animations
 */

(function () {
    'use strict';

    // ============================================
    // Smooth Scrolling for Navigation Links
    // ============================================

    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');

                // Skip if it's just "#"
                if (href === '#') return;

                const targetElement = document.querySelector(href);

                if (targetElement) {
                    e.preventDefault();

                    // Get the nav height for offset
                    const nav = document.querySelector('.nav');
                    const navHeight = nav ? nav.offsetHeight : 0;

                    // Calculate position
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - navHeight;

                    // Smooth scroll to target
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============================================
    // Fade-In on Scroll (Intersection Observer)
    // ============================================

    function initFadeInObserver() {
        const fadeElements = document.querySelectorAll('.fade-in');

        // Check if Intersection Observer is supported
        if (!('IntersectionObserver' in window)) {
            // Fallback: Show all elements immediately
            fadeElements.forEach(el => el.classList.add('visible'));
            return;
        }

        const observerOptions = {
            root: null, // Use viewport as root
            rootMargin: '0px 0px -100px 0px', // Trigger slightly before element enters
            threshold: 0.1 // Trigger when 10% of element is visible
        };

        const fadeInObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visible class with slight delay for stagger effect
                    const delay = entry.target.dataset.delay || 0;

                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);

                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        fadeElements.forEach((el, index) => {
            // Add stagger delay based on index within same section
            const section = el.closest('section, header');
            if (section) {
                const siblings = section.querySelectorAll('.fade-in');
                const siblingIndex = Array.from(siblings).indexOf(el);
                el.dataset.delay = siblingIndex * 100; // 100ms stagger
            }

            fadeInObserver.observe(el);
        });
    }

    // ============================================
    // Navigation Background on Scroll
    // ============================================

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

    // ============================================
    // Parallax Effect for Hero Background
    // ============================================

    function initParallax() {
        const heroBg = document.querySelector('.hero__bg');

        if (!heroBg) return;

        let ticking = false;

        function updateParallax() {
            const scrollY = window.scrollY;
            const heroHeight = document.querySelector('.hero').offsetHeight;

            // Only apply parallax while hero is in view
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

    // ============================================
    // Initialize All Functions
    // ============================================

    function init() {
        initSmoothScroll();
        initFadeInObserver();
        initNavScroll();
        initParallax();

        console.log('Charlyfive EPK initialized');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();

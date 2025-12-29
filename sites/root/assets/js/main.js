/**
 * Charlyfive Gateway - Main JavaScript
 * Handles hover/touch interactions for the split-screen layout
 */

(function () {
    'use strict';

    // DOM Elements
    const gateway = document.getElementById('gateway');
    const panelEngineer = document.getElementById('panel-engineer');
    const panelProducer = document.getElementById('panel-producer');

    // Breakpoint for mobile detection
    const MOBILE_BREAKPOINT = 768;

    /**
     * Check if the current viewport is mobile
     * @returns {boolean}
     */
    function isMobile() {
        return window.innerWidth <= MOBILE_BREAKPOINT;
    }

    /**
     * Remove all hover state classes from gateway
     */
    function clearHoverStates() {
        gateway.classList.remove('hover-left', 'hover-right');
    }

    /**
     * Remove all touch active states from panels
     */
    function clearTouchStates() {
        panelEngineer.classList.remove('touch-active');
        panelProducer.classList.remove('touch-active');
    }

    // =========================================
    // Desktop: Mouse Hover Interactions
    // =========================================

    if (panelEngineer && panelProducer && gateway) {
        // Engineer panel (left side)
        panelEngineer.addEventListener('mouseenter', function () {
            if (!isMobile()) {
                clearHoverStates();
                gateway.classList.add('hover-left');
            }
        });

        panelEngineer.addEventListener('mouseleave', function () {
            if (!isMobile()) {
                clearHoverStates();
            }
        });

        // Producer panel (right side)
        panelProducer.addEventListener('mouseenter', function () {
            if (!isMobile()) {
                clearHoverStates();
                gateway.classList.add('hover-right');
            }
        });

        panelProducer.addEventListener('mouseleave', function () {
            if (!isMobile()) {
                clearHoverStates();
            }
        });

        // =========================================
        // Mobile: Touch Interactions
        // =========================================

        // Engineer panel touch
        panelEngineer.addEventListener('touchstart', function (e) {
            if (isMobile()) {
                clearTouchStates();
                panelEngineer.classList.add('touch-active');
            }
        }, { passive: true });

        panelEngineer.addEventListener('touchend', function () {
            if (isMobile()) {
                // Small delay before removing to show the effect
                setTimeout(clearTouchStates, 150);
            }
        }, { passive: true });

        // Producer panel touch
        panelProducer.addEventListener('touchstart', function (e) {
            if (isMobile()) {
                clearTouchStates();
                panelProducer.classList.add('touch-active');
            }
        }, { passive: true });

        panelProducer.addEventListener('touchend', function () {
            if (isMobile()) {
                setTimeout(clearTouchStates, 150);
            }
        }, { passive: true });

        // =========================================
        // Window Resize Handler
        // =========================================

        let resizeTimeout;
        window.addEventListener('resize', function () {
            // Debounce resize events
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function () {
                // Clear all states when crossing breakpoints
                clearHoverStates();
                clearTouchStates();
            }, 100);
        }, { passive: true });
    }

    // =========================================
    // Keyboard Navigation Enhancement
    // =========================================

    document.addEventListener('keydown', function (e) {
        // Allow arrow keys to navigate between panels
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const focusedElement = document.activeElement;

            if (e.key === 'ArrowRight' && focusedElement === panelEngineer) {
                e.preventDefault();
                panelProducer.focus();
            } else if (e.key === 'ArrowLeft' && focusedElement === panelProducer) {
                e.preventDefault();
                panelEngineer.focus();
            }
        }
    });

    // =========================================
    // Focus States for Accessibility
    // =========================================

    panelEngineer.addEventListener('focus', function () {
        if (!isMobile()) {
            clearHoverStates();
            gateway.classList.add('hover-left');
        }
    });

    panelEngineer.addEventListener('blur', function () {
        if (!isMobile()) {
            clearHoverStates();
        }
    });

    panelProducer.addEventListener('focus', function () {
        if (!isMobile()) {
            clearHoverStates();
            gateway.classList.add('hover-right');
        }
    });

    panelProducer.addEventListener('blur', function () {
        if (!isMobile()) {
            clearHoverStates();
        }
    });

    // =========================================
    // Performance: Preload target pages
    // =========================================

    // Add prefetch hints for the destination pages
    function addPrefetchHints() {
        const links = [
            'https://portfolio.charlyfive.com',
            'https://music.charlyfive.com'
        ];

        links.forEach(function (href) {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = href;
            document.head.appendChild(link);
        });
    }

    // Prefetch after initial load
    if ('requestIdleCallback' in window) {
        requestIdleCallback(addPrefetchHints);
    } else {
        setTimeout(addPrefetchHints, 2000);
    }

})();

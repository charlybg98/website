(function () {
    'use strict';

    const gateway = document.getElementById('gateway');
    const panelEngineer = document.getElementById('panel-engineer');
    const panelProducer = document.getElementById('panel-producer');
    const MOBILE_BREAKPOINT = 768;

    function isMobile() {
        return window.innerWidth <= MOBILE_BREAKPOINT;
    }

    function clearHoverStates() {
        gateway.classList.remove('hover-left', 'hover-right');
    }

    function clearTouchStates() {
        panelEngineer.classList.remove('touch-active');
        panelProducer.classList.remove('touch-active');
    }

    if (panelEngineer && panelProducer && gateway) {
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

        panelEngineer.addEventListener('touchstart', function (e) {
            if (isMobile()) {
                clearTouchStates();
                panelEngineer.classList.add('touch-active');
            }
        }, { passive: true });

        panelEngineer.addEventListener('touchend', function () {
            if (isMobile()) {
                setTimeout(clearTouchStates, 150);
            }
        }, { passive: true });
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

        let resizeTimeout;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function () {
                clearHoverStates();
                clearTouchStates();
            }, 100);
        }, { passive: true });
    }

    document.addEventListener('keydown', function (e) {
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

    if ('requestIdleCallback' in window) {
        requestIdleCallback(addPrefetchHints);
    } else {
        setTimeout(addPrefetchHints, 2000);
    }

})();

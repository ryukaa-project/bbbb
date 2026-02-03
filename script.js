document.addEventListener('DOMContentLoaded', () => {

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));


    // Navbar sticky shadow effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-md');
        } else {
            navbar.classList.remove('shadow-md');
        }
    });

    // Smooth Scrolling for Anchor Links (Fallback/Enhancement for Safari)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Price Bar Animation Trigger
    const priceSection = document.querySelector('#price-comparison');
    if (priceSection) {
        const priceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.progress-bar-custom');
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute('style'); // Get initial style if needed or just set it
                        // Reset to 0 then animate
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = '80%'; // Hardcoded for this demo based on HTML
                        }, 100);
                    });
                    priceObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        priceObserver.observe(priceSection);
    }

    // Seasonal Banner Close
    const bannerClose = document.querySelector('.banner-close');
    if (bannerClose) {
        bannerClose.addEventListener('click', function () {
            this.closest('.seasonal-banner').style.display = 'none';
        });
    }

});
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // buat navbar scroll
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled', 'shadow-sm');
        } else {
            navbar.classList.remove('scrolled', 'shadow-sm');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // animasi smooth
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // buat bar animasi halaman price comparison
    const progressSection = document.querySelector('#price-comparison');
    if (progressSection) {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.progress-bar-custom').forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width') || '0';
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = `${targetWidth}%`;
                        }, 200);
                    });
                    progressObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        progressObserver.observe(progressSection);
    }

    // smooth scroll dan mobile menu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                // mobile menu close
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }

                // smooth scroll
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (navbarHeight - 10);

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // baner iklan
    const bannerClose = document.querySelector('.banner-close');
    if (bannerClose) {
        bannerClose.addEventListener('click', function () {
            const banner = this.closest('.seasonal-banner');
            if (banner) {
                banner.style.opacity = '0';
                banner.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    banner.style.display = 'none';
                }, 400);
            }
        });
    }

    // nav link waktu scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
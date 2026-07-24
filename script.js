/* ==================== CHABOD ENERGY - Main Script ==================== */

document.addEventListener('DOMContentLoaded', function() {

    // ==================== INITIALIZE AOS ====================
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // ==================== PRELOADER ====================
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.getElementById('preloader').classList.add('hidden');
        }, 600);
    });
    // Fallback: hide preloader after 3s max
    setTimeout(function() {
        var preloader = document.getElementById('preloader');
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
        }
    }, 3000);

    // ==================== NAVBAR ====================
    var navbar = document.getElementById('navbar');
    var navToggle = document.getElementById('navToggle');
    var navLinks = document.getElementById('navLinks');

    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        var sections = document.querySelectorAll('section[id], .hero');
        var scrollPos = window.scrollY + 150;

        sections.forEach(function(section) {
            var sectionTop = section.offsetTop;
            var sectionBottom = sectionTop + section.offsetHeight;
            var id = section.getAttribute('id');
            var link = navLinks.querySelector('a[href="#' + id + '"]');

            if (link) {
                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    navLinks.querySelectorAll('.nav-link').forEach(function(l) { l.classList.remove('active'); });
                    link.classList.add('active');
                }
            }
        });
    }

    // ==================== PARTICLE BACKGROUND ====================
    (function createParticles() {
        var container = document.getElementById('heroParticles');
        if (!container) return;
        var count = 50;
        for (var i = 0; i < count; i++) {
            var particle = document.createElement('div');
            particle.className = 'hero-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (15 + Math.random() * 25) + 's';
            particle.style.animationDelay = (Math.random() * 15) + 's';
            particle.style.width = particle.style.height = (2 + Math.random() * 4) + 'px';
            particle.style.opacity = 0.2 + Math.random() * 0.4;
            container.appendChild(particle);
        }
    })();

    // ==================== COUNTER ANIMATION ====================
    function animateCounters() {
        var counters = document.querySelectorAll('.stat-number, .hero-stat-number');
        counters.forEach(function(counter) {
            var target = parseInt(counter.getAttribute('data-target'));
            if (!target) return;
            var current = 0;
            var increment = Math.ceil(target / 60);
            var suffix = counter.closest('.hero-stat') ? '' : '';

            function updateCounter() {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + suffix;
                    return;
                }
                counter.textContent = current + suffix;
                requestAnimationFrame(updateCounter);
            }
            updateCounter();
        });
    }

    // Trigger counters when they come into view
    var counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });

    var statsSection = document.querySelector('.stats-section');
    if (statsSection) counterObserver.observe(statsSection);

    // ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            var target = document.querySelector(href);
            if (target) {
                var offset = 80;
                var targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });

    // ==================== BACK TO TOP ====================
    var backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==================== CONTACT FORM ====================
    var contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        var submitBtn = contactForm.querySelector('button[type="submit"]');
        var originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate send (in production, integrate with email service)
        setTimeout(function() {
            submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #059669 0%, #10b981 100%)';

            showToast('Thank you! We\'ll get back to you within 24 hours.');

            setTimeout(function() {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        }, 1500);
    });

    // ==================== NEWSLETTER FORM ====================
    var newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var input = this.querySelector('input');
        showToast('Thanks for subscribing! Stay tuned for energy insights.');
        input.value = '';
    });

    // ==================== TOAST NOTIFICATION ====================
    function showToast(message) {
        var existing = document.querySelector('.toast');
        if (existing) existing.remove();

        var toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = '<i class="fas fa-check-circle"></i><span>' + message + '</span>';
        document.body.appendChild(toast);

        // Trigger reflow
        toast.offsetHeight;
        toast.classList.add('show');

        setTimeout(function() {
            toast.classList.remove('show');
            setTimeout(function() { toast.remove(); }, 400);
        }, 4000);
    }

    // ==================== ACTIVE NAV ON LOAD ====================
    updateActiveNavLink();

    console.log('⚡ Chabod Energy website initialized');
    console.log('📞 Contact us: info@chabodenergy.co.za');
});

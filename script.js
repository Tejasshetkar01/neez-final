// Performance optimization - Defer non-critical scripts
document.addEventListener('DOMContentLoaded', function() {
    // Remove loading state immediately
    const loading = document.querySelector('.loading');
    const body = document.body;
    
    if (loading) {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
            body.classList.remove('loading');
        }, 500);
    }

    // Initialize core functionality
    initNavbar();
    initMobileMenu();
    initPageTransition();
    initFormValidation();
    initThemeToggle();
    checkUrlHash();
    
    // Load ScrollReveal only after page load
    setTimeout(function() {
        if (typeof ScrollReveal !== 'undefined') {
            initScrollReveal();
        }
    }, 100);

    // Add visible class to above-fold content
    document.querySelector('.hero-section')?.classList.add('visible');
});

// Navbar functionality
function initNavbar() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Only highlight active section
    window.addEventListener('scroll', function() {
        highlightActiveSection();
        
        // Only add/remove scrolled class
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    function highlightActiveSection() {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const body = document.body;
    
    if (!mobileMenuButton || !mobileMenu) return;
    
    mobileMenuButton.addEventListener('click', () => {
        mobileMenuButton.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
            mobileMenu.classList.remove('active');
            mobileMenuButton.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
}

// Theme toggle functionality
function initThemeToggle() {
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    
    if (!themeSwitch) return;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.setAttribute('data-theme', 'light');
        themeSwitch.checked = true;
    }
    
    // Theme toggle event
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
                
                // Email validation
                if (field.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        isValid = false;
                        field.classList.add('error');
                    }
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields correctly');
                return;
            }
            
            // Add loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                submitButton.innerHTML = '<i class="fas fa-check"></i> Sent!';
                form.reset();
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }, 2000);
            }, 1500);
        });
    });
}

// Page transition effect
function initPageTransition() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Check URL hash on load
function checkUrlHash() {
    const hash = window.location.hash;
    if (hash) {
        const target = document.querySelector(hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }
}

// Feature cards toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const seeAllButton = document.querySelector('.see-all-button');
    const hiddenCards = document.querySelectorAll('.hidden-card');
    let isExpanded = false;

    if (seeAllButton && hiddenCards.length > 0) {
        seeAllButton.addEventListener('click', function() {
            isExpanded = !isExpanded;
            
            hiddenCards.forEach(card => {
                if (isExpanded) {
                    card.style.display = 'block';
                    // Use requestAnimationFrame for smooth animation
                    requestAnimationFrame(() => {
                        card.classList.add('visible');
                    });
                } else {
                    card.classList.remove('visible');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300); // Match transition duration
                }
            });

            // Update button text and icon
            const buttonText = seeAllButton.querySelector('.button-text');
            const buttonIcon = seeAllButton.querySelector('i');
            
            if (buttonText && buttonIcon) {
                if (isExpanded) {
                    buttonText.textContent = 'Show Less';
                    buttonIcon.classList.replace('fa-chevron-down', 'fa-chevron-up');
                } else {
                    buttonText.textContent = 'See All Features';
                    buttonIcon.classList.replace('fa-chevron-up', 'fa-chevron-down');
                }
            }
        });
    }
});

// Stats animation
function animateStats(container) {
    const stats = container.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const value = parseFloat(stat.textContent);
        if (!isNaN(value)) {
            let current = 0;
            const increment = value / 30;
            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    clearInterval(timer);
                    current = value;
                }
                stat.textContent = Math.round(current) + (stat.dataset.suffix || '');
            }, 50);
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            if (entry.target.classList.contains('cta-stats') || 
                entry.target.classList.contains('case-study-stats')) {
                animateStats(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('section, .fade-in, .service-card, .feature-card, .testimonial-card, .case-study-card').forEach(element => {
    observer.observe(element);
});

// ScrollReveal initialization
function initScrollReveal() {
    const sr = ScrollReveal({
        distance: '30px',
        duration: 1000,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        interval: 100,
        scale: 1,
        mobile: true
    });
    
    // Hero section animations
    sr.reveal('.hero-title', {
        origin: 'top',
        delay: 200
    });

    sr.reveal('.hero-description', {
        origin: 'bottom',
        delay: 400
    });

    sr.reveal('.hero-buttons', {
        origin: 'bottom',
        delay: 600
    });

    // Services section animations
    sr.reveal('.services-header', {
        origin: 'top'
    });

    sr.reveal('.service-card', {
        origin: 'bottom',
        interval: 200
    });

    // Features section animations
    sr.reveal('.features-badge', {
        origin: 'top'
    });

    sr.reveal('.features-title', {
        origin: 'top',
        delay: 200
    });

    sr.reveal('.features-description', {
        origin: 'top',
        delay: 400
    });

    sr.reveal('.feature-card', {
        origin: 'bottom',
        interval: 200
    });

    // Benefits section animations
    sr.reveal('.benefits-header', {
        origin: 'top'
    });

    sr.reveal('.benefit-card', {
        origin: 'bottom',
        interval: 200
    });

    // CTA section animations
    sr.reveal('.cta-badge', {
        origin: 'top'
    });

    sr.reveal('.cta-title', {
        origin: 'top',
        delay: 200
    });

    sr.reveal('.cta-description', {
        origin: 'top',
        delay: 400
    });

    sr.reveal('.cta-form', {
        origin: 'right',
        delay: 600
    });

    // Testimonials section animations
    sr.reveal('.testimonials-header', {
        origin: 'top'
    });

    sr.reveal('.testimonial-card', {
        origin: 'bottom',
        interval: 200
    });

    // About section animations
    sr.reveal('.about-badge', {
        origin: 'top'
    });

    sr.reveal('.about-title', {
        origin: 'top',
        delay: 200
    });

    sr.reveal('.about-description', {
        origin: 'left',
        delay: 400
    });

    sr.reveal('.about-highlights', {
        origin: 'bottom',
        delay: 600
    });

    sr.reveal('.about-image', {
        origin: 'right',
        delay: 400
    });

    // Contact section animations
    sr.reveal('.contact-header', {
        origin: 'top'
    });

    sr.reveal('.contact-info', {
        origin: 'left',
        delay: 200
    });

    sr.reveal('.contact-form', {
        origin: 'right',
        delay: 400
    });

    // Footer animations
    sr.reveal('.footer-content', {
        origin: 'bottom'
    });

    sr.reveal('.footer-bottom', {
        origin: 'bottom',
        delay: 200
    });

    // Case Studies section animations
    sr.reveal('.case-studies-header', {
        origin: 'top'
    });

    sr.reveal('.case-study-card', {
        origin: 'bottom',
        interval: 200
    });
}

// Parallax effect
document.addEventListener('mousemove', (e) => {
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    const mouseX = (e.clientX - window.innerWidth / 2) / 50;
    const mouseY = (e.clientY - window.innerHeight / 2) / 50;

    parallaxLayers.forEach((layer, index) => {
        const speed = (index + 1) * 0.2;
        const x = mouseX * speed;
        const y = mouseY * speed;
        layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
});

// Section visibility
const observeSection = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    observeSection.observe(section);
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenuButton.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Add hover card effect to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.classList.add('hover-card');
});

// Add tooltips to buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.classList.add('tooltip');
    button.setAttribute('data-tooltip', 'Click to get started');
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Remove preloader initialization
    // initPreloader();
    
    // Check for URL hash and scroll to section
    const hash = window.location.hash;
    if (hash) {
        const target = document.querySelector(hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }
    
    // Add visible class to above-fold content
    document.querySelector('.hero-section').classList.add('visible');
});

// Remove duplicate loading event listener
window.addEventListener('load', function() {
    document.body.classList.remove('loading');
}); 
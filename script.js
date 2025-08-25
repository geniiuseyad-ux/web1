// Page Loader
window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
            // Start animations after loader
            startAnimations();
        }, 500);
    }, 1500);
});

// Particles.js Configuration - Optimized for performance
particlesJS('particles-js', {
    particles: {
        number: { value: 40, density: { enable: true, value_area: 1000 } },
        color: { value: '#6c5ce7' },
        shape: { type: 'circle' },
        opacity: { value: 0.4, random: false },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 200,
            color: '#6c5ce7',
            opacity: 0.3,
            width: 1
        },
        move: {
            enable: true,
            speed: 3,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' },
            resize: true
        }
    }
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

// Throttled mouse move handler for better performance
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let lastUpdate = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Update cursor position with requestAnimationFrame for smoother performance
function updateCursor() {
    if (Date.now() - lastUpdate > 20) { // Limit to 50fps
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        gsap.set(cursor, { x: mouseX, y: mouseY });
        gsap.set(follower, { x: cursorX, y: cursorY });
        lastUpdate = Date.now();
    }
    requestAnimationFrame(updateCursor);
}
updateCursor();

// Glitch Effect
const glitchText = document.querySelector('.glitch');
setInterval(() => {
    glitchText.classList.add('glitch-effect');
    setTimeout(() => {
        glitchText.classList.remove('glitch-effect');
    }, 200);
}, 3000);

// Typing Animation with multiple phrases
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

const textArray = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Tech Enthusiast'];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        if(!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        if(!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        cursorSpan.classList.remove('typing');
        textArrayIndex++;
        if(textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

// Scroll Reveal Animation with GSAP
function startAnimations() {
    // Hero Section Animation
    gsap.from('.hero-content h2', {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: 'power4.out'
    });

    gsap.from('.hero-content .lead', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.3,
        ease: 'power4.out'
    });

    gsap.from('.cta-buttons', {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.6,
        ease: 'power4.out'
    });

    // Animate hero shapes
    gsap.to('.shape-1', {
        duration: 2,
        rotation: 360,
        repeat: -1,
        ease: 'none'
    });

    gsap.to('.shape-2', {
        duration: 3,
        rotation: -360,
        repeat: -1,
        ease: 'none'
    });
}

// Initialize ScrollReveal with optimized settings
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1000,
    delay: 200,
    reset: false,
    useDelay: 'onload',
    throttle: 100,
    viewFactor: 0.2
});

// Header fade in
sr.reveal('.logo', {});
sr.reveal('nav', { delay: 600 });

// Hero section animations
sr.reveal('.hero-content h2', { delay: 500 });
sr.reveal('.lead', { delay: 700 });
sr.reveal('.cta-buttons', { delay: 900 });

// About section animations
sr.reveal('.about-text', { origin: 'left' });
sr.reveal('.about-stats', { origin: 'right', delay: 600 });

// Services animation with interval
sr.reveal('.service-card', { 
    interval: 200,
    origin: 'bottom'
});

// Skills animation
sr.reveal('.skill-category', { 
    interval: 200,
    origin: 'left'
});

// Animate skill bars when they come into view
const skillBars = document.querySelectorAll('.skill-progress');
const animateSkills = () => {
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('style').match(/width: (\d+)%/)[1];
        bar.style.width = '0%';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    bar.style.width = `${targetWidth}%`;
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(bar);
    });
};

// Project cards animation
sr.reveal('.project-card', {
    interval: 200,
    origin: 'bottom'
});

// Timeline animation
sr.reveal('.timeline-item', {
    interval: 200,
    origin: 'left'
});

// Contact section animation
sr.reveal('.contact-item', { 
    interval: 200,
    origin: 'bottom'
});
sr.reveal('.contact-form', { 
    delay: 600,
    origin: 'right'
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(108, 92, 231, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #6c5ce7, #a363d8)';
        header.style.backdropFilter = 'none';
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Project filter animation
const initProjectFilters = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectGrid = document.querySelector('.project-grid');
    const noProjectsMessage = document.querySelector('.no-projects-message');
    let currentFilter = 'all';
    let isAnimating = false;

    // Create a map for project counts
    const projectCounts = new Map();
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        projectCounts.set(category, (projectCounts.get(category) || 0) + 1);
    });

    // Update filter button counts
    filterButtons.forEach(btn => {
        const filter = btn.getAttribute('data-filter');
        const count = filter === 'all' ? projectCards.length : projectCounts.get(filter) || 0;
        const countSpan = document.createElement('span');
        countSpan.className = 'filter-count';
        countSpan.textContent = `(${count})`;
        btn.appendChild(countSpan);
    });

    const updateProjects = async (filterValue) => {
        if (isAnimating || currentFilter === filterValue) return;
        isAnimating = true;
        let hasVisibleProjects = false;
        currentFilter = filterValue;

        // Update button states
        filterButtons.forEach(btn => {
            const isSelected = btn.getAttribute('data-filter') === filterValue;
            btn.classList.toggle('active', isSelected);
            btn.setAttribute('aria-selected', isSelected);
        });

        // Add fade-out animation to current projects
        const visibleCards = document.querySelectorAll('.project-card:not(.hidden)');
        await Promise.all(
            Array.from(visibleCards).map(card => {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                return new Promise(resolve => setTimeout(resolve, 300));
            })
        );

        // Filter projects
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const isVisible = filterValue === 'all' || category === filterValue;

            if (isVisible) {
                hasVisibleProjects = true;
                card.classList.remove('hidden');
                // Add entrance animation
                card.style.animation = 'fadeInScale 0.5s ease forwards';
            } else {
                card.classList.add('hidden');
            }
        });

        // Toggle no projects message
        noProjectsMessage.style.display = hasVisibleProjects ? 'none' : 'block';
        if (!hasVisibleProjects) {
            noProjectsMessage.style.animation = 'fadeIn 0.5s ease forwards';
        }

        // Update grid layout
        updateGridLayout();
    };

    const updateGridLayout = () => {
        const visibleCards = document.querySelectorAll('.project-card:not(.hidden)');
        const columns = Math.floor(projectGrid.offsetWidth / 300); // 300px is min card width
        
        // Adjust grid gap based on visible cards
        if (visibleCards.length <= columns) {
            projectGrid.style.justifyContent = 'center';
        } else {
            projectGrid.style.justifyContent = 'start';
        }
    };

    // Add click handlers
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            if (filterValue !== currentFilter) {
                updateProjects(filterValue);
            }
        });

        // Add keyboard navigation
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        updateGridLayout();
    });

    // Initialize with 'all' filter
    updateProjects('all');
};

// Add to the DOM loaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // ... other initializations ...
    initProjectFilters();
});

// Typing animation for hero section
const typingEffect = () => {
    const text = "Building innovative web solutions";
    const leadElement = document.querySelector('.lead');
    let index = 0;
    
    const typing = setInterval(() => {
        if (index < text.length) {
            leadElement.textContent = text.slice(0, index + 1) + '|';
            index++;
        } else {
            leadElement.textContent = text;
            clearInterval(typing);
        }
    }, 100);
};

// Mobile Menu Functionality
const mobileMenuInit = () => {
    const menuToggle = document.querySelector('.mobile-nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-menu .nav-link');
    const body = document.body;

    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    };

    menuToggle.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);

    // Close menu when clicking links
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
            // Update active state
            mobileLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') &&
            !mobileMenu.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });
};

// Intersection Observer for section highlighting
const initSectionObserver = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        rootMargin: '-50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
};

// Lazy Loading for Project Images
const initLazyLoading = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

// Form Validation and Submit Handler
const initContactForm = () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        
        try {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            form.reset();
            alert('Message sent successfully!');
        } catch (error) {
            alert('Failed to send message. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message';
        }
    });
};

// Add smooth scrolling behavior
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    mobileMenuInit();
    initSectionObserver();
    initLazyLoading();
    initContactForm();
    initSmoothScroll();
    animateSkills();
    typingEffect();
});

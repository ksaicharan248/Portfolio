// Elite Dark Portfolio - Advanced JavaScript

class ElitePortfolio {
    constructor() {
        this.initializeApp();
    }

    initializeApp() {
        document.addEventListener('DOMContentLoaded', () => {
            // Detect mobile and touch devices
            this.detectMobile();
            
            this.loadingScreen();
            this.particleBackground();
            this.customCursor();
            this.navigation();
            this.typingAnimation();
            this.countUpAnimation();
            this.skillProgressBars();
            this.skillCategories();
            this.scrollAnimations();
            this.contactForm();
            this.themeToggle();
            this.mobileMenu();
            
            // Add accessibility improvements
            this.improveAccessibility();
        });
    }

    // Mobile Detection
    detectMobile() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                         ('ontouchstart' in window) || 
                         (window.matchMedia('(pointer: coarse)').matches);
        
        if (isMobile) {
            document.body.classList.add('mobile-device');
            
            // Disable custom cursor on mobile
            const cursors = document.querySelectorAll('.cursor-follower, .cursor-follower-delayed');
            cursors.forEach(cursor => cursor.style.display = 'none');
            
            // Reduce particle count for performance
            this.mobileOptimizations = true;
        }
    }

    // Loading Screen Animation
    loadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        const loadingBar = document.querySelector('.loading-bar');
        
        if (!loadingScreen || !loadingBar) return;

        // Animate loading bar
        setTimeout(() => {
            loadingBar.style.width = '100%';
        }, 300);

        // Hide loading screen after animation
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'visible';
        }, 2500);
    }

    // Particle Background Effect
    particleBackground() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouseX = 0;
        let mouseY = 0;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Wrap around edges
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;

                // Mouse interaction
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.x -= dx * 0.02;
                    this.y -= dy * 0.02;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                
                // Adjust particle color based on theme
                const isLightTheme = document.body.classList.contains('light-theme');
                if (isLightTheme) {
                    ctx.fillStyle = `rgba(102, 126, 234, ${this.opacity * 0.6})`;
                } else {
                    ctx.fillStyle = `rgba(102, 126, 234, ${this.opacity})`;
                }
                ctx.fill();
            }
        }

        // Initialize particles with mobile optimization
        const initParticles = () => {
            const isMobile = this.mobileOptimizations;
            const baseCount = Math.floor(canvas.width * canvas.height / 10000);
            const particleCount = Math.min(isMobile ? 30 : 100, baseCount);
            
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 80) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(102, 126, 234, ${0.1 * (1 - distance / 80)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        };

        // Mouse tracking
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        initParticles();
        animate();

        window.addEventListener('resize', () => {
            resizeCanvas();
            initParticles();
        });
    }

    // Custom Cursor
    customCursor() {
        const cursor = document.querySelector('.cursor-follower');
        const cursorDelayed = document.querySelector('.cursor-follower-delayed');
        
        if (!cursor || !cursorDelayed) return;

        let mouseX = 0;
        let mouseY = 0;
        let delayedX = 0;
        let delayedY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX - 10 + 'px';
            cursor.style.top = mouseY - 10 + 'px';
        });

        // Delayed cursor animation
        const animateDelayedCursor = () => {
            delayedX += (mouseX - delayedX) * 0.1;
            delayedY += (mouseY - delayedY) * 0.1;
            
            cursorDelayed.style.left = delayedX - 20 + 'px';
            cursorDelayed.style.top = delayedY - 20 + 'px';
            
            requestAnimationFrame(animateDelayedCursor);
        };

        animateDelayedCursor();

        // Cursor effects on hover
        const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item, .contact-card');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursorDelayed.style.transform = 'scale(1.5)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorDelayed.style.transform = 'scale(1)';
            });
        });
    }

    // Enhanced Navigation
    navigation() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        let currentSection = 'hero';

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Update active section
            this.updateActiveSection();
        });

        // Smooth scroll navigation
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    updateActiveSection() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionId = section.getAttribute('id');
            
            if (rect.top <= 100 && rect.bottom >= 100) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Typing Animation
    typingAnimation() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        const texts = [
            'Full Stack Developer',
            'Backend Developer (Java/Spring Boot)',
            'AI/GenAI Application Developer',
            'Cloud & DevOps Engineer (Entry-Level)'
        ];

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isWaiting = false;

        const typeSpeed = 100;
        const deleteSpeed = 50;
        const waitTime = 2000;

        const type = () => {
            const currentText = texts[textIndex];
            
            if (isWaiting) {
                setTimeout(type, waitTime);
                isWaiting = false;
                return;
            }

            if (!isDeleting && charIndex <= currentText.length) {
                typingElement.textContent = currentText.slice(0, charIndex);
                charIndex++;
                
                if (charIndex > currentText.length) {
                    isWaiting = true;
                    isDeleting = true;
                }
                
                setTimeout(type, typeSpeed);
            } else if (isDeleting && charIndex >= 0) {
                typingElement.textContent = currentText.slice(0, charIndex);
                charIndex--;
                
                if (charIndex < 0) {
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length;
                }
                
                setTimeout(type, deleteSpeed);
            }
        };

        type();
    }

    // Count Up Animation
    countUpAnimation() {
        const stats = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-count'));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;

                    const updateCount = () => {
                        current += increment;
                        if (current < target) {
                            entry.target.textContent = Math.floor(current);
                            requestAnimationFrame(updateCount);
                        } else {
                            entry.target.textContent = target;
                        }
                    };

                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.7 });

        stats.forEach(stat => {
            observer.observe(stat);
        });
    }

    // Skill Progress Bars - Simplified for new design
    skillProgressBars() {
        // Simple hover effects for skill cards
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    // Skill Categories - Simplified navigation
    skillCategories() {
        // Initialize skills navigation
        const navButtons = document.querySelectorAll('.nav-button');
        const skillDomains = document.querySelectorAll('.skill-domain');
        
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                const target = button.dataset.target;
                
                // Update active button
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Update active domain
                skillDomains.forEach(domain => {
                    domain.classList.remove('active');
                    if (domain.dataset.domain === target) {
                        domain.classList.add('active');
                    }
                });
            });
        });
        
        // Handle overview card clicks
        const overviewCards = document.querySelectorAll('.overview-card');
        
        overviewCards.forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                
                // Find and click corresponding nav button
                const targetButton = Array.from(navButtons).find(btn => btn.dataset.target === category);
                if (targetButton) {
                    targetButton.click();
                    
                    // Smooth scroll to skills matrix
                    setTimeout(() => {
                        document.querySelector('.skills-matrix').scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }, 100);
                }
            });
        });
    }

    // Scroll Animations
    scrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.hero-content, .hero-visual, .about-content, .experience-card, .project-card, .contact-card, .highlight-card'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });

        // Stagger animations
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    // Enhanced Contact Form
    contactForm() {
        const form = document.getElementById('contactForm');
        const submitButton = document.querySelector('.btn-submit');
        const successMessage = document.getElementById('formSuccess');
        const errorMessage = document.getElementById('formError');

        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Add loading state
            submitButton.classList.add('loading');
            
            try {
                const formData = new FormData(form);
                const data = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    subject: formData.get('subject'),
                    message: formData.get('message')
                };
                
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                // Simulate loading time for better UX
                await new Promise(resolve => setTimeout(resolve, 1500));

                if (response.ok) {
                    this.showFormMessage(successMessage, 'success');
                    form.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                this.showFormMessage(errorMessage, 'error');
            } finally {
                submitButton.classList.remove('loading');
            }
        });

        // Form field animations
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');
            
            if (input && label) {
                input.addEventListener('focus', () => {
                    group.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        group.classList.remove('focused');
                    }
                });
                
                // Check if field has value on load
                if (input.value) {
                    group.classList.add('focused');
                }
            }
        });
    }

    showFormMessage(element, type) {
        // Hide all messages first
        document.querySelectorAll('.form-success, .form-error').forEach(msg => {
            msg.classList.remove('show');
        });
        
        // Show the specific message
        element.classList.add('show');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            element.classList.remove('show');
        }, 5000);
    }

    // Theme Toggle
    themeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        // Check for saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            this.updateThemeToggle('light');
        } else {
            document.body.classList.remove('light-theme');
            this.updateThemeToggle('dark');
        }

        themeToggle.addEventListener('click', () => {
            const isCurrentlyLight = document.body.classList.contains('light-theme');
            
            if (isCurrentlyLight) {
                // Switch to dark theme
                document.body.classList.remove('light-theme');
                localStorage.setItem('theme', 'dark');
                this.updateThemeToggle('dark');
            } else {
                // Switch to light theme
                document.body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
                this.updateThemeToggle('light');
            }
            
            // Force refresh of dynamic styles
            this.refreshThemeStyles();
        });
    }

    updateThemeToggle(theme) {
        const toggle = document.getElementById('themeToggle');
        if (!toggle) return;
        
        const sunIcon = toggle.querySelector('.fa-sun');
        const moonIcon = toggle.querySelector('.fa-moon');
        
        if (theme === 'light') {
            sunIcon.style.opacity = '1';
            sunIcon.style.color = '#ffa500';
            moonIcon.style.opacity = '0.3';
            moonIcon.style.color = '#999';
        } else {
            sunIcon.style.opacity = '0.3';
            sunIcon.style.color = '#00f2fe';
            moonIcon.style.opacity = '1';
            moonIcon.style.color = '#ffffff';
        }
    }

    refreshThemeStyles() {
        // Force repaint of elements that might not update immediately
        const elements = document.querySelectorAll('.nav-link, .social-link, .contact-card, .project-card, .skill-item');
        elements.forEach(element => {
            element.style.transform = 'translateZ(0)';
            requestAnimationFrame(() => {
                element.style.transform = '';
            });
        });
    }

    // Mobile Menu
    mobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');

        if (!hamburger || !navLinks) return;

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('mobile-active');
        });

        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('.nav-link');
        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('mobile-active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('mobile-active');
            }
        });
    }
    
    // Accessibility Improvements
    improveAccessibility() {
        // Add ARIA labels to interactive elements
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach((link, index) => {
            const sectionName = link.querySelector('span')?.textContent || `Section ${index + 1}`;
            link.setAttribute('aria-label', `Navigate to ${sectionName} section`);
        });
        
        // Add ARIA labels to social links
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            const tooltip = link.getAttribute('data-tooltip');
            if (tooltip) {
                link.setAttribute('aria-label', `${tooltip} - opens in new tab`);
            }
        });
        
        // Add ARIA labels to project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            const title = card.querySelector('.project-title')?.textContent;
            if (title) {
                card.setAttribute('aria-label', `Project: ${title}`);
                card.setAttribute('tabindex', '0');
            }
        });
        
        // Add ARIA labels to skill cards
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach(card => {
            const skill = card.querySelector('h4')?.textContent;
            if (skill) {
                card.setAttribute('aria-label', `Skill: ${skill}`);
            }
        });
        
        // Theme toggle accessibility
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', 'Toggle between light and dark theme');
        }
        
        // Mobile menu accessibility
        const hamburger = document.getElementById('hamburger');
        const navLinksElement = document.getElementById('navLinks');
        if (hamburger && navLinksElement) {
            hamburger.setAttribute('aria-label', 'Toggle navigation menu');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-controls', 'navLinks');
        }
        
        // Add keyboard navigation
        this.addKeyboardNavigation();
    }
    
    // Keyboard Navigation Support
    addKeyboardNavigation() {
        // Focus management for project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const link = card.querySelector('.project-link');
                    if (link) link.click();
                }
            });
        });
        
        // Mobile menu keyboard navigation
        const hamburger = document.getElementById('hamburger');
        if (hamburger) {
            hamburger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    hamburger.click();
                }
            });
        }
    }
}

// Additional CSS for mobile menu and comprehensive light theme
const additionalCSS = `
/* Mobile Menu Animations */
.hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}

.nav-links.mobile-active {
    position: fixed;
    top: 70px;
    left: 0;
    width: 100%;
    background: rgba(12, 12, 12, 0.95);
    backdrop-filter: blur(20px);
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
    box-shadow: var(--shadow-large);
    border-bottom: 1px solid var(--border-color);
}

@media (max-width: 968px) {
    .nav-links {
        display: none;
    }
    
    .nav-links.mobile-active {
        display: flex;
    }
}

/* Comprehensive Light Theme Styles */
.light-theme {
    --bg-dark: #ffffff;
    --bg-dark-light: #f8f9fa;
    --bg-card: #ffffff;
    --card-gradient: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
    --text-light: #1a1a1a;
    --text-gray: #666666;
    --text-dim: #999999;
    --border-color: #e9ecef;
    --border-light: #dee2e6;
    --shadow-small: 0 2px 10px rgba(0, 0, 0, 0.1);
    --shadow-medium: 0 4px 20px rgba(0, 0, 0, 0.1);
    --shadow-large: 0 8px 40px rgba(0, 0, 0, 0.15);
    --shadow-glow: 0 0 30px rgba(102, 126, 234, 0.2);
}

/* Navbar Light Theme */
.light-theme .navbar {
    background: rgba(255, 255, 255, 0.95);
    border-bottom-color: var(--border-color);
}

.light-theme .navbar.scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: var(--shadow-medium);
}

.light-theme .nav-link {
    color: var(--text-gray);
}

.light-theme .nav-link:hover,
.light-theme .nav-link.active {
    color: var(--text-light);
}

.light-theme .theme-toggle {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
}

.light-theme .theme-toggle .fa-sun {
    color: #ffa500;
}

.light-theme .theme-toggle .fa-moon {
    color: var(--text-dim);
}

.light-theme .hamburger span {
    background: var(--text-light);
}

/* Hero Section Light Theme */
.light-theme .hero {
    background: var(--bg-dark);
}

.light-theme .greeting-text {
    color: var(--text-gray);
}

.light-theme .hero-description {
    color: var(--text-gray);
}

.light-theme .typing-text {
    color: var(--accent-color);
}

.light-theme .cursor-blink {
    color: var(--primary-color);
}

.light-theme .avatar-content {
    background: var(--card-gradient);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-large);
}

.light-theme .avatar-ring {
    border-color: var(--primary-color);
}

.light-theme .tech-item {
    background: var(--bg-card);
    box-shadow: var(--shadow-small);
    border: 1px solid var(--border-color);
    color: var(--text-light);
}

.light-theme .social-link {
    background: var(--bg-card);
    color: var(--text-gray);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-small);
}

.light-theme .social-link:hover {
    color: var(--text-light);
    box-shadow: var(--shadow-medium);
}

/* Section Headers Light Theme */
.light-theme .section-badge {
    background: var(--bg-card);
    color: var(--primary-color);
    border: 1px solid var(--border-color);
}

.light-theme .section-title {
    color: var(--text-light);
}

.light-theme .section-description {
    color: var(--text-gray);
}

/* About Section Light Theme */
.light-theme .about {
    background: linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-dark-light) 100%);
}

.light-theme .text-block h3 {
    color: var(--primary-color);
}

.light-theme .text-block p {
    color: var(--text-gray);
}

.light-theme .highlight-card {
    background: var(--card-gradient);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-small);
}

.light-theme .highlight-card h4 {
    color: var(--text-light);
}

.light-theme .highlight-card p {
    color: var(--text-gray);
}

/* Experience Section Light Theme */
.light-theme .experience-card {
    background: var(--card-gradient);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-small);
}

.light-theme .job-title {
    color: var(--text-light);
}

.light-theme .company-name {
    color: var(--primary-color);
}

.light-theme .experience-meta span {
    color: var(--text-gray);
}

.light-theme .tech-focus {
    color: var(--text-gray);
}

.light-theme .responsibilities li {
    color: var(--text-gray);
}

.light-theme .responsibilities li::before {
    color: var(--primary-color);
}

.light-theme .tech-tag {
    background: var(--bg-dark-light);
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
}

.light-theme .marker-line {
    background: var(--border-color);
}

/* Skills Section Light Theme */
.light-theme .skills {
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.light-theme .skills::before {
    background: radial-gradient(circle at 20% 80%, 
        rgba(102, 126, 234, 0.05) 0%, 
        transparent 50%);
}

.light-theme .overview-card {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(102, 126, 234, 0.2);
    backdrop-filter: blur(10px);
}

.light-theme .overview-card::before {
    background: linear-gradient(90deg, 
        transparent, 
        rgba(102, 126, 234, 0.08), 
        transparent);
}

.light-theme .overview-card:hover {
    background: rgba(255, 255, 255, 1);
    border-color: var(--primary-color);
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
}

.light-theme .overview-info h3 {
    color: #1e293b;
}

.light-theme .overview-info p {
    color: #64748b;
}

.light-theme .domain-header {
    background: rgba(255, 255, 255, 0.8);
    border-left-color: var(--primary-color);
}

.light-theme .domain-header h3 {
    color: #1e293b;
}

.light-theme .domain-count {
    background: rgba(102, 126, 234, 0.1);
    border-color: rgba(102, 126, 234, 0.3);
    color: var(--primary-color);
}

.light-theme .skill-card {
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(102, 126, 234, 0.2);
    backdrop-filter: blur(10px);
}

.light-theme .skill-card::before {
    background: linear-gradient(90deg, 
        transparent, 
        rgba(102, 126, 234, 0.08), 
        transparent);
}

.light-theme .skill-card:hover {
    background: rgba(255, 255, 255, 1);
    border-color: var(--primary-color);
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
}

.light-theme .skill-card h4 {
    color: #1e293b;
}

.light-theme .nav-button {
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid rgba(102, 126, 234, 0.2);
    color: #64748b;
}

.light-theme .nav-button::before {
    background: linear-gradient(90deg, 
        transparent, 
        rgba(102, 126, 234, 0.08), 
        transparent);
}

.light-theme .nav-button:hover,
.light-theme .nav-button.active {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    border-color: var(--primary-color);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.light-theme .skill-category {
    background: var(--bg-card);
    color: var(--text-gray);
    border: 2px solid transparent;
}

.light-theme .skill-category:hover,
.light-theme .skill-category.active {
    border-color: var(--primary-color);
    color: var(--primary-color);
    box-shadow: var(--shadow-small);
}

.light-theme .skill-item {
    background: var(--card-gradient);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-small);
}

.light-theme .skill-info h4 {
    color: var(--text-light);
}

.light-theme .skill-bar {
    background: var(--bg-dark-light);
}

/* Projects Section Light Theme */
.light-theme .project-card {
    background: var(--card-gradient);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-small);
}

.light-theme .project-image {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
}

.light-theme .project-title {
    color: var(--text-dark);
}

.light-theme .project-description {
    color: var(--text-gray);
}

.light-theme .feature {
    color: var(--text-gray);
}

.light-theme .feature i {
    color: var(--primary-color);
}

.light-theme .tech-badge {
    background: rgba(255, 255, 255, 0.9);
    color: var(--bg-dark);
}

/* Contact Section Light Theme */
.light-theme .contact {
    background: linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-dark-light) 100%);
}

.light-theme .contact-card {
    background: var(--card-gradient);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-small);
}

.light-theme .contact-details h3 {
    color: var(--text-light);
}

.light-theme .contact-details p {
    color: var(--text-gray);
}

.light-theme .contact-link {
    color: var(--primary-color);
}

.light-theme .contact-link:hover {
    color: var(--accent-color);
}

.light-theme .contact-form-wrapper {
    background: var(--card-gradient);
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-small);
}

/* Form Styles Light Theme */
.light-theme .form-group input,
.light-theme .form-group textarea {
    background: var(--bg-dark-light);
    border-color: var(--border-color);
    color: var(--text-light);
}

.light-theme .form-group input:focus,
.light-theme .form-group textarea:focus {
    border-color: var(--primary-color);
}

.light-theme .form-group label {
    color: var(--text-gray);
}

.light-theme .form-group input:focus + label,
.light-theme .form-group textarea:focus + label,
.light-theme .form-group input:not(:placeholder-shown) + label,
.light-theme .form-group textarea:not(:placeholder-shown) + label {
    color: var(--primary-color);
    background: var(--card-gradient);
}

/* Footer Light Theme */
.light-theme .footer {
    background: var(--bg-dark-light);
    border-top: 1px solid var(--border-color);
}

.light-theme .footer-links a {
    color: var(--text-gray);
}

.light-theme .footer-links a:hover {
    color: var(--primary-color);
}

.light-theme .footer-bottom {
    color: var(--text-dim);
    border-top: 1px solid var(--border-color);
}

/* Loading Screen Light Theme */
.light-theme .loading-screen {
    background: var(--bg-dark);
}

.light-theme .loading-text {
    color: var(--primary-color);
}

.light-theme .loading-ring {
    border-top-color: var(--primary-color);
}

.light-theme .loading-progress {
    background: var(--bg-card);
}

.light-theme .loading-message {
    color: var(--text-gray);
}

/* Mobile Menu Light Theme */
.light-theme .nav-links.mobile-active {
    background: rgba(255, 255, 255, 0.95);
    border-bottom: 1px solid var(--border-color);
}

/* Particle Effects Light Theme */
.light-theme #particle-canvas {
    opacity: 0.3;
}

/* Cursor Light Theme */
.light-theme .cursor-follower {
    background: var(--accent-gradient);
    opacity: 0.4;
}

.light-theme .cursor-follower-delayed {
    border-color: var(--primary-color);
    opacity: 0.2;
}

/* Scroll Indicator Light Theme */
.light-theme .scroll-indicator {
    color: var(--text-gray);
}

.light-theme .scroll-arrow {
    border-color: var(--text-gray);
}

/* Stats Light Theme */
.light-theme .stat-number {
    color: var(--primary-color);
}

.light-theme .stat-unit {
    color: var(--primary-color);
}

.light-theme .stat-label {
    color: var(--text-gray);
}
`;

// Add additional CSS to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

// Initialize the portfolio
new ElitePortfolio();

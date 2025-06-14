// Ultra Premium Portfolio JavaScript
class UltraPremiumPortfolio {
    constructor() {
        this.isLoaded = false;
        this.currentTheme = 'light';
        this.typingTexts = [
            'Junior Python Developer',
            'Full-Stack Engineer', 
            'Code Architect',
            'Problem Solver',
            'Tech Innovator',
            'System Designer',
            'Innovation Catalyst'
        ];
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorTrail = [];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.startAnimations();
        this.initParticleCanvas();
        this.initCursorEffects();
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initNavigation();
            this.initTheme();
            this.initScrollAnimations();
            this.initContactForm();
            this.initMatrixBackground();
            this.startTypingAnimation();
            this.animateSkillLevels();
            this.initPremiumInteractions();
            this.isLoaded = true;
            console.log('Ultra Premium Portfolio loaded successfully!');
        });

        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Advanced scroll events
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateNavigation();
                    this.handleScrollAnimations();
                    this.updateParallaxEffects();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Mouse tracking for cursor effects
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.updateCursorTrail(e.clientX, e.clientY);
        });

        // Resize handler
        window.addEventListener('resize', () => {
            this.handleResize();
            this.resizeParticleCanvas();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    initNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle with animation
        navToggle?.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            this.animateHamburger();
            this.playSound('click');
        });

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                this.resetHamburger();
            });
        });

        // Active link highlighting
        this.updateActiveNavLink();
        
        // Add hover effects to nav links
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.playSound('hover');
                this.createNavRipple(link);
            });
        });
    }

    animateHamburger() {
        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (index === 0) {
                bar.style.transform = 'rotate(45deg) translate(6px, 6px)';
            } else if (index === 1) {
                bar.style.opacity = '0';
            } else {
                bar.style.transform = 'rotate(-45deg) translate(6px, -6px)';
            }
        });
    }

    resetHamburger() {
        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    }

    updateNavigation() {
        const navbar = document.querySelector('.navbar');
        const scrolled = window.scrollY > 50;
        
        if (scrolled) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
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

    createNavRipple(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(102, 126, 234, 0.3);
            width: 10px;
            height: 10px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple-expand 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    initTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        
        // Load saved theme
        const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
        this.setTheme(savedTheme);

        themeToggle?.addEventListener('click', () => {
            this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
            this.setTheme(this.currentTheme);
            this.playSound('theme-change');
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);
        
        const themeIcon = document.getElementById('theme-icon');
        if (themeIcon) {
            themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
        
        this.currentTheme = theme;
        this.updateParticleColors();
    }

    startTypingAnimation() {
        const typingElement = document.getElementById('typing-text');
        if (!typingElement) return;

        this.typeText(typingElement);
    }

    typeText(element) {
        const currentText = this.typingTexts[this.currentTextIndex];
        
        if (this.isDeleting) {
            element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }

        let typeSpeed = this.isDeleting ? 50 : 100;

        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            typeSpeed = 2000;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.typingTexts.length;
            typeSpeed = 500;
        }

        setTimeout(() => this.typeText(element), typeSpeed);
    }

    initParticleCanvas() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.resizeParticleCanvas();
        this.createParticles();
        this.animateParticles();
    }

    resizeParticleCanvas() {
        if (!this.canvas) return;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        const particleCount = Math.min(100, Math.floor(window.innerWidth / 10));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                hue: Math.random() * 60 + 200
            });
        }
    }

    animateParticles() {
        if (!this.ctx) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Mouse interaction
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx -= (dx / distance) * force * 0.01;
                particle.vy -= (dy / distance) * force * 0.01;
                particle.opacity = Math.min(0.8, particle.opacity + force * 0.02);
            } else {
                particle.opacity = Math.max(0.2, particle.opacity - 0.005);
            }
            
            // Apply friction
            particle.vx *= 0.99;
            particle.vy *= 0.99;
            
            // Draw particle
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `hsl(${particle.hue}, 70%, 60%)`;
            this.ctx.fill();
            this.ctx.restore();
            
            // Connect nearby particles
            this.particles.slice(index + 1).forEach(otherParticle => {
                const dx2 = particle.x - otherParticle.x;
                const dy2 = particle.y - otherParticle.y;
                const distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
                
                if (distance2 < 80) {
                    this.ctx.save();
                    this.ctx.globalAlpha = (80 - distance2) / 80 * 0.2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `hsl(${particle.hue}, 70%, 60%)`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            });
        });
        
        requestAnimationFrame(() => this.animateParticles());
    }

    updateParticleColors() {
        this.particles.forEach(particle => {
            particle.hue = this.currentTheme === 'dark' ? 
                Math.random() * 60 + 260 : Math.random() * 60 + 200;
        });
    }

    initCursorEffects() {
        const cursorTrail = document.getElementById('cursor-trail');
        if (!cursorTrail) return;

        document.addEventListener('mousemove', (e) => {
            cursorTrail.style.left = e.clientX - 10 + 'px';
            cursorTrail.style.top = e.clientY - 10 + 'px';
            cursorTrail.style.opacity = '0.8';
        });

        document.addEventListener('mouseleave', () => {
            cursorTrail.style.opacity = '0';
        });
    }

    updateCursorTrail(x, y) {
        this.cursorTrail.push({x, y, opacity: 1, size: 5});
        
        if (this.cursorTrail.length > 10) {
            this.cursorTrail.shift();
        }
        
        this.cursorTrail.forEach((point, index) => {
            point.opacity *= 0.9;
            point.size *= 0.95;
        });
    }

    initMatrixBackground() {
        const matrixBg = document.getElementById('matrix-bg');
        if (!matrixBg) return;

        // Create animated matrix effect
        setInterval(() => {
            const rect = matrixBg.getBoundingClientRect();
            const randomX = Math.random() * rect.width;
            const randomY = Math.random() * rect.height;
            
            const dot = document.createElement('div');
            dot.style.cssText = `
                position: absolute;
                left: ${randomX}px;
                top: ${randomY}px;
                width: 2px;
                height: 2px;
                background: rgba(102, 126, 234, 0.3);
                border-radius: 50%;
                animation: matrix-fade 2s ease-out forwards;
                pointer-events: none;
            `;
            
            matrixBg.appendChild(dot);
            
            setTimeout(() => {
                dot.remove();
            }, 2000);
        }, 200);
    }

    initScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) rotateX(0)';
                    
                    // Trigger specific animations
                    if (entry.target.classList.contains('tech-item-premium')) {
                        this.animateTechItem(entry.target);
                    }
                    
                    if (entry.target.classList.contains('timeline-card-premium')) {
                        this.animateTimelineCard(entry.target);
                    }
                    
                    if (entry.target.classList.contains('project-card-premium')) {
                        this.animateProjectCard(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const elementsToAnimate = document.querySelectorAll(`
            .premium-card,
            .tech-item-premium,
            .timeline-card-premium,
            .project-card-premium,
            .contact-item-premium,
            .stat-card
        `);

        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px) rotateX(10deg)';
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
    }

    handleScrollAnimations() {
        // Additional scroll-based animations
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effects for hero elements
        const heroElements = document.querySelectorAll('.gradient-sphere');
        heroElements.forEach((element, index) => {
            const speed = 0.3 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    }

    updateParallaxEffects() {
        const scrolled = window.pageYOffset;
        
        // Parallax for floating elements
        const floatingElements = document.querySelectorAll('.float-element');
        floatingElements.forEach((element, index) => {
            const speed = 0.2 + (index * 0.05);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.2}deg)`;
        });
    }

    animateSkillLevels() {
        const skillLevels = document.querySelectorAll('.skill-level');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const level = entry.target.dataset.level;
                    entry.target.style.setProperty('--level', level + '%');
                    
                    // Add a subtle animation delay
                    setTimeout(() => {
                        entry.target.style.width = level + '%';
                    }, 300);
                    
                    observer.unobserve(entry.target);
                }
            });
        });

        skillLevels.forEach(level => observer.observe(level));
    }

    animateTechItem(item) {
        const icon = item.querySelector('i');
        if (icon) {
            setTimeout(() => {
                icon.style.transform = 'scale(1.2) rotate(360deg)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }, 500);
            }, 200);
        }
    }

    animateTimelineCard(card) {
        card.style.animationDelay = '0.2s';
        card.classList.add('timeline-animate');
        
        // Add floating animation
        setTimeout(() => {
            card.style.animation = 'float-card 3s ease-in-out infinite';
        }, 800);
    }

    animateProjectCard(card) {
        const overlay = card.querySelector('.project-overlay');
        if (overlay) {
            setTimeout(() => {
                overlay.style.background = 'rgba(102, 126, 234, 0.9)';
                setTimeout(() => {
                    overlay.style.background = 'rgba(0, 0, 0, 0.8)';
                }, 300);
            }, 400);
        }
    }

    initContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });

        // Enhanced form field animations
        const formGroups = document.querySelectorAll('.form-group-premium');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');
            const line = group.querySelector('.form-line-premium');

            input.addEventListener('focus', () => {
                this.createFormRipple(group);
                this.playSound('focus');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    // Add subtle shake animation for empty required fields
                    if (input.hasAttribute('required')) {
                        group.style.animation = 'shake 0.3s ease-in-out';
                        setTimeout(() => {
                            group.style.animation = '';
                        }, 300);
                    }
                }
            });

            // Real-time validation
            input.addEventListener('input', () => {
                this.validateField(input, group);
            });
        });
    }

    createFormRipple(group) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.5), transparent);
            transform: scaleX(0);
            transform-origin: center;
            animation: form-ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        group.style.position = 'relative';
        group.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    validateField(input, group) {
        const isValid = input.checkValidity();
        
        if (isValid) {
            group.classList.remove('error');
            group.classList.add('valid');
        } else {
            group.classList.remove('valid');
            if (input.value.length > 0) {
                group.classList.add('error');
            }
        }
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Enhanced validation
        if (!this.validateForm(name, email, subject, message)) {
            return;
        }

        // Show enhanced loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalContent = submitBtn.innerHTML;
        
        submitBtn.innerHTML = `
            <div class="loading-spinner"></div>
            <span class="btn-text">Sending...</span>
        `;
        submitBtn.disabled = true;
        submitBtn.style.pointerEvents = 'none';

        // Add loading animation
        this.addLoadingAnimation(submitBtn);

        // Simulate form submission with enhanced feedback
        setTimeout(() => {
            const mailtoLink = `mailto:Nailashehzadi396@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            
            try {
                window.open(mailtoLink, '_blank');
                this.showMessage('Email client opened successfully! Please send the message from your email application.', 'success');
                this.playSound('success');
                this.createSuccessAnimation();
            } catch (error) {
                window.location.href = mailtoLink;
                this.showMessage('Redirecting to your email client...', 'success');
            }

            // Reset form with animation
            this.resetFormWithAnimation(form);
            
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
            submitBtn.style.pointerEvents = 'auto';
            
        }, 2000);
    }

    addLoadingAnimation(button) {
        const style = document.createElement('style');
        style.textContent = `
            .loading-spinner {
                width: 20px;
                height: 20px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-top: 2px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-right: 10px;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    resetFormWithAnimation(form) {
        const fields = form.querySelectorAll('input, textarea');
        
        fields.forEach((field, index) => {
            setTimeout(() => {
                field.style.transform = 'translateX(-100%)';
                field.style.opacity = '0';
                
                setTimeout(() => {
                    field.value = '';
                    field.style.transform = 'translateX(0)';
                    field.style.opacity = '1';
                }, 200);
            }, index * 100);
        });
    }

    createSuccessAnimation() {
        // Create floating success particles
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                this.createSuccessParticle();
            }, i * 50);
        }
    }

    createSuccessParticle() {
        const particle = document.createElement('div');
        particle.innerHTML = '✨';
        particle.style.cssText = `
            position: fixed;
            left: ${Math.random() * window.innerWidth}px;
            top: ${window.innerHeight}px;
            font-size: ${Math.random() * 20 + 15}px;
            pointer-events: none;
            animation: success-float 3s ease-out forwards;
            z-index: 10000;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }

    validateForm(name, email, subject, message) {
        if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
            this.showMessage('Please fill in all required fields.', 'error');
            this.playSound('error');
            return false;
        }

        if (!this.isValidEmail(email)) {
            this.showMessage('Please enter a valid email address.', 'error');
            this.playSound('error');
            return false;
        }

        if (message.length < 10) {
            this.showMessage('Please enter a more detailed message (at least 10 characters).', 'error');
            this.playSound('error');
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showMessage(text, type = 'success') {
        const messageElement = document.getElementById('success-message');
        const textElement = document.getElementById('success-text');
        
        if (messageElement && textElement) {
            textElement.textContent = text;
            messageElement.style.display = 'flex';
            
            // Enhanced styling based on type
            const messageContent = messageElement.querySelector('.message-content-premium');
            if (type === 'success') {
                messageContent.style.borderLeft = '4px solid #10b981';
                messageElement.querySelector('.message-icon').innerHTML = '<i class="fas fa-check-circle"></i>';
                messageElement.querySelector('.message-icon').style.background = 'linear-gradient(135deg, #10b981, #059669)';
            } else {
                messageContent.style.borderLeft = '4px solid #ef4444';
                messageElement.querySelector('.message-icon').innerHTML = '<i class="fas fa-exclamation-circle"></i>';
                messageElement.querySelector('.message-icon').style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            }

            // Auto-hide with animation
            setTimeout(() => {
                messageElement.style.animation = 'slide-out-right 0.5s ease-in forwards';
                setTimeout(() => {
                    messageElement.style.display = 'none';
                    messageElement.style.animation = '';
                }, 500);
            }, 4000);
        }
    }

    initPremiumInteractions() {
        this.init3DCardEffects();
        this.initMagneticButtons();
        this.initSoundEffects();
        this.initAdvancedHovers();
        this.initParallaxMouseEffects();
    }

    init3DCardEffects() {
        const cards = document.querySelectorAll('.premium-card, .project-card-premium, .timeline-card-premium');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transformStyle = 'preserve-3d';
                card.style.transition = 'transform 0.1s ease-out';
            });

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 8;
                const rotateY = (centerX - x) / 8;
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateZ(10px)
                    scale3d(1.02, 1.02, 1.02)
                `;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transition = 'transform 0.5s ease-out';
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale3d(1, 1, 1)';
            });
        });
    }

    initMagneticButtons() {
        const buttons = document.querySelectorAll('.btn-ultra-premium, .social-premium, .view-project-btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                const distance = Math.sqrt(x * x + y * y);
                const maxDistance = 50;
                
                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    btn.style.transform = `translate(${x * force * 0.3}px, ${y * force * 0.3}px) scale(${1 + force * 0.1})`;
                }
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0) scale(1)';
            });
        });
    }

    initSoundEffects() {
        // Audio context for premium sound effects
        this.audioContext = null;
        
        const initAudio = () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
        };
        
        this.playSound = (type) => {
            try {
                initAudio();
                const frequencies = {
                    'hover': 800,
                    'click': 1000,
                    'focus': 600,
                    'success': 1200,
                    'error': 400,
                    'theme-change': 1500
                };
                
                const frequency = frequencies[type] || 800;
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.frequency.value = frequency;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.05, this.audioContext.currentTime + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.2);
                
                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + 0.2);
            } catch (error) {
                // Silent fail for browsers that don't support Web Audio API
            }
        };

        // Add sound to interactive elements
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('mouseenter', () => this.playSound('hover'));
            link.addEventListener('click', () => this.playSound('click'));
        });

        document.querySelectorAll('.btn-ultra-premium').forEach(btn => {
            btn.addEventListener('mouseenter', () => this.playSound('hover'));
            btn.addEventListener('click', () => this.playSound('click'));
        });
    }

    initAdvancedHovers() {
        // Tech items with special effects
        document.querySelectorAll('.tech-item-premium').forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.createTechGlow(item);
                this.playSound('hover');
            });
        });

        // Social links with ripple effects
        document.querySelectorAll('.social-premium, .social-link-premium').forEach(link => {
            link.addEventListener('click', () => {
                this.createRippleEffect(link);
                this.playSound('click');
            });
        });
    }

    createTechGlow(element) {
        const glow = document.createElement('div');
        glow.style.cssText = `
            position: absolute;
            inset: -5px;
            background: linear-gradient(45deg, transparent, rgba(102, 126, 234, 0.3), transparent);
            border-radius: 20px;
            opacity: 0;
            animation: tech-glow 1s ease-out;
            pointer-events: none;
            z-index: -1;
        `;
        
        element.style.position = 'relative';
        element.appendChild(glow);
        
        setTimeout(() => {
            glow.remove();
        }, 1000);
    }

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%) scale(0);
            animation: ripple-effect 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    initParallaxMouseEffects() {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            // Parallax for floating elements
            document.querySelectorAll('.gradient-sphere').forEach((element, index) => {
                const speed = (index + 1) * 0.02;
                const x = (mouseX - 0.5) * speed * 100;
                const y = (mouseY - 0.5) * speed * 100;
                
                element.style.transform += ` translate(${x}px, ${y}px)`;
            });
            
            // Subtle parallax for cards
            document.querySelectorAll('.premium-card').forEach((card, index) => {
                const speed = 0.005;
                const x = (mouseX - 0.5) * speed * 20;
                const y = (mouseY - 0.5) * speed * 20;
                
                card.style.transform += ` translate(${x}px, ${y}px)`;
            });
        });
    }

    handleKeyboardShortcuts(e) {
        // Add keyboard shortcuts for better accessibility
        if (e.altKey) {
            switch(e.key) {
                case '1':
                    e.preventDefault();
                    this.scrollToSection('home');
                    break;
                case '2':
                    e.preventDefault();
                    this.scrollToSection('about');
                    break;
                case '3':
                    e.preventDefault();
                    this.scrollToSection('experience');
                    break;
                case '4':
                    e.preventDefault();
                    this.scrollToSection('projects');
                    break;
                case '5':
                    e.preventDefault();
                    this.scrollToSection('contact');
                    break;
                case 't':
                    e.preventDefault();
                    document.getElementById('theme-toggle')?.click();
                    break;
            }
        }
    }

    initializeComponents() {
        // Add advanced CSS animations
        this.addAdvancedAnimations();
        
        // Initialize performance monitoring
        this.initPerformanceMonitoring();
        
        // Initialize accessibility features
        this.initAccessibilityFeatures();
    }

    addAdvancedAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple-expand {
                to { transform: translate(-50%, -50%) scale(5); opacity: 0; }
            }
            
            @keyframes form-ripple {
                to { transform: scaleX(1); opacity: 0; }
            }
            
            @keyframes tech-glow {
                0% { opacity: 0; transform: scale(0.8); }
                50% { opacity: 1; transform: scale(1.1); }
                100% { opacity: 0; transform: scale(1); }
            }
            
            @keyframes ripple-effect {
                to { transform: translate(-50%, -50%) scale(2); opacity: 0; }
            }
            
            @keyframes matrix-fade {
                0% { opacity: 0; transform: scale(0); }
                50% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(1.2); }
            }
            
            @keyframes success-float {
                0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                100% { transform: translateY(-200px) rotate(360deg); opacity: 0; }
            }
            
            @keyframes slide-out-right {
                to { transform: translateX(120%); opacity: 0; }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
            
            @keyframes float-card {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }

    initPerformanceMonitoring() {
        // Monitor performance and adjust effects accordingly
        this.performanceMode = 'high'; // high, medium, low
        
        // Simple FPS monitoring
        let lastTime = performance.now();
        let frameCount = 0;
        
        const checkPerformance = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = frameCount;
                frameCount = 0;
                lastTime = currentTime;
                
                if (fps < 30) {
                    this.performanceMode = 'low';
                    this.adjustPerformance();
                } else if (fps < 50) {
                    this.performanceMode = 'medium';
                }
            }
            
            requestAnimationFrame(checkPerformance);
        };
        
        requestAnimationFrame(checkPerformance);
    }

    adjustPerformance() {
        if (this.performanceMode === 'low') {
            // Reduce particle count
            this.particles = this.particles.slice(0, 30);
            
            // Disable some effects
            document.querySelectorAll('.premium-card').forEach(card => {
                card.style.transition = 'transform 0.2s ease';
            });
        }
    }

    initAccessibilityFeatures() {
        // Add focus indicators
        document.querySelectorAll('button, a, input, textarea').forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid var(--primary-color)';
                element.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', () => {
                element.style.outline = 'none';
            });
        });
        
        // Add reduced motion support
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.01s');
        }
    }

    startAnimations() {
        // Start all animations and effects
        this.addLoadingSequence();
    }

    addLoadingSequence() {
        // Animate elements in sequence on page load
        const elements = [
            '.nav-logo',
            '.nav-link',
            '.hero-image-section',
            '.hero-text-section',
            '.scroll-indicator-premium'
        ];
        
        elements.forEach((selector, index) => {
            setTimeout(() => {
                document.querySelectorAll(selector).forEach(el => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                });
            }, index * 200);
        });
    }

    handleResize() {
        // Handle responsive behavior
        if (window.innerWidth > 968) {
            const navMenu = document.getElementById('nav-menu');
            navMenu?.classList.remove('active');
            this.resetHamburger();
        }
    }

    // Utility functions
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            this.playSound('click');
        }
    }

    downloadCV() {
        const cvContent = `NAILA SHEHZADI
Junior Python Developer & Computer Engineer

CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 Email: Nailashehzadi396@gmail.com
📞 Phone: +92 300 9795515
🔗 LinkedIn: https://www.linkedin.com/in/naila-shehzadi-10g/
💻 GitHub: https://github.com/Nailashehzadi01
📍 Location: Pakistan

EDUCATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎓 Bachelor's Degree in Computer Engineering (2022-2026)
   Institute of Space Technology (IST) - KICSIT

🎓 Diploma of Associate Engineer in Information Technology (2019-2022)
   Kahuta Institute of Technology

PROFESSIONAL EXPERIENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🚀 Junior Python Developer (Nov 2024 - Apr 2025)
   ESGnie Pvt Ltd - Remote
   

💻 Web Development Intern (Dec 2024 - Present)
   CodeAlpha - Remote
   

✍️ Content Writer (Dec 2024)
   Inamigos Foundation (IAF) - Remote
   

TECHNICAL SKILLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Programming Languages:
• Python (Advanced) - Primary expertise
• JavaScript (Proficient) - Full-stack development
• Java (Intermediate) - Object-oriented programming
• C++ (Intermediate) - System-level programming

Web Technologies:
• React.js - Frontend framework
• Node.js - Backend development
• HTML5/CSS3 - Modern web standards
• RESTful APIs - Service integration

Specialized Areas:
• Embedded Systems - Hardware integration
• Database Management - SQL and NoSQL
• Version Control - Git/GitHub
• Network Design - Traffic management systems
• AI/ML - Computer vision and signal processing

CERTIFICATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🏆 Java Programming Certification (Sep 2024)
🏆 C++ Programming Certification (June 2024)
🏆 Frontend Development Certification (June 2024)

KEY PROJECTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔤 Language Translator App
   • AI-powered translation with 50+ language support
   • Real-time processing and voice capabilities
   • Technologies: Python, AI/ML, NLP, API Integration

🌐 Dynamic Network Design for Traffic Management
   • Advanced traffic optimization system
   • Real-time monitoring and predictive analytics
   • Technologies: Python, Networking, Algorithms

👁️ Biometric Recognition System
   • Finger and eye blink recognition
   • Computer vision and machine learning
   • Technologies: Python, OpenCV, Computer Vision

🔊 Adaptive Filter for Echo Cancellation
   • Advanced signal processing system
   • Adaptive algorithms for audio enhancement
   • Technologies: Python, Signal Processing, DSP

🏢 ERP System for KIT College
   • Comprehensive educational management system
   • Multi-user environment with role-based access
   • Technologies: Full-Stack Development, Database Management

🤖 AI Sales Agent Console
   • Intelligent sales automation system
   • AI-driven customer interaction and analytics
   • Technologies: AI/ML, Python, Data Analytics

📡 Arduino Bluetooth LED Controller
   • Wireless IoT control system
   • Mobile app integration
   • Technologies: Arduino, Bluetooth, IoT, Mobile Development

🎮 Interactive Gaming Platform
   • Web-based multiplayer gaming
   • Real-time functionality and competitive features
   • Technologies: JavaScript, WebSocket, Real-time Systems

📦 Smart Inventory Management System
   • Intelligent inventory with predictive analytics
   • Automated restocking and business intelligence
   • Technologies: Python, Database, Analytics, Automation

CORE COMPETENCIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Full-stack development with modern frameworks
• System design and architectural planning
• Problem-solving with analytical thinking
• Team collaboration and cross-functional communication
• Continuous learning and technology adaptation
• Project management and agile development
• Code optimization and performance tuning
• Quality assurance and testing methodologies

ACHIEVEMENTS & HIGHLIGHTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• 1+ years of professional development experience
• 15+ completed projects spanning multiple technologies
• Expertise in 8+ programming languages and frameworks
• Strong foundation in both theoretical concepts and practical implementation
• Proven track record in delivering quality software solutions
• Experience in remote collaboration and agile development environments

LANGUAGES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• English (Fluent)
• Urdu (Native)

PROFESSIONAL SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 Computer Engineering student at KICSIT (affiliated with IST) 
 with a strong passion for software development and hardware concepts.
 Skilled in C++, Java, Python, C#, JavaScript, TypeScript, and Assembly Language,
 with a solid understanding of OOP, data structures, and algorithms. 
 Experienced in React.js, MongoDB, Anaconda, HTML, CSS, and Node.js for web and software development.
Additionally, knowledgeable in signals and systems, embedded systems, and hardware-related technologies.`;

        const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Naila_Shehzadi_CV_Premium.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showMessage('Premium CV downloaded successfully!', 'success');
        this.playSound('success');
        this.createSuccessAnimation();
    }
}

// Premium Project Modal functionality
function openProjectModal(projectId) {
    const projects = {
        translator: {
            title: 'Language Translator App',
            description: 'An advanced AI-powered translation application that supports real-time translation across 50+ languages with voice input/output capabilities and offline functionality.',
            longDescription: 'This sophisticated translation system leverages cutting-edge natural language processing and machine learning algorithms to provide accurate, context-aware translations. The application features a sleek user interface, supports voice recognition, and includes advanced features like text-to-speech, translation history, and favorite phrases management.',
            technologies: ['Python', 'AI/ML', 'Natural Language Processing', 'API Integration', 'TensorFlow', 'Speech Recognition'],
            features: [
                'Real-time translation across 50+ languages',
                'Voice input and output capabilities',
                'Offline translation support for major languages',
                'Context-aware translation accuracy',
                'Translation history and bookmarks',
                'Batch translation for documents',
                'Custom dictionary and phrase management',
                'Cross-platform compatibility'
            ],
            highlights: [
                'Built using state-of-the-art transformer models',
                'Achieved 95%+ accuracy for major language pairs',
                'Optimized for mobile and desktop platforms',
                'Integrated with major cloud translation services'
            ],
            github: 'https://github.com/Nailashehzadi01',
            status: 'Featured',
            category: 'AI/ML'
        },
        network: {
            title: 'Dynamic Network Design',
            description: 'Advanced traffic management system with real-time network optimization, predictive analytics, and intelligent routing capabilities.',
            longDescription: 'A comprehensive network management solution that employs advanced algorithms for traffic optimization, load balancing, and predictive maintenance. The system monitors network performance in real-time, automatically adjusts routing protocols, and provides detailed analytics for network administrators.',
            technologies: ['Python', 'Network Protocols', 'Algorithm Design', 'Data Structures', 'Machine Learning', 'Redis'],
            features: [
                'Real-time traffic optimization and load balancing',
                'Predictive network failure detection',
                'Automated routing protocol adjustments',
                'Comprehensive network performance monitoring',
                'Advanced analytics and reporting dashboard',
                'Multi-protocol support (TCP/IP, UDP, MPLS)',
                'Scalable architecture for enterprise networks',
                'Custom alerting and notification system'
            ],
            highlights: [
                'Reduced network latency by 40% in test environments',
                'Implemented predictive algorithms with 85% accuracy',
                'Designed for high-availability enterprise networks',
                'Supports networks with 1000+ nodes'
            ],
            github: 'https://github.com/Nailashehzadi01',
            status: 'Complex',
            category: 'Networking'
        },
        recognition: {
            title: 'Biometric Recognition System',
            description: 'Advanced finger and eye blink recognition system using computer vision and machine learning for secure authentication.',
            longDescription: 'A sophisticated biometric authentication system that combines fingerprint recognition with eye blink detection for enhanced security. The system uses advanced computer vision techniques and machine learning models to provide accurate, real-time biometric verification.',
            technologies: ['Python', 'OpenCV', 'Computer Vision', 'Machine Learning', 'TensorFlow', 'Image Processing'],
            features: [
                'High-accuracy fingerprint recognition',
                'Real-time eye blink detection and analysis',
                'Multi-factor biometric authentication',
                'Liveness detection to prevent spoofing',
                'Secure biometric data encryption',
                'Cross-platform compatibility',
                'Integration with existing security systems',
                'Performance optimization for mobile devices'
            ],
            highlights: [
                'Achieved 99.7% accuracy in fingerprint matching',
                'Real-time processing with sub-second response times',
                'Robust against various spoofing attempts',
                'Compliant with international security standards'
            ],
            github: 'https://github.com/Nailashehzadi01',
            status: 'Innovative',
            category: 'Security'
        },
        filter: {
            title: 'Adaptive Echo Filter',
            description: 'Advanced signal processing system for echo cancellation using adaptive algorithms and real-time audio enhancement.',
            longDescription: 'A sophisticated digital signal processing system designed to eliminate echo and enhance audio quality in real-time communications. The system employs adaptive filtering techniques and advanced algorithms to provide crystal-clear audio in various environments.',
            technologies: ['Python', 'Signal Processing', 'DSP Algorithms', 'NumPy', 'SciPy', 'Real-time Processing'],
            features: [
                'Real-time echo cancellation and suppression',
                'Adaptive noise reduction algorithms',
                'Multi-channel audio processing',
                'Automatic gain control and leveling',
                'Support for various audio formats',
                'Low-latency processing for live applications',
                'Customizable filter parameters',
                'Integration with VoIP and conferencing systems'
            ],
            highlights: [
                'Reduced echo by 95% in test environments',
                'Processing latency under 5ms',
                'Compatible with major audio frameworks',
                'Optimized for both hardware and software implementation'
            ],
            github: 'https://github.com/Nailashehzadi01',
            status: 'Technical',
            category: 'Signal Processing'
        },
        erp: {
            title: 'ERP System for KIT College',
            description: 'Comprehensive enterprise resource planning system for educational institution management with student, faculty, and administrative modules.',
            longDescription: 'A complete ERP solution designed specifically for educational institutions, featuring modules for student management, faculty administration, academic planning, financial management, and reporting. The system provides a unified platform for all college operations.',
            technologies: ['Python', 'Django', 'PostgreSQL', 'HTML/CSS', 'JavaScript', 'Bootstrap'],
            features: [
                'Student enrollment and academic record management',
                'Faculty and staff administration',
                'Course scheduling and timetable management',
                'Financial management and fee collection',
                'Library management system integration',
                'Examination and grading system',
                'Parent-student-teacher communication portal',
                'Comprehensive reporting and analytics'
            ],
            highlights: [
                'Serves 500+ students and 50+ faculty members',
                'Reduced administrative workload by 60%',
                'Implemented role-based access control',
                'Mobile-responsive design for all devices'
            ],
            github: 'https://github.com/Nailashehzadi01',
            status: 'Enterprise',
            category: 'Education'
        },
        'ai-agent': {
            title: 'AI Sales Agent Console',
            description: 'Intelligent sales automation system with AI-driven customer interaction, lead scoring, and comprehensive analytics dashboard.',
            longDescription: 'An advanced AI-powered sales automation platform that streamlines the entire sales process from lead generation to conversion. The system uses machine learning to analyze customer behavior, predict sales outcomes, and automate routine sales tasks.',
            technologies: ['Python', 'Machine Learning', 'Natural Language Processing', 'React', 'Node.js', 'MongoDB'],
            features: [
                'AI-powered lead scoring and qualification',
                'Automated customer interaction and follow-up',
                'Predictive sales analytics and forecasting',
                'CRM integration and data synchronization',
                'Real-time conversation analysis',
                'Performance tracking and optimization',
                'Custom sales pipeline management',
                'Advanced reporting and insights'
            ],
            highlights: [
                'Increased lead conversion by 35%',
                'Automated 80% of routine sales tasks',
                'Integrated with major CRM platforms',
                'Achieved 90% customer satisfaction rate'
            ],
            github: 'https://github.com/Nailashehzadi01',
            status: 'AI-Powered',
            category: 'Sales Automation'
        },
        arduino: {
            title: 'Arduino Bluetooth LED Controller',
            description: 'Wireless LED control system using Arduino and Bluetooth with mobile app integration for smart home automation.',
            longDescription: 'An IoT-based smart lighting control system that allows users to remotely control LED strips and individual LEDs through a mobile application. The system features custom lighting patterns, scheduling, and integration with home automation systems.',
            technologies: ['Arduino', 'C++', 'Bluetooth', 'Android Development', 'IoT', 'Mobile App'],
            features: [
                'Wireless LED control via Bluetooth',
                'Custom lighting patterns and effects',
                'Mobile app with intuitive interface',
                'Scheduling and automation features',
                'Multiple device support',
                'Energy monitoring and optimization',
                'Voice control integration',
                'Home automation system compatibility'
            ],
            highlights: [
                'Range of up to 50 meters with stable connection',
                'Support for RGB and addressable LED strips',
                'Battery life optimization for portable devices',
                'Easy setup and configuration process'
            ],
            github: 'https://github.com/Nailashehzadi01',
            status: 'IoT',
            category: 'Hardware'
        },
        game: {
            title: 'Interactive Gaming Platform',
            description: 'Web-based multiplayer gaming platform with real-time functionality, tournament system, and competitive gaming features.',
            longDescription: 'A comprehensive online gaming platform that hosts multiple games with real-time multiplayer capabilities. The platform includes user management, tournament systems, leaderboards, and social features to create an engaging gaming community.',
            technologies: ['JavaScript', 'Node.js', 'Socket.io', 'WebGL', 'MongoDB', 'Express'],
            features: [
                'Real-time multiplayer game sessions',
                'Tournament and competition system',
                'Global and friend leaderboards',
                'In-game chat and communication',
                'User profiles and achievement system',
                'Game statistics and analytics',
                'Mobile-responsive gaming interface',
                'Social features and friend system'
            ],
            highlights: [
                'Support for 100+ concurrent players',
                'Sub-20ms latency for real-time games',
                'Cross-platform compatibility',
                'Advanced anti-cheat and moderation system'
            ],
            github: 'https://github.com/Nailashehzadi01',
            status: 'Creative',
            category: 'Gaming'
        },
        inventory: {
            title: 'Smart Inventory System',
            description: 'Intelligent inventory management with predictive analytics, automated restocking, and comprehensive business intelligence.',
            longDescription: 'An advanced inventory management system that uses machine learning to predict demand, optimize stock levels, and automate procurement processes. The system provides real-time tracking, detailed analytics, and integration with major business systems.',
            technologies: ['Python', 'Machine Learning', 'PostgreSQL', 'React', 'FastAPI', 'Pandas'],
            features: [
                'Predictive demand forecasting',
                'Automated reorder point calculations',
                'Real-time inventory tracking',
                'Supplier management and integration',
                'Cost optimization algorithms',
                'Multi-location inventory support',
                'Barcode and QR code scanning',
                'Comprehensive reporting and analytics'
            ],
            highlights: [
                'Reduced inventory costs by 25%',
                'Improved stock availability to 99.5%',
                'Automated 90% of reordering processes',
                'Integration with major ERP systems'
            ],
            github: 'https://github.com/Nailashehzadi01',
            status: 'Business',
            category: 'Business Intelligence'
        }
    };

    const project = projects[projectId];
    if (!project) return;

    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body-premium');
    
    modalBody.innerHTML = `
        <div class="project-modal-header">
            <div class="modal-project-status">${project.status}</div>
            <h2 class="modal-project-title">${project.title}</h2>
            <p class="modal-project-category">${project.category}</p>
        </div>
        
        <div class="project-modal-content">
            <div class="modal-description">
                <h3>Overview</h3>
                <p>${project.description}</p>
                <p>${project.longDescription}</p>
            </div>
            
            <div class="modal-features">
                <h3>Key Features</h3>
                <div class="features-grid">
                    ${project.features.map(feature => `
                        <div class="feature-item">
                            <i class="fas fa-check-circle"></i>
                            <span>${feature}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="modal-highlights">
                <h3>Project Highlights</h3>
                <div class="highlights-list">
                    ${project.highlights.map(highlight => `
                        <div class="highlight-item">
                            <i class="fas fa-star"></i>
                            <span>${highlight}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="modal-technologies">
                <h3>Technologies Used</h3>
                <div class="tech-tags-modal">
                    ${project.technologies.map(tech => `
                        <span class="tech-tag-modal">${tech}</span>
                    `).join('')}
                </div>
            </div>
            
            <div class="modal-actions">
                <a href="${project.github}" target="_blank" class="btn-ultra-premium primary">
                    <i class="fab fa-github"></i>
                    <span class="btn-text">View on GitHub</span>
                    <div class="btn-shine"></div>
                </a>
                <button class="btn-ultra-premium secondary" onclick="portfolio.showMessage('Project demo coming soon!', 'success')">
                    <i class="fas fa-external-link-alt"></i>
                    <span class="btn-text">Live Demo</span>
                    <div class="btn-shine"></div>
                </button>
            </div>
        </div>
    `;

    // Add modal-specific styles
    const modalStyles = document.createElement('style');
    modalStyles.textContent = `
        .project-modal-header {
            padding: 3rem 3rem 2rem;
            border-bottom: 1px solid var(--bg-tertiary);
            text-align: center;
        }
        
        .modal-project-status {
            display: inline-block;
            background: var(--primary-gradient);
            color: white;
            padding: 0.5rem 1.5rem;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 1rem;
        }
        
        .modal-project-title {
            font-size: 2.5rem;
            font-weight: 900;
            color: var(--text-primary);
            margin-bottom: 0.5rem;
            font-family: var(--font-display);
        }
        
        .modal-project-category {
            color: var(--text-secondary);
            font-size: 1.1rem;
            font-weight: 600;
        }
        
        .project-modal-content {
            padding: 2rem 3rem 3rem;
        }
        
        .modal-description,
        .modal-features,
        .modal-highlights,
        .modal-technologies {
            margin-bottom: 3rem;
        }
        
        .modal-description h3,
        .modal-features h3,
        .modal-highlights h3,
        .modal-technologies h3 {
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--text-primary);
            margin-bottom: 1.5rem;
            font-family: var(--font-display);
        }
        
        .modal-description p {
            line-height: 1.8;
            color: var(--text-secondary);
            margin-bottom: 1rem;
            font-size: 1.1rem;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
        }
        
        .feature-item,
        .highlight-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            background: var(--bg-secondary);
            border-radius: 12px;
            transition: all 0.3s ease;
        }
        
        .feature-item:hover,
        .highlight-item:hover {
            background: var(--primary-color);
            color: white;
            transform: translateX(5px);
        }
        
        .feature-item i,
        .highlight-item i {
            color: var(--primary-color);
            font-size: 1.1rem;
        }
        
        .feature-item:hover i,
        .highlight-item:hover i {
            color: white;
        }
        
        .highlights-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .tech-tags-modal {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
        }
        
        .tech-tag-modal {
            background: var(--primary-gradient);
            color: white;
            padding: 0.8rem 1.5rem;
            border-radius: 25px;
            font-size: 0.9rem;
            font-weight: 600;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
        }
        
        .tech-tag-modal:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: var(--shadow-lg);
        }
        
        .modal-actions {
            display: flex;
            gap: 2rem;
            justify-content: center;
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid var(--bg-tertiary);
        }
        
        @media (max-width: 768px) {
            .project-modal-header,
            .project-modal-content {
                padding: 2rem 1.5rem;
            }
            
            .modal-project-title {
                font-size: 2rem;
            }
            
            .features-grid {
                grid-template-columns: 1fr;
            }
            
            .modal-actions {
                flex-direction: column;
                align-items: center;
            }
        }
    `;
    
    document.head.appendChild(modalStyles);
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Play sound effect
    portfolio.playSound('click');
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Play sound effect
        portfolio.playSound('click');
    }
}

// Global functions
function scrollToSection(sectionId) {
    portfolio.scrollToSection(sectionId);
}

function downloadCV() {
    portfolio.downloadCV();
}

// Initialize the ultra premium portfolio
const portfolio = new UltraPremiumPortfolio();

// Export for global access
window.UltraPremiumPortfolio = UltraPremiumPortfolio;
window.portfolio = portfolio;

// Console welcome message
console.log('%c🚀 Ultra Premium Portfolio Loaded Successfully!', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%c💎 Premium features activated', 'color: #f093fb; font-size: 14px;');
console.log('%c⚡ Advanced animations and interactions ready', 'color: #4facfe; font-size: 14px;');
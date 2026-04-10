document.addEventListener('DOMContentLoaded', () => {
    initAll();
});
// Fallback if DOMContentLoaded already fired
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    initAll();
}

function initAll() {
    initCursorGlow();
    initNavbar();
    initMobileMenu();
    initRevealAnimations();
    initParticles();
    initCounterAnimation();
    initSmoothScroll();
    initFormHandling();
    initParallax();
    initNavHighlight();
}

// ===== CURSOR GLOW EFFECT =====
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    if (!glow || window.innerWidth < 768) return;
    
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });
    
    function animate() {
        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;
        glow.style.left = currentX + 'px';
        glow.style.top = currentY + 'px';
        requestAnimationFrame(animate);
    }
    animate();
}

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = scrollY;
    }, { passive: true });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    
    if (!toggle || !links) return;
    
    toggle.addEventListener('click', () => {
        links.classList.toggle('open');
        toggle.classList.toggle('active');
    });
    
    links.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('open');
            toggle.classList.remove('active');
        });
    });
}

// ===== REVEAL ON SCROLL =====
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });
    
    reveals.forEach(el => observer.observe(el));
}

// ===== HERO PARTICLES =====
function initParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'hero-particle';
        
        const x = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 10 + 6;
        const delay = Math.random() * 10;
        const opacity = Math.random() * 0.4 + 0.1;
        
        particle.style.cssText = `
            left: ${x}%;
            width: ${size}px;
            height: ${size}px;
            --duration: ${duration}s;
            --particle-delay: ${delay}s;
            --opacity: ${opacity};
        `;
        
        container.appendChild(particle);
    }
}

// ===== COUNTER ANIMATION =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const startTime = performance.now();

    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const current = Math.round(easedProgress * target);
        
        element.textContent = current.toLocaleString('pt-BR');
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== PARALLAX EFFECT =====
function initParallax() {
    const parallaxImages = document.querySelectorAll('.parallax-image');
    
    if (window.innerWidth < 768) return;
    
    window.addEventListener('scroll', () => {
        parallaxImages.forEach(img => {
            const rect = img.parentElement.getBoundingClientRect();
            const scrollPercent = rect.top / window.innerHeight;
            const translateY = scrollPercent * 40;
            img.style.transform = `translateY(${translateY}px)`;
        });
    }, { passive: true });
}

// ===== NAV HIGHLIGHT =====
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

// ===== FORM HANDLING =====
function initFormHandling() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Floating label effect
    form.querySelectorAll('input, textarea, select').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = document.getElementById('formSubmit');
        const originalContent = btn.innerHTML;
        
        btn.innerHTML = `
            <span style="display:flex;align-items:center;gap:8px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                </svg>
                Enviando...
            </span>
        `;
        btn.disabled = true;
        btn.style.opacity = '0.7';
        
        setTimeout(() => {
            btn.innerHTML = `
                <span style="display:flex;align-items:center;gap:8px;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    Enviado com Sucesso!
                </span>
            `;
            btn.style.background = '#2d8a4e';
            btn.style.opacity = '1';
            
            setTimeout(() => {
                btn.innerHTML = originalContent;
                btn.disabled = false;
                btn.style.background = '';
                form.reset();
            }, 3000);
        }, 2000);
    });
}

// Add spin animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ===== TILT EFFECT ON CARDS =====
document.querySelectorAll('.area-card, .diff-card').forEach(card => {
    if (window.innerWidth < 768) return;
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ===== MAGNETIC BUTTONS =====
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    if (window.innerWidth < 768) return;
    
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
    });
});

// ===== TEXT SPLIT ANIMATION ON HERO =====
function initHeroAnimations() {
    const heroLines = document.querySelectorAll('.hero-line');
    heroLines.forEach((line, i) => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            line.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
        }, 300 + i * 200);
    });
}

// Chamar no final de initAll ou quando o documento carregar
if (document.readyState === 'complete') {
    initHeroAnimations();
} else {
    window.addEventListener('load', initHeroAnimations);
}

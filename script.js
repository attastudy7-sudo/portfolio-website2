// script.js - Comprehensive JavaScript for Portfolio Website

// Typing Animation
const typingText = document.querySelector('.typing-text');
const textArray = ['Web Developer', 'Designer', 'Content Creator'];
let currentTextIndex = 0;
let currentCharIndex = 0;
let currentText = '';
let isDeleting = false;

function type() {
    if (currentTextIndex < textArray.length) {
        currentText = textArray[currentTextIndex];
        typingText.innerHTML = currentText.substring(0, currentCharIndex) + (isDeleting ? '|' : '');

        if (isDeleting) {
            currentCharIndex--;
            if (currentCharIndex < 0) {
                isDeleting = false;
                currentTextIndex++;
                currentCharIndex = 0;
            }
        } else {
            currentCharIndex++;
            if (currentCharIndex === currentText.length) {
                isDeleting = true;
            }
        }
    } else {
        currentTextIndex = 0;
    }
    setTimeout(type, isDeleting ? 100 : 200);
}
type();

// Form Validation and Submission
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value;
        const budget = document.getElementById('budget').value;
        const message = document.getElementById('message').value.trim();
        const privacy = document.getElementById('privacy').checked;
        
        // Validation
        if (!name || !email || !message) {
            showAlert('Please fill in all required fields.', 'error');
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showAlert('Please enter a valid email address.', 'error');
            return;
        }

        if (!privacy) {
            showAlert('Please agree to the privacy policy.', 'error');
            return;
        }

        // Prepare form data
        const formData = {
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            budget: budget,
            message: message,
            timestamp: new Date().toISOString()
        };

        console.log('Form Data:', formData);
        showAlert('✅ Thank you! Your message has been sent successfully.', 'success');
        form.reset();
    });
}

// Show Alert Function
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
        <span>${message}</span>
        <button class="alert-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    const style = document.createElement('style');
    if (!document.getElementById('alertStyles')) {
        style.id = 'alertStyles';
        style.innerHTML = `
            .alert {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                z-index: 10000;
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 15px;
            }
            .alert-success {
                background-color: #4caf50;
                color: white;
            }
            .alert-error {
                background-color: #f44336;
                color: white;
            }
            .alert-info {
                background-color: #2196f3;
                color: white;
            }
            .alert-close {
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 4000);
}

// Smooth Scrolling
const scrollLinks = document.querySelectorAll('a[href^="#"]');
scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            const headerHeight = 80;
            const targetPosition = target.offsetTop - headerHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navbar = document.querySelector('.navbar');

if (hamburger && navbar) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
        });
    });
}

// Navigation Active State
function initNavigation() {
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}
initNavigation();

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .project-card, .testimonial-card, .exp-item, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat h3');
            stats.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    counterObserver.observe(statsSection);
}

// Scroll to Top Button
window.addEventListener('scroll', () => {
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }
});

const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navbar = document.querySelector('.navbar');
        if (hamburger && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navbar.classList.remove('active');
        }
    }
});

console.log('✅ Portfolio website loaded successfully!');
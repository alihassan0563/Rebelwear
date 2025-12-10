
// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '60px';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'white';
            navMenu.style.padding = '1rem';
        });
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Form Submission Handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value.trim();
        const email = this.querySelector('input[type="email"]').value.trim();
        const phone = this.querySelector('input[type="tel"]').value.trim();
        const inquiry = this.querySelector('select').value;
        const message = this.querySelector('textarea').value.trim();
        
        // Client-side validation
        if (!name || !email || !inquiry || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Get submit button and form elements
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
        // Disable form and show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        const formInputs = this.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => input.disabled = true);
        
        try {
            // API endpoint - robust detection for different environments
            let API_URL;
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                API_URL = 'http://localhost:3000/api/contact';
            } else {
                // For production (Render, Netlify, etc.), use same origin
                API_URL = `${window.location.origin}/api/contact`;
            }
            
            console.log('Submitting to API URL:', API_URL);
            
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    inquiry,
                    message
                })
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                // Success
                showNotification(data.message || 'Thank you for your inquiry! We will get back to you within 24-48 hours.', 'success');
                contactForm.reset();
                
                // Scroll to top of form for better UX
                contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                // Handle validation errors
                if (data.errors && data.errors.length > 0) {
                    const errorMessages = data.errors.map(err => err.msg).join(', ');
                    showNotification(errorMessages, 'error');
                } else {
                    showNotification(data.message || 'An error occurred. Please try again.', 'error');
                }
            }
        } catch (error) {
            console.error('Form submission error:', error);
            console.error('API URL was:', API_URL);
            showNotification('Network error. Please check your connection and try again.', 'error');
        } finally {
            // Re-enable form
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
            formInputs.forEach(input => input.disabled = false);
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
    
    // Allow manual close on click
    notification.style.cursor = 'pointer';
    notification.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
}

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / 1000);
    }
});

// Counter Animation for Stats
const animateCounter = (element, target, duration) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
};

const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.textContent);
            animateCounter(entry.target, target, 2000);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item h4').forEach(stat => {
    statsObserver.observe(stat.parentElement);
});

// Product Card Interactions
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Collection Card Interactions - Now handled as direct links
// No additional handler needed as cards are wrapped in anchor tags

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', function() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Add active state styles
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--secondary-color);
    }
    .nav-menu a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Console Branding
console.log('%cREBELWEAR', 'font-size: 40px; font-weight: 900; color: #ff3d00;');
console.log('%cDare to be different.', 'font-size: 16px; color: #666;');

// Easter Egg - Konami Code
let konamiCode = [];
const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    if (konamiCode.length > konami.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.length === konami.length && konamiCode.every((key, index) => key === konami[index])) {
        document.body.style.animation = 'rainbow 2s infinite';
        
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);
        
        setTimeout(() => {
            document.body.style.animation = '';
            document.head.removeChild(rainbowStyle);
        }, 5000);
        
        konamiCode = [];
        alert('🎉 You found the REBELWEAR easter egg!');
    }
});

// Image Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    const imageSliders = document.querySelectorAll('.image-slider');
    
    imageSliders.forEach(slider => {
        const images = slider.querySelectorAll('.slider-image');
        const prevBtn = slider.querySelector('.slider-btn.prev');
        const nextBtn = slider.querySelector('.slider-btn.next');
        const dotsContainer = slider.querySelector('.slider-dots');
        
        if (images.length <= 1) return; // Skip if only one image
        
        let currentIndex = 0;
        
        // Create dots
        images.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'slider-dot' + (index === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Go to image ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        
        function updateSlider() {
            images.forEach((img, index) => {
                img.classList.toggle('active', index === currentIndex);
            });
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % images.length;
            updateSlider();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateSlider();
        }
        
        if (nextBtn) nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextSlide();
        });
        
        if (prevBtn) prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevSlide();
        });
        
        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }
        
        // Auto-play (optional - can be disabled)
        // let autoPlayInterval = setInterval(nextSlide, 4000);
        // slider.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        // slider.addEventListener('mouseleave', () => {
        //     autoPlayInterval = setInterval(nextSlide, 4000);
        // });
    });
});

// Horizontal Scroll for Reviews
const reviewsSlider = document.querySelector('.reviews-slider');
if (reviewsSlider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse drag scrolling
    reviewsSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        reviewsSlider.classList.add('active');
        startX = e.pageX - reviewsSlider.offsetLeft;
        scrollLeft = reviewsSlider.scrollLeft;
    });

    reviewsSlider.addEventListener('mouseleave', () => {
        isDown = false;
        reviewsSlider.classList.remove('active');
    });

    reviewsSlider.addEventListener('mouseup', () => {
        isDown = false;
        reviewsSlider.classList.remove('active');
    });

    reviewsSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - reviewsSlider.offsetLeft;
        const walk = (x - startX) * 2;
        reviewsSlider.scrollLeft = scrollLeft - walk;
    });

    // Touch scrolling for mobile
    let touchStartX = 0;
    let touchScrollLeft = 0;

    reviewsSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX - reviewsSlider.offsetLeft;
        touchScrollLeft = reviewsSlider.scrollLeft;
    });

    reviewsSlider.addEventListener('touchmove', (e) => {
        const x = e.touches[0].pageX - reviewsSlider.offsetLeft;
        const walk = (x - touchStartX) * 2;
        reviewsSlider.scrollLeft = touchScrollLeft - walk;
    });
}


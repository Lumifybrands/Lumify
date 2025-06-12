// Initialize AOS with optimized settings
AOS.init({
    duration: 400,
    easing: 'ease-out',
    once: true,
    offset: 50,
    disable: 'mobile'
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Mobile navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// View more projects functionality
const viewMoreBtn = document.getElementById('view-more-btn');
const hiddenItems = document.querySelectorAll('.hidden-item');
let portfolioExpanded = false;

if (viewMoreBtn && hiddenItems.length > 0) {
    viewMoreBtn.addEventListener('click', () => {
        if (!portfolioExpanded) {
            hiddenItems.forEach(item => {
                item.classList.remove('hidden-item');
            });
            viewMoreBtn.textContent = 'Show Less';
            portfolioExpanded = true;
        } else {
            hiddenItems.forEach(item => {
                item.classList.add('hidden-item');
            });
            viewMoreBtn.textContent = 'View More Projects';
            portfolioExpanded = false;
            // Scroll to portfolio section for better UX
            const portfolioSection = document.getElementById('portfolio');
            if (portfolioSection) {
                portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
}

// Optimized active navigation link on scroll with debounce
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const handleScroll = debounce(() => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
}, 50);

window.addEventListener('scroll', handleScroll);

// Optimized navbar scroll effect with debounce
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

const handleNavbarScroll = debounce(() => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
}, 50);

window.addEventListener('scroll', handleNavbarScroll);

// Optimized form validation and submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        console.log('Form submitted:', { name, email, message });
        contactForm.reset();
        alert('Thank you for your message! We will get back to you soon.');
    });
}

// Email validation helper
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// // Portfolio items loading animation
// const portfolioGrid = document.querySelector('.portfolio-grid');
// if (portfolioGrid) {
//     // Sample portfolio items - replace with your actual portfolio data
//     const portfolioItems = [
//         {
//             image: 'path/to/image1.jpg',
//             title: 'Web Design Project',
//             category: 'Web Design'
//         },
//         {
//             image: 'path/to/image2.jpg',
//             title: 'Digital Marketing Campaign',
//             category: 'Marketing'
//         },
//         // Add more items as needed
//     ];

//     // Load portfolio items with animation
//     portfolioItems.forEach((item, index) => {
//         const portfolioItem = document.createElement('div');
//         portfolioItem.classList.add('portfolio-item');
//         portfolioItem.setAttribute('data-aos', 'fade-up');
//         portfolioItem.setAttribute('data-aos-delay', index * 100);
        
//         portfolioItem.innerHTML = `
//             <div class="portfolio-image">
//                 <img src="${item.image}" alt="${item.title}">
//             </div>
//             <div class="portfolio-info">
//                 <h3>${item.title}</h3>
//                 <p>${item.category}</p>
//             </div>
//         `;
        
//         portfolioGrid.appendChild(portfolioItem);
//     });
// }

// Hero Section Animations
const statNumbers = document.querySelectorAll('.stat-number');
const floatingElements = document.querySelectorAll('.element');

// Animate statistics numbers
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Intersection Observer for statistics
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const targetValue = parseInt(statNumber.getAttribute('data-count'));
            animateValue(statNumber, 0, targetValue, 2000);
            statsObserver.unobserve(statNumber);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    statsObserver.observe(stat);
});

// Enhanced floating elements animation
floatingElements.forEach((element, index) => {
    element.style.setProperty('--delay', `${index * 2}s`);
    element.style.setProperty('--duration', `${6 + index * 2}s`);
    element.style.setProperty('--distance', `${50 + index * 20}px`);
});

// Mouse parallax effect for floating elements
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    floatingElements.forEach((element, index) => {
        const speed = 0.1 + (index * 0.05);
        const x = (mouseX - 0.5) * speed * 100;
        const y = (mouseY - 0.5) * speed * 100;
        
        element.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.1}deg)`;
    });
});

// Scroll indicator animation
const scrollIndicator = document.querySelector('.scroll-indicator');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.transform = 'translate(-50%, 20px)';
    } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.transform = 'translate(-50%, 0)';
    }
    
    lastScrollTop = scrollTop;
});

// Add CSS class for mobile navigation
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        .mobile-nav {
            display: flex !important;
            flex-direction: column;
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 2rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            animation: slideDown 0.3s ease-out;
        }
        
        .mobile-nav a {
            margin: 1rem 0;
            font-size: 1.2rem;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @keyframes slideDown {
            from {
                transform: translateY(-20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
});

// Optimized carousel functionality
function initializeCarousels() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-image');
        let currentIndex = 0;
        let interval;
        let isTransitioning = false;

        function showImage(index) {
            if (isTransitioning) return;
            isTransitioning = true;

            images.forEach(img => {
                img.style.transition = 'opacity 0.3s ease-out';
                img.classList.remove('active');
            });
            
            images[index].classList.add('active');
            
            setTimeout(() => {
                isTransitioning = false;
            }, 300);
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }

        interval = setInterval(nextImage, 4000); // Reduced from 5000ms to 4000ms

        carousel.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });

        carousel.addEventListener('mouseleave', () => {
            interval = setInterval(nextImage, 4000);
        });

        showImage(currentIndex);
    });
}

// Background Animation
function createBackgroundAnimation() {
    const container = document.querySelector('.dots-container');
    const dotCount = 100; // Number of dots
    
    // Clear existing dots if any
    container.innerHTML = '';
    
    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'floating-dot';
        
        // Random initial position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        // Random size (smaller dots)
        const size = Math.random() * 4 + 2;
        
        // Random animation properties
        const duration = Math.random() * 10 + 20;
        const delay = Math.random() * 5;
        
        // Set dot styles
        dot.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            animation: floatDot ${duration}s ${delay}s infinite linear;
            opacity: ${Math.random() * 0.5 + 0.3};
        `;
        
        container.appendChild(dot);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeCarousels();
    createBackgroundAnimation();
    
    // Add CSS class for mobile navigation and animations
    const style = document.createElement('style');
    style.textContent = `
        .background-animation {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            z-index: 0;
            overflow: hidden;
            pointer-events: none;
            background: transparent;
        }

        .dots-container {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }

        .floating-dot {
            position: absolute;
            background: var(--primary-color);
            border-radius: 50%;
            filter: blur(1px);
            pointer-events: none;
            will-change: transform;
            z-index: 1;
        }

        .content-wrapper {
            position: relative;
            z-index: 2;
            background: transparent;
        }

        @keyframes floatDot {
            0% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(15px, 15px) rotate(90deg);
            }
            50% {
                transform: translate(0, 30px) rotate(180deg);
            }
            75% {
                transform: translate(-15px, 15px) rotate(270deg);
            }
            100% {
                transform: translate(0, 0) rotate(360deg);
            }
        }

        .mobile-nav {
            display: flex !important;
            flex-direction: column;
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 2rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            animation: slideDown 0.3s ease-out;
        }
        
        .mobile-nav a {
            margin: 1rem 0;
            font-size: 1.2rem;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @keyframes slideDown {
            from {
                transform: translateY(-20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        @media (max-width: 768px) {
            .floating-dot {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
});

// Add parallax effect to dots with improved visibility
function handleParallax(e) {
    const dots = document.querySelectorAll('.floating-dot');
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

    dots.forEach(dot => {
        const speed = parseFloat(dot.style.width) * 0.1; // Increased parallax effect
        const x = mouseX * speed;
        const y = mouseY * speed;
        dot.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// Throttle the parallax effect for better performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add throttled mousemove event listener
document.addEventListener('mousemove', throttle(handleParallax, 20));

// Back to Top button functionality
const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}); 
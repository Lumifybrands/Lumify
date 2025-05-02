// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-nav');
    hamburger.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
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
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
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
});

// Form validation and submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Here you would typically send the form data to your server
        console.log('Form submitted:', { name, email, message });
        
        // Reset form
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
            animation: slideDown 0.3s ease-in-out;
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
                transform: translateY(-100%);
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

// Enhanced Particle Effect
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 100; // Increased number of particles

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 10;
        const direction = Math.random() * 360; // Random direction
        
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.setProperty('--direction', `${direction}deg`);
        
        // Add glow effect
        const glow = document.createElement('div');
        glow.className = 'particle-glow';
        particle.appendChild(glow);
        
        particlesContainer.appendChild(particle);
    }
}

// Mouse interaction with particles
document.addEventListener('mousemove', (e) => {
    const particles = document.querySelectorAll('.particle');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    particles.forEach(particle => {
        const rect = particle.getBoundingClientRect();
        const particleX = rect.left + rect.width / 2;
        const particleY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(mouseX * window.innerWidth - particleX, 2) +
            Math.pow(mouseY * window.innerHeight - particleY, 2)
        );
        
        if (distance < 200) {
            const angle = Math.atan2(
                mouseY * window.innerHeight - particleY,
                mouseX * window.innerWidth - particleX
            );
            
            const force = (200 - distance) / 200;
            const moveX = Math.cos(angle) * force * 20;
            const moveY = Math.sin(angle) * force * 20;
            
            particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
});

// Initialize particles for services section
function createServicesParticles() {
    const particlesContainer = document.getElementById('services-particles');
    const particleCount = 50; // Fewer particles for services section

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const size = Math.random() * 2 + 1;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 10;
        const direction = Math.random() * 360;
        
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.setProperty('--direction', `${direction}deg`);
        
        // Add glow effect
        const glow = document.createElement('div');
        glow.className = 'particle-glow';
        particle.appendChild(glow);
        
        particlesContainer.appendChild(particle);
    }
}

function createAboutParticles() {
    const container = document.getElementById('about-particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 2 + 1;
        
        // Random animation delay and duration
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;
        
        // Random direction
        const direction = Math.random() * 360;
        
        // Set styles
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.transform = `rotate(${direction}deg)`;
        
        // Add glow effect
        const glow = document.createElement('div');
        glow.className = 'particle-glow';
        particle.appendChild(glow);
        
        container.appendChild(particle);
    }
}

function createPortfolioParticles() {
    const container = document.getElementById('portfolio-particles');
    const particleCount = 30; // Reduced from 50 to 30
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties with reduced ranges
        const size = Math.random() * 2 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 5 + 10;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        container.appendChild(particle);
    }
}

// Initialize particles when the page loads
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    createServicesParticles();
    createAboutParticles();
    createPortfolioParticles();
});

// Carousel functionality
function initializeCarousels() {
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('.carousel-image');
        let currentIndex = 0;
        let interval;

        function showImage(index) {
            images.forEach(img => img.classList.remove('active'));
            images[index].classList.add('active');
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }

        // Auto-advance carousel every 5 seconds
        interval = setInterval(nextImage, 5000);

        // Pause auto-advance when hovering over carousel
        carousel.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });

        // Resume auto-advance when mouse leaves carousel
        carousel.addEventListener('mouseleave', () => {
            interval = setInterval(nextImage, 5000);
        });

        // Show first image initially
        showImage(currentIndex);
    });
}

// Initialize carousels when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeCarousels();
    // ... existing DOMContentLoaded code ...
}); 
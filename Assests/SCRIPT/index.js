window.onscroll = function() {
    const nav = document.querySelector(".nav-panel");
    if (window.scrollY > 50) {
        nav.classList.add("shrink");
    } else {
        nav.classList.remove("shrink");
    }
};

function toggleMenu() {
    const menuLinks = document.getElementById("menuLinks");
    menuLinks.classList.toggle("active"); // Toggle the active class

    // If the menu is opened, add a click event to the document
    if (menuLinks.classList.contains("active")) {
        document.addEventListener("click", outsideClickListener);
    } else {
        document.removeEventListener("click", outsideClickListener);
    }
}

// Function to hide the menu when clicking outside
function outsideClickListener(event) {
    const menuLinks = document.getElementById("menuLinks");
    const hamburger = document.getElementById("hamburger");

    // Check if the click is outside the menu and the hamburger button
    if (menuLinks.contains(event.target) && event.target !== hamburger) {
        menuLinks.classList.remove("active"); // Hide the menu
        document.removeEventListener("click", outsideClickListener); // Remove the listener
    }
}

window.addEventListener("load", function() {
    // Add the 'show' class to the .intro div after a slight delay
    setTimeout(() => {
        document.querySelector(".intro").classList.add("show");
    }, 300); // Adjust delay as needed
});

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle the scroll event
function handleScroll() {
    const box = document.querySelector('.box');
    if (isInViewport(box)) {
        box.classList.add('visible'); // Add visible class when in view
    }
}

function handleScroll1() {
    const box = document.querySelector('.side-image');
    if (isInViewport(box)) {
        box.classList.add('visible'); // Add visible class when in view
    }
}

function handleScroll2() {
    const box = document.querySelector('.contact');
    if (isInViewport(box)) {
        box.classList.add('visible'); // Add visible class when in view
    }
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);
window.addEventListener('scroll', handleScroll1);
window.addEventListener('load', handleScroll1);
window.addEventListener('scroll', handleScroll2);
window.addEventListener('load', handleScroll2);

const links = document.querySelectorAll('.menu-links a');
const hoverBox = document.getElementById('hoverBox');

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        const linkRect = link.getBoundingClientRect();
        hoverBox.style.left = `${linkRect.left}px`; // Position the hover box at the link
        hoverBox.style.width = `${linkRect.width}px`; // Match width to the link
        hoverBox.style.opacity = '1'; // Show the hover box
    });

    link.addEventListener('mouseleave', () => {
        hoverBox.style.opacity = '0'; // Hide the hover box when not hovering
    });
});

document.querySelector('.menu-links').addEventListener('mouseleave', () => {
    hoverBox.style.opacity = '0'; // Hide when mouse leaves menu
});

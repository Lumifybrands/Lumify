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
        setTimeout(() => {
            box.classList.add('visible'); // Add visible class when in view
        }, 100);
    }
}

function handleScroll1() {
    const box = document.querySelector('.side-image');
    if (isInViewport(box)) {
        setTimeout(() => {
            box.classList.add('visible'); // Add visible class when in view
        }, 100);
    }
}

// Add event listener for scroll
window.addEventListener('scroll', handleScroll);

// Optionally trigger scroll event on page load to check if the box is already in view
window.addEventListener('load', handleScroll);

// Add event listener for scroll
window.addEventListener('scroll', handleScroll1);

// Optionally trigger scroll event on page load to check if the box is already in view
window.addEventListener('load', handleScroll1);
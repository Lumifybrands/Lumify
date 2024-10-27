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

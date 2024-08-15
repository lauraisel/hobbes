//to change from three lines into X
const hamburgerEl = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburgerEl.addEventListener("click", () => {
    hamburgerEl.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburgerEl.classList.remove("active");
    navMenu.classList.remove("active");
}));
const menuButton = document.querySelector(".menu-button");
const siteNav = document.querySelector("#site-nav");
const navLinks = siteNav.querySelectorAll("a");

function setMenu(open) {
  siteNav.classList.toggle("is-open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

menuButton.addEventListener("click", function () {
  setMenu(!siteNav.classList.contains("is-open"));
});

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    setMenu(false);
  });
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && siteNav.classList.contains("is-open")) {
    setMenu(false);
    menuButton.focus();
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll("[data-reveal]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach(function (item) {
    item.classList.add("reveal");
    observer.observe(item);
  });
}
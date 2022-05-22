const menu = document.querySelector(".nav__menu--container");
const menuIcon = document.querySelector("#menu__icon");
const testClass = document.querySelector(".nav__menu--bg");

const toggleMenu = () => {
  menu.classList.toggle("menu-open");
};

const hideNav = () => {
  if (!menu.classList.contains("menu-open")) {
    testClass.style.display = "none";
  }
};

menuIcon.addEventListener("click", (e) => {
  testClass.style.display = "block";
  setTimeout(toggleMenu, 100);
  setTimeout(hideNav, 300);
});

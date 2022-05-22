const menu = document.querySelector(".nav__menu--container");
const menuIcon = document.querySelector("#menu__icon");
const testClass = document.querySelector(".testClass");
document.body.style.overflowX = "hidden";
const toggleMenu = () => {
  menu.classList.toggle("menu-open");
};
menuIcon.addEventListener("click", (e) => {
  testClass.style.display = "block";
  setTimeout(toggleMenu, 100);
});

const menu = document.querySelector(".nav__menu--container");
const menuIcon = document.querySelector("#menu__icon");
const testClass = document.querySelector(".nav__menu--bg");
const Urlbar = document.querySelector("#url");
const submitBtn = document.querySelector("#submit");
const ListifResults = document.querySelector(".api__url--result");

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

const AppendResult = async (result, original) => {
  let div = document.createElement("div");
  let shortLink = document.createElement("strong");
  let originalLink = document.createElement("strong");
  let copyBtn = document.createElement("button");

  div.classList.add("py-md", "px-lg-lg");
  sessionStorage.setItem(original, result);

  shortLink.classList.add("px-md");
  shortLink.textContent = result;

  originalLink.classList.add("px-md");
  originalLink.textContent = original;

  copyBtn.classList.add("api__url--result--btn");
  copyBtn.textContent = "Copy";

  copyBtn.addEventListener("click", (e) => {
    e.target.classList.add("copied");
    e.target.textContent = "Copied!";

    navigator.clipboard.writeText(result);
  });

  div.append(originalLink, shortLink, copyBtn);
  ListifResults.append(div);
};

const shortUrl = async (url) => {
  fetch("https://api.shrtco.de/v2/shorten?url=" + url, {
    method: "GET",
  })
    .then(async (res) => res.json())
    .then(
      async (data) =>
        await AppendResult(
          data.result.full_short_link,
          data.result.original_link
        )
    );
};

submitBtn.addEventListener("click", (e) => {
  if (!Urlbar.value) {
    console.log("bar is empty");
  } else {
    shortUrl(Urlbar.value);
  }
});

const AppendSession = (original, result) => {
  let div = document.createElement("div");
  let shortLink = document.createElement("strong");
  let originalLink = document.createElement("strong");
  let copyBtn = document.createElement("button");

  div.classList.add("py-md", "px-lg-lg");

  shortLink.classList.add("px-md");
  shortLink.textContent = result;

  originalLink.classList.add("px-md");
  originalLink.textContent = original;

  copyBtn.classList.add("api__url--result--btn");
  copyBtn.textContent = "Copy";

  copyBtn.addEventListener("click", (e) => {
    e.target.classList.add("copied");
    e.target.textContent = "Copied!";

    navigator.clipboard.writeText(result);
  });
  div.append(originalLink, shortLink, copyBtn);
  ListifResults.append(div);
};

Object.entries(sessionStorage).forEach((item) => {
  let original = item[0];
  let short = item[1];
  AppendSession(original, short);
});

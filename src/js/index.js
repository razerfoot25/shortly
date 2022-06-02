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

class Append {
  constructor(result, original) {
    this.result = result;
    this.original = original;
  }

  AppendElements = () => {
    let div = document.createElement("div");
    let shortLink = document.createElement("strong");
    let originalLink = document.createElement("strong");
    let copyBtn = document.createElement("button");

    div.classList.add("py-md", "px-lg-lg");

    shortLink.classList.add("px-md");
    shortLink.textContent = this.result;

    originalLink.classList.add("px-md");
    originalLink.textContent = this.original;

    copyBtn.classList.add("api__url--result--btn");
    copyBtn.textContent = "Copy";

    copyBtn.addEventListener("click", (e) => {
      e.target.classList.add("copied");
      e.target.textContent = "Copied!";

      navigator.clipboard.writeText(this.result);
    });

    div.append(originalLink, shortLink, copyBtn);
    ListifResults.append(div);
  };

  AppendResult = () => {
    sessionStorage.setItem(this.original, this.result);
    this.AppendElements();
  };

  AppendSession = () => {
    this.AppendElements();
  };
}

const shortUrl = async (url) => {
  fetch("https://api.shrtco.de/v2/shorten?url=" + url, {
    method: "GET",
  })
    .then(async (res) => await res.json())
    .then((data) => {
      let Result = new Append(
        data.result.full_short_link,
        data.result.original_link
      );
      Result.AppendResult();
    });
};

const UrlIsInvalid = () => {
  Urlbar.classList.add("is-invalid");
};

submitBtn.addEventListener("click", (e) => {
  if (!isValid(Urlbar.value)) {
    Urlbar.classList.add("is-invalid");
  } else if (isValid(Urlbar.value)) {
    Urlbar.classList.remove("is-invalid");
    shortUrl(Urlbar.value);
  }
});
var elm;
const isValid = (link) => {
  if (link !== "") {
    if (!elm) {
      elm = document.createElement("input");
      elm.setAttribute("type", "url");
    }
    elm.value = link;

    return elm.validity.valid;
  } else {
    return false;
  }
};

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
  let SessionInfo = new Append(short, original);
  SessionInfo.AppendSession();
});

import { createDraggable } from "https://esm.sh/animejs";
/*
::::::::::::::::::::::::::::::::::::::::::::::::
::                  TASKBAR                   ::
::::::::::::::::::::::::::::::::::::::::::::::::
*/
const loginBtn = document.getElementById("footer-right");

loginBtn.addEventListener("click", function () {
  // console.log("You can't return to login!");

  const newDiv = document.createElement("div");

  newDiv.textContent = "HarmonyOS ERROR. Try again later.";
  newDiv.className = "login-return";

  document.body.appendChild(newDiv);

  // After two seconds, the warning will fade out
  setTimeout(() => {
    newDiv.classList.add("fade-out");
  }, 2000);

  // After 2.5 seconds, the div will be gone
  setTimeout(() => {
    newDiv.remove();
  }, 2500);
});

// const endBtn = document.getElementById("end");

// endBtn.addEventListener("click", function () {
//   console.log("ENDING THIS SESSION");
// });

/*
::::::::::::::::::::::::::::::::::::::::::::::::
::                  POP UPS                   ::
::::::::::::::::::::::::::::::::::::::::::::::::
*/

const littleDude = document.getElementById("music");

littleDude.addEventListener("click", createPopup);

async function createPopup() {
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.innerHTML = `
  <div class="popup-header">X</div>
  <div class="popup-body">CLICK TO CLOSE</div>
  `;

  // random image from Nekos Api
  const res = await fetch("https://nekos.best/api/v2/neko");
  const data = await res.json();

  const imgUrl = data.results[0].url;

  popup.style.backgroundImage = `url(${imgUrl})`;
  popup.style.backgroundSize = "cover";
  popup.style.backgroundPosition = "center";

  const popupWidth = 300;
  const popupHeight = 250;

  // Prevents the pop up from appearing off-screen but gives it random placement
  popup.style.top = Math.random() * (window.innerHeight - popupHeight) + "px";
  popup.style.left = Math.random() * (window.innerWidth - popupHeight) + "px";

  document.body.appendChild(popup);

  popup.addEventListener("click", () => {
    createPopup();
  });

  setTimeout(() => {
    popup.classList.add("fade-out");
  }, 15000);

  setTimeout(() => {
    popup.remove();
  }, 15500);
}

// Secret escape
// window.addEventListener("keydown", (event) => {
//   if (event.key === "Z" || event.key === "z") {
//     window.location.href = "../index.html";
//   }
// });

/*
::::::::::::::::::::::::::::::::::::::::::::::::
::                MONETIZATION                ::
::::::::::::::::::::::::::::::::::::::::::::::::
*/
let explorerBtn = document.getElementById("explorer");

explorerBtn.addEventListener("click", createWeb);

// Create error message when using the web
function errorMessage() {
  const errorBox = document.createElement("div");
  errorBox.classList.add("error-box");

  const errTitleBar = document.createElement("div");
  errTitleBar.classList.add("err-title-bar");

  const errContent = document.createElement("div");
  errContent.classList.add("err-content");

  errTitleBar.innerHTML = `<p class="error-text">SYSTEM MESSAGE</p>`;

  errContent.innerHTML = `
    <p class="error-sub">Access Denied. A subscription fee of $2.99 is required to proceed</p>
    <button class="ok-btn">Take my money</button>
    `;

  errorBox.appendChild(errTitleBar);
  errorBox.appendChild(errContent);
  document.body.appendChild(errorBox);

  removeError();

  // Making it so that the window pops up in the middle of the screen and remains draggable
  requestAnimationFrame(() => {
    const errRect = errorBox.getBoundingClientRect();
    errorBox.style.left = (window.innerWidth / 2 - errRect.width / 2) + "px";
    errorBox.style.top = (window.innerHeight / 2 - errRect.height / 2) + "px";

    createDraggable(errorBox, {
        trigger: errTitleBar,
      });
  });

  function removeError() {
    const moneyBtn = document.querySelector(".ok-btn");

    moneyBtn.addEventListener("click", (event) => {
        errorBox.remove();
    });
  };
};

function createWeb() {
  const webBrowser = document.createElement("div");
  webBrowser.classList.add("web-browser");

  const titleBar = document.createElement("div");
  titleBar.classList.add("title-bar");

  const content = document.createElement("div");
  content.classList.add("content");

  content.innerHTML = `
    <p class ="title-page">Harmony Web</p>
    <input class="search" placeholder="Search Anything" />
  `;

  webBrowser.appendChild(titleBar);
  webBrowser.appendChild(content);

  document.body.appendChild(webBrowser);

  requestAnimationFrame(() => {
    const rect = webBrowser.getBoundingClientRect();
    webBrowser.style.left = (window.innerWidth / 2 - rect.width / 2) + "px";
    webBrowser.style.top = (window.innerHeight / 2 - rect.height / 2) + "px";

    createDraggable(webBrowser, {
      trigger: titleBar,
    });
  });

  explorerBtn.addEventListener("click", function () {
    webBrowser.remove();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      errorMessage();
      event.target.value = "";
    }
  });
}

/*
::::::::::::::::::::::::::::::::::::::::::::::::
::                 END SCREEN                 ::
::::::::::::::::::::::::::::::::::::::::::::::::
*/

const trashBtn = document.getElementById("trash");

trashBtn.addEventListener("click", function() {
  // console.log("button is working");
  window.location.href = "../html/Endscreen.html";
});
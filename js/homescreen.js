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

const endBtn = document.getElementById("end");

endBtn.addEventListener("click", function () {
  console.log("ENDING THIS SESSION");
});

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

  errorBox.innerHTML = `
    <p class="error-text">SYSTEM ERROR</p>
    <p class="error-sub">To search, please pay 2.99$ to subscribe!</p>
    <button class="ok-btn">Take my money</button>
    `;

  errorBox.appendChild(errTitleBar);
  document.body.appendChild(errorBox);

  createDraggable(webBrowser, {
    trigger: errTitleBar,
  });
}

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

  explorerBtn.addEventListener("click", function () {
    webBrowser.remove();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      console.log("PAY 2.99$ TO SEARCH");
    }
  });

  createDraggable(webBrowser, {
    trigger: titleBar,
  });
}

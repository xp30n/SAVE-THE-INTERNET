const loginBtn = document.getElementById("footer-right");

loginBtn.addEventListener("click", function () {
  // console.log("You can't return to login!");

  const newDiv = document.createElement("div");

  newDiv.textContent = "You can't return to login!";
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

const musicPlayer = document.getElementById("music");

musicPlayer.addEventListener("click", createPopup);

async function createPopup() {
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.innerHTML = `<div class="popup-body">CLICK TO CLOSE</div>`;

  // random image from Nekos Api
  const res = await fetch("https://nekos.best/api/v2/neko");
  const data = await res.json();

  const imgUrl = data.results[0].url;

  popup.style.backgroundImage = `url(${imgUrl})`;
  popup.style.backgroundSize = "cover";
  popup.style.backgroundPosition = "center";

  const popupWidth = 400;
  const popupHeight = 300;

  popup.style.top = Math.random() * (window.innerHeight - popupHeight) + "px";
  popup.style.left = Math.random() * (window.innerWidth - popupHeight) + "px";

  document.body.appendChild(popup);

  popup.addEventListener("click", () => {
    createPopup();
  });

  setTimeout(() => {
    popup.classList.add("fade-out");
  }, 10000);

  setTimeout(() => {
    popup.remove();
  }, 10500);
}

// Secret escape
window.addEventListener("keydown", (event) => {
  if (event.key === "Z" || event.key === "z") {
    window.location.href = "../index.html";
  }
});

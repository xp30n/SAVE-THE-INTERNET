// Wait until everything is loaded
window.addEventListener("load", function () {
  let startBtn = document.getElementById("start-btn");

  startBtn.addEventListener("click", function () {
    // console.log("Button is clicked")
    window.location.href = "#";
  });

  setTimeout(function () {
    let webEl = document.getElementById("welcome-el");
    let globeEl = document.getElementById("globe-gif");
    let startEl = document.getElementById("start-btn");

    webEl.style.opacity = 1;
    globeEl.style.opacity = 1;
    startEl.style.opacity = 1;
  }, 2000);
});

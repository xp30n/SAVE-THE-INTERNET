// Variables
const startBtn = document.getElementById("start-btn");
const adWindow = document.getElementById("ad-window");

startBtn.addEventListener("click", function() {
    startBtn.style.opacity = 0;
    adWindow.classList.toggle("show");
});

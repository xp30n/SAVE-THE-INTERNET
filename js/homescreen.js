window.addEventListener("keydown", (event) => {
    if (event.key === "Z" || event.key === "z") {
        window.location.href = "../index.html"
    }
})

const taskbarImg = document.getElementById("taskbar");

setTimeout( function() {
    taskbarImg.style.opacity = 1;
}, 1000);
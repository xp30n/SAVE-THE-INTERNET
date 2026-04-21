const loginBtn = document.getElementById("footer-right");

loginBtn.addEventListener("click", function() {
    console.log("You can't return to login!");
})

window.addEventListener("keydown", (event) => {
  if (event.key === "Z" || event.key === "z") {
    window.location.href = "../index.html";
  }
});


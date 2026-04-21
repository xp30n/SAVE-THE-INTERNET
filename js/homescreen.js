const loginBtn = document.getElementById("footer-right");

loginBtn.addEventListener("click", function() {
    // console.log("You can't return to login!");

    const newDiv = document.createElement("div");

    newDiv.textContent = "You can't return to login!"
    newDiv.className = "login-return"

    document.body.appendChild(newDiv);

    // After two seconds, the warning will fade out
    setTimeout(() => {
        newDiv.classList.add("fade-out");
    }, 2000)

    // After 2.5 seconds, the div will be gone
    setTimeout(() => {
        newDiv.remove();
    }, 2500)
})

window.addEventListener("keydown", (event) => {
  if (event.key === "Z" || event.key === "z") {
    window.location.href = "../index.html";
  }
});


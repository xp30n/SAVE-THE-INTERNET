// Wait for the page to load 
window.addEventListener("load", function () {
  const welcomeEl = document.getElementById("welcome-el");
  const globeEl = document.getElementById("globe-gif");
  const startEl = document.getElementById("start-btn");
  const startBtn = document.getElementById("start-btn");

  const welcomeText = "WELCOME TO THE WORLD WIDE WEB.";
  const speed = 150;
  let i = 0;

  welcomeEl.textContent = "";

  // Have the text write on
  function typeWriter() {
    if (i < welcomeText.length) {
      welcomeEl.innerHTML += welcomeText.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  // Function to make the button clickable
  startBtn.addEventListener("click", function () {
    // console.log("Button is clicked")
    window.location.href = "#";
  });

  // Wait 2 seconds after the page loads to fade in the elements
  this.setTimeout(function () {
    welcomeEl.style.opacity = 1;
    globeEl.style.opacity = 1;
    startEl.style.opacity = 1;
  }, 2000);

  // Wait 4 seconds after the page loads to fade in the welcome text
  this.setTimeout(function () {
    typeWriter();
  }, 4000);
});

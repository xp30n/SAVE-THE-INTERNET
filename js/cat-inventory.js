import { createDraggable } from "https://esm.sh/animejs";
let catInventory = JSON.parse(localStorage.getItem("cats")) || [];
console.log(catInventory)

// Get carousel div from html to be the parent div for the images to append to
const parent = document.querySelector(".carousel");
displayInventory();
// Display the inventory
function displayInventory() {
    catInventory.forEach(cat => {
        const image = document.createElement("img");
        // Add class of card to each image
        image.classList.add("card");
        // Set image source
        image.src = cat
        parent.appendChild(image);
    });
}

document.getElementById('galleryBtn').addEventListener('click', () => {
    window.location.href = '../html/gallery.html';
});
let cats = document.querySelectorAll(".card")
cats.forEach(cat => {
    cat.addEventListener('click', errorMessage)
})


function errorMessage() {
    parent.style.pointerEvents = "none";
    const errorBox = document.createElement("div");
    errorBox.classList.add("error-box");

    const errTitleBar = document.createElement("div");
    errTitleBar.classList.add("err-title-bar");

    const errContent = document.createElement("div");
    errContent.classList.add("err-content");

    errTitleBar.innerHTML = `<p class="error-text">PURCHASE CAT</p>`;

    errContent.innerHTML = `
    <p class="error-sub">A subscription fee of $99.99 is required to proceed</p>
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
            parent.style.pointerEvents = "all";
        });
    };
};
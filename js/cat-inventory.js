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
    window.location.href = 'index.html';
});
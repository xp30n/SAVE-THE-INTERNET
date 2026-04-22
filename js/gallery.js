import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
// Delete the storage data if it is the first time vsiting the site
if (!localStorage.getItem("hasVisited")) {
    // First time opening the page
    localStorage.clear(); // or remove only what you want

    localStorage.setItem("hasVisited", "true");
}
function random(min, max) {
    return min + Math.random() * (max - min)
}
const savedCats = JSON.parse(localStorage.getItem("cats")) || [];
let catInventory = savedCats;

const scene = new THREE.Scene()
const sizes = {
    width: 800,
    height: 600
}

// CANVAS ELEMENT
const canvas = document.querySelector('canvas#three-ex');

// CAMERA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1)
scene.add(camera)

// RENDERER
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    powerPreference: 'high-performance'
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
// CONTROLS
const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true;
// Restricts camera angle to the flooe level
controls.minPolarAngle = Math.PI / 2;
controls.maxPolarAngle = Math.PI / 2
controls.target.y = 2;

// LIGHTS
const ambientLight = new THREE.AmbientLight('#d2dfe8')
scene.add(ambientLight);

const hemilight = new THREE.HemisphereLight('#ffffbb', '#000020', 1);
// hemilight.color.setHSL(0.6, 1, 0.1);
// hemilight.groundColor.setHSL(0.1, 0.2, 0.1);
scene.add(hemilight);

const directionalLight = new THREE.DirectionalLight()
directionalLight.color = new THREE.Color(0xFFFFF)
scene.add(directionalLight)

// const pointLight = new THREE.PointLight('#ffffff', 1, 100);
// pointLight.position.set(0, 10, 5);
// pointLight.distance = .75;
// scene.add(pointLight);

// GROUND
const groundGeo = new THREE.PlaneGeometry(105, 105);
const groundMat = new THREE.MeshLambertMaterial({ side: THREE.DoubleSide });
groundMat.color.setHSL(0.1, 1, 0.75);
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
scene.add(ground)
const gridHelper = new THREE.GridHelper(100, 20);
scene.add(gridHelper);

// CANVAS 3D OBJECTS
// TEXTURE LOADER
const textureLoader = new THREE.TextureLoader();

// CAT PORTRAIT CODE
let numOfCats = 10;
let catArr = [];
let eyeArr = [];
// Create and render cat portrait
function addBox(imageUrl, angle) {
    const group = new THREE.Group();

    const texture = textureLoader.load(imageUrl);
    // Cat material
    let material = new THREE.MeshLambertMaterial({ color: '#ffffff', map: texture })
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(5, 5, 0.2),
        material
    )
    // position the whole group
    group.position.setFromCylindricalCoords(random(numOfCats, numOfCats + 3), angle, 2.5);
    group.lookAt(0, 2, 0);
    // add box to group
    group.add(box);

    // EYE
    // clone the eye 
    // Eye wrapper 
    const eyePivot = new THREE.Object3D();
    const eye = eyeModel.clone();

    // Scale eye
    eye.scale.set(0.4, 0.4, 0.4);
    // fix orientation ONCE
    eye.rotation.y = -Math.PI; // tweak this (try +/- Math.PI/2 too) 
    // Add eye to eye wrapper 
    eyePivot.add(eye);
    // position eye on top of box
    eyePivot.position.y = 2.5

    // Add eye pivot to group
    group.add(eyePivot);
    catArr.push(box);
    eyeArr.push(eyePivot);
    scene.add(group);

}
// Call the api again to fetch new cat images
async function resetImages() {
    for (let i = 0; i < numOfCats; i++) {
        let catImage = await fetchCat();
        replaceGallery(catImage, i);


        await new Promise(resolve => setTimeout(resolve, 50));
    }
    // Unlock the emotion once all the images have been reset
    emotionLock = false;
}
// Replace the existing cat potraits with new images
function replaceGallery(catImage, imageIndex) {
    const texture = textureLoader.load(catImage);

    const portrait = catArr[imageIndex];
    portrait.material.map = texture;
    portrait.material.needsUpdate = true;
}
// Create Cat images
let imagesLoaded = false;
async function createImages() {
    for (let i = 0; i < numOfCats; i++) {
        let catImage = await fetchCat();

        let angle = (i / numOfCats) * (Math.PI * 2) - Math.PI * 2;
        addBox(catImage, angle);


        await new Promise(resolve => setTimeout(resolve, 100));
    }
    imagesLoaded = true
}
let eyeModel;
// Load eye model and call for cat images
async function init() {
    eyeModel = await loadModels(); // load once
    createImages(); // then create boxes
}

init();

// Load models
async function loadModels() {
    const gltLoader = new GLTFLoader();
    try {
        const gltfEye = await gltLoader.loadAsync('../3Dmodels/mecanic_eye/scene.gltf');
        const eyeModel = gltfEye.scene.children[0];
        // console.log(eyeModel)
        return eyeModel;
    }
    catch (error) {
        console.log(error.message)
    }
}

// createImages();
// Fetch cat API
async function fetchCat() {
    // console.log("hello fetch II");
    try {
        // Url of cat gifs with an orange text that says hello
        let urlA = `https://cataas.com/cat/gif/says/Hello?filter=mono&fontColor=orange&fontSize=20&type=square&json=true`
        // Url of random cat images
        let urlB = `https://cataas.com/cat?json=true`
        //
        let response = await fetch(urlB) //response
        let cat = await response.json();
        // console.log(cat)
        // displayOnSite(cat.url)
        return cat.url

    }
    catch (err) {
        console.log(err);
    }
}

// Forces objects to have updated positions to check the intersection positions cuz object positions havent updated till we render them
// box.updateMatrixWorld()


// TRACK MOUSE POSITION
const mouse = new THREE.Vector2();
const mouseTarget = new THREE.Object3D();

const intersectionPoint = new THREE.Vector3();
const planeNormal = new THREE.Vector3();
const plane = new THREE.Plane();
const mouseRaycaster = new THREE.Raycaster();
// Mouse move check
window.addEventListener("mousemove", function (event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    //map to between -1,1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    //map to between -1,1
    planeNormal.copy(camera.position).normalize()
    plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
    mouseRaycaster.setFromCamera(mouse, camera);
    mouseRaycaster.ray.intersectPlane(plane, intersectionPoint);
    mouseTarget.position.set(intersectionPoint.x, intersectionPoint.y, 2);

});



// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});



// VIDEO FACE API CAM
const video = document.getElementById('video')
let emotionLock = false;
let currentEmotion = null;
let currentProbability = 0;
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('../models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('../models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('../models'),
    faceapi.nets.faceExpressionNet.loadFromUri('../models')
]).then(startVideo)

function startVideo() {
    navigator.mediaDevices.getUserMedia({
        video: {
            width: { ideal: 320 },
            height: { ideal: 240 }
        }
    })
        .then(stream => video.srcObject = stream)
        .catch(err => console.error(err));
}
// Show video once it has fully loaded
video.addEventListener('loadeddata', () => {
    video.style.opacity = 0.95;
});
video.addEventListener('play', () => {
    const vidCanvas = faceapi.createCanvasFromMedia(video)
    vidCanvas.id = "vidCanvas";
    if (!document.getElementById('vidCanvas')) {
        document.body.append(vidCanvas);
    }
    vidCanvas.width = video.videoWidth;
    vidCanvas.height = video.videoHeight;
    const displaySize = {
        width: video.videoWidth,
        height: video.videoHeight
    };
    faceapi.matchDimensions(vidCanvas, displaySize)
    setInterval(async () => {
        // Stores the face detections
        // An array that stores each face that has been detected
        if (video.readyState !== 4) return; // ✅ IMPORTANT

        const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({ inputSize: 160 }))
            .withFaceExpressions();
        // Resizes the face detections based on the canvas size
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        // console.log(resizedDetections.face.expressions);
        // Clear the canvas
        vidCanvas.getContext('2d').clearRect(0, 0, vidCanvas.width, vidCanvas.height);
        // // Draw bounding box
        // faceapi.draw.drawDetections(vidCanvas, resizedDetections);
        // faceapi.draw.drawFaceLandmarks(vidCanvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(vidCanvas, resizedDetections);
        // Trying to log the facial expressions in real time
        resizedDetections.forEach(face => {
            const expressions = face.expressions;

            [currentEmotion, currentProbability] = Object.entries(expressions)
                .reduce((a, b) => (a[1] > b[1] ? a : b));
            // Logs emotion and probability
            console.log(currentEmotion);
            // console.log(probability);


            // Reset the cat images if the user is surprised
            if (currentEmotion === "surprised" && !emotionLock && imagesLoaded) {
                resetImages();
                // Lock the emotion so it this function doesnt get called again until all the images have been reset
                emotionLock = true;
                // console.log(emotionLock)
            }
        })
    }, 500)
})

// ANIMATE SCENE
window.requestAnimationFrame(animate);

// SET CAMERA POSTION
camera.position.z = 5;
// RAYCAST
const raycaster = new THREE.Raycaster();
let currentIntersectedObj = null
let frame = 0;
// ANIMATION
function animate(timer) {
    controls.update();
    // Check the every 2 frames (every frame divisible by 2)
    if (frame % 2 === 0) {
        // raycast here
        raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
    }
    frame++;

    renderer.render(scene, camera);
    // Check ray cast 
    const intersects = raycaster.intersectObjects(catArr);
    if (intersects.length > 0) {
        const hit = intersects[0].object;

        // If we are looking at a NEW object
        if (currentIntersectedObj !== hit) {

            // reset previous one
            if (currentIntersectedObj) {
                currentIntersectedObj.material.color.set('#ffffff');
            }

            // set new one
            currentIntersectedObj = hit;
            currentIntersectedObj.material.color.set('#e13333');
        }
        if (currentIntersectedObj === hit) {
            // If the cat inventory doesnt already have this potrait and the user smiles at it add the image src to the cat inventory array
            if (currentEmotion === "happy" && !catInventory.includes(currentIntersectedObj.material.map.image.src)) {
                // Change color to green once image is added
                currentIntersectedObj.material.color.set('#56e133');
                // Adds image only
                catInventory.push(currentIntersectedObj.material.map.image.src);
                localStorage.setItem("cats", JSON.stringify(catInventory));
                console.log(catInventory);
            }
        }
    } else {
        // not looking at anything → reset last one
        if (currentIntersectedObj) {
            currentIntersectedObj.material.color.set('#ffffff');
        }

        currentIntersectedObj = null;
    }


    // EYES LOOK AT MOUSE POSITION
    eyeArr.forEach(eye => {
        eye.lookAt(mouseTarget.position);
    });

    window.requestAnimationFrame(animate);
}

// Click Inventory button
document.getElementById('inventoryBtn').addEventListener('click', () => {
    window.location.href = '../html/inventory.html';
});

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref, update } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBqgNC5BXxtHMnc-oMhQ0QhLYg18oAG3QA",
    authDomain: "teens-f3fc7.firebaseapp.com",
    databaseURL: "https://teens-f3fc7-default-rtdb.firebaseio.com",
    projectId: "teens-f3fc7",
    storageBucket: "teens-f3fc7.appspot.com",
    messagingSenderId: "828565874604",
    appId: "1:828565874604:web:83ce3266202b4cd4b1fc09"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

// Function to get query parameters from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Check for UID in the query parameters
const uid = getQueryParam("uid");

if (uid) {
    alert(`User authenticated through UID: ${uid}`);
} else {
    // If no UID is found in the URL, check authentication state
    onAuthStateChanged(auth, (user) => {
        if (user) {
            alert(`User authenticated using onAuthStateChanged: ${user.uid}`);
        } else {
            alert("No authenticated user found.");
        }
    });
}

// Select elements
const profilePic = document.getElementById("profilePic");
const nameInput = document.getElementById("name");
const ageSlider = document.getElementById("ageSliderPick");
const genderSlider = document.getElementById("genderSliderPick");
const setUpBtn = document.getElementById("setUpBtn");
const iconDiv = document.getElementById("iconDiv");
const animationDiv = document.getElementById("animationDiv");
const setUpText = document.getElementById("setUpText");

// Profile Picture Upload
let profilePicFile = null;

iconDiv.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            profilePicFile = file;
            const reader = new FileReader();
            reader.onload = (e) => {
                profilePic.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    input.click();
});

function animation() {
    animationDiv.style.display = "flex";
    setUpText.style.display = "none";
}

// Function to get selected option from slider
function getSelectedOption(slider) {
    const activeOption = slider.querySelector(".active, .genActive");
    return activeOption ? activeOption.textContent.trim() : null;
}

// Function to upload profile picture
async function uploadProfilePicture(uid, file) {
    if (!file) return null;
    const fileRef = storageRef(storage, `profile_pictures/${uid}.jpg`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
}

// Handle Setup Button Click
setUpBtn.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user) {
        alert("No authenticated user.");
        return;
    }

    const uid = user.uid;
    const name = nameInput.value.trim();
    const age = getSelectedOption(ageSlider);
    const gender = getSelectedOption(genderSlider);

    if (!name || !age || !gender) {
        alert("Please complete all fields.");
        return;
    }
    animation();
    
    // Upload profile picture if selected
    let profilePicUrl = await uploadProfilePicture(uid, profilePicFile);

    // Save user data in Firebase Realtime Database
    update(ref(database, `users/${uid}`), {
        profilePic: profilePicUrl || "img/profile.png",
        name,
        gender,
        age,
        "set-up": true
    })
    .then(() => {
        alert("Profile setup completed!");
        window.location.href = `app.html?uid=${uid}`; // Redirect to app.html with UID
    })
    .catch((error) => {
        alert("Error updating profile: " + error.message);
    });
});

// Detect user authentication state
onAuthStateChanged(auth, (user) => {
    if (!user) {
        alert("No authenticated user found.");
    }
});

// Initialize sliders
document.addEventListener("DOMContentLoaded", () => {
    function setupSlider(sliderId, activeClass) {
        const slider = document.getElementById(sliderId);
        const options = slider.querySelectorAll("div");

        function detectCenterOption() {
            let sliderRect = slider.getBoundingClientRect();
            let centerX = sliderRect.left + sliderRect.width / 2;

            let closestOption = null;
            let minDistance = Infinity;

            options.forEach((option) => {
                let optionRect = option.getBoundingClientRect();
                let optionCenterX = optionRect.left + optionRect.width / 2;
                let distance = Math.abs(centerX - optionCenterX);

                if (distance < minDistance) {
                    minDistance = distance;
                    closestOption = option;
                }
            });

            if (closestOption) {
                slider.querySelector(`.${activeClass}`)?.classList.remove(activeClass);
                closestOption.classList.add(activeClass);
            }
        }

        slider.addEventListener("scroll", detectCenterOption);
        options.forEach((option) => {
            option.addEventListener("click", () => {
                slider.querySelector(`.${activeClass}`)?.classList.remove(activeClass);
                option.classList.add(activeClass);
                option.scrollIntoView({ behavior: "smooth", inline: "center" });
            });
        });

        setTimeout(() => {
            slider.querySelector(`.${activeClass}`).scrollIntoView({ behavior: "smooth", inline: "center" });
        }, 500);
    }

    setupSlider("ageSliderPick", "active");
    setupSlider("genderSliderPick", "genActive");
});

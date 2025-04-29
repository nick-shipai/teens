// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

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

// Function to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Check for UID in the URL
let uid = getQueryParam("uid");
const iframe = document.getElementById("iframe");

if (!uid) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            uid = user.uid;
            console.log(`User authenticated: ${uid}`);
        } else {
            alert("User not authenticated");
        }
        iframe.src = `chat.html?uid=${uid}&chat=genChat`;
    });
} else {
    console.log(`User authenticated via UID: ${uid}`);
    iframe.src = `chat.html?uid=${uid}&chat=genChat`;
}



 
        
 

const leftFrame = document.getElementById("leftFrame");
 
 
document.addEventListener("DOMContentLoaded", function () {
    window.history.pushState(null, null, window.location.href);
    
    window.addEventListener("popstate", function (e) {
      e.preventDefault(); // Stop going back
      window.history.pushState(null, null, window.location.href); // Push again to prevent back navigation
      alert("Press back again to exit"); // Optional: Show a warning before exit
    });
});

window.addEventListener("message", function (event) {
    const leftFrameDiv = document.getElementById("leftFrameDiv");
    if (!leftFrameDiv) return;

    if (event.data === "page:messages") {
        leftFrameDiv.style.display = "none";
        console.log("Switched to messages.html → hiding left frame");
    } else if (event.data === "page:chat") {
        leftFrameDiv.style.display = "block";
        console.log("Switched to chat.html → showing left frame");
    }
});
const chatDiv = document.getElementById("chatDiv");
chatDiv.addEventListener("click", function () {
    const currentSrc = iframe.src;
    if (!currentSrc.includes("&privateChat=opened")) {
        const newSrc = `${currentSrc}&privateChat=opened`;
        iframe.src = newSrc;
        history.pushState({ path: newSrc }, null, newSrc);
        console.log("Private chat opened in iframe without reloading");
    }
});
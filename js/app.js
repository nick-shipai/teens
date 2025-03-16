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
const uid = getQueryParam("uid");

if (uid) {
    console.log("User authenticated via UID: " + uid);
    setIframeSrc(uid);
} else {
    // Check authentication state
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User authenticated: " + user.uid);
            setIframeSrc(user.uid);
        } else {
            console.log("No user is authenticated.");
        }
    });
}

// Function to set the iframe source
function setIframeSrc(userId) {
    const iframe = document.getElementById("iframe");
    if (iframe) {
        iframe.src = `chat.html?uid=${userId}&chat=genChat`;
    }
}

const leftFrame = document.getElementById("leftFrame");
 
// Set iframe src when the page loads
window.onload = () => {
    if (uid) {
        setIframeSrc(uid);
    }
};

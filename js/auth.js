// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

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

// Get form elements
const showLogin = document.getElementById("switchToLogin");
const showSignUp = document.getElementById("switchToSignUp");
const signUpBtn = document.getElementById("signUpBtn");
const loginBtn = document.getElementById("loginBtn");

// Toggle between login and sign-up forms
showLogin.addEventListener("click", () => {
    document.getElementById("signUpDiv").style.display = "none";
    document.getElementById("loginDiv").style.display = "block";
});

showSignUp.addEventListener("click", () => {
    document.getElementById("signUpDiv").style.display = "block";
    document.getElementById("loginDiv").style.display = "none";
});

// Show error message function
function showError(message) {
    const errorDiv = document.getElementById("errorDiv");
    const errorText = document.getElementById("errorText");

    errorText.innerText = message;
    errorDiv.classList.remove("slide-in", "slide-out");
    void errorDiv.offsetWidth; // Restart animation
    errorDiv.classList.add("slide-in");

    setTimeout(() => {
        errorDiv.classList.remove("slide-in");
        errorDiv.classList.add("slide-out");
    }, 5000);
}

// Validate email format
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Toggle password visibility
document.querySelectorAll(".fa-eye-slash").forEach((eyeIcon) => {
    eyeIcon.addEventListener("click", function () {
        const inputField = this.previousElementSibling;
        if (inputField.type === "password") {
            inputField.type = "text";
            this.classList.remove("fa-eye-slash");
            this.classList.add("fa-eye");
        } else {
            inputField.type = "password";
            this.classList.remove("fa-eye");
            this.classList.add("fa-eye-slash");
        }
    });
});
function showSignUpAnimation () {
    document.getElementById("animationDiv").style.display = "flex";
    document.getElementById("signUpText").style.display = "none";
}
function showLoginAnimation () {
    document.getElementById("loginAnimationDiv").style.display = "flex";
    document.getElementById("loginText").style.display = "none";
}
// Sign-up functionality
signUpBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const signUpEmail = document.getElementById("signUpEmail").value.trim();
    const signUpPass = document.getElementById("signUpPass").value.trim();

    if (signUpEmail === "") return showError("Email can't be empty");
    if (!isValidEmail(signUpEmail)) return showError("Invalid email format");
    if (signUpPass === "") return showError("Password can't be empty");
    if (signUpPass.length < 6) return showError("Password must be at least 6 characters long");

    try {
        showSignUpAnimation();
        const userCredential = await createUserWithEmailAndPassword(auth, signUpEmail, signUpPass);
        const user = userCredential.user;

        // Save user data to Firebase Realtime Database
        await set(ref(database, "users/" + user.uid), {
            email: signUpEmail,
            account: "user",
            "set-up": false
        });

        console.log("User signed up successfully:", user);
        alert("Sign-up successful!");

        // Redirect to set-up page
        window.location.href = `set-up.html?uid=${user.uid}`;
    } catch (error) {
        console.error("Error signing up:", error.message);
        showError(error.message);
    }
});

// Login functionality
loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const loginEmail = document.getElementById("loginEmail").value.trim();
    const loginPass = document.getElementById("loginPass").value.trim();

    if (loginEmail === "") return showError("Email can't be empty");
    if (!isValidEmail(loginEmail)) return showError("Invalid email format");
    if (loginPass === "") return showError("Password can't be empty");

    try {
        showLoginAnimation();
        const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPass);
        const user = userCredential.user;

        // Check if user has completed setup
        const userRef = ref(database, "users/" + user.uid);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            const userData = snapshot.val();
            if (userData["set-up"] === true) {
                console.log("User setup complete, redirecting to app.");
                window.location.href = `app.html?uid=${user.uid}`;
            } else {
                console.log("User setup incomplete, redirecting to setup.");
                window.location.href = `set-up.html?uid=${user.uid}`;
            }
        } else {
            console.error("User data not found!");
            showError("User data not found, please sign up again.");
        }
    } catch (error) {
        console.error("Error logging in:", error.message);
        showError(error.message);
    }
});

// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref, set, get, update, onValue, onDisconnect } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
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
const db = getDatabase(app);

// Function to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
let uid = getQueryParam("uid");
// Run after DOM is ready

const setupDiv = document.getElementById("set-upDiv");
const iframe = document.getElementById("iframe");
const chatDiv = document.getElementById("chatDiv");
const appLoadingDiv = document.getElementById("appLoadingDiv");
const signUpAndLoginDiv = document.getElementById("signUpAndLoginDiv");

const signUpForm = document.getElementById("signUpForm");
const loginForm = document.getElementById("loginForm");
const signUpSwitchButton = document.getElementById("signUpSwitchButton");
const loginSwitchButton = document.getElementById("loginSwitchButton");
const signUpDiv = document.getElementById("signUpDiv");
const loginDiv = document.getElementById("loginDiv");

const signUpPasswordInput = document.getElementById("signUpPassword");
const showSignUpPasswordIcon = document.getElementById("showPasswordIcon");

const loginPasswordInput = document.getElementById("loginPassword");
const showLoginPasswordIcon = document.getElementById("showLoginPasswordIcon");

// Track user state
let inactivityTimer;
const inactivityLimit = 60000; // 1 minute
let currentState = "online";

const startInactivityTracking = (userStatusDatabaseRef) => {
    const markAway = () => {
        update(userStatusDatabaseRef, {
            state: 'away',
            last_changed: new Date().toISOString()
        });
        currentState = "away";
    };

    const markOnline = () => {
        update(userStatusDatabaseRef, {
            state: 'online',
            last_changed: new Date().toISOString()
        });
        currentState = "online";
    };

    const resetInactivityTimer = () => {
        clearTimeout(inactivityTimer);
        if (currentState !== "online") {
            markOnline();
        } else {
            // Even if currentState is online, update just in case backend is not in sync
            update(userStatusDatabaseRef, {
                state: 'online',
                last_changed: new Date().toISOString()
            });
        }
        inactivityTimer = setTimeout(markAway, inactivityLimit);
    };

    // Attach listeners once
    ['mousemove', 'keydown', 'mousedown', 'touchstart'].forEach(event => {
        document.addEventListener(event, resetInactivityTimer);
    });

    resetInactivityTimer(); // Start timer immediately
};

// Auth listener
onAuthStateChanged(auth, async (user) => {
    if (user) {
        uid = user.uid;
        iframe.src = `chat.html?uid=${uid}&chat=genChat`;
        signUpAndLoginDiv.style.display = "none";

        const userRef = ref(db, `users/${user.uid}`);
        const userSnapshot = await get(userRef);
        const userData = userSnapshot.val();

        setupDiv.style.display = (!userData["set-up"]) ? "flex" : "none";

        const userStatusDatabaseRef = ref(db, `users/${uid}/status`);
        const isConnectedRef = ref(db, '.info/connected');

        // Monitor connection state
        onValue(isConnectedRef, (snapshot) => {
            if (snapshot.val() === true) {
                // User is connected, set to online
                set(userStatusDatabaseRef, {
                    state: 'online',
                    last_changed: new Date().toISOString()
                });

                // Set user status to offline when they disconnect
                onDisconnect(userStatusDatabaseRef).set({
                    state: 'offline',
                    last_changed: new Date().toISOString()
                });

            } else {
                // If the user is disconnected, set to offline
                set(userStatusDatabaseRef, {
                    state: 'offline',
                    last_changed: new Date().toISOString()
                });
            }
        });

        // ✅ Start tracking user activity (mouse, key events)
        startInactivityTracking(userStatusDatabaseRef);

    } else {
        signUpAndLoginDiv.style.display = "flex";
    }
});




// Hide loading screen after 10 seconds
setTimeout(() => {
    appLoadingDiv.style.display = "none";
}, 10000);

// Switch to Login form
signUpSwitchButton.addEventListener("click", () => {
    signUpDiv.style.display = "none";
    loginDiv.style.display = "flex";
});

// Switch to Sign Up form
loginSwitchButton.addEventListener("click", () => {
    loginDiv.style.display = "none";
    signUpDiv.style.display = "flex";
});

// Handle Sign Up
document.getElementById("signUpButton").addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const username = document.getElementById("signUpUsername").value;
    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userRef = ref(db, `users/${user.uid}`);
        await set(userRef, {
            name: username,
            email: email,
            time: new Date().toISOString(),
            uid: user.uid,
            account: "user",
            "set-up": false,
        });

        signUpAndLoginDiv.style.display = "none";
        setupDiv.style.display = "flex"; // Show setup UI
    } catch (error) {
        console.error("Error signing up:", error);
        alert("Sign up failed: " + error.message);
    }
});

// Handle Login
document.getElementById("loginButton").addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const email = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        signUpAndLoginDiv.style.display = "none";
    } catch (error) {
        console.error("Error logging in:", error);
        alert("Login failed: " + error.message);
    }
});

// Toggle password visibility - Sign Up
showSignUpPasswordIcon.addEventListener("click", () => {
    if (signUpPasswordInput.type === "password") {
        signUpPasswordInput.type = "text";
        showSignUpPasswordIcon.classList.remove("fa-eye");
        showSignUpPasswordIcon.classList.add("fa-eye-slash");
    } else {
        signUpPasswordInput.type = "password";
        showSignUpPasswordIcon.classList.remove("fa-eye-slash");
        showSignUpPasswordIcon.classList.add("fa-eye");
    }
});

// Toggle password visibility - Login
showLoginPasswordIcon.addEventListener("click", () => {
    if (loginPasswordInput.type === "password") {
        loginPasswordInput.type = "text";
        showLoginPasswordIcon.classList.remove("fa-eye");
        showLoginPasswordIcon.classList.add("fa-eye-slash");
    } else {
        loginPasswordInput.type = "password";
        showLoginPasswordIcon.classList.remove("fa-eye-slash");
        showLoginPasswordIcon.classList.add("fa-eye");
    }
});

const storage = getStorage(app);

document.addEventListener("DOMContentLoaded", function () {
    const addProfilePicDiv = document.getElementById("addProfilePicDiv");
    const ageInput = document.getElementById("ageInput");
    const maleDiv = document.getElementById("male");
    const femaleDiv = document.getElementById("female");
    const saveSetUpButton = document.getElementById("saveSetUp");

    let selectedGender = "male";
    let profilePicFile = null;

    // Handle gender selection
    maleDiv.addEventListener("click", () => {
        selectedGender = "male";
        maleDiv.classList.add("active");
        femaleDiv.classList.remove("active");
    });

    femaleDiv.addEventListener("click", () => {
        selectedGender = "female";
        femaleDiv.classList.add("active");
        maleDiv.classList.remove("active");
    });

    // Handle profile picture upload
    addProfilePicDiv.addEventListener("click", () => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.addEventListener("change", (event) => {
            profilePicFile = event.target.files[0];
            if (profilePicFile) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    addProfilePicDiv.style.backgroundImage = `url(${e.target.result})`;
                };
                reader.readAsDataURL(profilePicFile);
            }
        });
        fileInput.click();
    });

    // Handle save setup
    saveSetUpButton.addEventListener("click", async () => {
        const age = ageInput.value;

        if (!age || !profilePicFile) {
            alert("Please complete all fields and upload a profile picture.");
            return;
        }

        try {
            // Upload profile picture to Firebase Storage
            const profilePicStorageRef = storageRef(storage, `profilePics/${uid}`);
            await uploadBytes(profilePicStorageRef, profilePicFile);
            const profilePicURL = await getDownloadURL(profilePicStorageRef);

            // Save user setup data to Firebase Database
            const userRef = ref(db, `users/${uid}`);
            await update(userRef, {
                age: age,
                gender: selectedGender,
                profilePic: profilePicURL,
                "set-up": true,
            });

            alert("Setup saved successfully!");
            setupDiv.style.display = "none";
        } catch (error) {
            console.error("Error saving setup:", error);
            alert("Failed to save setup: " + error.message);
        }
    });
});

 
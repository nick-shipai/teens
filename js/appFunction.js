// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref, set, get, update, onValue, onDisconnect, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
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
let currentChat = "genChat"; // Default chat name
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



onAuthStateChanged(auth, async (user) => {
    if (user) {
        uid = user.uid;
        checkCurrentChat();
        signUpAndLoginDiv.style.display = "none";

        const userRef = ref(db, `users/${user.uid}`);
        const userSnapshot = await get(userRef);
        const userData = userSnapshot.val();

        onValue(ref(db, `users/${user.uid}/accountStatus`), (snapshot) => {
            const accountStatus = snapshot.val();
            if (accountStatus === "banned") {
            bannedDiv.style.display = "flex";
            signUpAndLoginDiv.style.display = "none";
            setupDiv.style.display = "none";
            iframe.style.display = "none";
            return;
            } else {
            bannedDiv.style.display = "none";
            iframe.style.display = "block";
            }
        });

        setupDiv.style.display = (!userData["set-up"]) ? "flex" : "none";

        // ✅ Only initialize Ably once UID is known
        initAbly(uid);
        checkAllUsersOnline()
    } else {
        signUpAndLoginDiv.style.display = "flex";
    }
});

function checkCurrentChat() {
    const userRef = ref(db, `users/${uid}/currentChat`);
    onValue(userRef, (snapshot) => {
        currentChat = snapshot.val();
        iframe.src = `chat.html?uid=${uid}&chat=${currentChat || "genChat"}`;
    });
}


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
function checkAllUsersOnline() {
    const usersRef = ref(db, 'users');

    // Use onValue to listen for real-time updates to the 'users' node
    onValue(usersRef, async (snapshot) => {
        if (snapshot.exists()) {
            const users = snapshot.val();
            const currentTime = Date.now();

            for (const userId in users) {
                const user = users[userId];
                const lastPresence = user.presence || 0;

                // Skip if the user's presence is undefined or 0 (indicating the user just connected)
                if (lastPresence === 0) {
                    continue;
                }

                // Check if the user has been inactive for 10 seconds
                if (currentTime - lastPresence > 10000) {
                    const userStatusRef = ref(db, `users/${userId}/status`);
                    await set(userStatusRef, "offline");  // Mark user as offline
                    const activeUserRef = ref(db, `group-chat/${currentChat}/activeUser/${userId}`);
                    remove(activeUserRef); // Remove active user reference on disconnect
                } else {
                    const userStatusRef = ref(db, `users/${userId}/status`);
                    await set(userStatusRef, "online");  // Mark user as online
                }
            }
        }
    });
}


function initAbly(uid) {
    const username = "user_" + Math.floor(Math.random() * 10000);
    const ably = new Ably.Realtime({
        key: '_LiHmA.YRn10A:Qc9CKILFTpR3EQZ3WAU9l7XE95J0-r2ykwilI0dGc8g',
        clientId: uid
    });

    const channel = ably.channels.get("presence-demo");

    ably.connection.on('connected', () => {
        console.log('Connected to Ably');

        // Enter Ably presence
        channel.presence.enter({ username }, async (err) => {
            if (err) {
                console.error('Error entering presence:', err);
            } else {
                console.log(username + ' entered presence');

                // Update Firebase with online status and current timestamp for presence
                const userRef = ref(db, `users/${uid}`);
                await update(userRef, {
                    status: "online",
                    presence: Date.now()  // Set the current timestamp as last presence
                });

                // Increment presence counter every second (i.e., update the timestamp every second)
                const presenceRef = ref(db, `users/${uid}/presence`);
                setInterval(async () => {
                    await set(presenceRef, Date.now());  // Update the presence timestamp to the current time
                }, 1000);
                console.log("Presence counter initialized");
            }
        });

        // Set up Firebase presence detection
    });

    // Optional: handle manual disconnect
    window.addEventListener('beforeunload', () => {
        channel.presence.leave();
    });
}


const bannedDiv = document.getElementById("bannedDiv");


// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref, push, set, serverTimestamp, onChildAdded, get, onValue, remove, update, onDisconnect } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getStorage, ref as storageRef, listAll, deleteObject, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";



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
let chattingWithUser = "";

// Function to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get UID from URL or Firebase Auth
let uid = getQueryParam("uid");
const chatName = getQueryParam("chat") || "genChat"; // Default to genChat if not provided

if (uid) {
    console.log(`User authenticated via UID: ${uid}`);
    // ✅ Call other functions that depend on UID here
    
} else {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            uid = user.uid;
            console.log(`User authenticated: ${uid}`);
            // ✅ Now that we have UID, call dependent functions
            
        } else {
            alert("User not authenticated");
        }
    });
}


// Handle message sending
document.getElementById("sendDiv").addEventListener("click", () => {
    sendMessage();
    document.getElementById("message").focus(); // Ensure messageInput is active
});

document.getElementById("message").addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
        document.getElementById("message").focus(); // Ensure messageInput is active
    }
});



// Reference to messages in the database
const messagesRef = ref(database, `group-chat/${chatName}/message`);

// Function to fetch user details
async function fetchUserData(uid) {
    const userRef = ref(database, `users/${uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
        return snapshot.val();
    }
    return { name: "Unknown User", profilePic: "img/profile.png", account: "User", textColor: "black", neon: null, fontStyle: null, fontType: null, gradient: null, profileSticker: null, animation: null, nameFontStyle: null, nameFontType: null, userTextColor: null, style: null }; // Default values
}
if (uid) {
    fetchUserData(uid).then((userData) => {
        const userRank = userData.account || "User";

        const restrictedRanks = [
            "user", "vip", "svip", "elite", "champion", "icon", "legend", "royal", 
            "guardian", "sentinel", "overseer", "enforcer", "inspector", "moderator", "admin", 
            "co-owner", "owner", "emperor", "mvp"
        ]; // Add ranks to skip functions

        if (userRank.toLowerCase() === "cool") {
            const uploadAudioDiv = document.getElementById("uploadAudioDiv");
            const uploadGiftDiv = document.getElementById("uploadGiftDiv");
            const uploadYoutubeDiv = document.getElementById("uploadYoutubeDiv");
            const uploadDrawingDiv = document.getElementById("uploadDrawingDiv");
            const uploadGameDiv = document.getElementById("uploadGameDiv");
            
            if (uploadAudioDiv) {
                uploadAudioDiv.style.display = "block";
            }
        } else if (userRank.toLowerCase() === "vip") { 
            const uploadAudioDiv = document.getElementById("uploadAudioDiv");
            const uploadGiftDiv = document.getElementById("uploadGiftDiv");
            

            if (uploadAudioDiv) {
                uploadAudioDiv.style.display = "block";
            }
            if (uploadGiftDiv) {
                uploadGiftDiv.style.display = "block";
            }
        } else if (userRank.toLowerCase() === "svip") {
            if (uploadAudioDiv) {
                uploadAudioDiv.style.display = "block";
            }
            if (uploadGiftDiv) {
                uploadGiftDiv.style.display = "block";
            }
            if (uploadYoutubeDiv) {
                uploadYoutubeDiv.style.display = "block";
            }

        } else if (userRank.toLowerCase() === "mvp") {
            if (uploadAudioDiv) {
                uploadAudioDiv.style.display = "block";
            }
            if (uploadGiftDiv) {
                uploadGiftDiv.style.display = "block";
            }
            if (uploadYoutubeDiv) {
                uploadYoutubeDiv.style.display = "block";
            }
            if (uploadDrawingDiv) {
                uploadDrawingDiv.style.display = "block";
            }

        } else if (userRank.toLowerCase() === "elite") {
            if (uploadAudioDiv) {
                uploadAudioDiv.style.display = "block";
            }
            if (uploadGiftDiv) {
                uploadGiftDiv.style.display = "block";
            }
            if (uploadYoutubeDiv) {
                uploadYoutubeDiv.style.display = "block";
            }
            if (uploadDrawingDiv) {
                uploadDrawingDiv.style.display = "block";
            }
            if (uploadGameDiv) {
                uploadGameDiv.style.display = "block";
            }

        } else if (userRank.toLowerCase() === "icon") {
            if (uploadAudioDiv) {
                uploadAudioDiv.style.display = "block";
            }
            if (uploadGiftDiv) {
                uploadGiftDiv.style.display = "block";
            }
            if (uploadYoutubeDiv) {
                uploadYoutubeDiv.style.display = "block";
            }
            if (uploadDrawingDiv) {
                uploadDrawingDiv.style.display = "block";
            }
            if (uploadGameDiv) {
                uploadGameDiv.style.display = "block";
            }

        } else if (userRank.toLowerCase() === "champion") {
            if (uploadAudioDiv) {
                uploadAudioDiv.style.display = "block";
            }
            if (uploadGiftDiv) {
                uploadGiftDiv.style.display = "block";
            }
            if (uploadYoutubeDiv) {
                uploadYoutubeDiv.style.display = "block";
            }
            if (uploadDrawingDiv) {
                uploadDrawingDiv.style.display = "block";
            }
            if (uploadGameDiv) {
                uploadGameDiv.style.display = "block";
            }

        } else if (userRank.toLowerCase() === "legend") {
            if (uploadAudioDiv) {
                uploadAudioDiv.style.display = "block";
            }
            if (uploadGiftDiv) {
                uploadGiftDiv.style.display = "block";
            }
            if (uploadYoutubeDiv) {
                uploadYoutubeDiv.style.display = "block";
            }
            if (uploadDrawingDiv) {
                uploadDrawingDiv.style.display = "block";
            }
            if (uploadGameDiv) {
                uploadGameDiv.style.display = "block";
            }
        } else if (userRank.toLowerCase() === "royal") {
            if (uploadAudioDiv) {
                uploadAudioDiv.style.display = "block";
            }
            if (uploadGiftDiv) {
                uploadGiftDiv.style.display = "block";
            }
            if (uploadYoutubeDiv) {
                uploadYoutubeDiv.style.display = "block";
            }
            if (uploadDrawingDiv) {
                uploadDrawingDiv.style.display = "block";
            }
            if (uploadGameDiv) {
                uploadGameDiv.style.display = "block";
            }
        } else if (userRank.toLowerCase() === "guardian") {
            if (uploadAudioDiv) {
                uploadAudioDiv.style.display = "block";
            }
            if (uploadGiftDiv) {
                uploadGiftDiv.style.display = "block";
            }
            if (uploadYoutubeDiv) {
                uploadYoutubeDiv.style.display = "block";
            }
            if (uploadDrawingDiv) {
                uploadDrawingDiv.style.display = "block";
            }
            if (uploadGameDiv) {
                uploadGameDiv.style.display = "block";
            }
        } else if (userRank.toLowerCase() === "sentinel") {
            if (uploadAudioDiv) {
                uploadAudioDiv.style.display = "block";
            }
            if (uploadGiftDiv) {
                uploadGiftDiv.style.display = "block";
            }
            if (uploadYoutubeDiv) {
                uploadYoutubeDiv.style.display = "block";
            }
            if (uploadDrawingDiv) {
                uploadDrawingDiv.style.display = "block";
            }
            if (uploadGameDiv) {
                uploadGameDiv.style.display = "block";
            }
        } else if (userRank.toLowerCase() === "inspector") {
            if (uploadAudioDiv) {
                uploadAudioDiv.style.display = "block";
            }
            if (uploadGiftDiv) {
                uploadGiftDiv.style.display = "block";
            }
            if (uploadYoutubeDiv) {
                uploadYoutubeDiv.style.display = "block";
            }
            if (uploadDrawingDiv) {
                uploadDrawingDiv.style.display = "block";
            }
            if (uploadGameDiv) {
                uploadGameDiv.style.display = "block";
            }
        } else if (userRank.toLowerCase() === "enforcer") {
            if (uploadAudioDiv) {
                uploadAudioDiv.style.display = "block";
            }
            if (uploadGiftDiv) {
                uploadGiftDiv.style.display = "block";
            }
            if (uploadYoutubeDiv) {
                uploadYoutubeDiv.style.display = "block";
            }
            if (uploadDrawingDiv) {
                uploadDrawingDiv.style.display = "block";
            }
            if (uploadGameDiv) {
                uploadGameDiv.style.display = "block";
            }
        } else if (userRank.toLowerCase() === "overseer") {
            if (uploadAudioDiv) {
                uploadAudioDiv.style.display = "block";
            }
            if (uploadGiftDiv) {
                uploadGiftDiv.style.display = "block";
            }
            if (uploadYoutubeDiv) {
                uploadYoutubeDiv.style.display = "block";
            }
            if (uploadDrawingDiv) {
                uploadDrawingDiv.style.display = "block";
            }
            if (uploadGameDiv) {
                uploadGameDiv.style.display = "block";
            }
        } else if (userRank.toLowerCase() === "moderator") {
            if (uploadAudioDiv) {
                uploadAudioDiv.style.display = "block";
            }
            if (uploadGiftDiv) {
                uploadGiftDiv.style.display = "block";
            }
            if (uploadYoutubeDiv) {
                uploadYoutubeDiv.style.display = "block";
            }
            if (uploadDrawingDiv) {
                uploadDrawingDiv.style.display = "block";
            }
            if (uploadGameDiv) {
                uploadGameDiv.style.display = "block";
            }
        } else if (userRank.toLowerCase() === "admin") {
            if (uploadAudioDiv) {
                uploadAudioDiv.style.display = "block";
            }
            if (uploadGiftDiv) {
                uploadGiftDiv.style.display = "block";
            }
            if (uploadYoutubeDiv) {
                uploadYoutubeDiv.style.display = "block";
            }
            if (uploadDrawingDiv) {
                uploadDrawingDiv.style.display = "block";
            }
            if (uploadGameDiv) {
                uploadGameDiv.style.display = "block";
            }
            naughtyWords.length = 0; // Clear the naughty words array
        } else if (userRank.toLowerCase() === "co-owner") {
            if (uploadAudioDiv) {
                uploadAudioDiv.style.display = "block";
            }
            if (uploadGiftDiv) {
                uploadGiftDiv.style.display = "block";
            }
            if (uploadYoutubeDiv) {
                uploadYoutubeDiv.style.display = "block";
            }
            if (uploadDrawingDiv) {
                uploadDrawingDiv.style.display = "block";
            }
            if (uploadGameDiv) {
                uploadGameDiv.style.display = "block";
            }
            naughtyWords.length = 0; // Clear the naughty words array
        } else if (userRank.toLowerCase() === "owner") {
            if (uploadAudioDiv) {
                uploadAudioDiv.style.display = "block";
            }
            if (uploadGiftDiv) {
                uploadGiftDiv.style.display = "block";
            }
            if (uploadYoutubeDiv) {
                uploadYoutubeDiv.style.display = "block";
            }
            if (uploadDrawingDiv) {
                uploadDrawingDiv.style.display = "block";
            }
            if (uploadGameDiv) {
                uploadGameDiv.style.display = "block";
            }
            naughtyWords.length = 0; // Clear the naughty words array
        } else if (userRank.toLowerCase() === "emperor") {
            if (uploadAudioDiv) {
                uploadAudioDiv.style.display = "block";
            }
            if (uploadGiftDiv) {
                uploadGiftDiv.style.display = "block";
            }
            if (uploadYoutubeDiv) {
                uploadYoutubeDiv.style.display = "block";
            }
            if (uploadDrawingDiv) {
                uploadDrawingDiv.style.display = "block";
            }
            if (uploadGameDiv) {
                uploadGameDiv.style.display = "block";
            }
            naughtyWords.length = 0; // Clear the naughty words array
        } else {
            console.log(`User rank (${userRank}) does not allow additional functions.`);
        }
    });
}

// Function to get current user ID
function getCurrentUserId() {
    return auth.currentUser ? auth.currentUser.uid : null;
}
if (uid) {
    fetchUserData(uid).then((userData) => {
        const activeUserRef = ref(database, `group-chat/${chatName}/activeUser/${uid}`);
        const systemMessageRef = push(ref(database, `group-chat/${chatName}/message`));

        // Continuously check if the active user exists
        onValue(activeUserRef, (snapshot) => {
            if (!snapshot.exists()) {
                set(activeUserRef, {
                    uid: uid,
                    name: userData.name || "Unknown User",
                    time: serverTimestamp() // Add the current timestamp
                }).then(() => {
                    set(systemMessageRef, {
                        message: `${userData.name || "Unknown User"} just joined the chat`,
                        uid: "system",
                        time: serverTimestamp()
                    });
                }).catch((error) => {
                    console.error("Error saving active user:", error);
                });
            }
        });

        // Remove user when they disconnect
        window.addEventListener("beforeunload", () => {
            remove(activeUserRef).then(() => {
                const disconnectMessageRef = push(ref(database, `group-chat/${chatName}/message`));
                set(disconnectMessageRef, {
                    message: `${userData.name || "Unknown User"} has left the chat`,
                    uid: "system",
                    time: serverTimestamp()
                });
            }).catch((error) => {
                console.error("Error removing active user:", error);
            });
        });
    });
}
 

async function handleNovaResponse(messageData) {
    if (messageData.uid === "nova" && messageData.message.toLowerCase().includes("nova")) {
        console.log("Nova will not reply to herself.");
        return;
    }

    const token = "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"; // Your OpenRouter API key
    const url = "https://openrouter.ai/api/v1/chat/completions";

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
        "HTTP-Referer": "<YOUR_SITE_URL>", // Optional
        "X-Title": "<YOUR_SITE_NAME>", // Optional
    };

    const userData = await fetchUserData(messageData.uid);
    const userName = userData.name || "User";
    const userRank = userData.account || "User";
    const userCoin = userData.coin || 0;
    const userDiamond = userData.diamond || 0;

    if (messageData.AIresponded) {
        console.log("AI has already responded to this message.");
        return;
    }

    const allMessagesSnapshot = await get(ref(database, `group-chat/${chatName}/message`));
    const allMessages = allMessagesSnapshot.exists() ? Object.values(allMessagesSnapshot.val()) : [];

    const chatHistory = allMessages.map((msg) => {
        const role = msg.uid === "nova" ? "assistant" : "user";
        return { role, content: `${msg.uid === "nova" ? "Nova" : userName}: ${msg.message || ""}` };
    });

    const currentTime = new Date().toLocaleString();

    chatHistory.push({ role: "user", content: `USER: ${userName} (Rank: ${userRank}, Coins: ${userCoin}, Diamonds: ${userDiamond}, make sure u dont always talk about coin or diamond except u were asked, Time: ${currentTime} - This time is real, not fake): ${messageData.message}` });

    // Fetch active users
    const activeUsersSnapshot = await get(ref(database, `group-chat/${chatName}/activeUser`));
    const activeUsers = activeUsersSnapshot.exists() ? Object.values(activeUsersSnapshot.val()) : [];
    const activeUserNames = activeUsers.map((user) => user.name).join(", ");
    const activeUsersMessage = activeUserNames ? `Currently online: ${activeUserNames}` : "No users are currently online.";

    const body = JSON.stringify({
        "model": "deepseek/deepseek-r1:free",
        "messages": [
            { "role": "system", "content": `You are Nova, a helpful assistant in a teen chat named TEENS. The current chat room is "${chatName}". The owner of this app is BIOR. ${activeUsersMessage}` },
            ...chatHistory
        ],
        "temperature": 1,
        "max_tokens": 4096,
        "top_p": 1,
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: body,
        });

        if (response.status === 429) {
            console.warn("Rate limit exceeded. Nova will reply with an unavailable message.");
            const unavailableMessage = "I'm not available for now. Please try again later.";
            const novaMessageRef = push(ref(database, `group-chat/${chatName}/message`));
            const novaMessageData = { message: unavailableMessage, uid: "nova", time: serverTimestamp(), askerUid: messageData.uid };
            await set(novaMessageRef, novaMessageData);
            return;
        }

        const data = await response.json();
        const novaResponse = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content 
            ? data.choices[0].message.content 
            : "Sorry, I couldn't process your request.";

        const novaMessageRef = push(ref(database, `group-chat/${chatName}/message`));
        const novaMessageData = { message: novaResponse, uid: "nova", time: serverTimestamp(), id: novaMessageRef.key, askerUid: messageData.uid };
        set(novaMessageRef, novaMessageData);

        const messageRef = ref(database, `group-chat/${chatName}/message/${messageData.id}`);
        update(messageRef, { AIresponded: true });

        // Generate an image if the response includes a request for an image
        if (novaResponse.toLowerCase().includes("generate an image")) {
            const imageUrl = await generateImage(novaResponse);
            if (imageUrl) {
                const novaImageRef = push(ref(database, `group-chat/${chatName}/message`));
                const novaImageData = { img: imageUrl, uid: "nova", time: serverTimestamp(), askerUid: messageData.uid };
                await set(novaImageRef, novaImageData);
            }
        }
    } catch (err) {
        console.error("An error occurred while fetching Nova's response:", err);
    }
}

async function generateImage(prompt) {
    const token = "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"; // Your OpenRouter API key
    const url = "https://openrouter.ai/api/v1/images/generations";

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };

    const body = JSON.stringify({
        "prompt": prompt,
        "n": 1,
        "size": "512x512",
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: body,
        });

        if (response.ok) {
            const data = await response.json();
            return data.data[0].url; // Return the generated image URL
        } else {
            console.error("Failed to generate image:", response.statusText);
            return null;
        }
    } catch (err) {
        console.error("An error occurred while generating the image:", err);
        return null;
    }
}
async function moderateChat(messageData, rank) {
    const url = "https://openrouter.ai/api/v1/chat/completions"; // API endpoint
    const token = "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"; // Your OpenRouter API key

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    };

    const body = JSON.stringify({
        "model": "deepseek/deepseek-chat:free",
        "messages": [
            { "role": "system", "content": "Analyze the following message and determine if it contains inappropriate language or violates community guidelines. If it contains, say yes; if not, say no." },
            { "role": "user", "content": messageData.message },
        ],
        "temperature": 0.5,
        "max_tokens": 100,
        "top_p": 1,
    });

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: body,
        });
        const data = await response.json();
        const containsNaughtyWords = data.choices[0].message.content.toLowerCase().includes("yes");

        if (containsNaughtyWords) {
            const exemptRanks = ["owner", "co-owner", "emperor", "admin"];
            if (!exemptRanks.includes(rank.toLowerCase())) {
                if (!messageData.alreadyMuted) {
                    const messageRef = ref(database, `group-chat/${chatName}/message/${messageData.id}`);
                    update(messageRef, { spam: true, alreadyMuted: true });

                    const chatBubble = document.querySelector(`[data-id="${messageData.id}"] .chatBubble`);
                        chatBubble.textContent = "This message has been flagged as inappropriate.";
                        chatBubble.style.color = "red";
                        chatBubble.style.fontWeight = "bold";
                    

                    const chatBar = document.getElementById("chatBar");
                    if (messageData.uid === uid) {
                        chatBar.style.display = "none";
                    } else {
                        chatBar.style.display = "flex";
                    }

                    const userMutedRef = ref(database, `users/${messageData.uid}/mutedData`);
                    const duration = Date.now() + 60000;
                    update(userMutedRef, { duration });

                    const countdownInterval = setInterval(() => {
                        const remaining = duration - Date.now();
                        if (remaining <= 0) {
                            clearInterval(countdownInterval);
                            remove(userMutedRef);
                            document.querySelector("#chatBar").style.display = "flex";
                        }
                    }, 1000);
                }
            }
        }
    } catch (err) {
        console.error("An error occurred while moderating the chat:", err);
    }
}

async function displayMessage(messageData) {
        
    const chatBody = document.getElementById("chatBody");

    // Fetch user details based on UID
    const userData = await fetchUserData(messageData.uid);

    let name = userData.name || "Unknown User";
    let profilePic = userData.profilePic || "img/profile.png";
    let rank = userData.account || "User";
    let textColor = userData.textColor || "black";
    let neon = userData.neon || null;
    let fontStyle = userData.fontStyle || null;
    let fontType = userData.fontType || null;
    let gradient = userData.gradient || null;
    let userProfileSticker = userData.profileSticker || null;
    let animation = userData.animation || null;
    let nameFontStyle = userData.nameFontStyle || null;
    let nameFontType = userData.nameFontType || null;
    let userTextColor = userData.userTextColor || null;
    let style = userData.style || null;

    // Check if the UID belongs to Nova
    if (messageData.uid === "nova") {
        name = "Nova";
        profilePic = "img/bot.png";
        rank = "Bot";
         
    } else {
        // Ensure profilePic falls back to "img/profile.png" if it fails to load
        const img = new Image();
        img.src = profilePic;
        img.onerror = () => {
            profilePic = "img/profile.png";
        };
        img.onload = () => {
            profilePic = img.src;
        };
    }

    // Handle like system
    function handleLikeSystem(messageId, likeButton, likeCount) {
        const currentUserId = getCurrentUserId();
        if (!currentUserId) return; // No user logged in

        const likeRef = ref(database, `group-chat/${chatName}/message/${messageId}/reactions/${currentUserId}`);

        // Listen for changes in like status for the current user
        onValue(likeRef, (snapshot) => {
            if (snapshot.exists()) {
                likeButton.style.color = "red"; // User already liked
            } else {
                likeButton.style.color = "black"; // User has not liked
            }
        });

        // Listen for changes in likes
        const totalLikesRef = ref(database, `group-chat/${chatName}/message/${messageId}/reactions`);
        onValue(totalLikesRef, (snapshot) => {
            likeCount.textContent = `${snapshot.size} Likes`; // Real-time like count
        });

        // Like button event listener
        likeButton.addEventListener("click", () => {
            get(likeRef).then((snapshot) => {
                if (snapshot.exists()) {
                    // Unlike
                    remove(likeRef);
                    likeButton.style.color = "black";
                } else {
                    // Like
                    set(likeRef, { uid: currentUserId });
                    likeButton.style.color = "red";
                }
            });
        });

        // Hide like button if the message contains spam
        const messageRef = ref(database, `group-chat/${chatName}/message/${messageId}`);
        onValue(messageRef, (snapshot) => {
            const messageData = snapshot.val();
            if (messageData && messageData.spam) {
                likeButton.style.display = "none";
                likeCount.style.display = "none";
            } else {
                likeButton.style.display = "block";
                likeCount.style.display = "block";
            }
        });
    }

    // Convert timestamp to readable format
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`; // Format: HH:MM
    }

    // Get message time
    const messageTime = messageData.time ? formatTimestamp(messageData.time) : "Now";

    // Rank styles
    const rankStyles = {
        "cool": { img: "img/cool.png", color: "blue" },
        "vip": { img: "img/vip.png", color: "lightgreen" },
        "svip": { img: "img/svip.png", color: "gold" },
        "elite": { img: "img/elite.png", color: "#6a0dad" },
        "champion": { img: "img/champion.png", color: "#4169E1" },
        "icon": { img: "img/icon.png", color: "#DC143C" },
        "legend": { img: "img/legend.png", color: "#4169E1" },
        "royal": { img: "img/royal.png", color: "#4B0082" },
        "guardian": { img: "img/guardian.png", color: "#008B8B" },
        "sentinel": { img: "img/sentinel.png", color: "#4682B4" },
        "overseer": { img: "img/overseer.png", color: "#4B0082" },
        "enforcer": { img: "img/enforcer.png", color: "#DC143C" },
        "inspector": { img: "img/inspector.png", color: "#008080" },
        "moderator": { img: "img/moderator.png", color: "#00796B" },
        "admin": { img: "img/admin.png", color: "#B71C1C" },
        "co-owner": { img: "img/co-owner.png", color: "#4169E1" },
        "owner": { img: "img/owner.png", color: "#DC143C" },
        "emperor": { img: "img/emperor.png", color: "#FFD700" },
        "mvp": { img: "img/mvp.png", color: "#DC143C" },
    };

    let rankImgSrc = rankStyles[rank.toLowerCase()]?.img || "img/user.png";
    let rankBgColor = rankStyles[rank.toLowerCase()]?.color || "red";

    if (!messageData.message && !messageData.audio && !messageData.gif && !messageData.img && !messageData.video) {
        console.warn("Message data is empty, skipping chat bubble creation.");
        return; // Do not display the chat bubble if no content is present
    }

    if (!messageData.message && !messageData.audio && !messageData.gif && !messageData.img && !messageData.video) {
        console.warn("Message data is empty, skipping chat bubble creation.");
        return; // Do not display the chat bubble if no content is present
    }

    // Prevent playing receive sound if no valid content exists
    if (!messageData.message && !messageData.audio && !messageData.gif && !messageData.img && !messageData.video) {
        return; // Skip sound
    }

    const chatBubbleConDiv = document.createElement("div");
    chatBubbleConDiv.classList.add("chatBubbleConDiv");
    const wrapperDiv = document.createElement("div");
    wrapperDiv.id = "wrapperDiv";

    const chatBubbleCon = document.createElement("div");
    chatBubbleCon.classList.add("chatBubbleCon");

    const nameDiv = document.createElement("div");
    nameDiv.id = "nameDiv";

    const rankDiv = document.createElement("div");
    rankDiv.id = "rankDiv";

    const rankText = document.createElement("div");
    rankText.id = "rankText";
    rankText.textContent = rank;
    rankText.style.backgroundColor = rankBgColor;

    if (messageData.uid === "nova")  {
        rankText.textContent = "Bot"; // Set Nova's rank text
        rankText.style.backgroundColor = "gray"; // Set Nova's rank background color
    }

    const rankImg = document.createElement("img");
    rankImg.id = "rankImg";
    rankImg.src = rankImgSrc;
    if (messageData.uid === "nova")  {
        rankImg.src = "img/botRank.png"; // Set Nova's image
    }

    const nameElement = document.createElement("div");
    nameElement.id = "name";
    nameElement.textContent = name;
    if (nameFontType) {
        nameElement.style.fontFamily = nameFontType.toLowerCase(); // Apply font type if provided
    }
    if (nameFontStyle === "italic") {
        nameElement.style.fontStyle = nameFontStyle.toLowerCase();
    } else if (nameFontStyle === "bold") {
        nameElement.style.fontWeight = nameFontStyle.toLowerCase();
    } else if (nameFontStyle === "oblique") {
        nameElement.style.fontStyle = "oblique";
    } else if (nameFontStyle === "bold italic") {
        nameElement.style.fontWeight = "bold";
        nameElement.style.fontStyle = "italic";
    } else if (nameFontStyle === "bold oblique") {
        nameElement.style.fontWeight = "bold";
        nameElement.style.fontStyle = "oblique";
    } else if (nameFontStyle === "italic oblique") {
        nameElement.style.fontWeight = "normal";
        nameElement.style.fontStyle = "italic oblique";
    } else if (nameFontStyle === "bold italic oblique") {
        nameElement.style.fontWeight = "bold";
        nameElement.style.fontStyle = "italic oblique";
    } else if (nameFontStyle === "inherit") {
        nameElement.style.fontWeight = "inherit";
        nameElement.style.fontStyle = "inherit";
    } else {
        nameElement.style.fontWeight = "normal";
        nameElement.style.fontStyle = "normal";
    }
    
    if (userTextColor) {
        nameElement.style.color = userTextColor; // Apply user text color if provided
    }
    if (style && style.toLowerCase() === "pinkroundedcookiediv") {
        nameElement.classList.add("pinkRoundedCookieDiv");
    } else if (style && style.toLowerCase() === "blueroundedcookiediv") {
        nameElement.classList.add("blueRoundedCookieDiv");
    } else if (style && style.toLowerCase() === "greenglassstyle") {
        nameElement.classList.add("greenGlassStyle");
    } else if (style && style.toLowerCase() === "purpleglowstyle") {
        nameElement.classList.add("purpleGlowStyle");
    } else if (style && style.toLowerCase() === "neonredstyle") {
        nameElement.classList.add("neonRedStyle");
    } else if (style && style.toLowerCase() === "aquabubblestyle") {
        nameElement.classList.add("aquaBubbleStyle");
    } else if (style && style.toLowerCase() === "shadowboxstyle") {
        nameElement.classList.add("shadowBoxStyle");
    } else if (style && style.toLowerCase() === "rainbowstripestyle") {
        nameElement.classList.add("rainbowStripeStyle");
    } else if (style && style.toLowerCase() === "goldenshinystyle") {
        nameElement.classList.add("goldenShinyStyle");
    } else if (style && style.toLowerCase() === "holocardstyle") {
        nameElement.classList.add("holoCardStyle");
    } else if (style && style.toLowerCase() === "lavaflowstyle") {
        nameElement.classList.add("lavaFlowStyle");
    } else if (style && style.toLowerCase() === "iceblockstyle") {
        nameElement.classList.add("iceBlockStyle");
    } else if (style && style.toLowerCase() === "sunnyskystyle") {
        nameElement.classList.add("sunnySkyStyle");
    } else if (style && style.toLowerCase() === "forestmossstyle") {
        nameElement.classList.add("forestMossStyle");
    } else if (style && style.toLowerCase() === "glitchpopstyle") {
        nameElement.classList.add("glitchPopStyle");
    } else if (style && style.toLowerCase() === "cottoncandystyle") {
        nameElement.classList.add("cottonCandyStyle");
    } else if (style && style.toLowerCase() === "galaxytwiststyle") {
        nameElement.classList.add("galaxyTwistStyle");
    } else if (style && style.toLowerCase() === "oceanwavestyle") {
        nameElement.classList.add("oceanWaveStyle");
    } else if (style && style.toLowerCase() === "metallicchromestyle") {
        nameElement.classList.add("metallicChromeStyle");
    } else if (style && style.toLowerCase() === "crystalclearstyle") {
        nameElement.classList.add("crystalClearStyle");
    } else if (style && style.toLowerCase() === "fireblazestyle") {
        nameElement.classList.add("fireBlazeStyle");
    } else if (style && style.toLowerCase() === "midnightshadowstyle") {
        nameElement.classList.add("midnightShadowStyle");
    }
    if (animation && animation.toLowerCase() === "pop") {
        console.log(animation);
        nameElement.style.animation = "pop 0.6s ease-in-out infinite"; // Apply animation if provided
    } else if (animation && animation.toLowerCase() === "blink") {
        console.log(animation);
        nameElement.style.animation = "blink 1s infinite"; // Apply animation if provided
    } else if(animation && animation.toLowerCase() === "slide") {
        console.log(animation);
        nameElement.style.animation = "slide 1s ease-in-out infinite alternate"; // Apply animation if provided
    } else if (animation && animation.toLowerCase() === "bounce") {
        console.log(animation);
        nameElement.style.animation = "bounce 1s infinite"; // Apply bounce animation if provided
    } else if (animation && animation.toLowerCase() === "shake") {
        nameElement.style.animation = "shake 0.5s infinite";
    } else if (animation && animation.toLowerCase() === "wave") {
        nameElement.style.animation = "wave 2s infinite";
        nameElement.style.transformOrigin = "70% 70%";
    } else if (animation && animation.toLowerCase() === "zoom") {
        nameElement.style.animation = "zoom 1.5s infinite";
    } else if (animation && animation.toLowerCase() === "flash") {
        nameElement.style.animation = "flash 1s infinite";
    } else if (animation && animation.toLowerCase() === "spinShow") {
        nameElement.style.animation = "spinShow 2s infinite";
    } else if (animation && animation.toLowerCase() === "spin") {
        nameElement.style.animation = "spin 2s linear infinite";
    } else if (animation && animation.toLowerCase() === "pulse") {
        nameElement.style.animation = "pulse 1.2s infinite";
    } else if (animation && animation.toLowerCase() === "stretch") {
        nameElement.style.animation = "stretch 1.5s ease-in-out infinite";
    } else if (animation && animation.toLowerCase() === "swing") {
        nameElement.style.animation = "swing 1s ease-in-out infinite";
    } else if (animation && animation.toLowerCase() === "fadeInOut") {
        nameElement.style.animation = "fadeInOut 2s infinite";
    } else if (animation && animation.toLowerCase() === "rubberBand") {
        nameElement.style.animation = "rubberBand 1s ease-in-out infinite";
    } else if (animation && animation.toLowerCase() === "heartbeat") {
        nameElement.style.animation = "heartbeat 1.5s ease-in-out infinite";
    } else if (animation && animation.toLowerCase() === "skewing") {
        nameElement.style.animation = "skewing 1s infinite alternate";
    } else if (animation && animation.toLowerCase() === "jump") {
        nameElement.style.animation = "jump 0.6s ease infinite";
    } else if (animation && animation.toLowerCase() === "flip") {
        nameElement.style.animation = "flip 2s infinite";
    } else if (animation && animation.toLowerCase() === "roll") {
        nameElement.style.animation = "roll 2s linear infinite";
    } else if (animation && animation.toLowerCase() === "jello") {
        nameElement.style.animation = "jello 1s infinite";
    } else if (animation && animation.toLowerCase() === "typing") {
        nameElement.style.animation = "typing 4s steps(20, end) infinite";
        nameElement.style.overflow = "hidden";
        nameElement.style.display = "inline-block";
        nameElement.style.whiteSpace = "nowrap";
        nameElement.style.borderRight = "2px solid black";
    } else if (animation && animation.toLowerCase() === "slide") {
        nameElement.style.animation = "slideLR 1s ease-in-out infinite alternate";
    } else if (animation && animation.toLowerCase() === "glow") {
        nameElement.style.animation = "glow 1.5s ease-in-out infinite";
    } else if (animation && animation.toLowerCase() === "fall") {
        nameElement.style.animation = "fall 1.5s ease-in-out infinite";
    } else if (animation && animation.toLowerCase() === "fade slide") {
        nameElement.style.animation = "fadeSlide 2s infinite";
    } else if (animation && animation.toLowerCase() === "zoom in out") {
        nameElement.style.animation = "zoomInOut 1.2s ease-in-out infinite";
    } else if (animation && animation.toLowerCase() === "shrink grow") {
        nameElement.style.animation = "shrinkGrow 1s ease-in-out infinite";
    } else if (animation && animation.toLowerCase() === "rotate in") {
        nameElement.style.animation = "rotateIn 1s ease-out infinite";
    } else if (animation && animation.toLowerCase() === "stretch wide") {
        nameElement.style.animation = "stretchWide 1.4s ease-in-out infinite";
    } else if (animation && animation.toLowerCase() === "moved diagonal") {
        nameElement.style.animation = "moveDiagonal 2s linear infinite alternate";
    }
    

    const profileStickerDiv = document.createElement("div");
    profileStickerDiv.id = "profileUserSticker";

    const profileSticker = document.createElement("img");
    profileSticker.id = "profileSticker";
    if (userProfileSticker) {
        profileSticker.src = userProfileSticker; // Assign sticker if it exists
    } else {
        profileStickerDiv.style.display = "none"; // Hide the sticker element if none provided
    }
    profileSticker.style.height = "70px";
    profileSticker.style.width = "70px";


    
    


    const messagePicDiv = document.createElement("div");
    messagePicDiv.id = "messagePicDiv";

    const messagePic = document.createElement("img");
    messagePic.id = "messagePic";
    messagePic.src = profilePic;
    
    

    nameDiv.appendChild(nameElement);
    profileStickerDiv.appendChild(profileSticker);
    rankDiv.appendChild(rankImg);
    rankDiv.appendChild(rankText);
    messagePicDiv.appendChild(messagePic);

    const ranks = {
        "cool": { img: "img/cool.png", color: "blue" },
        "vip": { img: "img/vip.png", color: "lightgreen" },
        "svip": { img: "img/svip.png", color: "gold" },
        "elite": { img: "img/elite.png", color: "#6a0dad" },
        "champion": { img: "img/champion.png", color: "#4169E1" },
        "icon": { img: "img/icon.png", color: "#DC143C" },
        "legend": { img: "img/legend.png", color: "#4169E1" },
        "royal": { img: "img/royal.png", color: "#4B0082" },
        "guardian": { img: "img/guardian.png", color: "#008B8B" },
        "sentinel": { img: "img/sentinel.png", color: "#4682B4" },
        "overseer": { img: "img/overseer.png", color: "#4B0082" },
        "enforcer": { img: "img/enforcer.png", color: "#DC143C" },
        "inspector": { img: "img/inspector.png", color: "#008080" },
        "moderator": { img: "img/moderator.png", color: "#00796B" },
        "admin": { img: "img/admin.png", color: "#B71C1C" },
        "co-owner": { img: "img/co-owner.png", color: "#4169E1" },
        "owner": { img: "img/owner.png", color: "#DC143C" },
        "emperor": { img: "img/emperor.png", color: "#FFD700" },
        "mvp": { img: "img/mvp.png", color: "#DC143C" },
        "user": { img: "img/user.png", color: "red" }
    };
    

    function sendFriendRequest(friendUid) {
        if (friendUid === uid) {
            return; // Prevent sending a friend request to oneself
        }
        const friendRequestRef = ref(database, `friend-requests/${friendUid}/${uid}`);
        const friendData = {
            sender: uid,
            timestamp: serverTimestamp(),
        };

        set(friendRequestRef, friendData)
            .then(() => {
                console.log("Friend request sent successfully to UID: " + friendUid);
                actionPopUpDiv.style.display = "none";
                alert("Friend request sent successfully!");
            })
            .catch((error) => {
                console.error("Error sending friend request:", error);
                alert("Failed to send friend request. Please try again.");
            });
    }
    const accountProfileDivCon = document.getElementById("accountProfileDivCon");
    const accountProfileBackBtn = document.getElementById("accountProfileBackBtn");
    accountProfileBackBtn.addEventListener("click", () => {
        accountProfileDivCon.style.display = "none";
    });
    function viewAccountProfile(profileUid) {
        accountProfileDivCon.style.display = "flex";
        profilePopUpDiv.style.display = "none";

        const userRef = ref(database, `users/${profileUid}`);
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const { profilePic, coverImg, name, account, like, rating, followers, aboutMe, mood, age, gender, country } = userData;

                // Update profile picture and cover image
                document.getElementById("accountProfilePic").src = profilePic || "img/profile.png";
                document.getElementById("accountCoverImg").src = coverImg || "img/cover.jpg";

                // Update name and rank
                document.getElementById("accountName").textContent = name || "--";
                document.getElementById("accountRankText").textContent = account || "User";

                const ranks = {
                    "cool": { img: "img/cool.png", color: "blue" },
                    "vip": { img: "img/vip.png", color: "lightgreen" },
                    "svip": { img: "img/svip.png", color: "gold" },
                    "elite": { img: "img/elite.png", color: "#6a0dad" },
                    "champion": { img: "img/champion.png", color: "#4169E1" },
                    "icon": { img: "img/icon.png", color: "#DC143C" },
                    "legend": { img: "img/legend.png", color: "#4169E1" },
                    "royal": { img: "img/royal.png", color: "#4B0082" },
                    "guardian": { img: "img/guardian.png", color: "#008B8B" },
                    "sentinel": { img: "img/sentinel.png", color: "#4682B4" },
                    "overseer": { img: "img/overseer.png", color: "#4B0082" },
                    "enforcer": { img: "img/enforcer.png", color: "#DC143C" },
                    "inspector": { img: "img/inspector.png", color: "#008080" },
                    "moderator": { img: "img/moderator.png", color: "#00796B" },
                    "admin": { img: "img/admin.png", color: "#B71C1C" },
                    "co-owner": { img: "img/co-owner.png", color: "#4169E1" },
                    "owner": { img: "img/owner.png", color: "#DC143C" },
                    "emperor": { img: "img/emperor.png", color: "#FFD700" },
                    "mvp": { img: "img/mvp.png", color: "#DC143C" }
                };
                

                const rankData = ranks[account?.toLowerCase()] || { img: "img/user.png", color: "red" };
                document.getElementById("accountRankImg").src = rankData.img;
                document.getElementById("accountRank").style.backgroundColor = rankData.color;

                // Update likes, rating, and followers
                document.getElementById("accountLikeAmt").textContent = `likes ${like || 0}`;
                document.getElementById("accountRatingAmt").textContent = `rating ${rating || 0}`;
                document.getElementById("accountFollowersAmt").textContent = `followers ${followers || 0}`;

                // Update bio
                document.getElementById("accountBioDiv").textContent = aboutMe || "No bio available.";

                // Update account info
                document.getElementById("accountUserName").textContent = name || "--";
                document.getElementById("accountUid").textContent = profileUid || "--";
                document.getElementById("accountCountry").textContent = country || "--";
                document.getElementById("accountGender").textContent = gender || "--";
                document.getElementById("accountAge").textContent = age || "--";

                // Update mood
                const accountMoodDiv = document.getElementById("accountMood");
                accountMoodDiv.textContent = mood || "No mood set.";
            } else {
                console.warn("User data not found for UID:", profileUid);
            }
        }).catch((error) => {
            console.error("Error fetching user data:", error);
        });
    }
    function blockUser(blockUid) {
        if (blockUid === uid) {
            return; // Prevent blocking oneself
        }
        const blockRef = ref(database, `blocked-users/${uid}/${blockUid}`);
        const blockData = {
            blocker: uid,
            timestamp: serverTimestamp(),
        };

        set(blockRef, blockData)
            .then(() => {
                console.log("User blocked successfully: " + blockUid);
                actionPopUpDiv.style.display = "none";
            })
            .catch((error) => {
                console.error("Error blocking user:", error);
                alert("Failed to block user. Please try again.");
            });
    }
    const block = document.getElementById("block");
    const viewProfile = document.getElementById("viewProfile");
    messagePicDiv.addEventListener("click", () => {
        const profilePopUpDiv = document.getElementById("profilePopUpDiv");
        profilePopUpDiv.style.display = "flex";

        // Store the messageData.uid in a variable
        const clickedUserId = messageData.uid;

        
            addFriendBtn.addEventListener("click", () => {
            
                sendFriendRequest(clickedUserId);
            });
            checkOnlineStatusAndUpdate(clickedUserId); 

            block.addEventListener("click", () => {
                blockUser(clickedUserId);
            });
            viewProfile.addEventListener("click", () => {
               viewAccountProfile(clickedUserId);
            });
        

        
        checkIfFriends(clickedUserId);
        checkBlockedUser(clickedUserId);
        
        // Populate profile popup with user data
        document.getElementById("profilePic").src = profilePic;
        document.getElementById("profileName").textContent = name;
        document.getElementById("profileRankImg").src = rankImgSrc;
        document.getElementById("profileRankText").textContent = rank;

        // Change background color based on rank
        if (ranks[rank.toLowerCase()]) {
            document.getElementById("profileRank").style.backgroundColor = ranks[rank.toLowerCase()].color;
        }
       
        // Add click event to #chat to redirect to messages.html
        const chatButton = document.getElementById("chat");
        const privateChatDivCon = document.getElementById("privateChatDivCon");
        chatButton.addEventListener("click", async () => {
            const chatRef = ref(database, `privateChat`);
            const chatKey1 = `${messageData.uid}CHAT${uid}`;
            const chatKey2 = `${uid}CHAT${messageData.uid}`;

            // Check if the chat already exists in the database
            const chatSnapshot1 = await get(ref(database, `privateChat/${chatKey1}`));
            const chatSnapshot2 = await get(ref(database, `privateChat/${chatKey2}`));

            if (chatSnapshot1.exists()) {
                chattingWithUser = chatKey1;
            } else if (chatSnapshot2.exists()) {
                chattingWithUser = chatKey2;
            } else {
                chattingWithUser = chatKey1; // Default to chatKey1 if no existing chat is found
            }
           

            privateChatDivCon.style.display = "flex";
            privateChatDivCon.classList.add("openPrivateChatDivAnimation");
            document.getElementById("profilePopUpDiv").style.display = "none";
            console.log("Chat button clicked. User ID:", chattingWithUser);
            const privateChatBody = document.getElementById("privateChatBody");
            const openChat = document.getElementById("openChat");
            const privateChatWindow = document.getElementById("privateChatWindow");
            privateChatBody.innerHTML = ""; // Clear previous chat messages
            privateChatWindow.style.display = "flex";
            openChat.style.display = "none";
            loadPrivateChatData();
            loadChatList();
           
        });
    });
    
        
    
    
    // Close profile popup
    document.getElementById("profilePopUpCloseBtn").addEventListener("click", () => {
        document.getElementById("profilePopUpDiv").style.display = "none";
        const unBlock = document.getElementById("unBlock");
        unBlock.style.display = "none"; // Hide unBlock button
        const block = document.getElementById("block");
        block.style.display = "flex"; // Show block button
        
        
    });
    
    const bubbleText = document.createElement("div");
    bubbleText.classList.add("bubbleText");


    const chatBubble = document.createElement("div");
    chatBubble.classList.add("chatBubble");
    chatBubble.style.wordBreak = "break-word"; // Ensure words break after max width
    
    bubbleText.style.color = textColor; // Set text color
    bubbleText.style.fontFamily = fontType || "Arial"; // Set font type
    bubbleText.style.fontStyle = fontStyle || "normal"; // Set font style
    if(neon) {
        bubbleText.style.textShadow = `0 0 5px ${neon}, 0 0 10px ${neon}, 0 0 15px ${neon}, 0 0 20px ${neon}`;
    }
    if (gradient) {
        const gradients = {
            gradientColor1: "linear-gradient(to right, red, yellow)",
            gradientColor2: "linear-gradient(to right, blue, green)",
            gradientColor3: "linear-gradient(to right, purple, pink)",
            gradientColor4: "linear-gradient(to right, orange, gold)",
            gradientColor5: "linear-gradient(to right, cyan, teal)",
            gradientColor6: "linear-gradient(to right, violet, indigo)",
            gradientColor7: "linear-gradient(to right, lime, olive)",
            gradientColor8: "linear-gradient(to right, navy, skyblue)",
            gradientColor9: "linear-gradient(to right, maroon, salmon)",
            gradientColor10: "linear-gradient(to right, black, gray)",
            gradientColor11: "linear-gradient(to right, white, lightgray)",
            gradientColor12: "linear-gradient(to right, gold, darkorange)",
            gradientColor13: "linear-gradient(to right, turquoise, aquamarine)",
            gradientColor14: "linear-gradient(to right, crimson, lightpink)",
            gradientColor15: "linear-gradient(to right, darkblue, lightblue)",
        };

        bubbleText.style.background = gradients[gradient];
        bubbleText.style.webkitBackgroundClip = "text";
        bubbleText.style.webkitTextFillColor = "transparent";
    }
    chatBubble.appendChild(bubbleText);
    // 📌 LIKE SYSTEM
    const reactDiv = document.createElement("div");
    reactDiv.classList.add("reactDiv");

    // 🕒 Add time div
    const timeDiv = document.createElement("div");
    timeDiv.classList.add("timeDiv");
    timeDiv.textContent = messageTime; // Display formatted time

    const likeButton = document.createElement("i");
    likeButton.classList.add("fas", "fa-thumbs-up", "like-button");
    likeButton.id = "likeButton";

    const likeCount = document.createElement("span");
    likeCount.textContent = "0 Likes";
    likeCount.classList.add("like-count");

    reactDiv.appendChild(likeButton);
    reactDiv.appendChild(likeCount);
    chatBubbleConDiv.appendChild(reactDiv);

    // 📌 BUBBLE MENU (Three Dots Menu)
    const bubbleMenuDiv = document.createElement("div");
    bubbleMenuDiv.classList.add("bubbleMenuDiv");

    const threeDotsIcon = document.createElement("i");
    threeDotsIcon.classList.add("fas", "fa-ellipsis-v", "threeDotsIcon");

    const menuOptions = document.createElement("div");
    menuOptions.classList.add("bubbleMenuOptions");
    menuOptions.style.display = "none"; // Hidden by default

    const removeOption = document.createElement("div");
    removeOption.classList.add("menuOption");
    removeOption.innerHTML = '<i class="fas fa-eye-slash"></i> Remove from Screen';

    const reportOption = document.createElement("div");
    reportOption.classList.add("menuOption");
    reportOption.innerHTML = '<i class="fas fa-flag"></i> Report';

    const quoteOption = document.createElement("div");
    quoteOption.classList.add("menuOption");
    quoteOption.innerHTML = '<i class="fas fa-share"></i> Quote';

    const banUserOption = document.createElement("div");
    banUserOption.classList.add("menuOption");
    banUserOption.innerHTML = '<i class="fas fa-ban"></i> Ban User';
    banUserOption.id = "banUserOption";

    if(userData.accountStatus === "banned") {
        banUserOption.innerHTML = '<i class="fas fa-ban"></i> Unban User';
    }

    banUserOption.addEventListener("click", () => {
        const userRef = ref(database, `users/${messageData.uid}`);
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                if (userData.accountStatus === "banned") {
                    // Unban the user
                    update(userRef, { accountStatus: null })
                        .then(() => {
                            console.log(`${name} has been unbanned successfully.`);
                            banUserOption.innerHTML = '<i class="fas fa-ban"></i> Ban User';
                        })
                        .catch((error) => {
                            console.error("Error unbanning user:", error);
                            alert("Failed to unban the user. Please try again.");
                        });
                } else {
                    // Ban the user
                    update(userRef, { accountStatus: "banned" })
                        .then(() => {
                            console.log(`${name} has been banned successfully.`);
                             banUserOption.innerHTML = '<i class="fas fa-ban"></i> Unban User';
                        })
                        .catch((error) => {
                            console.error("Error banning user:", error);
                            alert("Failed to ban the user. Please try again.");
                        });
                }
            } else {
                console.warn("User data not found.");
            }
        }).catch((error) => {
            console.error("Error fetching user data:", error);
        });
    });

    fetchUserData(uid).then((currentUserData) => {
        const currentUserRank = currentUserData.account || "user";
        const messageUserRank = userData.account || "user";

        const rankHierarchy = [
            "guardian", "sentinel", "overseer", "enforcer", "inspector", 
            "moderator", "admin", "co-owner", "owner", "emperor"
        ];

        const currentUserRankIndex = rankHierarchy.indexOf(currentUserRank.toLowerCase());
        const messageUserRankIndex = rankHierarchy.indexOf(messageUserRank.toLowerCase());

        if (currentUserRankIndex > -1 && messageUserRankIndex > -1 && currentUserRankIndex <= messageUserRankIndex) {
            banUserOption.style.display = "none";
        } else if (currentUserRankIndex > -1) {
            banUserOption.style.display = "block";
        } else {
            banUserOption.style.display = "none";
        }
    });



    const editOption = document.createElement("div");
    editOption.classList.add("menuOption");
    editOption.innerHTML = '<i class="fas fa-edit"></i> Edit';
    editOption.style.display = "none"; // Initially hidden

    if(messageData.uid === uid) {
        editOption.style.display = "block"; // Show edit option for the user
    }
    
    // Append menu options
    menuOptions.appendChild(removeOption);
    menuOptions.appendChild(reportOption);
    menuOptions.appendChild(quoteOption);
    menuOptions.appendChild(banUserOption);
    menuOptions.appendChild(editOption);

    // Toggle menu visibility
    threeDotsIcon.addEventListener("click", () => {
        menuOptions.style.display = menuOptions.style.display === "none" ? "block" : "none";
    });

    // Hide upload menu when clicking outside of it
    document.body.addEventListener("click", (event) => {
        if (!menuOptions.contains(event.target) && !threeDotsIcon.contains(event.target)) {
            menuOptions.style.display = "none";
        }
    });

    // Handle remove from screen
    removeOption.addEventListener("click", () => {
        chatBubbleConDiv.style.display = "none";
    });

    // Handle report option
    reportOption.addEventListener("click", () => {
        const reportPopUpDiv = document.getElementById("reportPopUpDiv");
        const messageIdSpan = document.getElementById("messageIdSpan");
        messageIdSpan.textContent = messageData.id;
        reportPopUpDiv.style.display = "flex";
    });

    editOption.addEventListener("click", () => {
        const messageInput = document.getElementById("message");
        const editPopupDivCon = document.getElementById("editPopupDivCon");
        const editSendDiv = document.getElementById("editSendDiv");
        const sendDiv = document.getElementById("sendDiv");
        editPopupDivCon.style.display = "flex";
        editSendDiv.style.display = "flex";
        sendDiv.style.display = "none"; // Hide the original send button
        // Focus the message input and prefill with "edit:" and the current message
        messageInput.focus();
        messageInput.value = `edit: ${messageData.message}`;

        // Close the popup when the cancel button is clicked
        const editCancel = document.getElementById("editCancel");
        editCancel.addEventListener("click", () => {
            editPopupDivCon.style.display = "none";
            messageInput.value = ""; // Clear the input field
            editSendDiv.style.display = "none"; // Hide the edit send button
            sendDiv.style.display = "flex"; // Show the original send button
        });

        const handleEdit = () => {
            const updatedMessage = messageInput.value.trim().replace(/^edit:\s*/, ""); // Remove "edit:" prefix
            if (updatedMessage) {
                const messageRef = ref(database, `group-chat/${chatName}/message/${messageData.id}`);
        
                update(messageRef, { message: updatedMessage, edited: true }) // Update the message in the database
                .then(() => {
                    return get(messageRef);
                })
                .then((messageSnapshot) => {
                    if (messageSnapshot.exists()) {
                        const message = messageSnapshot.val();
        
                        if (message.spam) {
                            // Flagged message style
                            chatBubble.textContent = "This message has been flagged as inappropriate.";
                            chatBubble.style.color = "red";
                            chatBubble.style.fontWeight = "bold";
                        } else if (messageData.replyingTo) {
                            // Show reply info
                            const replyAndMessageDiv = document.createElement("div");
                            replyAndMessageDiv.classList.add("replyAndMessageDiv");
        
                            const replyName = document.createElement("div");
                            replyName.classList.add("replyName");
        
                            const replyDiv = document.createElement("div");
                            replyDiv.classList.add("replyDiv");
        
                            // Fetch reply details
                            fetchReplyDetails(messageData.replyingTo).then((replyDetails) => {
                                replyName.textContent = replyDetails.name;
        
                                if (replyDetails.video) {
                                    const video = document.createElement("video");
                                    video.src = replyDetails.video;
                                    video.style.width = "100%";
                                    video.style.height = "50px";
                                    video.style.objectFit = "cover";
                                    video.style.backgroundColor = "white";
                                    replyDiv.appendChild(video);
                                } else if (replyDetails.gif) {
                                    const gif = document.createElement("video");
                                    gif.src = replyDetails.gif;
                                    gif.style.width = "100%";
                                    gif.style.height = "50px";
                                    gif.style.objectFit = "cover";
                                    gif.autoplay = true;
                                    gif.loop = true;
                                    gif.muted = true;
                                    gif.style.backgroundColor = "white";
                                    replyDiv.appendChild(gif);
                                } else if (replyDetails.img) {
                                    const img = document.createElement("img");
                                    img.src = replyDetails.img;
                                    img.style.width = "100%";
                                    img.style.height = "50px";
                                    img.style.objectFit = "cover";
                                    replyDiv.appendChild(img);
                                } else if (replyDetails.audio) {
                                    replyDiv.innerHTML = "🔊 Audio";
                                } else {
                                    replyDiv.textContent = replyDetails.message;
                                }
        
                                replyAndMessageDiv.appendChild(replyName);
                                replyAndMessageDiv.appendChild(replyDiv);
                                chatBubble.appendChild(replyAndMessageDiv);
                            });
                        }
                    }
        
                    // Close the edit popup and reset UI
                    editPopupDivCon.style.display = "none";
                    messageInput.value = "";
                    editSendDiv.style.display = "none";
                    sendDiv.style.display = "flex";
                })
                .catch((error) => {
                    console.error("Error updating message:", error);
                });
            }
        };
        

        editSendDiv.onclick = handleEdit;

        // Handle the message update on pressing Enter
        messageInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleEdit();
            }
        });

        
    });
    // Listen for real-time updates to the message
    const messageRef = ref(database, `group-chat/${chatName}/message/${messageData.id}`);
    onValue(messageRef, (snapshot) => {
        const messageData = snapshot.val();
        if (messageData && messageData.message) {
         bubbleText.textContent = messageData.message; // Update the chat bubble text in real-time
            if (messageData.edited) {
                bubbleText.style.fontStyle = "italic"; // Indicate the message was edited
                bubbleText.textContent = messageData.message;
            }
        }
    });
     
    bubbleMenuDiv.appendChild(threeDotsIcon);
    bubbleMenuDiv.appendChild(menuOptions);

    chatBubbleConDiv.appendChild(bubbleMenuDiv); // Add menu to chat bubble
    chatBubbleConDiv.appendChild(nameDiv);
    nameDiv.appendChild(rankDiv);
    chatBubbleCon.appendChild(messagePicDiv);
    chatBubbleCon.appendChild(chatBubble);
    chatBubbleConDiv.appendChild(chatBubbleCon);
    chatBubbleConDiv.appendChild(timeDiv);

    // Append wrapperDiv on top of chatBubbleConDiv
    chatBubbleConDiv.insertBefore(wrapperDiv, chatBubbleConDiv.firstChild);

    chatBody.appendChild(chatBubbleConDiv);

    // Function to fetch reply details
    async function fetchReplyDetails(replyingToId) {
        const replyRef = ref(database, `group-chat/${chatName}/message/${replyingToId}`);
        const replySnapshot = await get(replyRef);
        if (replySnapshot.exists()) {
            const replyData = replySnapshot.val();
            const userRef = ref(database, `users/${replyData.uid}`);
            const userSnapshot = await get(userRef);
            if (userSnapshot.exists()) {
                const userData = userSnapshot.val();
                return {
                    name: userData.name || "Unknown User",
                    message: replyData.message || "",
                    img: replyData.img || "",
                    video: replyData.video || "",
                    audio: replyData.audio || "",
                    gif: replyData.gif || ""
                };
            }
        }
        return { name: "Unknown User", message: "", img: "", video: "", audio: "" };
    }
    const cancel = document.getElementById("cancel");
    cancel.addEventListener("click", () => {
        quoteReplyDivCon.style.display = "none";
    });
    quoteOption.addEventListener("click", async () => {
        const quoteReplyDivCon = document.getElementById("quoteReplyDivCon");
        const quoteReplyUserName = document.getElementById("quoteReplyUserName");
        const quoteReplyMessage = document.getElementById("quoteReplyMessage");
        const quoteReplyMessageId = document.getElementById("quoteReplyMessageId");

        quoteReplyDivCon.style.display = "flex";

        // Fetch user data
        const userData = await fetchUserData(messageData.uid);
        quoteReplyUserName.textContent = userData.name || "Unknown User";
        quoteReplyMessage.textContent = messageData.message || "";
        quoteReplyMessageId.textContent = messageData.id;
        if (messageData.img) {
            quoteReplyMessage.textContent = "📷 Image";
        } else if (messageData.video) {
            quoteReplyMessage.textContent = "🎥 Video";
        }  else if (messageData.gif) {
            quoteReplyMessage.textContent = "GIF";
        } else if (messageData.audio) {
            quoteReplyMessage.textContent = "🔊 Audio";
        }

        // Make the message input active
        const messageInput = document.getElementById("message");
        messageInput.focus();
        
     }); 
      if (messageData.message) {

        moderateChat(messageData, rank);
        
        // Check for naughty words
        const naughtyWords = ["sex", "asshole", "fuck", "bitch", "whatsapp", "pussy", "cock", "snap", "snapchat", "facebook", "zangi", "sn@p", "nudes", "nude", "cum", "motherfucker", "shit", "ass", "boobs", "masturbation", "w hatsapp", "pimpies", "shege", "god punish you", "your papa", "fucking", "instagram", "ig", "fb", "wa", "prick", "penis", "vigina", "breast", "s nap"]; // Replace with actual words
        const containsNaughtyWords = naughtyWords.some((word) =>
            messageData.message.toLowerCase().includes(word)
        );

        const userMutedRef = ref(database, `users/${messageData.uid}/mutedData`);

        onValue(userMutedRef, (snapshot) => {
        const data = snapshot.val();
        if (data && data.duration) {
        const timeLeft = data.duration - Date.now();
        if (timeLeft > 0) {
                            // Hide chatBar
                            const chatBar = document.getElementById("chatBar");
                            if (messageData.uid === uid) {
                                chatBar.style.display = "none";
                            } else {
                                chatBar.style.display = "flex"; // Show chatBar for others
                            }

            // Update countdown in real-time
            const countdownInterval = setInterval(() => {
                const remaining = data.duration - Date.now();
                if (remaining <= 0) {
                    clearInterval(countdownInterval);
                    remove(userMutedRef);
                    document.querySelector("#chatBar").style.display = "flex";
                }
            }, 1000);
        } else {
            remove(userMutedRef);
            document.querySelector("#chatBar").style.display = "flex";
        }
    }
});

    if (containsNaughtyWords) {
    const exemptRanks = ["owner", "co-owner", "emperor", "admin"];
    if (!exemptRanks.includes(rank.toLowerCase())) {
        if (!messageData.alreadyMuted) {
            // Update the message in the database as spam and mark as alreadyMuted
            const messageRef = ref(database, `group-chat/${chatName}/message/${messageData.id}`);
            update(messageRef, { spam: true, alreadyMuted: true });

            chatBubble.textContent = "This message has been flagged as inappropriate.";
            chatBubble.style.color = "red";
            chatBubble.style.fontWeight = "bold";

           if (messageData.uid === uid) {
            sendNotificattion(uid, "Spam Detected", "You have been muted for 1min", "spam", uid);
            
           }
           likeButton.style.display = "none";
            
                 // Hide chatBar
            const chatBar = document.getElementById("chatBar");
            if (messageData.uid === uid) {
                chatBar.style.display = "none";
            } else {
                chatBar.style.display = "flex"; // Show chatBar for others
            }

            // Mute user for 1 minute
            const duration = Date.now() + 60000; // 1 minute from now
            update(userMutedRef, { duration });

            // Start countdown
            const countdownInterval = setInterval(() => {
                const remaining = duration - Date.now();
                if (remaining <= 0) {
                    clearInterval(countdownInterval);
                    remove(userMutedRef);
                    document.querySelector("#chatBar").style.display = "flex"; // Show chatBar again
                }
            }, 1000);
            
        } else {
            // If alreadyMuted is true, just show the message as spam
            bubbleText.textContent = "This message has been flagged as inappropriate.";
            bubbleText.style.color = "red";
            bubbleText.style.fontWeight = "bold";
        }
    }
    } else {
        if (messageData.uid === "system") {
            chatBubbleConDiv.innerHTML = ""; // Clear everything inside the chatBubbleConDiv
            messagePicDiv.style.display = "none"; // Hide the profile picture
            nameDiv.style.display = "none"; // Hide the name div
            chatBubble.style.fontWeight = "bold";
            chatBubble.style.display = "none";
            chatBubbleCon.innerHTML = `<i class="fas fa-bullhorn" style="margin-right: 5px; color: red;"></i> ${messageData.message}`;
            chatBubbleCon.style.alignItems = "center";
            chatBubbleCon.style.display = "flex"; // Ensure flex display for alignment
            chatBubbleCon.style.justifyContent = "center"; // Center align text horizontally
            chatBubbleCon.style.textAlign = "center"; // Center align text
            chatBubbleCon.style.cursor = "pointer";
        } else if (messageData.message.toLowerCase().includes("nova")) {
            if (messageData.askerUid && messageData.askerUid !== uid) {
                return;
            }
            handleNovaResponse(messageData);
        } else if (messageData.replyingTo) {
                const replyAndMessageDiv = document.createElement("div");
                replyAndMessageDiv.classList.add("replyAndMessageDiv");

                const replyName = document.createElement("div");
                replyName.classList.add("replyName");

                const replyDiv = document.createElement("div");
                replyDiv.classList.add("replyDiv");

                const messageDiv = document.createElement("div");
                messageDiv.classList.add("messageDiv");

                // Fetch reply details
                fetchReplyDetails(messageData.replyingTo).then((replyDetails) => {
                    replyName.textContent = replyDetails.name;
                    if (replyDetails.video) {
                        const video = document.createElement("video");
                        video.src = replyDetails.video;
                        video.style.width = "100%";
                        video.style.height = "50px";
                        video.style.objectFit = "cover";
                        video.backgroundColor = "white";
                        replyDiv.appendChild(video);
                    } else if (replyDetails.gif) {
                        const gif = document.createElement("video");
                        gif.src = replyDetails.gif;
                        gif.style.width = "100%";
                        gif.style.height = "50px";
                        gif.style.objectFit = "cover";
                        gif.autoplay = true;
                        gif.backgroundColor = "white";
                        gif.loop = true;
                        gif.muted = true;
                        replyDiv.appendChild(gif);
                    } else if (replyDetails.img) {
                        const img = document.createElement("img");
                        img.src = replyDetails.img;
                        img.style.width = "100%";
                        img.style.height = "50px";
                        img.style.objectFit = "cover";
                        replyDiv.appendChild(img);
                    } else if (replyDetails.audio) {
                        replyDiv.innerHTML = "🔊 Audio";
                    } else {
                        replyDiv.textContent = replyDetails.message;
                    }
                });

                replyAndMessageDiv.appendChild(replyName);
                replyAndMessageDiv.appendChild(replyDiv);
                chatBubble.appendChild(replyAndMessageDiv);
                chatBubble.appendChild(messageDiv);
            } else {
                // Convert URLs starting with "https://" into clickable links
                const messageWithLinks = messageData.message.replace(
                    /(https:\/\/[^\s]+)/g,
                    '<a href="$1" target="_blank" style="color: blue; text-decoration: underline;">$1</a>'
                );
                bubbleText.innerHTML = messageWithLinks;

                // Fetch metadata for links
                const urlMatch = messageData.message.match(/https:\/\/[^\s]+/);
                if (urlMatch) {
                    const url = urlMatch[0];

                    // Validate the URL before making the fetch request
                    try {
                        new URL(url); // Throws an error if the URL is invalid
                        fetch(`https://api.linkpreview.net/?key=9c4e4801f0fb101c92a1c3186365af40&q=${encodeURIComponent(url)}`)
                            .then((response) => {
                                if (response.status === 429) {
                                    console.warn("Rate limit exceeded, skipping link preview.");
                                    return null; // Skip preview if rate limit is exceeded
                                }
                                return response.json();
                            })
                            .then((data) => {
                                if (!data) return; // Exit if no data is returned

                                const linkPreviewDiv = document.createElement("div");
                                linkPreviewDiv.classList.add("link-preview");

                                const linkImage = document.createElement("img");
                                linkImage.src = data.image || "img/link-img.png"; // Default to custom image
                                linkImage.alt = "Link Preview";
                                linkImage.style.width = "50px";
                                linkImage.style.height = "50px";
                                linkImage.style.objectFit = "cover";

                                // Handle error if image fails to load
                                linkImage.onerror = () => {
                                    linkImage.src = "img/link-img.png"; // Fallback to custom image
                                };

                                const linkTitle = document.createElement("div");
                                linkTitle.textContent = data.title || "No Title";
                                linkTitle.style.fontWeight = "bold";

                                const linkDescription = document.createElement("div");
                                linkDescription.textContent = data.description || "No Description";
                                linkDescription.style.fontSize = "12px";
                                linkDescription.style.color = "gray";

                                linkPreviewDiv.appendChild(linkImage);
                                linkPreviewDiv.appendChild(linkTitle);
                                linkPreviewDiv.appendChild(linkDescription);

                                chatBubble.appendChild(linkPreviewDiv);
                            })
                            .catch((error) => {
                                console.error("Error fetching link preview:", error);
                            });
                    } catch (e) {
                        console.warn("Invalid URL, skipping link preview:", url);
                    }
                }
            }
        }
    }
        if (messageData.video) {
            const videoContainer = document.createElement("div");
            videoContainer.classList.add("video-container");

            const chatVideo = document.createElement("video");
            chatVideo.style.width = "100%";
            chatVideo.style.height = "100%";
            chatVideo.controls = false;
            chatVideo.style.objectFit = "cover";
            chatVideo.style.backgroundColor = "black"; // Hide default video thumbnail
            chatVideo.setAttribute("preload", "metadata"); // Prevent loading the default thumbnail
            chatVideo.setAttribute("poster", "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="); // Transparent poster

            const source = document.createElement("source");
            source.src = messageData.video;
            source.type = "video/mp4";

            chatVideo.appendChild(source);

            const playPauseContainer = document.createElement("div");
            playPauseContainer.classList.add("video-play-btn");
            playPauseContainer.style.display = "none"; // Initially hide play/pause button

            const playPauseButton = document.createElement("i");
            playPauseButton.classList.add("fas", "fa-play", "play-pause-button");

            const videoText = document.createElement("div");
            videoText.id = "videoText";
            videoText.textContent = "VIDEO";
            videoText.style.position = "absolute";
            videoText.style.top = "50%";
            videoText.style.left = "50%";
            videoText.style.transform = "translate(-50%, -50%)";
            videoText.style.color = "white";
            videoText.style.fontSize = "20px";
            videoText.style.fontWeight = "bold";
            videoText.style.display = "flex";
            videoText.style.alignItems = "center";
            videoText.style.justifyContent = "center";
            videoText.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            videoText.style.padding = "10px";
            videoText.style.borderRadius = "5px";

            const spinner = document.createElement("div");
            spinner.classList.add("spinner");
            spinner.style.position = "absolute";
            spinner.style.top = "40%";
            spinner.style.left = "40%";
            spinner.style.transform = "translate(-50%, -50%)";
            spinner.style.border = "4px solid rgba(255, 255, 255, 0.3)";
            spinner.style.borderTop = "4px solid white";
            spinner.style.borderRadius = "50%";
            spinner.style.width = "40px";
            spinner.style.height = "40px";
            spinner.style.animation = "spin 1s linear infinite";

            chatVideo.addEventListener("loadeddata", () => {
                chatVideo.currentTime = 1; // Seek to 1 second
                videoText.style.display = "none"; // Hide the "VIDEO" text when the video loads
                playPauseContainer.style.display = "flex"; // Show play/pause button after video loads
                spinner.style.display = "none"; // Hide spinner when video is loaded
                chatVideo.removeAttribute("poster"); // Remove the poster attribute when the video loads
            });
            

            chatVideo.addEventListener("waiting", () => {
                spinner.style.display = "block"; // Show spinner when buffering
            });

            chatVideo.addEventListener("playing", () => {
                spinner.style.display = "none"; // Hide spinner when video starts playing
            });

            chatVideo.addEventListener("ended", () => {
                playPauseButton.classList.replace("fa-pause", "fa-play"); // Show play button when video ends
                playPauseContainer.style.display = "flex"; // Show play/pause button
            });

            playPauseButton.addEventListener("click", () => {
                if (chatVideo.paused) {
                    chatVideo.play();
                    playPauseButton.classList.replace("fa-play", "fa-pause");

                    // Hide play/pause button after 3 seconds
                    setTimeout(() => {
                        playPauseContainer.style.display = "none";
                    }, 3000);
                } else {
                    chatVideo.pause();
                    playPauseButton.classList.replace("fa-pause", "fa-play");
                }
            });

            // Show play/pause button when video is clicked
            chatVideo.addEventListener("click", () => {
                playPauseContainer.style.display = "flex";
            });

            playPauseContainer.appendChild(playPauseButton);
            videoContainer.appendChild(chatVideo);
            videoContainer.appendChild(playPauseContainer);
            videoContainer.appendChild(videoText); // Add the "VIDEO" text to the container
            videoContainer.appendChild(spinner); // Add spinner to the container
            chatBubble.appendChild(videoContainer);

        } else if (messageData.img) {
        const img = document.createElement("img");
        img.src = messageData.img;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        chatBubble.appendChild(img);
        } else if (messageData.gif) {
        const gifContainer = document.createElement("div");
        gifContainer.style.position = "relative";
        gifContainer.style.width = "100px";
        gifContainer.style.height = "100px";

        const gifText = document.createElement("div");
        gifText.textContent = "GIF";
        gifText.style.position = "absolute";
        gifText.style.top = "50%";
        gifText.style.left = "50%";
        gifText.style.transform = "translate(-50%, -50%)";
        gifText.style.color = "white";
        gifText.style.fontSize = "20px";
        gifText.style.fontWeight = "bold";
        gifText.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        gifText.style.padding = "10px";
        gifText.style.borderRadius = "5px";
        gifContainer.appendChild(gifText);

        const gif = document.createElement("img");
        gif.id = "gifVideo";
        gif.style.height = "50px";
        gif.style.width = "50px";
        gif.style.objectFit = "cover";
        gif.backgroundColor = "white";

        const gifSource = document.createElement("source");
        gifSource.src = messageData.gif;
        gifSource.type = "video/mp4";
        gif.appendChild(gifSource);

        gif.addEventListener("loadeddata", () => {
            gifText.style.display = "none"; // Hide the text when the GIF loads
        });

        gifContainer.appendChild(gif);
        chatBubble.appendChild(gifContainer);
        } else if (messageData.audio) {
        const audioContainer = document.createElement("div");
        audioContainer.classList.add("audio-container");

        const playPauseBtn = document.createElement("i");
        playPauseBtn.classList.add("fas", "fa-play", "play-pause-btn");

        const audio = document.createElement("audio");
        audio.src = messageData.audio;
        audio.classList.add("chat-audio");

        const durationText = document.createElement("span");
        durationText.textContent = "0:00";
        durationText.classList.add("audio-duration");

        // Update duration when audio loads
        audio.addEventListener("loadedmetadata", () => {
            durationText.textContent = formatTime(audio.duration);
        });

        playPauseBtn.addEventListener("click", () => {
            if (audio.paused) {
                audio.play();
                playPauseBtn.classList.replace("fa-play", "fa-pause");
        
                alert.log("Audio started playing, scheduling notification...");
        
                cordova.plugins.notification.local.schedule({
                    id: 1, 
                    title: "Audio Playing",
                    text: "An audio message is playing",
                    foreground: true
                });
        
            } else {
                audio.pause();
                playPauseBtn.classList.replace("fa-pause", "fa-play");
        
                alert.log("Audio paused, cancelling notification...");
        
                cordova.plugins.notification.local.cancel(1, function() {
                    alert.log("Notification canceled.");
                });
            }
        });          

        // Update timer as audio plays
        audio.addEventListener("timeupdate", () => {
            durationText.textContent = formatTime(audio.currentTime);
        });

        // Reset button when audio ends
        audio.addEventListener("ended", () => {
            playPauseBtn.classList.replace("fa-pause", "fa-play");
            durationText.textContent = formatTime(audio.duration);
        });

        audioContainer.appendChild(playPauseBtn);
        audioContainer.appendChild(durationText);
        audioContainer.appendChild(audio);
        chatBubble.appendChild(audioContainer);
        }

    /**
     * Formats time in minutes:seconds
     */
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    }

    
    // Append elements
    chatBubbleConDiv.appendChild(nameDiv);
    nameDiv.appendChild(rankDiv);
    nameDiv.appendChild(profileStickerDiv)
    chatBubbleCon.appendChild(messagePicDiv);
    chatBubbleCon.appendChild(chatBubble);
    chatBubbleConDiv.appendChild(chatBubbleCon);

    chatBody.appendChild(chatBubbleConDiv);

    // Scroll to the bottom
    chatBody.scrollTop = chatBody.scrollHeight;

    // Handle Like Click Event
    handleLikeSystem(messageData.id, likeButton, likeCount);

}

// Function to send message
function sendMessage() {
    if (!uid) {
        alert("User not authenticated. Cannot send message.");
        return;
    }

    const messageInput = document.getElementById("message");
    const messageText = messageInput.value.trim();
    if (messageText === "") return; // Prevent sending empty messages

    // Create a unique message ID
    const messageRef = push(ref(database, `group-chat/${chatName}/message`));

    // Determine if the message contains "nova"
    const containsNova = messageText.toLowerCase().includes("nova");

    // Message data
    const messageData = {
        message: messageText,
        id: messageRef.key,
        time: serverTimestamp(),
        uid: uid,
        replyingTo: quoteReplyMessageId.textContent || null, // Always include replyingTo, even if null
        askerUid: containsNova ? uid : null // Set askerUid if message contains "nova"
    };
    messageInput.value = ""; // Clear input after sending
    const audio = new Audio("audio/send.mp3");
    audio.play();

    // Save message to database
    set(messageRef, messageData)
        .then(() => {
            quoteReplyDivCon.style.display = "none"; // Hide quote reply div
            quoteReplyMessageId.textContent = ""; // Clear stored message ID

            // Update user data if rank is "user"
            fetchUserData(uid).then((userData) => {
                if (userData.account && userData.account.toLowerCase() === "user") {
                    const userRef = ref(database, `users/${uid}`);
                    update(userRef, {
                        coin: (userData.coin || 0) + 20,
                        diamond: (userData.diamond || 0) + 2
                    }).catch((error) => {
                        console.error("Error updating user data:", error);
                    });
                } else if (userData.account && userData.account.toLowerCase() === "cool") {
                    const userRef = ref(database, `users/${uid}`);
                    update(userRef, {
                        coin: (userData.coin || 0) + 50,
                        diamond: (userData.diamond || 0) + 5
                    }).catch((error) => {
                        console.error("Error updating user data:", error);
                    });
                } else if (userData.account && userData.account.toLowerCase() === "vip") {
                    const userRef = ref(database, `users/${uid}`);
                    update(userRef, {
                        coin: (userData.coin || 0) + 100,
                        diamond: (userData.diamond || 0) + 10
                    }).catch((error) => {
                        console.error("Error updating user data:", error);
                    });
                } else if (userData.account && userData.account.toLowerCase() === "svip") {
                    const userRef = ref(database, `users/${uid}`);
                    update(userRef, {
                        coin: (userData.coin || 0) + 200,
                        diamond: (userData.diamond || 0) + 20
                    }).catch((error) => {
                        console.error("Error updating user data:", error);
                    });
                } else if (userData.account && userData.account.toLowerCase() === "mvp") {
                    const userRef = ref(database, `users/${uid}`);
                    update(userRef, {
                        coin: (userData.coin || 0) + 500,
                        diamond: (userData.diamond || 0) + 50
                    }).catch((error) => {
                        console.error("Error updating user data:", error);
                    });
                } else if (userData.account && userData.account.toLowerCase() === "elite") {
                    const userRef = ref(database, `users/${uid}`);
                    update(userRef, {
                        coin: (userData.coin || 0) + 1000,
                        diamond: (userData.diamond || 0) + 100
                    }).catch((error) => {
                        console.error("Error updating user data:", error);
                    });
                } else if (userData.account && userData.account.toLowerCase() === "icon") {
                    const userRef = ref(database, `users/${uid}`);
                    update(userRef, {
                        coin: (userData.coin || 0) + 2000,
                        diamond: (userData.diamond || 0) + 200
                    }).catch((error) => {
                        console.error("Error updating user data:", error);
                    });
                } else if (userData.account && userData.account.toLowerCase() === "champion") {
                    const userRef = ref(database, `users/${uid}`);
                    update(userRef, {
                        coin: (userData.coin || 0) + 3000,
                        diamond: (userData.diamond || 0) + 300
                    }).catch((error) => {
                        console.error("Error updating user data:", error);
                    });
                } else if (userData.account && userData.account.toLowerCase() === "legend") {
                    const userRef = ref(database, `users/${uid}`);
                    update(userRef, {
                        coin: (userData.coin || 0) + 4000,
                        diamond: (userData.diamond || 0) + 400
                    }).catch((error) => {
                        console.error("Error updating user data:", error);
                    });
                } else if (userData.account && userData.account.toLowerCase() === "royal") {
                    const userRef = ref(database, `users/${uid}`);
                    update(userRef, {
                        coin: (userData.coin || 0) + 5000,
                        diamond: (userData.diamond || 0) + 500
                    }).catch((error) => {
                        console.error("Error updating user data:", error);
                    });
                } else if (userData.account && userData.account.toLowerCase() === "guardian") {
                    const userRef = ref(database, `users/${uid}`);
                    update(userRef, {
                        coin: (userData.coin || 0) + 6000,
                        diamond: (userData.diamond || 0) + 600
                    }).catch((error) => {
                        console.error("Error updating user data:", error);
                    });
                } else if (userData.account && userData.account.toLowerCase() === "sentinel") {
                    const userRef = ref(database, `users/${uid}`);
                    update(userRef, {
                        coin: (userData.coin || 0) + 7000,
                        diamond: (userData.diamond || 0) + 700
                    }).catch((error) => {
                        console.error("Error updating user data:", error);
                    });
                } else if (userData.account && userData.account.toLowerCase() === "inspector") {
                    const userRef = ref(database, `users/${uid}`);
                    update(userRef, {
                        coin: (userData.coin || 0) + 8000,
                        diamond: (userData.diamond || 0) + 800
                    }).catch((error) => {
                        console.error("Error updating user data:", error);
                    });
                } else if (userData.account && userData.account.toLowerCase() === "enforcer") {
                    const userRef = ref(database, `users/${uid}`);
                    update(userRef, {
                        coin: (userData.coin || 0) + 9000,
                        diamond: (userData.diamond || 0) + 900
                    }).catch((error) => {
                        console.error("Error updating user data:", error);
                    });
                } else if (userData.account && userData.account.toLowerCase() === "overseer") {
                    const userRef = ref(database, `users/${uid}`);
                    update(userRef, {
                        coin: (userData.coin || 0) + 10000,
                        diamond: (userData.diamond || 0) + 1000
                    }).catch((error) => {
                        console.error("Error updating user data:", error);
                    });
                } else if (userData.account && userData.account.toLowerCase() === "moderator") {
                    const userRef = ref(database, `users/${uid}`);
                    update(userRef, {
                        coin: (userData.coin || 0) + 15000,
                        diamond: (userData.diamond || 0) + 1500
                    }).catch((error) => {
                        console.error("Error updating user data:", error);
                    });
                } else if (userData.account && userData.account.toLowerCase() === "admin") {
                    const userRef = ref(database, `users/${uid}`);
                    update(userRef, {
                        coin: (userData.coin || 0) + 30000,
                        diamond: (userData.diamond || 0) + 3000
                    }).catch((error) => {
                        console.error("Error updating user data:", error);
                    });
                } else if (userData.account && userData.account.toLowerCase() === "co-owner") {
                    const userRef = ref(database, `users/${uid}`);
                    update(userRef, {
                        coin: (userData.coin || 0) + 60000,
                        diamond: (userData.diamond || 0) + 6000
                    }).catch((error) => {
                        console.error("Error updating user data:", error);
                    });
                } else if (userData.account && userData.account.toLowerCase() === "owner") {
                    const userRef = ref(database, `users/${uid}`);
                    update(userRef, {
                        coin: (userData.coin || 0) + 120000,
                        diamond: (userData.diamond || 0) + 12000
                    }).catch((error) => {
                        console.error("Error updating user data:", error);
                    });
                } else if (userData.account && userData.account.toLowerCase() === "emperor") {
                    const userRef = ref(database, `users/${uid}`);
                    update(userRef, {
                        coin: (userData.coin || 0) + 1000000,
                        diamond: (userData.diamond || 0) + 100000
                    }).catch((error) => {
                        console.error("Error updating user data:", error);
                    });
                }
            });
        })
        .catch((error) => {
            console.error("Error sending message:", error);
        });
}

const noMessagesPlaceholder = document.createElement("div");
noMessagesPlaceholder.id = "noMessagesPlaceholder";
noMessagesPlaceholder.textContent = "No messages yet.";
noMessagesPlaceholder.style.textAlign = "center";
noMessagesPlaceholder.style.color = "gray";
noMessagesPlaceholder.style.marginTop = "20px";
noMessagesPlaceholder.style.display = "none";
chatBody.appendChild(noMessagesPlaceholder);

// Function to check if there are messages
function checkForMessages() {
    get(messagesRef).then((snapshot) => {
        if (!snapshot.exists()) {
            noMessagesPlaceholder.style.display = "block"; // Show placeholder
        } else {
            noMessagesPlaceholder.style.display = "none"; // Hide placeholder
        }
    });
}

// Listen for new messages in real-time
onChildAdded(messagesRef, (snapshot) => {
    const messageData = snapshot.val();
    const currentTime = new Date();
    const messageTime = new Date(messageData.time);

    if (
        messageData.uid !== uid &&
        messageTime.getHours() === currentTime.getHours() &&
        messageTime.getMinutes() === currentTime.getMinutes()
    ) {
        console.log("The message time corresponds with the current time and is not from your UID.");
        const audio = new Audio("audio/recieve.mp3");
        audio.play();
    } 
       
    
    displayMessage(messageData);
    noMessagesPlaceholder.style.display = "none"; // Hide placeholder when a message is added

    // Check if messages exceed 20 and delete older ones
    get(messagesRef).then((snapshot) => {
        const messages = snapshot.val();
        if (messages) {
            const messageKeys = Object.keys(messages);
            if (messageKeys.length > 20) {
                const oldestKeys = messageKeys.slice(0, messageKeys.length - 20);
                oldestKeys.forEach((key) => {
                    remove(ref(database, `group-chat/${chatName}/message/${key}`));
                });
                chatBubbleConDiv.style.display = "none";
            }
        }
    });
   
});

// Initial check for messages
checkForMessages();
// Handle report button click
document.getElementById("reportBtn").addEventListener("click", () => {
    const messageIdSpan = document.getElementById("messageIdSpan").textContent;
    const currentUserId = getCurrentUserId();
    const reportRef = ref(database, `adminSection/report/${messageIdSpan}`);

    const reportData = {
        messageId: messageIdSpan,
        time: serverTimestamp(),
        userThatReportUid: currentUserId
    };

    set(reportRef, reportData)
        .then(() => {
            document.getElementById("reportPopUpDiv").style.display = "none";
            document.getElementById("thankYouPopUpDiv").style.display = "flex";
        })
        .catch((error) => {
            console.error("Error submitting report:", error);
        });
});

// Handle cancel button click
document.getElementById("cancelBtn").addEventListener("click", () => {
    document.getElementById("reportPopUpDiv").style.display = "none";
});

// Handle thank you button click
document.getElementById("thankYouBtn").addEventListener("click", () => {
    document.getElementById("thankYouPopUpDiv").style.display = "none";
});
const emojiContainer = document.getElementById("emojiContainer");
const emojiDivCon = document.getElementById("emojiDivCon");
const smileyEmoji = document.getElementById("smileyEmoji");

const smiley = [
    { id: "grinningFace", emoji: "😀" },
    { id: "grinningFaceWithBigEyes", emoji: "😃" },
    { id: "grinningFaceWithSmilingEyes", emoji: "😄" },
    { id: "beamingFaceWithSmilingEyes", emoji: "😁" },
    { id: "grinningSquintingFace", emoji: "😆" },
    { id: "grinningFaceWithSweat", emoji: "😅" },
    { id: "faceWithTearsOfJoy", emoji: "😂" },
    { id: "rollingOnTheFloorLaughing", emoji: "🤣"},
    { id: "loudlyCryingFace", emoji: "😭" },
    { id: "winkingFace", emoji: "😉" },
    { id: "kissingFace", emoji: "😘" },
    { id: "kissingFaceWithClosedEyes", emoji: "😚" },
    { id: "faceBlowingAKiss", emoji: "😗" },
    { id: "smilingFaceWithHeart", emoji: "🥰" },
    { id: "smilingFaceWithHeartEyes", emoji: "😍" },
    { id: "starStruck", emoji: "😍"},
    { id: "partyingFace", emoji: "🥳" },
    { id: "upsideDownFace", emoji: "🙃" },
    { id: "slightlySmilingFace", emoji: "🙂" },
    { id: "smilingFaceWithTear", emoji: "😢" },
    { id: "faceSavoringFood", emoji: "😋" },
    { id: "faceWithTongue", emoji: "😜" },
    { id: "squintingFaceWithTongue", emoji: "😝" },
    { id: "winkingFaceWithTongue", emoji: "😜" },
    { id: "zanyFace", emoji: "🤪" },
    { id: "smilingFaceWithHalo", emoji: "😇" },
    { id: "smilingFaceWithSmilingEyes", emoji: "😊" },
    { id: "smilingFace", emoji: "☺️"},
    { id: "smirkingFace", emoji: "😏" },
    { id: "relievedFace", emoji: "😌" },
    { id: "pensiveFace", emoji: "😔" },
    { id: "expressionlessFace", emoji: "😑" },
    { id: "faceWithoutMouth", emoji: "😶" },
    { id: "thinkingFace", emoji: "🤔" },
    { id: "shushingFace", emoji: "🤫" },
    { id: "faceWithHandOverMouth", emoji: "🤭"},
    { id: "yawningFace", emoji: "🥱" },
    { id: "huggingFace", emoji: "🤗" },
    { id: "faceScreamingInFear", emoji: "😱" },
    { id: "faceWithRaisedEyebrow", emoji: "🤨" },
    { id: "faceWithMonocle", emoji: "🧐" },
    { id: "unamusedFace", emoji: "😒" },
    { id: "faceWithRollingEyes", emoji: "🙄" },
    { id: "faceWithSteamFromNose", emoji: "😤" },
    { id: "angryFace", emoji: "😠" },
    { id: "poutingFace", emoji: "😡"},
    { id: "faceWithSymbolsOnMouth", emoji: "🤬" },
    { id: "pleadingFace", emoji: "🥺" },
    { id: "worriedFace", emoji: "😟" },
    { id: "sadButRelievedFace", emoji: "😥" },
    { id: "cryingFace", emoji: "😢" },
    { id: "frowningFace", emoji: "☹️" },
    { id: "slightlyFrowningFace", emoji: "🙁" },
    { id: "confusedFace", emoji: "😕"},
    { id: "zipperMouthFace", emoji: "🤐" },
    { id: "anxiousFaceWithSweat", emoji: "😰" },
    { id: "fearfulFace", emoji: "😨" },
    { id: "anguishedFace", emoji: "😧" },
    { id: "frowningFaceWithOpenMouth", emoji: "😦" },
    { id: "faceWithOpenMouth", emoji: "😮" },
    { id: "hushedFace", emoji: "😯"},
    { id: "astonishedFace", emoji: "😲" },
    { id: "flushedFace", emoji: "😳"},
    { id: "exploadingHead", emoji: "🤯" },
    { id: "grimacingFace", emoji: "😬" },
    { id: "downcastFace", emoji: "😞" },
    { id: "disappointedFace", emoji: "😔" },
    { id: "confoundedFace", emoji: "😖" },
    { id: "perseveringFace", emoji: "😣" },
    { id: "waeryFace", emoji: "😩" },
    { id: "tiredFace", emoji: "😫" },
    { id: "dizzyFace", emoji: "😵" },
    { id: "sleepingFace", emoji: "😴" },
    { id: "sleepyFace", emoji: "😪" },
    { id: "droolingFace", emoji: "🤤" },
    { id: "firstQuarterMoonFace", emoji: "🌛" },
    { id: "lastQuarterMoonFace", emoji: "🌜" },
    { id: "newMoonFace", emoji: "🌚" },
    { id: "fullMoonFace", emoji: "🌝" },
    { id: "sunWithFace", emoji: "🥴"},
    { id: "woozyFace", emoji: "🥴" },
    { id: "hotFace", emoji: "🥵" },
    { id: "coldFace", emoji: "🥶" },
    { id: "nauseatedFace", emoji: "🤢" },
    { id: "vomitingFace", emoji: "🤮" },
    { id: "sneezingFace", emoji: "🤧" },
    { id: "faceWithThermometer", emoji: "🤒" },
    { id: "faceWithHeadBandage", emoji: "🤕" },
    { id: "faceWithMedicalMask", emoji: "😷" },
    { id: "cowboyHatFace", emoji: "🤠" },
    { id: "moneyMouthFace", emoji: "🤑" },
    { id: "smilingFaceWithSunglasses", emoji: "😎" },
    { id: "nerdFace", emoji: "🤓" },
    { id: "disguisedFace", emoji: "🥸" },
    { id: "lyingFace", emoji: "🤥" },
    { id: "clownFace", emoji: "🤡" },
    { id: "ghost", emoji: "👻" },
    { id: "pileOfPoo", emoji: "💩" },
    { id: "alien", emoji: "👽" },
    { id: "robot", emoji: "🤖" },
    { id: "jackOlantern", emoji: "🎃" },
    { id: "smilingFaceWithHorns", emoji: "😈" },
    { id: "angryFaceWithHorns", emoji: "👿" },
    { id: "ogre", emoji: "👹" },
    { id: "goblin", emoji: "👺" },
    { id: "fire", emoji: "🔥" },
    { id: "dizzy", emoji: "💫" },
    { id: "star", emoji: "⭐" },
    { id: "glowingStar", emoji: "🌟" },
    { id: "sparkles", emoji: "✨" },
    { id: "collision", emoji: "💥" },
    { id: "hundredPoints", emoji: "💯" },
    { id: "anger", emoji: "💢" },
    { id: "dashedLine", emoji: "💨" },
    { id: "sweatDroplets", emoji: "💦" },
    { id: "zzz", emoji: "💤" },
    { id: "hole", emoji: "🕳️" },
    { id: "partyPopper", emoji: "🎉" },
    { id: "confettiBall", emoji: "🎊" },
    { id: "seeNoEvilMonkey", emoji: "🙈" },
    { id: "hearNoEvilMonkey", emoji: "🙉" },
    { id: "speakNoEvilMonkey", emoji: "🙊" },
    { id: "grinningCat", emoji: "😸" },
    { id: "grinningCatWithSmilingEyes", emoji: "😺" },
    { id: "catWithTearsOfJoy", emoji: "😹" },
    { id: "smilingCatWithHeartEyes", emoji: "😻" },
    { id: "catWithWrySmile", emoji: "😼"},
    { id: "kissingCat", emoji: "😽" },
    { id: "wearyCat", emoji: "🙀" },
    { id: "cryingCat", emoji: "😿" },
    { id: "poutingCat", emoji: "😾" },
    { id: "redHeart", emoji: "❤️" },
    { id: "orangeHeart", emoji: "🧡" },
    { id: "yellowHeart", emoji: "💛" },
    { id: "greenHeart", emoji: "💚" },
    { id: "blueHeart", emoji: "💙" },
    { id: "purpleHeart", emoji: "💜"},
    { id: "brownHeart", emoji: "🤎" },
    { id: "blackHeart", emoji: "🖤" },
    { id: "whiteHeart", emoji: "🤍" },
    { id: "heartSuit", emoji: "♥️" },
    { id: "heartWithArrow", emoji: "💘" },
    { id: "heartWithRibbon", emoji: "💝" },
    { id: "sparklingHeart", emoji: "💖" },
    { id: "growingHeart", emoji: "💗" },
    { id: "beatingHeart", emoji: "💓" },
    { id: "revolvingHearts", emoji: "💞" },
    { id: "twoHearts", emoji: "💕"},
    { id: "loveLetter", emoji: "💌" },
    { id: "heartDecoration", emoji: "💟" },
    { id: "heartExclamation", emoji: "❣️" },
    { id: "brokenHeart", emoji: "💔"},
    { id: "kissMark", emoji: "💋" },
    { id: "peopleHugging", emoji: "🫂" },
    { id: "bustsInSilhouette", emoji: "👤" },
    { id: "bustInSilhouette", emoji: "👥" },
    { id: "speakingHead", emoji: "🗣️" },
    { id: "footprint", emoji: "👣" },
    { id: "brain", emoji: "🧠" },
    { id: "anatomicalHeart", emoji: "🫀" },
    { id: "lungs", emoji: "🫁" },
    { id: "dropOfBlood", emoji: "🩸" },
    { id: "microbe", emoji: "🦠" },
    { id: "tooth", emoji: "🦷" },
    { id: "dogBone", emoji: "🦴" },
    { id: "bone", emoji: "🦴" },
    { id: "skullAndCrossbones", emoji: "☠️" },
    { id: "skull", emoji: "💀" },
    { id: "eyes", emoji: "👀" },
    { id: "eye", emoji: "👁️" },
    { id: "mouth", emoji: "👄" },
    { id: "tongue", emoji: "👅" },
    { id: "nose", emoji: "👃" },
    { id: "ear", emoji: "👂" },
    { id: "earWithHearingAid", emoji: "🦻" },
    { id: "foot", emoji: "🦶" },
    { id: "leg", emoji: "🦵" },
    { id: "mechanicalLeg", emoji: "🦿" },
    { id: "mechanicalArm", emoji: "🦾" },
    { id: "flexedBiceps", emoji: "💪" },
    { id: "thumbsUp", emoji: "👍" },
    { id: "thumbsDown", emoji: "👎" },
    { id: "clappingHands", emoji: "👏" },
    { id: "raisingHands", emoji: "🙌" },
    { id: "openHands", emoji: "👐" },
    { id: "palmsUpTogether", emoji: "🤲" },
    { id: "handshake", emoji: "🤝" },
    { id: "rightFacingFist", emoji: "🤜" },
    { id: "leftFacingFist", emoji: "🤛" },
    { id: "raisedFist", emoji: "✊" },
    { id: "oncomingFist", emoji: "👊" },
    { id: "raisedBackOfHand", emoji: "🤚" },
    { id: "wavingHand", emoji: "👋" },
    { id: "handWithFingersSplayed", emoji: "🖐️" },
    { id: "raisedHand", emoji: "✋"},
    { id: "vulcanSalute", emoji: "🖖" },
    { id: "loveYouGesture", emoji: "🤟" },
    { id: "signOfTheHorns", emoji: "🤘" },
    { id: "victoryHand", emoji: "✌️" },
    { id: "crossedFingers", emoji: "🤞" },
    { id: "callMeHand", emoji: "🤙" },
    { id: "pinchedFingers", emoji: "🤌" },
    { id: "pinchingHand", emoji: "🤏" },
    { id: "middleFinger", emoji: "🖕" },
    { id: "indexPointingUp", emoji: "☝️" },
    { id: "backhandIndexPointitngUp", emoji: "👆" },
    { id: "backhandIndexPointingDown", emoji: "👇" },
    { id: "backhandIndexPointingReft", emoji: "👉" },
    { id: "backhandIndexPointingLeft", emoji: "👈" },
    { id: "writingHand", emoji: "✍️" },
    { id: "selfie", emoji: "🤳" },
    { id: "foldedHands", emoji: "🙏" },
    { id: "nailPolish", emoji: "💅" },
    { id: "bowingPerson", emoji: "🙇" },
    { id: "personRaisingHand", emoji: "🙋" },
    { id: "personTippingHand", emoji: "💁" },
    { id: "personGesturingOk", emoji: "🙆" },
    { id: "personGesturingNo", emoji: "🙅" },
    { id: "personShrugging", emoji: "🤷" },
    { id: "personFacepalming", emoji: "🤦" },
    { id: "personFrowning", emoji: "🙍" },
    { id: "personPouting", emoji: "🙍‍♂️" },
    { id: "deafPerson", emoji: "🧏" },
    { id: "personGettingMassage", emoji: "💆" },
    { id: "personGettingHaircut", emoji: "💇" },
    { id: "personInSteamyRoom", emoji: "🧖" },
    { id: "personTakingBath", emoji: "🛀" },
    { id: "personInBed", emoji: "🛌" },
    { id: "personInLotusPosition", emoji: "🧘" },
    { id: "personWithWhiteCane", emoji: "🧑‍🦯" },
    { id: "personInMotorizedWheelchair", emoji: "🧑‍🦼" },
    { id: "personInManualWheelchair", emoji: "🧑‍🦽" },
    { id: "personKneeling", emoji: "🧎" },
    { id: "personStanding", emoji: "🧍" },
    { id: "personWalking", emoji: "🚶" },
    { id: "personRunning", emoji: "🏃" },
    { id: "personCartwheeling", emoji: "🤸" },
    { id: "personLiftingWeights", emoji: "🏋️" },
    { id: "personBouncingBall", emoji: "⛹️" },
    { id: "personPlayingHandball", emoji: "🤾" },
    { id: "personBiking", emoji: "🚴" },
    { id: "personClimbing", emoji: "🧗" },
    { id: "peopleWrestling", emoji: "🤼" },
    { id: "personJuggling", emoji: "🤹" },
    { id: "personGolfing", emoji: "🏌️" },
    { id: "personHorseRiding", emoji: "🏇" },
    { id: "personFencing", }
    
];
smiley.forEach(({ id, emoji }) => {
    const emojiDiv = document.createElement("div");
    emojiDiv.id = id;
    emojiDiv.textContent = emoji;

    // Add click event listener to display emoji in the message input
    emojiDiv.addEventListener("click", () => {
        const messageInput = document.getElementById("message");
        messageInput.value += emoji; // Append the emoji to the message input
        
    });

    smileyEmoji.appendChild(emojiDiv);
});

// Add backspace functionality for emoji
const emojiBackSpace = document.getElementById("emojiBackSpace");
emojiBackSpace.addEventListener("click", () => {
    const messageInput = document.getElementById("message");
    const text = messageInput.value;

    // Use Intl.Segmenter to correctly handle Unicode graphemes
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    const graphemes = Array.from(segmenter.segment(text), (s) => s.segment); // Extract segment

    // Remove the last grapheme
    graphemes.pop();

    // Join the remaining graphemes back into a string
    messageInput.value = graphemes.join("");
});

document.getElementById("emojiDiv").addEventListener("click", () => {
    emojiDivCon.style.display = "flex";
});

// Hide emojiDivCon when clicking outside of emojiContainer
document.addEventListener("click", (event) => {
    if (!emojiContainer.contains(event.target) && !document.getElementById("emojiDiv").contains(event.target)) {
        emojiDivCon.style.display = "none";
    }
});
const animalAndNatureEmoji = document.getElementById("animalAndNatureEmoji");
const animalNature = [
    { id: "bouquet", emoji: "💐" },
    { id: "rose", emoji: "🌹" },
    { id: "wiltedFlower", emoji: "🥀" },
    { id: "hibiscus", emoji: "🌺" },
    { id: "tulip", emoji: "🌷" },
    { id: "cherryBlossom", emoji: "🌸" },
    { id: "whiteFlower", emoji: "💮" },
    { id: "rosette", emoji: "🏵️" },
    { id: "sunflower", emoji: "🌻" },
    { id: "blossom", emoji: "🌼" },
    { id: "fallenLeaf", emoji: "🍂" },
    { id: "mapleLeaf", emoji: "🍁" },
    { id: "mushroom", emoji: "🍄" },
    { id: "sheafOfRice", emoji: "🌾" },
    { id: "seedling", emoji: "🌱" },
    { id: "herb", emoji: "🌿" },
    { id: "leafFlutteringInWind", emoji: "🍃" },
    { id: "shamrock", emoji: "☘️" },
    { id: "fourLeafClover", emoji: "🍀" },
    { id: "pottedPlant", emoji: "🪴" },
    { id: "cactus", emoji: "🌵" },
    { id: "palmTree", emoji: "🌴" },
    { id: "deciduousTree", emoji: "🌳" },
    { id: "evergreenTree", emoji: "🌲" },
    { id: "wood", emoji: "🪵" },
    { id: "rock", emoji: "🪨" },
    { id: "mountain", emoji: "⛰️" },
    { id: "snowCappedMountain", emoji: "🏔️" },
    { id: "snowflake", emoji: "❄️" },
    { id: "snowman", emoji: "☃️" },
    { id: "snowmanWithoutSnow", emoji: "⛄" },
    { id: "waterWave", emoji: "🌊" },
    { id: "windFace", emoji: "🌬️" },
    { id: "cyclone", emoji: "🌀" },
    { id: "tornado", emoji: "🌪️" },
    { id: "fog", emoji: "🌁" },
    { id: "foggy", emoji: "🌫️" },
    { id: "thermometer", emoji: "🌡️" },
    { id: "fire", emoji: "🔥" },
    { id: "volcano", emoji: "🌋" },
    { id: "desert", emoji: "🏜️" },
    { id: "nationalPark", emoji: "🏞️" },
    { id: "beachWithUmbrella", emoji: "🏖️" },
    { id: "sunrise", emoji: "🌅" },
    { id: "sunBehindSmallCloud", emoji: "🌤️" },
    { id: "sunBehindCloud", emoji: "🌥️" },
    { id: "sunBehindLargeCloud", emoji: "🌥️" },
    { id: "sunBehindRainCloud", emoji: "🌦️" },
    { id: "cloud", emoji: "☁️" },
    { id: "cloudWithSnow", emoji: "🌨️" },
    { id: "cloudWithLightningAndRain", emoji: "⛈️" },
    { id: "cloudWithLightning", emoji: "🌩️" },
    { id: "cloudWithRain", emoji: "🌧️" },
    { id: "droplet", emoji: "💧" },
    { id: "umbrellaWithRainDrops", emoji: "☔" },
    { id: "highVoltage", emoji: "⚡" },
    { id: "rainbow", emoji: "🌈" },
    { id: "star", emoji: "⭐" },
    { id: "glowingStar", emoji: "🌟" },
    { id: "cresentMoon", emoji: "🌙" },
    { id: "comet", emoji: "☄️" },
    { id: "shootingStar", emoji: "🌠" },
    { id: "milkyWay", emoji: "🌌" },
    { id: "ringedPlanet", emoji: "🪐" },
    { id: "newMoon", emoji: "🌑" },
    { id: "waxingCrescentMoon", emoji: "🌒" },
    { id: "firstQuarterMoon", emoji: "🌓" },
    { id: "fullMoon", emoji: "🌕" },
    { id: "wanningGibbousMoon", emoji: "🌖" },
    { id: "lastQuarterMoon", emoji: "🌗" },
    { id: "wanningCrescentMoon", emoji: "🌘" },
    { id: "earthEuropeAfrica", emoji: "🌍" },
    { id: "earthAmericas", emoji: "🌎" },
    { id: "earthAsiaAustralia", emoji: "🌏" },
    { id: "seeNoEvilMonkey", emoji: "🙈" },
    { id: "hearNoEvilMonkey", emoji: "🙉" },
    { id: "speakNoEvilMonkey", emoji: "🙊" },
    { id: "monkeyFace", emoji: "🐵" },
    { id: "lion", emoji: "🦁" },
    { id: "tigerFace", emoji: "🐯" },
    { id: "catFace", emoji: "🐱" },
    { id: "dogFace", emoji: "🐶" },
    { id: "wolf", emoji: "🐺" },
    { id: "bear", emoji: "🐻" },
    { id: "polarBear", emoji: "🐻‍❄️" },
    { id: "koala", emoji: "🐨" },
    { id: "panda", emoji: "🐼" },
    { id: "hamster", emoji: "🐹" },
    { id: "mouseFace", emoji: "🐭" },
    { id: "rabbitFace", emoji: "🐰" },
    { id: "fox", emoji: "🦊" },
    { id: "racoon", emoji: "🦝" },
    { id: "cowFace", emoji: "🐮" },
    { id: "pigFace", emoji: "🐷" },
    { id: "pigNose", emoji: "🐽" },
    { id: "boar", emoji: "🐗" },
    { id: "zebra", emoji: "🦓" },
    { id: "unicorn", emoji: "🦄" },
    { id: "horseFace", emoji: "🐴" },
    { id: "frog", emoji: "🐸" },
    { id: "dragonFace", emoji: "🐲" },
    { id: "lizard", emoji: "🦎" },
    { id: "dragon", emoji: "🐉" },
    { id: "t-rex", emoji: "🦖" },
    { id: "sauropod", emoji: "🦕" },
    { id: "turtle", emoji: "🐢" },
    { id: "crocodile", emoji: "🐊" },
    { id: "snake", emoji: "🐍" },
    { id: "mouse", emoji: "🐁" },
    { id: "rat", emoji: "🐀" },
    { id: "rabbit", emoji: "🐇" },
    { id: "cat", emoji: "🐈" },
    { id: "blackCat", emoji: "🐈‍⬛" },
    { id: "poodle", emoji: "🐩" },
    { id: "dog", emoji: "🐕" },
    { id: "guideDog", emoji: "🦮" },
    { id: "serviceDog", emoji: "🐕‍🦺" },
    { id: "tiger", emoji: "🐅" },
    { id: "leopard", emoji: "🐆" },
    { id: "horse", emoji: "🐎" },
    { id: "pig", emoji: "🐖" },
    { id: "cow", emoji: "🐄" },
    { id: "ox", emoji: "🐂" },
    { id: "waterBuffalo", emoji: "🐃" },
    { id: "bison", emoji: "🦬" },
    { id: "ram", emoji: "🐏" },
    { id: "ewe", emoji: "🐑" },
    { id: "goat", emoji: "🐐" },
    { id: "deer", emoji: "🦌" },
    { id: "llma", emoji: "🦙" },
    { id: "sloth", emoji: "🦥" },
    { id: "kangaroo", emoji: "🦘" },
    { id: "elephant", emoji: "🐘" },
    { id: "mammoth", emoji: "🦣" },
    { id: "rhynoceros", emoji: "🦏" },
    { id: "hippopotamus", emoji: "🦛" },
    { id: "giraffe", emoji: "🦒" },
    { id: "monkey", emoji: "🐒" },
    { id: "gorilla", emoji: "🦍" },
    { id: "orangutan", emoji: "🦧" },
    { id: "camel", emoji: "🐪" },
    { id: "twoHumpCamel", emoji: "🐫" },
    { id: "chimpmunk", emoji: "🐿️" },
    { id: "beaver", emoji: "🦫" },
    { id: "skunk", emoji: "🦨" },
    { id: "badger", emoji: "🦡" },
    { id: "hedgehog", emoji: "🦔" },
    { id: "otter", emoji: "🦦" },
    { id: "bat", emoji: "🦇" },
    { id: "feather", emoji: "🪶" },
    { id: "eagle", emoji: "🦅" },
    { id: "owl", emoji: "🦉" },
    { id: "rooster", emoji: "🐓" },
    { id: "chicken", emoji: "🐔" },
    { id: "hatchingChick", emoji: "🐣" },
    { id: "babyChick", emoji: "🐥" },
    { id: "frontFacingBabyChick", emoji: "🐤" },
    { id: "bird", emoji: "🐦" },
    { id: "parrot", emoji: "🦜" },
    { id: "dove", emoji: "🕊️" },
    { id: "dodo", emoji: "🦤" },
    { id: "swan", emoji: "🦢" },
    { id: "flamingo", emoji: "🦩" },
    { id: "peacock", emoji: "🦚" },
    { id: "turkey", emoji: "🦃" },
    { id: "duck", emoji: "🦆" },
    { id: "penguin", emoji: "🐧" },
    { id: "seal", emoji: "🦭" },
    { id: "shark", emoji: "🦈" },
    { id: "dolphin", emoji: "🐬" },
    { id: "whale", emoji: "🐋" },
    { id: "spoutingWhale", emoji: "🐳" },
    { id: "fish", emoji: "🐟" },
    { id: "tropicalFish", emoji: "🐠" },
    { id: "blowfish", emoji: "🐡" },
    { id: "shrimp", emoji: "🦐" },
    { id: "lobster", emoji: "🦞" },
    { id: "crab", emoji: "🦀" },
    { id: "squid", emoji: "🦑" },
    { id: "octopus", emoji: "🐙" },
    { id: "oyster", emoji: "🦪" },
    { id: "scorpion", emoji: "🦂" },
    { id: "spider", emoji: "🕷️" },
    { id: "spiderWeb", emoji: "🕸️" },
    { id: "spiralShell", emoji: "🐚" },
    { id: "snail", emoji: "🐌" },
    { id: "ant", emoji: "🐜" },
    { id: "cricket", emoji: "🦗" },
    { id: "beetle", emoji: "🐞" },
    { id: "mosquito", emoji: "🦟" },
    { id: "cockroach", emoji: "🪳" },
    { id: "fly", emoji: "🪰" },
    { id: "honeybee", emoji: "🐝" },
    { id: "ladybug", emoji: "🐞" },
    { id: "butterfly", emoji: "🦋" },
    { id: "caterpillar", emoji: "🐛" },
    { id: "worm", emoji: "🪱" },
    { id: "microbe", emoji: "🦠" },
    { id: "pawPrints", emoji: "🐾" },
];
animalNature.forEach(({ id, emoji }) => {
    const emojiDiv = document.createElement("div");
    emojiDiv.id = id;
    emojiDiv.textContent = emoji;

    // Add click event listener to display emoji in the message input
    emojiDiv.addEventListener("click", () => {
        const messageInput = document.getElementById("message");
        messageInput.value += emoji; // Append the emoji to the message input
    });

    animalAndNatureEmoji.appendChild(emojiDiv);
});
emojiDivCon.appendChild(emojiContainer);
const storage = getStorage(app);

// Function to delete older files if storage is almost full
async function manageStorage() {
    const storageUsageLimit = 0.9; // 90% usage threshold
    const storageQuota = 1024 * 1024 * 1024 * 1; // 1GB quota

    try {
        const storageUsage = await storage.getUsage(); // Replace with actual method to get usage
        const usagePercentage = storageUsage / storageQuota;

        if (usagePercentage >= storageUsageLimit) {
            console.log("Storage is almost full. Deleting older files...");

            const filesRef = storageRef(storage, "uploads"); // Adjust path as needed
            const filesList = await listAll(filesRef);

            const files = filesList.items;
            files.sort((a, b) => a.timeCreated - b.timeCreated); // Sort by creation time

            const filesToDelete = files.slice(0, Math.ceil(files.length * 0.1)); // Delete oldest 10%

            for (const file of filesToDelete) {
                await deleteObject(file);
                console.log(`Deleted file: ${file.name}`);
            }
        } else {
            console.log("Storage usage is within limits.");
        }
    } catch (error) {
        console.error("Error managing storage:", error);
    }
}

// Call the function periodically or on specific triggers
manageStorage();
 
    const messageInput = document.getElementById("message");

    messageInput.addEventListener("input", async () => {
        const userInput = messageInput.value.trim();
        if (!userInput) return; // Exit if input is empty

        const token = "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"; // Your OpenRouter API key
        const url = "https://openrouter.ai/api/v1/chat/completions";

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            "HTTP-Referer": "<YOUR_SITE_URL>", // Optional
            "X-Title": "<YOUR_SITE_NAME>", // Optional
        };

        const body = JSON.stringify({
            "model": "deepseek/deepseek-r1:free",
            "messages": [
                { "role": "system", "content": "You are a helpful assistant that provides message suggestions." },
                { "role": "user", "content": userInput }
            ],
            "temperature": 0.7,
            "max_tokens": 50,
            "top_p": 1,
        });

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: headers,
                body: body,
            });

            if (response.ok) {
                const data = await response.json();
                const suggestion = data.choices[0].message.content;

                // Append the suggestion to the input field
                messageInput.value = `${userInput}${suggestion}`;
            } else {
                console.error("Failed to fetch AI suggestion:", response.statusText);
            }
        } catch (error) {
            console.error("An error occurred while fetching AI suggestion:", error);
        }
    });
    const privateChatBackIcon = document.getElementById("privateChatBackIcon");
    const privateChatDivCon = document.getElementById("privateChatDivCon");
    privateChatBackIcon.addEventListener("click", () => {
        chattingWithUser = ""; // Clear the variable when closing the popup
        console.log("this is" + chattingWithUser);
        privateChatDivCon.style.display = "none";
    });
    const privateChatHeaderBackBtn = document.getElementById("privateChatHeaderBackBtn");
    privateChatHeaderBackBtn.addEventListener("click", () => {
        chattingWithUser = ""; // Clear the variable when closing the popup
        console.log("this is" + chattingWithUser);
        privateChatDivCon.style.display = "none";
    });
    const privateChatProfilePicImg = document.getElementById("privateChatProfilePicImg");
    const privateChatName = document.getElementById("privateChatName");
    function loadPrivateChatData() {
        if (!chattingWithUser) {
            console.warn("No private chat selected.");
            return;
        }

        const [uid1, uid2] = chattingWithUser.split("CHAT");
        const otherUid = uid1 === uid ? uid2 : uid1;

        const userRef = ref(database, `users/${otherUid}`);
        get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                const { profilePic, name } = userData;
                privateChatProfilePicImg.src = profilePic || "profile.png"; // Default image if none provided
                privateChatName.textContent = name || "Unknown User"; // Default name if none provided
            } else {
                console.warn("User data not found for UID:", otherUid);
            }
        }).catch((error) => {
            console.error("Error fetching user data:", error);
        });

    const privateChatWindowDiv = document.getElementById("privateChatWindowDiv");

    function handleResize() {
        if (window.innerWidth <= 600) {
            privateChatWindowDiv.style.display = "flex";
        } else {
            privateChatWindowDiv.style.display = "flex";
        }
    }

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

        // Call this function after setting chattingWithUser
        initializePrivateChatListener();
    }
    function sendPrivateMessage() {
        const privateChatMessage = document.getElementById("privateChatMessage").value.trim();
        if (!privateChatMessage) return;
    
        if (!chattingWithUser) {
            console.warn("No private chat selected.");
            return;
        }
    
        const privateMessageRef = push(ref(database, `privateChat/${chattingWithUser}/messages`));
    
        const messageData = {
            message: privateChatMessage,
            uid: uid,
            time: serverTimestamp(),
            id: privateMessageRef.key
        };
        document.getElementById("privateChatMessage").value = "";
        set(privateMessageRef, messageData)
            .then(() => {
                console.log("Private message sent successfully.");
            })
            .catch((error) => {
                console.error("Error sending private message:", error);
            });
    }    
    const privateChatWindowDiv = document.getElementById("privateChatWindowDiv");
    const privateChatWindowBackIcon = document.getElementById("privateChatWindowBackIcon");
    privateChatWindowBackIcon.addEventListener("click", () => {
        chattingWithUser = ""; // Clear the variable when closing the popup
        privateChatWindowDiv.style.display = "none";
    });
    function showTypingIndicator(isTyping) {
        const typingIndicatorBubbleDiv = document.getElementById("typingIndicatorBubbleDiv");
        typingIndicatorBubbleDiv.style.display = isTyping ? "flex" : "none";
    }
    
    
    function initializeTypingListener() {
        if (!chattingWithUser || !uid) {
            console.warn("No private chat selected or uid is undefined.");
            return;
        }
    
        const typingRef = ref(database, `privateChat/${chattingWithUser}/typing/${uid}`);
        const otherTypingRef = ref(database, `privateChat/${chattingWithUser}/typing`);
    
        const privateChatMessageInput = document.getElementById("privateChatMessage");
        privateChatMessageInput.addEventListener("input", () => {
            set(typingRef, { isTyping: true, time: serverTimestamp() });
    
            setTimeout(() => {
                set(typingRef, { isTyping: false, time: serverTimestamp() });
            }, 3000);
        });
    
        onValue(otherTypingRef, (snapshot) => {
            const typingData = snapshot.val();
            const otherUserTyping = Object.entries(typingData || {}).some(
                ([userId, typing]) => userId !== uid && typing.isTyping
            );
            showTypingIndicator(otherUserTyping);
        });
    }
    

    // Initialize typing listener
    initializeTypingListener();
function displayPrivateMessage(privateMessageData) {
    if (!privateMessageData.message || privateMessageData.message.trim() === "") {
        console.warn("Empty message, skipping chat bubble creation.");
        return; // Do not display the chat bubble if the message is empty
    }
    

            

            let existingChatBubble = document.getElementById(privateMessageData.id);
            if (!existingChatBubble) { // Ensure no duplicate chat bubbles
                const privateChatBody = document.getElementById("privateChatBody");
                const privateChatBubble = document.createElement("div");
                privateChatBubble.className = "privateChatBubble";
                const privateChatBubbleTimeAndSeenRecieptDiv = document.createElement("div");
                privateChatBubbleTimeAndSeenRecieptDiv.className = "privateChatBubbleTimeAndSeenRecieptDiv";
                const privateChatBubbleText = document.createElement("div");
                privateChatBubbleText.className = "privateChatBubbleText";
                privateChatBubbleText.textContent = privateMessageData.message;
                privateChatBubbleText.id = privateMessageData.id; // Set the ID for the chat bubble
                const privateChatBubbleTime = document.createElement("div");
                privateChatBubbleTime.className = "privateChatBubbleTime";
                const time = new Date(privateMessageData.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                privateChatBubbleTime.textContent = time; // Format the time as needed
                const privateChatBubbleSeenReciept = document.createElement("div");
                privateChatBubbleSeenReciept.className = "privateChatBubbleSeenReciept";
                privateChatBubbleSeenReciept.innerHTML = `<i class="fa-solid fa-check"></i>`; // Add check icon for seen receipt
                privateChatBubble.appendChild(privateChatBubbleText);
                privateChatBubbleTimeAndSeenRecieptDiv.appendChild(privateChatBubbleSeenReciept); // Append seen receipt icon
                privateChatBubbleTimeAndSeenRecieptDiv.appendChild(privateChatBubbleTime); // Append time to the chat bubble
                privateChatBubble.appendChild(privateChatBubbleTimeAndSeenRecieptDiv); // Append time and seen receipt div to the chat bubble
                privateChatBody.appendChild(privateChatBubble);
                if (privateMessageData.uid === uid) {
                    privateChatBubble.classList.add("sent"); // Add class for sent messages
                } else {
                    privateChatBubble.classList.add("received"); // Add class for received messages
                }
                if (privateMessageData.uid !== uid) {
                    privateChatBubbleSeenReciept.style.display = "none"; // Hide seen receipt for received messages
                }
                privateChatBubbleTime.style.textAlign = "left"; // Align time to the left
                privateChatBubbleTime.style.marginTop = "5px"; // Add some spacing above the time

                onValue(ref(database, `privateChat/${chattingWithUser}/messages/${privateMessageData.id}`), (snapshot) => {
                    const messageData = snapshot.val();
                    if (messageData && messageData.uid && messageData.seen) {
                        privateChatBubbleSeenReciept.style.color = "red"; // Change color to red if seen
                    }
                });
                privateChatBody.scrollTop = privateChatBody.scrollHeight; // Scroll to the bottom
            }

            // Add seen functionality
            if (privateMessageData.uid !== uid) { // Only mark as seen if the message is not from the current user
                if (privateMessageData.seen && privateMessageData.seenBy && privateMessageData.timeSeen) {
                    console.log("Message already seen by user:", privateMessageData.seenBy);
                    return; // Exit if the message is already seen
                }
                const seenRef = ref(database, `privateChat/${chattingWithUser}/messages/${privateMessageData.id}`);
                const seenData = {
                    seen: true,
                    seenBy: uid,
                    timeSeen: serverTimestamp()
                };
                update(seenRef, seenData)
                    .then(() => {
                        console.log("Message marked as seen.");
                    })
                    .catch((error) => {
                        console.error("Error marking message as seen:", error);
                    });
            }
        
}

function alert() {
    if(chattingWithUser) {
        console.log("Chatting with user:", chattingWithUser);
    } else {
        console.log("No user selected for private chat.");
    }
}
alert();
function initializePrivateChatListener() {
    if (chattingWithUser) {
        const privateChatRef = ref(database, `privateChat/${chattingWithUser}/messages`);
        // Listen for new messages in real-time
        onChildAdded(privateChatRef, (snapshot) => {
            const privateMessageData = snapshot.val();
            displayPrivateMessage(privateMessageData);
            document.addEventListener("click", (event) => {
                if (event.target && event.target.id === "unBlockChat") {
                    const unblockRef = ref(database, `blocked-users/${uid}/${privateMessageData.uid}`);
                    remove(unblockRef).then(() => {
                        console.log("User unblocked successfully.");
                        const privateChatBarDiv = document.getElementById("privateChatBarDiv");
                        unBlock.style.setProperty("display", "none", "important"); // Hide the unblock button
                        block.style.setProperty("display", "flex", "important"); // Show the block button again
                        privateChatBlocked.style.display = "none"; // Show the blocked message
                        const privateChatBar = document.getElementById("privateChatBar");
                        privateChatBar.style.display = "flex"; // Hide the chat bar
                    }).catch((error) => {
                        console.error("Error unblocking user:", error);
                    });
                }
            });
        
            // Check if the current user is blocked
            const blockedRef = ref(database, `blocked-users/${privateMessageData.uid}/${uid}`);
            onValue(blockedRef, (snapshot) => {
                if (snapshot.exists()) {
                    console.log("You are blocked.");
                    const privateChatBar = document.getElementById("privateChatBar");
                    const privateChatBlocked = document.getElementById("privateChatBlocked");
                    const privateChatBlocked2 = document.getElementById("privateChatBlocked2");
                    privateChatBar.style.display = "none"; // Hide the chat bar
                    privateChatBlocked2.style.display = "flex"; // Show the blocked message
                    privateChatBlocked.style.display = "none"; // Show the blocked message
                } else {
                    console.log("You are not blocked.");
                    const privateChatBar = document.getElementById("privateChatBar");
                    const privateChatBlocked = document.getElementById("privateChatBlocked");
                    const privateChatBlocked2 = document.getElementById("privateChatBlocked2");
                    privateChatBar.style.display = "flex"; // Show the chat bar
                    privateChatBlocked.style.display = "none"; // Hide the blocked message
                    privateChatBlocked2.style.display = "none"; // Hide the blocked message
                }
            }, (error) => {
                console.error("Error checking if user is blocked:", error);
            });

            const checkIfIBlockedRef = ref(database, `blocked-users/${uid}/${privateMessageData.uid}`);
            get(checkIfIBlockedRef).then((snapshot) => {
                if (snapshot.exists()) {
                    console.log("You have blocked this user.");
                    const privateChatBar = document.getElementById("privateChatBar");
                    privateChatBar.style.display = "none"; // Hide the chat bar
                    const privateChatBlocked = document.getElementById("privateChatBlocked");
                    const privateChatBlocked2 = document.getElementById("privateChatBlocked2");
                    privateChatBlocked.style.display = "flex"; // Show the blocked message
                    privateChatBlocked2.style.display = "none"; // Show the blocked message
                }
            }).catch((error) => {
                console.error("Error checking if user is blocked:", error);
            });
        });
    } else {
        console.warn("chattingWithUser is not set. Unable to initialize private chat listener.");
    }
}
function loadChatList() {
    const privateChatRef = ref(database, `privateChat`);
    onValue(privateChatRef, (snapshot) => {
        if (snapshot.exists()) {
            const privateChats = snapshot.val();
            const chatList = Object.keys(privateChats).filter((chatKey) => chatKey.includes(uid));
            
            chatList.forEach((chatKey) => {
                const [uid1, uid2] = chatKey.split("CHAT");
                const otherUid = uid1 === uid ? uid2 : uid1;

                const userRef = ref(database, `users/${otherUid}`);
                get(userRef).then((userSnapshot) => {
                    if (userSnapshot.exists()) {
                        const userData = userSnapshot.val();
                        const { profilePic, name } = userData;

                        // Display the chat list item
                        const chatListDiv = document.getElementById("chatList");

                        // Check if the chat item already exists
                        let chatItem = document.querySelector(`.chatItem[data-chat-key="${chatKey}"]`);
                        if (!chatItem) {
                            chatItem = document.createElement("div");
                            chatItem.className = "chatItem";
                            chatItem.setAttribute("data-chat-key", chatKey); // Add a unique identifier

                            const chatProfilePic = document.createElement("img");
                            chatProfilePic.src = profilePic || "profile.png"; // Default image if none provided
                            chatProfilePic.className = "chatProfilePic";

                            const chatListNameAndStatusDiv = document.createElement("div");
                            chatListNameAndStatusDiv.className = "chatListNameAndStatusDiv";
                            const chatListName = document.createElement("div");
                            chatListName.className = "chatListName";
                            chatListName.textContent = name || "Unknown User"; // Default name if none provided

                            const chatListStatus = document.createElement("div");
                            chatListStatus.className = "chatListStatus";
                            chatListStatus.textContent = "Online"; // Placeholder for status

                            const chatListUnreadCount = document.createElement("div");
                            chatListUnreadCount.className = "chatListUnreadCount";
                            chatListUnreadCount.textContent = "0"; // Placeholder for unread count

                            const chatListMenu = document.createElement("div");
                            chatListMenu.className = "chatListMenu";
                            chatListMenu.innerHTML = `<i class="fa-solid fa-ellipsis-vertical"></i>`;

                            chatListMenu.addEventListener("click", (event) => {
                                event.stopPropagation(); // Prevent click event from bubbling up
                                chatListMenuPopUp.style.display = "flex"; // Show the menu
                            });

                            // Hide the menu when clicking outside
                            document.addEventListener("click", (event) => {
                                if (!chatListMenu.contains(event.target) && !chatListMenuPopUp.contains(event.target)) {
                                    chatListMenuPopUp.style.display = "none"; // Hide the menu
                                }
                            });

                            const chatListMenuPopUp = document.createElement("div");
                            chatListMenuPopUp.className = "chatListMenuPopUp";
                            chatListMenuPopUp.innerHTML = `
                                <div class="chatListMenuItem" id="chatListMenuDel">Delete</div>
                                <div class="chatListMenuItem" id="chatListMenuBlock">Block</div>
                                <div class="chatListMenuItem" id="chatListMenuReport">Report</div>
                            `;
                            chatListDiv.appendChild(chatListMenuPopUp);

                            chatItem.prepend(chatProfilePic);
                            chatListNameAndStatusDiv.appendChild(chatListName);
                            chatListNameAndStatusDiv.appendChild(chatListStatus);
                            chatListDiv.appendChild(chatItem);

                            chatItem.appendChild(chatListNameAndStatusDiv);
                            chatItem.appendChild(chatListUnreadCount);
                            chatItem.appendChild(chatListMenu);

                            function checkCountUnread(chatKey, chatListUnreadCount) {
                                const privateChatRef = ref(database, `privateChat/${chatKey}/messages`);
                                onValue(privateChatRef, (snapshot) => {
                                    if (snapshot.exists()) {
                                        const messages = snapshot.val();
                                        let unreadCount = 0;

                                        Object.values(messages).forEach((message) => {
                                            if (message.uid !== uid && (!message.seen || message.seenBy !== uid)) {
                                                unreadCount++;
                                            }
                                        });
                                        chatListUnreadCount.style.display = "flex"; // Show the count
                                        if (unreadCount > 0) {
                                            chatListUnreadCount.textContent = unreadCount;
                                            chatListUnreadCount.style.visibility = "visible"; // Show the count
                                        } else {
                                            chatListUnreadCount.textContent = "";
                                            chatListUnreadCount.style.visibility = "hidden"; // Hide the count
                                        }
                                    } else {
                                        chatListUnreadCount.style.display = "none"; // Hide the count if no messages
                                    }
                                });
                            }

                            checkCountUnread(chatKey, chatListUnreadCount);

                            // Add click event to open the private chat
                            chatItem.addEventListener("click", () => {
                                chattingWithUser = chatKey;
                                privateChatDivCon.style.display = "flex";
                                privateChatDivCon.classList.add("openPrivateChatDivAnimation");
                                const privateChatBody = document.getElementById("privateChatBody");
                                privateChatBody.innerHTML = ""; // Clear previous chat messages
                                const openChat = document.getElementById("openChat");
                                const privateChatWindow = document.getElementById("privateChatWindow");
                                privateChatBody.innerHTML = ""; // Clear previous chat messages
                                privateChatWindow.style.display = "flex";
                                openChat.style.display = "none";
                                loadPrivateChatData();
                            });
                        }

                        // Update the last message and sort the chat list
                        const privateChatRef = ref(database, `privateChat/${chatKey}/messages`);
                        onValue(privateChatRef, (snapshot) => {
                            if (snapshot.exists()) {
                                const messages = Object.values(snapshot.val());
                                const lastMessage = messages[messages.length - 1];
                                if (lastMessage) {
                                    chatItem.setAttribute("data-last-message-time", lastMessage.time || 0);
                                    chatListDiv.appendChild(chatItem); // Re-append to sort
                                    Array.from(chatListDiv.children)
                                        .sort((a, b) => {
                                            const timeA = parseInt(a.getAttribute("data-last-message-time") || "0");
                                            const timeB = parseInt(b.getAttribute("data-last-message-time") || "0");
                                            return timeB - timeA; // Sort descending by last message time
                                        })
                                        .forEach((child) => chatListDiv.appendChild(child));
                                }
                            }
                        });
                    }
                }).catch((error) => {
                    console.error("Error fetching user data:", error);
                });
            });
        } else {
            console.log("No private chats found for this user.");
        }
    }, (error) => {
        console.error("Error fetching private chats:", error);
    });
}

const chatDiv = document.getElementById("chatDiv");
chatDiv.addEventListener("click", () => {
    const privateChatDivCon = document.getElementById("privateChatDivCon");
    privateChatDivCon.style.display = "flex";
    loadChatList(); // Load chat list when opening the chat
    privateChatDivCon.classList.add("openPrivateChatDivAnimation");
    const openChat = document.getElementById("openChat");
    openChat.style.display = "flex"; 
    const privateChatWindow = document.getElementById("privateChatWindow");
    privateChatWindow.style.display = "none"; // Hide the private chat window
});

const privateChatSendDiv = document.getElementById("privateChatSendDiv");
privateChatSendDiv.addEventListener("click", sendPrivateMessage);

const profileScreenDivCon = document.getElementById("profileScreenDivCon");
const profileDiv = document.getElementById("profileDiv");
profileDiv.addEventListener("click", () => {
    profileScreenDivCon.style.display = "flex";
    console.log("the buttun is clicked");
    fetchUserProfileData();
});

const profileScreenCloseBtn = document.getElementById("profileScreenCloseBtn");
profileScreenCloseBtn.addEventListener("click", () => {
    profileScreenDivCon.style.display = "none";
});

function fetchUserProfileData() {
    const userRef = ref(database, `users/${uid}`);
    onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            const { profilePic, name, account } = userData;

            const ranks = {
                "cool": { img: "img/cool.png", color: "blue" },
                "vip": { img: "img/vip.png", color: "lightgreen" },
                "svip": { img: "img/svip.png", color: "gold" },
                "elite": { img: "img/elite.png", color: "#6a0dad" },
                "champion": { img: "img/champion.png", color: "#4169E1" },
                "icon": { img: "img/icon.png", color: "#DC143C" },
                "legend": { img: "img/legend.png", color: "#4169E1" },
                "royal": { img: "img/royal.png", color: "#4B0082" },
                "guardian": { img: "img/guardian.png", color: "#008B8B" },
                "sentinel": { img: "img/sentinel.png", color: "#4682B4" },
                "overseer": { img: "img/overseer.png", color: "#4B0082" },
                "enforcer": { img: "img/enforcer.png", color: "#DC143C" },
                "inspector": { img: "img/inspector.png", color: "#008080" },
                "moderator": { img: "img/moderator.png", color: "#00796B" },
                "admin": { img: "img/admin.png", color: "#B71C1C" },
                "co-owner": { img: "img/co-owner.png", color: "#4169E1" },
                "owner": { img: "img/owner.png", color: "#DC143C" },
                "emperor": { img: "img/emperor.png", color: "#FFD700" },
                "mvp": { img: "img/mvp.png", color: "#DC143C" }
            };

            document.getElementById("userProfilePic").src = profilePic || "profile.png"; // Default image if none provided
            document.getElementById("userName").textContent = name || "Unknown User"; // Default name if none provided
            document.getElementById("userCoverPhoto").src = userData.coverImg || "https://www.w3schools.com/w3images/avatar2.png"; // Default cover photo if none provided
            const userRankText = document.getElementById("userRankText");
            userRankText.textContent = account || "Unknown Rank"; // Default account if none provided

            const userRank = document.getElementById("userRank");
            const userRankImg = document.getElementById("userRankImg");
            userRankImg.src = ranks[account.toLowerCase()] ? ranks[account.toLowerCase()].img : "img/user.png"; // Default image if rank not found

            if (account && ranks[account.toLowerCase()]) {
                userRank.style.backgroundColor = ranks[account.toLowerCase()].color;
            } else {
                userRank.style.backgroundColor = "red"; // Default background color
            }
        } else {
            console.warn("User data not found for UID:", uid);
        }
    }, (error) => {
        console.error("Error fetching user data:", error);
    });
}
const uploadCoverPhotoIcon = document.getElementById("uploadCoverPhotoIcon");
uploadCoverPhotoIcon.addEventListener("click", () => {
    const coverPhotoInput = document.createElement("input");
    coverPhotoInput.type = "file";
    coverPhotoInput.accept = "image/*"; // Accept only image files
    coverPhotoInput.click(); // Trigger the file input click

    coverPhotoInput.addEventListener("change", async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const storagePath = `users/${uid}/coverPhoto/${file.name}`;
        const fileRef = storageRef(storage, storagePath);

        try {
            // Upload the file to Firebase Storage
            const snapshot = await uploadBytes(fileRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            // Update the user's cover photo URL in the database
            const userRef = ref(database, `users/${uid}`);
            await update(userRef, { coverImg: downloadURL });

            alert("Cover photo updated successfully!");
        } catch (error) {
            console.error("Error uploading cover photo:", error);
            alert("Failed to upload cover photo. Please try again.");
        }
    });
});
const privateChatVideoCallIcon = document.getElementById("privateChatVideoCallIcon");
const videoCallConDiv = document.getElementById("videoCallConDiv");
const callingDivCon = document.getElementById("callingDivCon");
privateChatVideoCallIcon.addEventListener("click", () => {
    if (!chattingWithUser) {
        console.warn("No private chat selected.");
        return;
    }
    callingDivCon.style.display = "flex"; // Show the calling screen
    sendCallRequest();
});
const videoCancelBtn = document.getElementById("videoCancelBtn");
videoCancelBtn.addEventListener("click", () => {
    videoCallConDiv.style.display = "none";
});
function sendCallRequest() {
    if (!chattingWithUser) {
        console.warn("No private chat selected.");
        return;
    }

    const callRequestRef = push(ref(database, `privateChat/${chattingWithUser}/callRequests`));
    const callRequestData = {
        uid: uid,
        time: serverTimestamp(),
        status: "pending",
        id: callRequestRef.key
    };

    set(callRequestRef, callRequestData)
        .then(() => {
            console.log("Call request sent successfully.");
        })
        .catch((error) => {
            console.error("Error sending call request:", error);
        });
    // Listen for call request status changes
    onChildAdded(callRequestRef, (snapshot) => {
        const callRequestData = snapshot.val();
        if (callRequestData.status === "accepted") {
            // Handle accepted call request
            console.log("Call request accepted:", callRequestData);
            callingDivCon.style.display = "none"; // Hide the calling screen
            inCall();
            // Start the video call here
        } else if (callRequestData.status === "rejected") {
            // Handle rejected call request
            console.log("Call request rejected:", callRequestData);
            callingDivCon.style.display = "none"; // Hide the video call confirmation screen
        }
    });
}
function acceptCallRequest() {
    const privateChatRef = ref(database, `privateChat`);
    onValue(privateChatRef, (snapshot) => {
        
    
    }, (error) => {
        console.error("Error fetching private chats:", error);
    });
}
acceptCallRequest();
function checkNewMessage() {
    const privateChatRef = ref(database, `privateChat`);
    const newMessageDiv = document.getElementById("newMessageDiv");

    if (!newMessageDiv) {
        console.error("Element with ID 'newMessageDiv' not found in the DOM.");
        return;
    }

    if (!uid) {
        console.error("UID is undefined. Ensure the user is authenticated.");
        return;
    }

    onValue(privateChatRef, (snapshot) => {
        if (!snapshot.exists()) {
            newMessageDiv.style.display = "none";
            return;
        }

        const privateChats = snapshot.val();
        const chatKeys = Object.keys(privateChats).filter((key) => key.includes(uid));

        let newMessageFound = false;
        let checksRemaining = chatKeys.length;

        chatKeys.forEach((chatKey) => {
            const messagesRef = ref(database, `privateChat/${chatKey}/messages`);
            get(messagesRef).then((messagesSnapshot) => {
                if (messagesSnapshot.exists()) {
                    const messages = messagesSnapshot.val();
                    const hasNew = Object.values(messages).some((msg) =>
                        msg.uid !== uid && (!msg.seen || msg.seen === false)
                    );

                    if (hasNew) {
                        newMessageFound = true;
                    }
                }

                checksRemaining--;

                if (checksRemaining === 0) {
                    newMessageDiv.style.display = newMessageFound ? "flex" : "none";
                }
            }).catch((error) => {
                console.error(`Error fetching messages for ${chatKey}:`, error);
                checksRemaining--;
                if (checksRemaining === 0 && !newMessageFound) {
                    newMessageDiv.style.display = "none";
                }
            });
        });

        if (chatKeys.length === 0) {
            newMessageDiv.style.display = "none";
        }
    }, (error) => {
        console.error("Error fetching private chats:", error);
    });
}
checkNewMessage();

// Ensure messages are marked as seen when the chat is opened
function markMessagesAsSeen(chatKey) {
    const messagesRef = ref(database, `privateChat/${chatKey}/messages`);
    get(messagesRef).then((snapshot) => {
        if (snapshot.exists()) {
            const messages = snapshot.val();
            Object.keys(messages).forEach((messageId) => {
                const message = messages[messageId];
                if (message.uid !== uid && (!message.seen || (message.seenBy && !message.seenBy.includes(uid)))) {
                    const messageRef = ref(database, `privateChat/${chatKey}/messages/${messageId}`);
                    update(messageRef, {
                        seen: true,
                        seenBy: message.seenBy ? [...message.seenBy, uid] : [uid],
                        timeSeen: serverTimestamp()
                    });
                }
            });
        }
    });
}
// Wallet screen functionality
const walletScreenDivCon = document.getElementById("walletScreenDivCon");
const walletScreenCloseBtn = document.getElementById("walletScreenCloseBtn");
const diamondAmt = document.getElementById("diamondAmt");
const coinAmt = document.getElementById("coinAmt");
const sendCoinBtn = document.getElementById("sendCoinBtn");
const sendDiamondBtn = document.getElementById("sendDiamondBtn");
const sendCoinDiv = document.getElementById("sendCoinDiv");
const sendDiamondDiv = document.getElementById("sendDiamondDiv");
const sendCoinBtn2 = document.getElementById("sendCoinBtn2");
const sendDiamondBtn2 = document.getElementById("sendDiamondBtn2");
const coinInput = document.getElementById("coinInput");
const diamondInput = document.getElementById("diamondInput");
const userNameOrUid = document.getElementById("userNameOrUid");
const userNameOrUidDiamond = document.getElementById("userNameOrUidDiamond");
const insufficientFundsDiv = document.getElementById("insufficientFundsDiv");
const insufficientFundsDiamondDiv = document.getElementById("insufficientFundsDiamondDiv");
const sentSuccessfullyDiv = document.getElementById("sentSuccessfullyDiv");
const sentSuccessfullyDiamondDiv = document.getElementById("sentSuccessfullyDiamondDiv");
const sendCoinErrorDiv = document.getElementById("sendCoinErrorDiv");
const sendDiamondErrorDiv = document.getElementById("sendDiamondErrorDiv");

// Open wallet screen
const walletDiv = document.getElementById("walletDiv"); // Assuming you have a button or div to open the wallet
walletDiv.addEventListener("click", () => {
    walletScreenDivCon.style.display = "flex";
    fetchWalletData(); // Fetch coin and diamond data when opening the wallet
});

// Close wallet screen
walletScreenCloseBtn.addEventListener("click", () => {
    walletScreenDivCon.style.display = "none";
});

// Fetch coin and diamond data from Firebase
function fetchWalletData() {
    const userRef = ref(database, `users/${uid}`);
    onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            diamondAmt.textContent = userData.diamond || 0; // Display diamond amount
            coinAmt.textContent = userData.coin || 0; // Display coin amount
        } else {
            console.warn("User data not found for UID:", uid);
        }
    }, (error) => {
        console.error("Error fetching wallet data:", error);
    });
}
const sendCoinPopUpCloseBtn = document.getElementById("sendCoinPopUpCloseBtn");
const sendDiamondPopUpCloseBtn = document.getElementById("sendDiamondPopUpCloseBtn");

// Open send coin popup
sendCoinBtn.addEventListener("click", () => {
    sendCoinDiv.style.display = "flex";
    insufficientFundsDiv.style.display = "none";
    sentSuccessfullyDiv.style.display = "none";
    sendCoinErrorDiv.style.display = "none";
    coinInput.value = "";
    userNameOrUid.value = "";
});

// Open send diamond popup
sendDiamondBtn.addEventListener("click", () => {
    sendDiamondDiv.style.display = "flex";
    insufficientFundsDiamondDiv.style.display = "none";
    sentSuccessfullyDiamondDiv.style.display = "none";
    sendDiamondErrorDiv.style.display = "none";
    diamondInput.value = "";
    userNameOrUidDiamond.value = "";
});

sendCoinPopUpCloseBtn.addEventListener("click", () => {
    sendCoinDiv.style.display = "none";
});

sendDiamondPopUpCloseBtn.addEventListener("click", () => {
    sendDiamondDiv.style.display = "none";
});

// Handle send coin functionality
sendCoinBtn2.addEventListener("click", () => {
    const coinAmount = parseInt(coinInput.value, 10);
    const recipient = userNameOrUid.value.trim();

    if (!coinAmount || coinAmount <= 0 || !recipient) {
        alert("Please enter a valid amount and recipient.");
        return;
    }

    const userRef = ref(database, `users/${uid}`);
    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            const currentCoins = userData.coin || 0;

            if (coinAmount > currentCoins) {
                insufficientFundsDiv.style.display = "flex";
                sentSuccessfullyDiv.style.display = "none";
                sendCoinErrorDiv.style.display = "none";
                return;
            }

            // Check if recipient is a UID or a username
            const recipientRef = ref(database, `users`);
            get(recipientRef).then((allUsersSnapshot) => {
                if (allUsersSnapshot.exists()) {
                    const allUsers = allUsersSnapshot.val();
                    let recipientUid = null;

                    // Check if the recipient matches a username
                    for (const key in allUsers) {
                        if (allUsers[key].name && allUsers[key].name.toLowerCase() === recipient.toLowerCase()) {
                            recipientUid = key;
                            break;
                        }
                    }

                    // If recipient is not found by username, assume it's a UID
                    if (!recipientUid) {
                        recipientUid = recipient;
                    }

                    // Validate recipient UID
                    if (!allUsers[recipientUid]) {
                        console.warn("Recipient not found.");
                        sendCoinErrorDiv.style.display = "flex";
                        insufficientFundsDiv.style.display = "none";
                        sentSuccessfullyDiv.style.display = "none";
                        return;
                    }

                    // Deduct coins from sender
                    update(userRef, { coin: currentCoins - coinAmount })
                        .then(() => {
                            // Add coins to recipient
                            const recipientUserRef = ref(database, `users/${recipientUid}`);
                            const recipientData = allUsers[recipientUid];
                            const recipientCoins = recipientData.coin || 0;

                            update(recipientUserRef, { coin: recipientCoins + coinAmount })
                                .then(() => {
                                    sentSuccessfullyDiv.style.display = "flex";
                                    insufficientFundsDiv.style.display = "none";
                                    sendCoinErrorDiv.style.display = "none";
                                    sendNotificattion(uid, "Coins Sent", `You have received ${coinAmount} coins from ${userData.name || "Unknown User"}.`, "coin", recipientUid);
                                })
                                .catch((error) => {
                                    console.error("Error updating recipient coins:", error);
                                    sendCoinErrorDiv.style.display = "flex";
                                    insufficientFundsDiv.style.display = "none";
                                    sentSuccessfullyDiv.style.display = "none";
                                });
                        })
                        .catch((error) => {
                            console.error("Error deducting sender coins:", error);
                            sendCoinErrorDiv.style.display = "flex";
                            insufficientFundsDiv.style.display = "none";
                            sentSuccessfullyDiv.style.display = "none";
                        });
                } else {
                    console.warn("No users found.");
                    sendCoinErrorDiv.style.display = "flex";
                    insufficientFundsDiv.style.display = "none";
                    sentSuccessfullyDiv.style.display = "none";
                }
            });
        } else {
            console.warn("User data not found for UID:", uid);
        }
    });
});

// Handle send diamond functionality
sendDiamondBtn2.addEventListener("click", () => {
    const diamondAmount = parseInt(diamondInput.value, 10);
    const recipient = userNameOrUidDiamond.value.trim();

    if (!diamondAmount || diamondAmount <= 0 || !recipient) {
        alert("Please enter a valid amount and recipient.");
        return;
    }

    const userRef = ref(database, `users/${uid}`);
    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            const currentDiamonds = userData.diamond || 0;

            if (diamondAmount > currentDiamonds) {
                insufficientFundsDiamondDiv.style.display = "flex";
                sentSuccessfullyDiamondDiv.style.display = "none";
                sendDiamondErrorDiv.style.display = "none";
                return;
            }

            // Check if recipient is a UID or a username
            const recipientRef = ref(database, `users`);
            get(recipientRef).then((allUsersSnapshot) => {
                if (allUsersSnapshot.exists()) {
                    const allUsers = allUsersSnapshot.val();
                    let recipientUid = null;

                    // Check if the recipient matches a username
                    for (const key in allUsers) {
                        if (allUsers[key].name && allUsers[key].name.toLowerCase() === recipient.toLowerCase()) {
                            recipientUid = key;
                            break;
                        }
                    }

                    // If recipient is not found by username, assume it's a UID
                    if (!recipientUid) {
                        recipientUid = recipient;
                    }

                    // Validate recipient UID
                    if (!allUsers[recipientUid]) {
                        console.warn("Recipient not found.");
                        sendDiamondErrorDiv.style.display = "flex";
                        insufficientFundsDiamondDiv.style.display = "none";
                        sentSuccessfullyDiamondDiv.style.display = "none";
                        return;
                    }

                    // Deduct diamonds from sender
                    update(userRef, { diamond: currentDiamonds - diamondAmount })
                        .then(() => {
                            // Add diamonds to recipient
                            const recipientUserRef = ref(database, `users/${recipientUid}`);
                            const recipientData = allUsers[recipientUid];
                            const recipientDiamonds = recipientData.diamond || 0;

                            update(recipientUserRef, { diamond: recipientDiamonds + diamondAmount })
                                .then(() => {
                                    sentSuccessfullyDiamondDiv.style.display = "flex";
                                    insufficientFundsDiamondDiv.style.display = "none";
                                    sendDiamondErrorDiv.style.display = "none";
                                    sendNotificattion(uid, "Diamond Sent", `You have received ${diamondAmount} diamonds from ${userData.name || "Unknown User"}.`, "diamond", recipientUid);
                                })
                                .catch((error) => {
                                    console.error("Error updating recipient diamonds:", error);
                                    sendDiamondErrorDiv.style.display = "flex";
                                    insufficientFundsDiamondDiv.style.display = "none";
                                    sentSuccessfullyDiamondDiv.style.display = "none";
                                });
                        })
                        .catch((error) => {
                            console.error("Error deducting sender diamonds:", error);
                            sendDiamondErrorDiv.style.display = "flex";
                            insufficientFundsDiamondDiv.style.display = "none";
                            sentSuccessfullyDiamondDiv.style.display = "none";
                        });
                } else {
                    console.warn("No users found.");
                    sendDiamondErrorDiv.style.display = "flex";
                    insufficientFundsDiamondDiv.style.display = "none";
                    sentSuccessfullyDiamondDiv.style.display = "none";
                }
            });
        } else {
            console.warn("User data not found for UID:", uid);
        }
    });
});

// Close send coin popup
document.getElementById("sendCoinPopUpDiv").addEventListener("click", (event) => {
    if (event.target.id === "sendCoinPopUpDiv") {
        sendCoinDiv.style.display = "none";
    }
});

// Close send diamond popup
document.getElementById("sendDiamondPopUpDiv").addEventListener("click", (event) => {
    if (event.target.id === "sendDiamondPopUpDiv") {
        sendDiamondDiv.style.display = "none";
    }
});


const editProfileDiv = document.getElementById("editProfileDiv");
const editProfileScreenDivCon = document.getElementById("editProfileScreenDivCon");

editProfileDiv.addEventListener("click", () => {
    editProfileScreenDivCon.style.display = "flex";
    fetchProfileUserData(); // Fetch user data when opening the edit profile screen
});

const editProfileScreenBackBtn = document.getElementById("editProfileScreenBackBtn");

editProfileScreenBackBtn.addEventListener("click", () => {
    editProfileScreenDivCon.style.display = "none";
});

// Function to fetch user profile data
function fetchProfileUserData() {
    const userRef = ref(database, `users/${uid}`);
    onValue(userRef, (snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            const { profilePic, coverImg, name, like, rating, followers } = userData;

            document.getElementById("editProfilePic").src = profilePic || "img/profile.png";
            document.getElementById("editProfileCoverImg").src = coverImg || "https://www.w3schools.com/w3images/avatar2.png";
            document.getElementById("editProfileName").textContent = name || "--";
            document.getElementById("likeAmt").textContent = like || 0;
            document.getElementById("ratingAmt").textContent = rating || 0;
            document.getElementById("followersAmt").textContent = followers || 0;
        } else {
            console.warn("User data not found for UID:", uid);
        }
    }, (error) => {
        console.error("Error fetching user profile data:", error);
    });
}

// Upload cover image
const editProfileUploadCoverImgIcon = document.getElementById("editProfileUploadCoverImgIcon");
editProfileUploadCoverImgIcon.addEventListener("click", () => {
    const coverPhotoInput = document.createElement("input");
    coverPhotoInput.type = "file";
    coverPhotoInput.accept = "image/*";
    coverPhotoInput.click();

    coverPhotoInput.addEventListener("change", async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const storagePath = `users/${uid}/coverPhoto/${file.name}`;
        const fileRef = storageRef(storage, storagePath);

        try {
            const snapshot = await uploadBytes(fileRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            const userRef = ref(database, `users/${uid}`);
            await update(userRef, { coverImg: downloadURL });

            alert("Cover photo updated successfully!");
        } catch (error) {
            console.error("Error uploading cover photo:", error);
            alert("Failed to upload cover photo. Please try again.");
        }
    });
});

// Upload profile picture
const editProfilePicUploadIcon = document.getElementById("editProfilePicUploadIcon");
editProfilePicUploadIcon.addEventListener("click", () => {
    const profilePicInput = document.createElement("input");
    profilePicInput.type = "file";
    profilePicInput.accept = "image/*";
    profilePicInput.click();

    profilePicInput.addEventListener("change", async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const storagePath = `users/${uid}/profilePic/${file.name}`;
        const fileRef = storageRef(storage, storagePath);

        try {
            const snapshot = await uploadBytes(fileRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            const userRef = ref(database, `users/${uid}`);
            await update(userRef, { profilePic: downloadURL });

            alert("Profile picture updated successfully!");
        } catch (error) {
            console.error("Error uploading profile picture:", error);
            alert("Failed to upload profile picture. Please try again.");
        }
    });
});

// Delete profile picture
const editProfilePicDeleteImage = document.getElementById("editProfilePicDeleteImage");
editProfilePicDeleteImage.addEventListener("click", async () => {
    const userRef = ref(database, `users/${uid}`);
    try {
        await update(userRef, { profilePic: null });
        document.getElementById("editProfilePic").src = "img/profile.png";
        alert("Profile picture deleted successfully!");
    } catch (error) {
        console.error("Error deleting profile picture:", error);
        alert("Failed to delete profile picture. Please try again.");
    }
});

// Switch menu functionality
const editMenuItems = document.querySelectorAll(".editMenu");
const accountDivCon = document.getElementById("accountDivCon");
const giftsDivCon = document.getElementById("giftsDivCon");
const moreDivCon = document.getElementById("moreDivCon");

editMenuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", () => {
        editMenuItems.forEach((item) => item.classList.remove("active"));
        menuItem.classList.add("active");

        accountDivCon.style.display = "none";
        giftsDivCon.style.display = "none";
        moreDivCon.style.display = "none";

        if (menuItem.id === "account") {
            accountDivCon.style.display = "block";
        } else if (menuItem.id === "gifts") {
            giftsDivCon.style.display = "block";
        } else if (menuItem.id === "more") {
            moreDivCon.style.display = "block";
        }
    });
});
const editInfoDiv = document.getElementById("editInfoDiv");
const editInfoScreenDivCon = document.getElementById("editInfoScreenDivCon");

editInfoDiv.addEventListener("click", () => {
    editInfoScreenDivCon.style.display = "flex";
    fetchEditInfoUserData(); // Fetch user data when opening the edit info screen
});

const editInfoScreenBackBtn = document.getElementById("editInfoScreenBackBtn");
editInfoScreenBackBtn.addEventListener("click", () => {
    editInfoScreenDivCon.style.display = "none";
});
const ageDropDownDivCon = document.getElementById("ageMenuDropDownDiv");
const ageDropDownDiv = document.getElementById("ageDropDownDiv");
const ageText = document.getElementById("ageText");
const ageList = document.getElementById("ageMenuDropDown");

const genderDropDownDivCon = document.getElementById("genderMenuDropDownDiv");
const genderDropDownDiv = document.getElementById("genderDropDownDiv");
const genderText = document.getElementById("genderText");
const genderList = document.getElementById("genderMenuDropDown");

ageDropDownDiv.addEventListener("click", () => {
    ageDropDownDivCon.style.display = "flex";
});

ageList.addEventListener("click", (event) => {
    if (event.target.classList.contains("ageOption")) {
        ageText.textContent = event.target.dataset.age;
        ageDropDownDivCon.style.display = "none";
    }
});

genderDropDownDiv.addEventListener("click", () => {
    genderDropDownDivCon.style.display = "flex";
});

genderList.addEventListener("click", (event) => {
    if (event.target.classList.contains("genderOption")) {
        genderText.textContent = event.target.dataset.gender;
        genderDropDownDivCon.style.display = "none";
    }
});

document.addEventListener("click", (event) => {
    if (!ageDropDownDiv.contains(event.target) && !ageDropDownDivCon.contains(event.target)) {
        ageDropDownDivCon.style.display = "none";
    }
    if (!genderDropDownDiv.contains(event.target) && !genderDropDownDivCon.contains(event.target)) {
        genderDropDownDivCon.style.display = "none";
    }
});

const ageDiv = document.getElementById("ageDiv");
ageDiv.addEventListener("click", () => {
    ageDropDownDivCon.style.display = "flex";
});

const saveInfo = document.getElementById("saveInfo");
saveInfo.addEventListener("click", () => {
    const age = ageText.textContent.trim();
    const gender = genderText.textContent.trim();

    if (!age || !gender) {
        alert("Please select both age and gender.");
        return;
    }

    const userRef = ref(database, `users/${uid}`);
    update(userRef, { age, gender })
        .then(() => {
            alert("Info updated successfully!");
            editInfoScreenDivCon.style.display = "none";
        })
        .catch((error) => {
            console.error("Error updating info:", error);
            alert("Failed to update info. Please try again.");
        });
});

function fetchEditInfoUserData() {
    const userRef = ref(database, `users/${uid}`);
    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            ageText.textContent = userData.age || "Select Age";
            genderText.textContent = userData.gender || "Select Gender";
        } else {
            console.warn("User data not found for UID:", uid);
        }
    }).catch((error) => {
        console.error("Error fetching user data:", error);
    });
}
const editAboutMe = document.getElementById("editAboutMe");
const editAbouMeScreenDivCon = document.getElementById("editAbouMeScreenDivCon");
const editAbouMeScreenBackBtn = document.getElementById("editAbouMeScreenBackBtn");
const saveAboutMe = document.getElementById("saveAboutMe");
const editAboutMeTextArea = document.getElementById("editAboutMeTextArea");

editAboutMe.addEventListener("click", () => {
    editAbouMeScreenDivCon.style.display = "flex";
    fetchEditAboutMeUserData(); // Fetch user data when opening the edit about me screen
});

editAbouMeScreenBackBtn.addEventListener("click", () => {
    editAbouMeScreenDivCon.style.display = "none";
});

saveAboutMe.addEventListener("click", () => {
    const aboutMeText = editAboutMeTextArea.value.trim();
    if (!aboutMeText) {
        alert("Please enter something about yourself.");
        return;
    }

    const userRef = ref(database, `users/${uid}`);
    update(userRef, { aboutMe: aboutMeText })
        .then(() => {
            alert("About Me updated successfully!");
            editAbouMeScreenDivCon.style.display = "none";
        })
        .catch((error) => {
            console.error("Error updating About Me:", error);
            alert("Failed to update About Me. Please try again.");
        });
});

function fetchEditAboutMeUserData() {
    const userRef = ref(database, `users/${uid}`);
    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            editAboutMeTextArea.value = userData.aboutMe || ""; // Populate the textarea with existing data
        } else {
            console.warn("User data not found for UID:", uid);
        }
    }).catch((error) => {
        console.error("Error fetching About Me data:", error);
    });
}
const editMood = document.getElementById("editMood");
const editMoodScreenDivCon = document.getElementById("editMoodScreenDivCon");
const editMoodScreenBackBtn = document.getElementById("editMoodScreenBackBtn");
const saveMood = document.getElementById("saveMood");
const editMoodTextArea = document.getElementById("editMoodTextArea");

editMood.addEventListener("click", () => {
    editMoodScreenDivCon.style.display = "flex";
    fetchEditMoodUserData(); // Fetch user data when opening the edit mood screen
});

editMoodScreenBackBtn.addEventListener("click", () => {
    editMoodScreenDivCon.style.display = "none";
});

saveMood.addEventListener("click", () => {
    const moodText = editMoodTextArea.value.trim();
    if (!moodText) {
        alert("Please enter your mood.");
        return;
    }

    const userRef = ref(database, `users/${uid}`);
    update(userRef, { mood: moodText })
        .then(() => {
            alert("Mood updated successfully!");
            editMoodScreenDivCon.style.display = "none";
        })
        .catch((error) => {
            console.error("Error updating mood:", error);
            alert("Failed to update mood. Please try again.");
        });
});

function fetchEditMoodUserData() {
    const userRef = ref(database, `users/${uid}`);
    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            editMoodTextArea.value = userData.mood || ""; // Populate the textarea with existing data
        } else {
            console.warn("User data not found for UID:", uid);
        }
    }).catch((error) => {
        console.error("Error fetching mood data:", error);
    });
}
const editUserName = document.getElementById("editUserName");
const editUserNameScreenDivCon = document.getElementById("editUserNameScreenDivCon");
const editUserNameScreenBackBtn = document.getElementById("editUserNameScreenBackBtn");
const saveUserName = document.getElementById("saveUserName");
const editUserNameInput = document.getElementById("editUserNameInput");

editUserName.addEventListener("click", () => {
    editUserNameScreenDivCon.style.display = "flex";
    fetchEditUserNameUserData(); // Fetch user data when opening the edit username screen
});

editUserNameScreenBackBtn.addEventListener("click", () => {
    editUserNameScreenDivCon.style.display = "none";
});

saveUserName.addEventListener("click", () => {
    const newUserName = editUserNameInput.value.trim();
    if (!newUserName) {
        alert("Please enter a valid username.");
        return;
    }

    const userRef = ref(database, `users/${uid}`);
    update(userRef, { name: newUserName })
        .then(() => {
            alert("Username updated successfully!");
            editUserNameScreenDivCon.style.display = "none";
            sendNotificattion(uid, "Username Changed", `Your username has been successfully updated to ${newUserName}.`, "changeUserName", uid);

        })
        .catch((error) => {
            console.error("Error updating username:", error);
            alert("Failed to update username. Please try again.");
        });
});

function fetchEditUserNameUserData() {
    const userRef = ref(database, `users/${uid}`);
    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            editUserNameInput.value = userData.name || ""; // Populate the input with existing username
        } else {
            console.warn("User data not found for UID:", uid);
        }
    }).catch((error) => {
        console.error("Error fetching username data:", error);
    });
}
const textColor = document.getElementById("textColor");
const textColorScreenDivCon = document.getElementById("textColorScreenDivCon");
const textColorScreenBackBtn = document.getElementById("textColorScreenBackBtn");
const saveTextColor = document.getElementById("saveTextColor");
const sampleText = document.getElementById("sampleText");

let selectedTextColor = null;
let selectedNeonColor = null;
let selectedFontType = null;
let selectedFontStyle = null;
let selectedGradientColor = null;

textColor.addEventListener("click", () => {
    textColorScreenDivCon.style.display = "flex";
});

textColorScreenBackBtn.addEventListener("click", () => {
    textColorScreenDivCon.style.display = "none";
});

// Functionality for fontColorDiv
const fontColorDiv = document.getElementById("fontColorDiv");

fontColorDiv.addEventListener("click", (event) => {
    if (event.target.id) {
        selectedTextColor = event.target.id;
        sampleText.style.color = selectedTextColor;
    }
});

// Functionality for neonColorDiv
const neonColorDiv = document.getElementById("neonColorDiv");

neonColorDiv.addEventListener("click", (event) => {
    if (event.target.id) {
        selectedNeonColor = event.target.id;
        sampleText.style.textShadow = `0 0 5px ${selectedNeonColor}, 0 0 10px ${selectedNeonColor}, 0 0 20px ${selectedNeonColor}`;

        // Remove active class from all check marks
        document.querySelectorAll("#neonColorDiv .fas").forEach((checkMark) => {
            checkMark.style.display = "none";
        });

        // Show the check mark for the selected color
        const activeCheckMark = event.target.querySelector(".fas");
        if (activeCheckMark) {
            activeCheckMark.style.display = "flex";
        }
    }
});

// Functionality for fontTypeDiv
const fontTypeDropDownDiv = document.getElementById("fontTypeDropDownDiv");
const fontTypeDropDown = document.getElementById("fontTypeDropDown");

fontTypeDropDownDiv.addEventListener("click", () => {
    fontTypeDropDown.style.display = fontTypeDropDown.style.display === "flex" ? "none" : "flex";
});

fontTypeDropDown.addEventListener("click", (event) => {
    if (event.target.classList.contains("fontTypeOption")) {
        selectedFontType = event.target.dataset.font;
        sampleText.style.fontFamily = selectedFontType;
        fontTypeDropDown.style.display = "none";
    }
});

// Functionality for fontStyleDiv
const fontStyleDropDownDiv = document.getElementById("fontStyleDropDownDiv");
const fontStyleDropDown = document.getElementById("fontStyleDropDown");

fontStyleDropDownDiv.addEventListener("click", () => {
    fontStyleDropDown.style.display = fontStyleDropDown.style.display === "flex" ? "none" : "flex";
});

fontStyleDropDown.addEventListener("click", (event) => {
    if (event.target.classList.contains("fontStyleOption")) {
        selectedFontStyle = event.target.dataset.style;
        sampleText.style.fontStyle = selectedFontStyle.includes("italic") ? "italic" : "normal";
        sampleText.style.fontWeight = selectedFontStyle.includes("bold") ? "bold" : "normal";
        fontStyleDropDown.style.display = "none";
    }
});

// Functionality for gradientColorDiv
const gradientColorDiv = document.getElementById("gradientColorDiv");

gradientColorDiv.addEventListener("click", (event) => {
    if (event.target.id) {
        selectedGradientColor = event.target.id;
        const gradients = {
            gradientColor1: "linear-gradient(to right, red, yellow)",
            gradientColor2: "linear-gradient(to right, blue, green)",
            gradientColor3: "linear-gradient(to right, purple, pink)",
            gradientColor4: "linear-gradient(to right, orange, gold)",
            gradientColor5: "linear-gradient(to right, cyan, teal)",
            gradientColor6: "linear-gradient(to right, violet, indigo)",
            gradientColor7: "linear-gradient(to right, lime, olive)",
            gradientColor8: "linear-gradient(to right, navy, skyblue)",
            gradientColor9: "linear-gradient(to right, maroon, salmon)",
            gradientColor10: "linear-gradient(to right, black, gray)",
            gradientColor11: "linear-gradient(to right, white, lightgray)",
            gradientColor12: "linear-gradient(to right, gold, darkorange)",
            gradientColor13: "linear-gradient(to right, turquoise, aquamarine)",
            gradientColor14: "linear-gradient(to right, crimson, lightpink)",
            gradientColor15: "linear-gradient(to right, darkblue, lightblue)",
        };

        sampleText.style.background = gradients[selectedGradientColor];
        sampleText.style.webkitBackgroundClip = "text";
        sampleText.style.webkitTextFillColor = "transparent";
    }
});

// Save selected text color, neon color, font type, font style, and gradient to the database
saveTextColor.addEventListener("click", () => {
    if (!selectedTextColor && !selectedNeonColor && !selectedFontType && !selectedFontStyle && !selectedGradientColor) {
        alert("Please select a color, neon effect, font type, font style, or gradient before saving.");
        return;
    }

    const userRef = ref(database, `users/${uid}`);
    const updates = {};
    if (selectedTextColor) updates.textColor = selectedTextColor;
    if (selectedNeonColor) updates.neon = selectedNeonColor;
    if (selectedFontType) updates.fontType = selectedFontType;
    if (selectedFontStyle) updates.fontStyle = selectedFontStyle;
    if (selectedGradientColor) updates.gradient = selectedGradientColor;

    update(userRef, updates)
        .then(() => {
            alert("Text color, neon effect, font type, font style, and gradient updated successfully!");
            textColorScreenDivCon.style.display = "none";
        })
        .catch((error) => {
            console.error("Error updating text color, neon effect, font type, font style, or gradient:", error);
            alert("Failed to update text color, neon effect, font type, font style, or gradient. Please try again.");
        });
});

// Switch menu functionality
const textColorMenuItems = document.querySelectorAll("#textColorMenu > div");
const fontColorDivCon = document.getElementById("fontColorDivCon");
const neonColorDivCon = document.getElementById("neonColorDivCon");
const fontTypeDivCon = document.getElementById("fontTypeDivCon");
const gradientColorDivCon = document.getElementById("gradientColorDivCon");

textColorMenuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", () => {
        textColorMenuItems.forEach((item) => item.classList.remove("active"));
        menuItem.classList.add("active");

        fontColorDivCon.style.display = "none";
        neonColorDivCon.style.display = "none";
        fontTypeDivCon.style.display = "none";
        gradientColorDivCon.style.display = "none";

        if (menuItem.id === "fontColor") {
            fontColorDivCon.style.display = "flex";
        } else if (menuItem.id === "neonColor") {
            neonColorDivCon.style.display = "flex";
        } else if (menuItem.id === "fontType") {
            fontTypeDivCon.style.display = "flex";
        } else if (menuItem.id === "gradientColor") {
            gradientColorDivCon.style.display = "flex";
        }
    });
});
const profileStickerScreenDivCon = document.getElementById("profileStickerScreenDivCon");
const profileStickerScreenBackBtn = document.getElementById("profileStickerScreenBackBtn");
const saveProfileSticker = document.getElementById("saveProfileSticker");
const stickerListDiv = document.getElementById("stickerListDiv");

profileStickerScreenBackBtn.addEventListener("click", () => {
    profileStickerScreenDivCon.style.display = "none";
});

saveProfileSticker.addEventListener("click", () => {
    const selectedSticker = document.querySelector(".sticker.selected");
    if (!selectedSticker) {
        alert("Please select a sticker before saving.");
        return;
    }

    const stickerUrl = selectedSticker.dataset.url;
    const userRef = ref(database, `users/${uid}`);
    update(userRef, { profileSticker: stickerUrl })
        .then(() => {
            alert("Profile sticker updated successfully!");
            profileStickerScreenDivCon.style.display = "none";
        })
        .catch((error) => {
            console.error("Error updating profile sticker:", error);
            alert("Failed to update profile sticker. Please try again.");
        });
});

function fetchProfileStickerUserData() {
    const userRef = ref(database, `users/${uid}`);
    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            const profileSticker = userData.profileSticker || null;

            if (profileSticker) {
                const stickers = document.querySelectorAll(".sticker");
                stickers.forEach((sticker) => {
                    if (sticker.dataset.url === profileSticker) {
                        sticker.classList.add("selected");
                    } else {
                        sticker.classList.remove("selected");
                    }
                });
            }
        } else {
            console.warn("User data not found for UID:", uid);
        }
    }).catch((error) => {
        console.error("Error fetching profile sticker data:", error);
    });
}

function fetchStickersFromGiphy() {
    const apiKey = "GuUL2YMPiTWV2ZfAkTR3Sz16JG53klfr";

    const categories = [
        { query: "fighting", limit: 100 },
        { query: "suggested", limit: 100 },
        { query: "dancing", limit: 50 },
        { query: "stick man", limit: 50 },
        { query: "funny", limit: 50 },
        { query: "love", limit: 50 },
        { query: "sad", limit: 50 },
        { query: "happy", limit: 50 },
        { query: "angry", limit: 50 },
        { query: "surprised", limit: 50 },
        { query: "confused", limit: 50 },
        { query: "excited", limit: 50 },
        { query: "bored", limit: 50 },
        { query: "tired", limit: 50 },
        { query: "silly", limit: 50 },
        { query: "cool", limit: 50 },
        { query: "cute", limit: 50 },
        { query: "crazy", limit: 50 },
        { query: "weird", limit: 50 },
        { query: "awesome", limit: 50 },
        { query: "epic", limit: 50 },
        { query: "fun", limit: 50 },
        { query: "party", limit: 50 },
        { query: "celebration", limit: 50 },
        { query: "victory", limit: 50 },
        { query: "defeat", limit: 50 },
        { query: "friendship", limit: 50 },
        { query: "teamwork", limit: 50 },
        { query: "sports", limit: 50 },
        { query: "adventure", limit: 50 },
        { query: "travel", limit: 50 },
        { query: "vacation", limit: 50 },
        { query: "holiday", limit: 50 },
        { query: "nature", limit: 50 },
        { query: "animals", limit: 50 },
        { query: "pets", limit: 50 },
        { query: "food", limit: 50 },
        { query: "drink", limit: 50 },
        { query: "music", limit: 50 },
        { query: "art", limit: 50 },
        { query: "fashion", limit: 50 },
        { query: "style", limit: 50 },
        { query: "beauty", limit: 50 },
        { query: "health", limit: 50 },
        { query: "fitness", limit: 50 },
        { query: "wellness", limit: 50 },
        { query: "lifestyle", limit: 50 },
        { query: "hobbies", limit: 50 },
        { query: "interests", limit: 50 },
        { query: "skills", limit: 50 },
        { query: "talents", limit: 50 },
        { query: "knowledge", limit: 50 },
        { query: "wisdom", limit: 50 },
        { query: "experience", limit: 50 },
        { query: "learning", limit: 50 },
        { query: "education", limit: 50 },
        { query: "career", limit: 50 },
        { query: "work", limit: 50 },
        { query: "job", limit: 50 },
        { query: "business", limit: 50 },
        { query: "finance", limit: 50 },
        { query: "money", limit: 50 },
        { query: "wealth", limit: 50 },
        { query: "success", limit: 50 },
        { query: "achievement", limit: 50 },
        { query: "goal", limit: 50 },
    ];

    stickerListDiv.innerHTML = ""; // Clear existing stickers

    categories.forEach(({ query, limit }) => {
        const url = `https://api.giphy.com/v1/stickers/search?api_key=${apiKey}&q=${query}&limit=${limit}`;

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const stickers = data.data;

                stickers.forEach((sticker) => {
                    const stickerDiv = document.createElement("div");
                    stickerDiv.classList.add("sticker");
                    stickerDiv.dataset.url = sticker.images.fixed_height.url;

                    const stickerImg = document.createElement("img");
                    stickerImg.src = sticker.images.fixed_height.url;
                    stickerImg.alt = "Sticker";
                    stickerImg.id = "stickerImg";

                    stickerDiv.appendChild(stickerImg);
                    stickerListDiv.appendChild(stickerDiv);

                    stickerDiv.addEventListener("click", () => {
                        document.querySelectorAll(".sticker").forEach((sticker) => {
                            sticker.classList.remove("selected");
                        });
                        stickerDiv.classList.add("selected");
                    });
                });
            })
            .catch((error) => {
                console.error(`Error fetching ${query} stickers from Giphy:`, error);
            });
    });
}

const profileSticker = document.getElementById("profileSticker");
// Call fetchStickersFromGiphy when the profile sticker screen is opened
profileSticker.addEventListener("click", () => {
    profileStickerScreenDivCon.style.display = "flex";
    fetchStickersFromGiphy();
    fetchProfileStickerUserData();
});
const profileNameStyle = document.getElementById("profleNameStyle");
const profileNameStyleScreenDivCon = document.getElementById("profileNameStyleScreenDivCon");
const profileNameStyleFontDivCon = document.getElementById("profileNameStyleFontDivCon");
const profileNameStyleColorDivCon = document.getElementById("profileNameStyleColorDivCon");
const animationDiv = document.getElementById("animationDiv");
const styleDiv = document.getElementById("styleDiv");
const styleButtunDiv = document.getElementById("styleButtunDiv");

let selectedFontTypeStyle = null;
let selectedFontStyleStyle = null;
let selectedColor = null;
let selectedAnimation = null;
let selectedStyle = null;

profileNameStyle.addEventListener("click", () => {
    profileNameStyleScreenDivCon.style.display = "flex";
});

const profileNameStyleScreenBackBtn = document.getElementById("profileNameStyleScreenBackBtn");
profileNameStyleScreenBackBtn.addEventListener("click", () => {
    profileNameStyleScreenDivCon.style.display = "none";
});

// Font Type Dropdown
const fontTypeDropDownDiv2 = document.getElementById("fontTypeDropDownDiv2");
const fontTypeDropDown2 = document.getElementById("fontTypeDropDown2");
fontTypeDropDownDiv2.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent event from propagating to the body
    fontStyleDropDown2.style.display = "none"; // Ensure font style dropdown is hidden
    fontTypeDropDown2.style.display = fontTypeDropDown2.style.display === "flex" ? "none" : "flex";
});
fontTypeDropDown2.addEventListener("click", (event) => {
    if (event.target.classList.contains("fontTypeOption")) {
        selectedFontTypeStyle = event.target.dataset.font;
        fontTypeDropDown2.style.display = "none";
    }
});

// Font Style Dropdown
const fontStyleDropDownDiv3 = document.getElementById("fontTypeDropDownDiv3");
const fontStyleDropDown2 = document.getElementById("fontStyleDropDown2");
fontStyleDropDownDiv3.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent event from propagating to the body
    fontTypeDropDown2.style.display = "none"; // Ensure font type dropdown is hidden
    fontStyleDropDown2.style.display = fontStyleDropDown2.style.display === "flex" ? "none" : "flex";
});
fontStyleDropDown2.addEventListener("click", (event) => {
    if (event.target.classList.contains("fontStyleOption")) {
        selectedFontStyleStyle = event.target.dataset.style;
        fontStyleDropDown2.style.display = "none";
    }
});

// Hide dropdowns when clicking on the body
document.body.addEventListener("click", () => {
    fontTypeDropDown2.style.display = "none";
    fontStyleDropDown2.style.display = "none";
});

// Color Selection
const profileNameStyleColorDiv = document.getElementById("profileNameStyleColorDiv");
profileNameStyleColorDiv.addEventListener("click", (event) => {
    if (event.target.id) {
        selectedColor = event.target.id;

        // Remove active class from all check marks
        document.querySelectorAll("#profileNameStyleColorDiv .fas").forEach((checkMark) => {
            checkMark.style.display = "none";
        });

        // Show the check mark for the selected color
        const activeCheckMark = event.target.querySelector(".fas");
        if (activeCheckMark) {
            activeCheckMark.style.display = "flex";
        }
    }
});

// Animation Selection
animationDiv.addEventListener("click", (event) => {
    if (event.target.tagName === "DIV" && event.target.id.startsWith("animation")) {
        document.querySelectorAll("#animationDiv > div").forEach((div) => div.classList.remove("active"));
        event.target.classList.add("active");
        selectedAnimation = event.target.querySelector("span").textContent;
    }
});

// Style Selection
styleDiv.addEventListener("click", (event) => {
    if (event.target.tagName === "DIV" && event.target.id) {
        document.querySelectorAll("#styleDiv > div").forEach((div) => div.classList.remove("active"));
        event.target.classList.add("active");
        selectedStyle = event.target.id;
    }
});

// Save Profile Name Style
const saveProfileNameStyle = document.getElementById("saveProfileNameStyle");
saveProfileNameStyle.addEventListener("click", () => {
    if (!selectedFontTypeStyle && !selectedFontStyleStyle && !selectedColor && !selectedAnimation && !selectedStyle) {
        alert("Please select at least one style option before saving.");
        return;
    }

    const userRef = ref(database, `users/${uid}`);
    const updates = {};
    if (selectedFontTypeStyle) updates.nameFontType = selectedFontTypeStyle;
    if (selectedFontStyleStyle) updates.nameFontStyle = selectedFontStyleStyle;
    if (selectedColor) updates.userTextColor = selectedColor;
    if (selectedAnimation) updates.animation = selectedAnimation;
    if (selectedStyle) updates.style = selectedStyle;

    update(userRef, updates)
        .then(() => {
            alert("Profile name style updated successfully!");
            profileNameStyleScreenDivCon.style.display = "none";
            window.location.reload(); // Reload the page to apply changes
        })
        .catch((error) => {
            console.error("Error updating profile name style:", error);
            alert("Failed to update profile name style. Please try again.");
        });
});

// Default Style Button
const defaultStyle = document.getElementById("defaultStyle");
defaultStyle.addEventListener("click", () => {
    selectedFontTypeStyle = null;
    selectedFontStyleStyle = null;
    selectedColor = null;
    selectedAnimation = null;
    selectedStyle = null;

    document.querySelectorAll("#animationDiv > div").forEach((div) => div.classList.remove("active"));
    document.querySelectorAll("#profileNameStyleColorDiv > div").forEach((div) => div.classList.remove("active"));
    document.querySelectorAll("#styleDiv > div").forEach((div) => div.classList.remove("active"));

    alert("Profile name style reset to default.");
});

// Tab Switching Functionality
const profileNameStyleMenuItems = document.querySelectorAll("#profileNameStyleMenu > div");

profileNameStyleMenuItems.forEach((menuItem) => {
    menuItem.addEventListener("click", () => {
        profileNameStyleMenuItems.forEach((item) => item.classList.remove("active"));
        menuItem.classList.add("active");

        profileNameStyleFontDivCon.style.display = "none";
        profileNameStyleColorDivCon.style.display = "none";
        animationDiv.style.display = "none";
        styleDiv.style.display = "none";

        if (menuItem.id === "profileNameStyleFont") {
            profileNameStyleFontDivCon.style.display = "block";
        } else if (menuItem.id === "profileNameStyleColor") {
            profileNameStyleColorDivCon.style.display = "flex";
        } else if (menuItem.id === "animation") {
            animationDiv.style.display = "flex";
        } else if (menuItem.id === "style") {
            styleDiv.style.display = "flex";
        }
    });
});
const menuDiv = document.getElementById("menuDiv");
const menuSlideDiv = document.getElementById("menuSlideDiv");
const closeMenuDiv = document.getElementById("closeMenuDiv");

menuDiv.addEventListener("click", () => {
    menuSlideDiv.style.display = "flex";
    menuSlideDiv.classList.add("menuSlideInAnimation");
});

closeMenuDiv.addEventListener("click", () => {
    menuSlideDiv.classList.remove("menuSlideInAnimation");
    menuSlideDiv.style.display = "none";
});

document.addEventListener("click", (event) => {
    if (!menuSlideDiv.contains(event.target) && !menuDiv.contains(event.target)) {
        menuSlideDiv.classList.remove("menuSlideInAnimation");
        menuSlideDiv.style.display = "none";
    }
});
const groupsTab = document.getElementById("groupsTab");
const groupsDivCon = document.getElementById("groupsDivCon");
groupsTab.addEventListener("click", () => {
    fetchGroupsData(); // Fetch groups data when opening the groups tab
});
const groupsCloseBtn = document.getElementById("groupsCloseBtn");
groupsCloseBtn.addEventListener("click", () => {
    groupsDivCon.style.display = "none";
});
function fetchGroupsData() {
    groupsDivCon.style.display = "flex";
    const groupsRef = ref(database, `group-chat`);
    const groupsListDiv = document.getElementById("groupsList");
    groupsListDiv.innerHTML = ""; // Clear existing groups

    get(groupsRef).then((snapshot) => {
        if (snapshot.exists()) {
            const groups = snapshot.val();
            Object.keys(groups).forEach((chatName) => {
                const groupData = groups[chatName];
                const groupItemDiv = document.createElement("div");
                groupItemDiv.className = "groupItem";
                const groupName = document.createElement("div");
                groupName.className = "groupName";
                groupName.textContent = chatName;

                const groupNumberDiv = document.createElement("div");
                groupNumberDiv.className = "groupNumberDiv";
                const groupNumIcon = document.createElement("i");
                const groupActiveNum = document.createElement("span");
                groupActiveNum.className = "groupActiveNum";
                groupNumIcon.className = "fas fa-users";
                groupActiveNum.textContent = "0";

                // Fetch and update active user count
                const activeUsersRef = ref(database, `group-chat/${chatName}/activeUser`);
                onValue(activeUsersRef, (activeSnapshot) => {
                    if (activeSnapshot.exists()) {
                        groupActiveNum.textContent = Object.keys(activeSnapshot.val()).length;
                    } else {
                        groupActiveNum.textContent = "0";
                    }
                });

                const groupGo = document.createElement("div");
                groupGo.className = "groupGo";
                groupGo.innerHTML = '<i class="fas fa-arrow-right"></i>';

                const paddLockDivIcon = document.createElement("div");
                paddLockDivIcon.className = "paddlockIcon";
                const paddLockIcon = document.createElement("i");
                paddLockIcon.className = "fas fa-lock";

                if (paddLockDivIcon.style.display === "none") {
                    groupNumberDiv.style.marginLeft = "auto";
                }
                // Add padlock icon if the group is locked
                if (groupData.locked) {
                    paddLockDivIcon.style.display = "block";
                }

                groupItemDiv.addEventListener("click", () => {
                    if (groupData.locked) {
                        const enterPasswordDivCon = document.getElementById("enterPasswordDivCon");
                        const enterGroupPasswordInput = document.getElementById("enterGroupPasswordInput");
                        const enterGroupBtn = document.getElementById("enterGroupBtn");
                        const enterPasswordCloseBtn = document.getElementById("enterPasswordCloseBtn");
                        const errorMessage = document.getElementById("errorMrssage");

                        enterPasswordDivCon.style.display = "flex";

                        enterGroupBtn.onclick = () => {
                            const password = enterGroupPasswordInput.value.trim();
                            if (password === groupData.password) {
                                const activeUserRef = ref(db, `group-chat/${chatName}/activeUser/${uid}`);
                                remove(activeUserRef); // Remove active user reference on disconnect
                                console.log(`Access granted to group: ${chatName}`);
                                const urlParams = new URLSearchParams(window.location.search);
                                urlParams.set("chat", chatName);
                                window.location.search = urlParams.toString();
                            } else {
                                errorMessage.textContent = "Incorrect password. Please try again.";
                                errorMessage.style.color = "red";
                            }
                        };

                        enterPasswordCloseBtn.onclick = () => {
                            enterPasswordDivCon.style.display = "none";
                            errorMessage.textContent = ""; // Clear error message
                        };
                    } else {
                        console.log(`Selected group: ${chatName}`);
                        const urlParams = new URLSearchParams(window.location.search);
                        urlParams.set("chat", chatName);
                        window.location.search = urlParams.toString();
                    }
                });

                groupGo.addEventListener("click", (event) => {
                    event.stopPropagation(); // Prevent triggering the groupItemDiv click event
                    if (groupData.locked) {
                        const enterPasswordDivCon = document.getElementById("enterPasswordDivCon");
                        const enterGroupPasswordInput = document.getElementById("enterGroupPasswordInput");
                        const enterGroupBtn = document.getElementById("enterGroupBtn");
                        const enterPasswordCloseBtn = document.getElementById("enterPasswordCloseBtn");
                        const errorMessage = document.getElementById("errorMrssage");

                        enterPasswordDivCon.style.display = "flex";

                        enterGroupBtn.onclick = () => {
                            const password = enterGroupPasswordInput.value.trim();
                            if (password === groupData.password) {
                                console.log(`Access granted to group: ${chatName}`);
                                const urlParams = new URLSearchParams(window.location.search);
                                urlParams.set("chat", chatName);
                                window.location.search = urlParams.toString();
                            } else {
                                errorMessage.textContent = "Incorrect password. Please try again.";
                                errorMessage.style.color = "red";
                            }
                        };

                        enterPasswordCloseBtn.onclick = () => {
                            enterPasswordDivCon.style.display = "none";
                            errorMessage.textContent = ""; // Clear error message
                        };
                    } else {
                        console.log(`Go to group: ${chatName}`);
                        const urlParams = new URLSearchParams(window.location.search);
                        urlParams.set("chat", chatName);
                        window.location.search = urlParams.toString();
                    }
                });

                groupsListDiv.appendChild(groupItemDiv);
                groupItemDiv.appendChild(groupName);
                groupItemDiv.appendChild(groupNumberDiv);
                groupNumberDiv.appendChild(groupNumIcon);
                groupNumberDiv.appendChild(groupActiveNum);
                groupItemDiv.appendChild(paddLockDivIcon);
                paddLockDivIcon.appendChild(paddLockIcon);
                groupItemDiv.appendChild(groupGo);
            });
        } else {
            const noGroupsDiv = document.createElement("div");
            noGroupsDiv.className = "noGroups";
            noGroupsDiv.textContent = "No groups available.";
            groupsListDiv.appendChild(noGroupsDiv);
        }
    }).catch((error) => {
        console.error("Error fetching groups:", error);
    });
}
const creatGroupDiv = document.getElementById("creatGroupDiv");
const createGroupDivCon = document.getElementById("createGroupDivCon");
const createGroupCloseBtn = document.getElementById("createGroupCloseBtn");
creatGroupDiv.addEventListener("click", () => {
    createAGroup();
});
createGroupCloseBtn.addEventListener("click", () => {
    createGroupDivCon.style.display = "none";
});
function createAGroup() {
    createGroupDivCon.style.display = "flex";

    const lockedSwitchInput = document.getElementById("lockedSwitchInput");
    const groupPasswordInput = document.getElementById("groupPasswordInput");

    // Toggle password input visibility based on locked switch
    lockedSwitchInput.addEventListener("change", () => {
        groupPasswordInput.style.display = lockedSwitchInput.checked ? "block" : "none";
    });

    const createGroupBtn = document.getElementById("createGroupBtn");
    createGroupBtn.addEventListener("click", () => {
        const groupNameInput = document.getElementById("groupNameInput").value.trim();
        const groupDescription = document.getElementById("groupDescriptionInput").value.trim();
        const groupPassword = groupPasswordInput.value.trim();
        const isLocked = lockedSwitchInput.checked;
        const createGroupSuccessDivCon = document.getElementById("createGroupSuccessDivCon");
        const createGroupSuccessBtn = document.getElementById("createGroupSuccessBtn");
        const isAdminOnly = document.getElementById("adminOnlySwitchInput").checked;

        if (!groupNameInput) {
            alert("Please enter a group name.");
            return;
        }

        const groupData = {
            chatName: groupNameInput,
            description: groupDescription,
            locked: isLocked,
            password: isLocked && groupPassword ? groupPassword : null,
            adminOnly: isAdminOnly,
            createdBy: uid,
            createdAt: serverTimestamp(),
        };

        const groupRef = ref(database, `group-chat/${groupNameInput}`);
        set(groupRef, groupData)
            .then(() => {
                alert("Group created successfully!");
                createGroupDivCon.style.display = "none";
                createGroupSuccessDivCon.style.display = "flex";
                sendNotificattion(uid, "Group Created", `Your group "${groupNameInput}" has been successfully created.`, "groupCreated", uid);
                createGroupSuccessBtn.addEventListener("click", () => {
                    const urlParams = new URLSearchParams(window.location.search);
                    urlParams.set("chat", groupNameInput);
                    window.location.search = urlParams.toString();
                });
            })
            .catch((error) => {
                console.error("Error creating group:", error);
                alert("Failed to create group. Please try again.");
            });
    });
}
const createGroupSuccessCloseBtn = document.getElementById("createGroupSuccessCloseBtn");
createGroupSuccessCloseBtn.addEventListener("click", () => {
    const createGroupSuccessDivCon = document.getElementById("createGroupSuccessDivCon");
    createGroupSuccessDivCon.style.display = "none";
});
const action = document.getElementById("action");
const actionPopUpDiv = document.getElementById("actionPopUpDiv");
const actionPopUpCloseBtn = document.getElementById("actionPopUpCloseBtn");
const addFriendBtn = document.getElementById("addFriendBtn");
action.addEventListener("click", () => {
    actionPopUpDiv.style.display = "flex";
    profilePopUpDiv.style.display = "none"; // Hide profile pop-up if it's open
});
actionPopUpCloseBtn.addEventListener("click", () => {
    actionPopUpDiv.style.display = "none";
});


const friendRequestDiv = document.getElementById("friendRequestDiv");
const friendDivCon = document.getElementById("friendDivCon");
const friendCloseBtn = document.getElementById("friendCloseBtn");

friendRequestDiv.addEventListener("click", () => {
    fetchFriendRequests(); // Fetch friend requests when opening the friend request tab
});
friendCloseBtn.addEventListener("click", () => {
    friendDivCon.style.display = "none";
});

function fetchFriendRequests() {
    friendDivCon.style.display = "flex";
    const friendRequestsRef = ref(database, `friend-requests/${uid}`);
    const friendList = document.getElementById("friendList");
    friendList.innerHTML = ""; // Clear existing friend requests

    get(friendRequestsRef).then((snapshot) => {
        if (snapshot.exists()) {
            const friendRequests = snapshot.val();

            Object.keys(friendRequests).forEach((requestUid) => {
                const requestData = friendRequests[requestUid];
                if (requestData.sender) {
                    const senderUid = requestData.sender;

                    // Fetch sender's profile data
                    const senderRef = ref(database, `users/${senderUid}`);
                    get(senderRef).then((senderSnapshot) => {
                        if (senderSnapshot.exists()) {
                            const senderData = senderSnapshot.val();
                            const { profilePic, name } = senderData;

                            // Create friend request item
                            const friendRequestItem = document.createElement("div");
                            friendRequestItem.className = "friendRequestItem";

                            const friendProfilePicDiv = document.createElement("div");
                            friendProfilePicDiv.className = "friendProfilePicDiv";

                            const friendProfilePic = document.createElement("img");
                            friendProfilePic.src = profilePic || "img/profile.png"; // Default profile picture
                            friendProfilePic.className = "friendProfilePic";

                            const friendName = document.createElement("div");
                            friendName.className = "friendName";
                            friendName.textContent = name || "Unknown User";

                            const friendActions = document.createElement("div");
                            friendActions.className = "friendActions";

                            const acceptBtn = document.createElement("button");
                            acceptBtn.className = "acceptBtn";
                            acceptBtn.textContent = "Accept";
                            acceptBtn.addEventListener("click", () => {
                                acceptFriendRequest(senderUid);
                            });

                            const declineBtn = document.createElement("button");
                            declineBtn.className = "declineBtn";
                            declineBtn.textContent = "Decline";
                            declineBtn.addEventListener("click", () => {
                                declineFriendRequest(senderUid);
                            });

                            friendActions.appendChild(acceptBtn);
                            friendActions.appendChild(declineBtn);
                            friendProfilePicDiv.appendChild(friendProfilePic);
                            friendRequestItem.appendChild(friendProfilePicDiv);
                            friendRequestItem.appendChild(friendName);
                            friendRequestItem.appendChild(friendActions);

                            friendList.appendChild(friendRequestItem);
                        } else {
                            console.warn(`User data not found for UID: ${senderUid}`);
                        }
                    }).catch((error) => {
                        console.error(`Error fetching sender data for UID: ${senderUid}`, error);
                    });
                }
            });
        } else {
            const noRequestsDiv = document.createElement("div");
            noRequestsDiv.className = "noRequests";
            noRequestsDiv.textContent = "No friend requests.";
            friendList.appendChild(noRequestsDiv);
        }
    }).catch((error) => {
        console.error("Error fetching friend requests:", error);
    });
}

function acceptFriendRequest(senderUid) {
    const friendRequestsRef = ref(database, `friend-requests/${uid}/${senderUid}`);
    const friendsRef = ref(database, `friends/${uid}/${senderUid}`);
    const senderFriendsRef = ref(database, `friends/${senderUid}/${uid}`);

    // Add to friends list and remove from friend requests
    set(friendsRef, { uid: senderUid, timestamp: serverTimestamp() })
        .then(() => set(senderFriendsRef, { uid: uid, timestamp: serverTimestamp() }))
        .then(() => remove(friendRequestsRef))
        .then(() => {
            alert("Friend request accepted!");
            fetchFriendRequests(); // Refresh the friend requests list
            sendNotificattion(uid, "Friend request accepted", "You are now friends!", "friendRequestAccepted", senderUid);
        })
        .catch((error) => {
            console.error("Error accepting friend request:", error);
        });
}

function declineFriendRequest(senderUid) {
    const friendRequestsRef = ref(database, `friend-requests/${uid}/${senderUid}`);

    // Remove from friend requests
    remove(friendRequestsRef)
        .then(() => {
            alert("Friend request declined!");
            fetchFriendRequests(); // Refresh the friend requests list
            sendNotificattion(uid, "Friend request declined", "Delined your request.", "friendRequestDeclined", senderUid);
        })
        .catch((error) => {
            console.error("Error declining friend request:", error);
        });
}
const newFriendRequestDiv = document.getElementById("newFriendRequestDiv");
function checkFriendRequest() {
    const friendRequestsRef = ref(database, `friend-requests/${uid}`);
    onValue(friendRequestsRef, (snapshot) => {
        if (snapshot.exists()) {
            const friendRequests = snapshot.val();
            const currentTime = new Date();

            Object.keys(friendRequests).forEach((requestUid) => {
                const requestData = friendRequests[requestUid];
                if (requestData.sender && requestData.timestamp) {
                    const requestTime = new Date(requestData.timestamp);

                    if (
                        requestTime.getHours() === currentTime.getHours() &&
                        requestTime.getMinutes() === currentTime.getMinutes()
                    ) {
                        console.log("Friend request received at the current time.");
                        const audio = new Audio("audio/friend.mp3");
                        audio.play();
                    }

                    console.log(`Friend request received from UID: ${requestData.sender}`);
                    // Handle the friend request (e.g., display it in the UI)
                }
            });

            newFriendRequestDiv.style.display = "flex"; // Show the new friend request div if there are requests
        } else {
            console.log("No friend requests found.");
            newFriendRequestDiv.style.display = "none"; // Hide the new friend request div if there are no requests
        }
    }, (error) => {
        console.error("Error checking friend requests:", error);
    });
}
async function checkIfFriends(friendUid) {
    const friendsRef = ref(database, `friends/${uid}/${friendUid}`);
    const removeFriend = document.getElementById("removeFriend"); // Declare at the top
    try {
        const snapshot = await get(friendsRef);
        if (snapshot.exists()) {
            console.log("Already friends with this user.");
            alert("You are already friends with this user.");
            if (addFriendBtn) {
                addFriendBtn.style.display = "none"; // Hide the button if they are friends
                removeFriend.style.display = "flex"; // Show the remove friend button
            }

            if (removeFriend) {
                removeFriend.style.display = "flex"; // Show the remove friend button
                // Add click event to remove friend
                removeFriend.addEventListener("click", async () => {
                    try {
                        await remove(friendsRef);
                        const senderFriendsRef = ref(database, `friends/${friendUid}/${uid}`);
                        await remove(senderFriendsRef);
                        alert("Friend removed successfully.");
                        removeFriend.style.display = "none"; // Hide the remove friend button
                        addFriendBtn.style.display = "flex"; // Show the add friend button again
                    } catch (error) {
                        console.error("Error removing friend:", error);
                    }
                });
            }
        } else {
            if (removeFriend) {
                removeFriend.style.display = "none"; // Hide the remove friend button
            }
            console.log("Not friends with this user.");
        }
    } catch (error) {
        console.error("Error checking friendship:", error);
    }
}
function checkBlockedUser(blockUid) {
    const blockedRef = ref(database, `blocked-users/${uid}/${blockUid}`);
    onValue(blockedRef, (snapshot) => {
        if (snapshot.exists()) {
            console.log("User is blocked.");
            const block = document.getElementById("block");
            const unBlock = document.getElementById("unBlock");
            if (block) {
                block.style.setProperty("display", "none", "important"); // Hide the block button if they are blocked
            }
            if (unBlock) {
                unBlock.style.setProperty("display", "flex", "important"); // Show the unblock button
                // Add click event to unblock user
                unBlock.addEventListener("click", async () => {
                    try {
                        await remove(blockedRef);
                        unBlock.style.setProperty("display", "none", "important"); // Hide the unblock button
                        block.style.setProperty("display", "flex", "important"); // Show the block button again
                    } catch (error) {
                        console.error("Error unblocking user:", error);
                    }
                });
            }
        } else {
            console.log("User is not blocked.");
            checkIfFriends(blockUid); // Check if they are friends if not blocked
        }
    }, (error) => {
        console.error("Error checking blocked user:", error);
    });
}
checkFriendRequest(); // Call the function to check for friend requests
const notificationDiv = document.getElementById("notificationDiv");
const notificationScreenDivCon = document.getElementById("notificationScreenDivCon");
const notificationScreenCloseBtn = document.getElementById("notificationScreenCloseBtn");
notificationDiv.addEventListener("click", () => {
    fetchNotifications(); // Fetch notifications when opening the notification tab
});
notificationScreenCloseBtn.addEventListener("click", () => {
    notificationScreenDivCon.style.display = "none";
});
function fetchNotifications() {
    notificationScreenDivCon.style.display = "flex";
    const notificationRef = ref(database, `notification/${uid}`);
    const notificationListDiv = document.getElementById("notificationList");
    notificationListDiv.innerHTML = "";

    // Get notifications once (no real-time listener)
    get(notificationRef).then((snapshot) => {
        notificationListDiv.innerHTML = "";

        if (snapshot.exists()) {
            const notifications = snapshot.val();

            // Sort notifications by timestamp in descending order
            const sortedNotifications = Object.entries(notifications).sort(([, a], [, b]) => {
                return (b.timestamp || 0) - (a.timestamp || 0);
            });

            sortedNotifications.forEach(([notUid, notData]) => {
                if (!notData) return;

                // Now safe to mark as read because the user actually opened the tab
                if (!notData.read) {
                    const notificationItemRef = ref(database, `notification/${uid}/${notUid}`);
                    update(notificationItemRef, { read: true }).catch((error) => {
                        console.error(`Error updating notification as read: ${error}`);
                    });
                }

                // Continue rendering like before...
                const notificationItem = document.createElement("div");
                notificationItem.className = "notificationItem";

                const senderRef = ref(database, `users/${notData.sender}`);
                get(senderRef).then((senderSnapshot) => {
                    const senderData = senderSnapshot.val();
                    let { profilePic, name } = senderData || {};

                    if (notData.sender === "system") {
                        profilePic = "img/system.png"; // Use a default system image
                        name = "System Notification"; // Use a default system name
                    }

                    const notificationProfilePicDiv = document.createElement("div");
                    notificationProfilePicDiv.className = "notificationProfilePicDiv";

                    const notificationProfilePic = document.createElement("img");
                    notificationProfilePic.className = "notificationProfilePic";
                    notificationProfilePic.src = profilePic || "img/profile.png";

                    const senderNameTitleAndBodyDiv = document.createElement("div");
                    senderNameTitleAndBodyDiv.className = "senderNameTitleAndBodyDiv";

                    const notificationTitle = document.createElement("div");
                    notificationTitle.className = "notificationTitle";
                    notificationTitle.textContent = notData.title || "Notification Title";

                    const notificationBody = document.createElement("div");
                    notificationBody.className = "notificationBody";
                    notificationBody.textContent = notData.body || "Notification Body";

                    const notificationSenderName = document.createElement("div");
                    notificationSenderName.className = "notificationSenderName";
                    notificationSenderName.textContent = name || "Unknown User";

                    const notificationTime = document.createElement("div");
                    notificationTime.className = "notificationTime";
                    const timestampDate = notData.timestamp ? new Date(notData.timestamp) : null;
                    notificationTime.textContent = timestampDate ? timestampDate.toLocaleString() : "Unknown Time";

                    notificationProfilePicDiv.appendChild(notificationProfilePic);
                    notificationItem.appendChild(notificationProfilePicDiv);
                    senderNameTitleAndBodyDiv.appendChild(notificationSenderName);
                    senderNameTitleAndBodyDiv.appendChild(notificationTitle);
                    senderNameTitleAndBodyDiv.appendChild(notificationBody);
                    notificationItem.appendChild(senderNameTitleAndBodyDiv);
                    notificationItem.appendChild(notificationTime);
                    notificationListDiv.appendChild(notificationItem);
                });
            });
        } else {
            const noNotificationsDiv = document.createElement("div");
            noNotificationsDiv.className = "noNotifications";
            noNotificationsDiv.textContent = "No notifications available.";
            notificationListDiv.appendChild(noNotificationsDiv);
        }
    }).catch((error) => {
        console.error("Error fetching notifications:", error);
    });
}
function checkOnlineStatusAndUpdate(statusUid) {
    const onlineStatus = document.getElementById("onlineStatus");
    const userStatusRef = ref(database, `users/${statusUid}/status`);
    onValue(userStatusRef, (snapshot) => {
        if (snapshot.exists()) {
            const status = snapshot.val();
            if (status === "online") {
                onlineStatus.style.backgroundColor = "green";
                console.log("User is online.");
            } else if (status === "offline") {
                onlineStatus.style.backgroundColor = "red";
                console.log("User is offline.");
            }
        } else {
            console.log("User status not found.");
        }
    }, (error) => {
        console.error("Error fetching user status:", error);
    });
}
checkOnlineStatusAndUpdate(); // Call the function to check online status



const newNotificationDiv = document.getElementById("newNotificationDiv");
function checkNotification() {
    const notificationRef = ref(database, `notification/${uid}`);
    onValue(notificationRef, (snapshot) => {
        if (snapshot.exists()) {
            const notifications = snapshot.val();
            const currentTime = new Date();
            let hasUnreadNotifications = false;

            Object.keys(notifications).forEach((notUid) => {
                const notData = notifications[notUid];
                if (notData && notData.timestamp) {
                    const notificationTime = new Date(notData.timestamp);

                    if (
                        notificationTime.getHours() === currentTime.getHours() &&
                        notificationTime.getMinutes() === currentTime.getMinutes()
                    ) {
                        console.log("New notification received at the current time.");
                        const audio = new Audio("audio/not.mp3");
                        audio.play();
                    }

                    if (!notData.read) {
                        hasUnreadNotifications = true;
                    }
                }
            });

            newNotificationDiv.style.display = hasUnreadNotifications ? "flex" : "none";
        } else {
            console.log("No notifications found.");
            newNotificationDiv.style.display = "none";
        }
    }, (error) => {
        console.error("Error checking notifications:", error);
    });
}

checkNotification(); // Call the function to check for notifications
function sendNotificattion(uid, title, body, notType, friendUid) {
    const notificationRef = ref(database, `notification/${friendUid}`);
    const friendRequestAcceptedData = {
        title: title,
        body: body,
        timestamp: serverTimestamp(),
        type: notType,
        sender: uid,
        read: false,
    };
    const friendRequestDeclinedData = {
        title: title,
        body: body,
        timestamp: serverTimestamp(),
        type: notType,
        read: false,
        sender: uid,
    }
    const spamNotificationData = {
        title: title,
        body: body,
        timestamp: serverTimestamp(),
        type: notType,
        sender: "system",
        read: false,
        uid: uid,
    };
    const coinNotificationData = {
        title: title,
        body: body,
        timestamp: serverTimestamp(),
        type: notType,
        sender: uid,
        read: false,
    };
    const diamondNotificationData = {
        title: title,
        body: body,
        timestamp: serverTimestamp(),
        type: notType,
        sender: uid,
        read: false,
    };
    const changeUserNameData = {
        title: title,
        body: body,
        timestamp: serverTimestamp(),
        type: notType,
        sender: "system",
        read: false,
        uid: uid,
    };
    const groupCreatedData = {
        title: title,
        body: body,
        timestamp: serverTimestamp(),
        type: notType,
        sender: "system",
        read: false,
    }
    if(notType === "friendRequestAccepted") {
        push(notificationRef, friendRequestAcceptedData)
        .then(() => {
            console.log("Notification sent successfully!");
        })
        .catch((error) => {
            console.error("Error sending notification:", error);
        });
    } else if (notType === "friendRequestDeclined") {
        push(notificationRef, friendRequestDeclinedData)
        .then(() => {
            console.log("Notification sent successfully!");
        })
        .catch((error) => {
            console.error("Error sending notification:", error);
        });
    } else if (notType === "spam") {
        push(notificationRef, spamNotificationData)
        .then(() => {
            console.log("Notification sent successfully!");
        })
        .catch((error) => {
            console.error("Error sending notification:", error);
        });
    } else if(notType === "coin") {
        push(notificationRef, coinNotificationData)
        .then(() => {
            console.log("Notification sent successfully!");
        })
        .catch((error) => {
            console.error("Error sending notification:", error);
        });
    } else if(notType === "diamond") {
        push(notificationRef, diamondNotificationData)
        .then(() => {
            console.log("Notification sent successfully!");
        })
        .catch((error) => {
            console.error("Error sending notification:", error);
        });
    } else if(notType === "changeUserName") {
        push(notificationRef, changeUserNameData)
        .then(() => {
            console.log("Notification sent successfully!");
        })
        .catch((error) => {
            console.error("Error sending notification:", error);
        });
    } else if(notType === "groupCreated") {
        push(notificationRef, groupCreatedData)
        .then(() => {
            console.log("Notification sent successfully!");
        })
        .catch((error) => {
            console.error("Error sending notification:", error);
        });
    }
}
function updateCurrentChat() {
    const urlParams = new URLSearchParams(window.location.search);
    const chatName = urlParams.get("chat");
    if (chatName) {
        // Update currentChat in the database
        const userRef = ref(database, `users/${uid}`);
        update(userRef, { currentChat: chatName })
            .then(() => {
                console.log("Current chat updated successfully in the database.");
            })
            .catch((error) => {
                console.error("Error updating current chat in the database:", error);
            });
    }
}
updateCurrentChat(); // Call the function to update current chat
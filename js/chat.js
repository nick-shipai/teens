// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getDatabase, ref, push, set, serverTimestamp, onChildAdded, get, onValue, remove} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

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

// Function to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get UID from URL or Firebase Auth
let uid = getQueryParam("uid");
const chatName = getQueryParam("chat") || "genChat"; // Default to genChat if not provided
if (!uid) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            uid = user.uid;
            console.log(`User authenticated: ${uid}`);
        } else {
            alert("User not authenticated");
        }
    });
} else {
    console.log(`User authenticated via UID: ${uid}`);
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
    return { name: "Unknown User", profilePic: "profile.png", account: "User" }; // Default values
}

// Function to get current user ID
function getCurrentUserId() {
    return auth.currentUser ? auth.currentUser.uid : null;
}

async function displayMessage(messageData) {
    if (messageData.uid !== uid) {
        const audio = new Audio("audio/recieve.mp3");
        audio.play();
    }
    const chatBody = document.getElementById("chatBody");

    // Fetch user details based on UID
    const userData = await fetchUserData(messageData.uid);

    let name = userData.name || "Unknown User";
    let profilePic = userData.profilePic || "img/profile.png";
    let rank = userData.account || "User";

    // Handle like system
    function handleLikeSystem(messageId, likeButton, likeCount) {
        const currentUserId = getCurrentUserId();
        if (!currentUserId) return; // No user logged in

        const likeRef = ref(database, `group-chat/${chatName}/message/${messageId}/reactions/${currentUserId}`);

        // Check if user has already liked
        get(likeRef).then((snapshot) => {
            if (snapshot.exists()) {
                likeButton.style.color = "red"; // User already liked
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

    const rankImg = document.createElement("img");
    rankImg.id = "rankImg";
    rankImg.src = rankImgSrc;

    const nameElement = document.createElement("div");
    nameElement.id = "name";
    nameElement.textContent = name;

    const messagePicDiv = document.createElement("div");
    messagePicDiv.id = "messagePicDiv";

    const messagePic = document.createElement("img");
    messagePic.id = "messagePic";
    messagePic.src = profilePic;

    nameDiv.appendChild(nameElement);
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
    
    messagePicDiv.addEventListener("click", () => {
        const profilePopUpDiv = document.getElementById("profilePopUpDiv");
        profilePopUpDiv.style.display = "flex";
    
        // Populate profile popup with user data
        document.getElementById("profilePic").src = profilePic;
        document.getElementById("profileName").textContent = name;
        document.getElementById("profileRankImg").src = rankImgSrc;
        document.getElementById("profileRankText").textContent = rank;
    
        // Change background color based on rank
        if (ranks[rank.toLowerCase()]) {
            document.getElementById("profileRank").style.backgroundColor = ranks[rank.toLowerCase()].color;
        }
    });
    
    // Close profile popup
    document.getElementById("profilePopUpCloseBtn").addEventListener("click", () => {
        document.getElementById("profilePopUpDiv").style.display = "none";
    });
    

    const chatBubble = document.createElement("div");
    chatBubble.classList.add("chatBubble");
    chatBubble.style.wordBreak = "break-word"; // Ensure words break after max width
    chatBubble.textContent = messageData.message || "";

    // 📌 LIKE SYSTEM
    const reactDiv = document.createElement("div");
    reactDiv.classList.add("reactDiv");

    // 🕒 Add time div
    const timeDiv = document.createElement("div");
    timeDiv.classList.add("timeDiv");
    timeDiv.textContent = messageTime; // Display formatted time

    const likeButton = document.createElement("i");
    likeButton.classList.add("fas", "fa-thumbs-up", "like-button");

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

    const editOption = document.createElement("div");
    editOption.classList.add("menuOption");
    editOption.innerHTML = '<i class="fas fa-edit"></i> Edit';

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
        if (messageData.replyingTo) {
            const replyAndMessageDiv = document.createElement("div");
            replyAndMessageDiv.classList.add("replyAndMessageDiv");

            const replyName = document.createElement("div");
            replyName.classList.add("replyName");

            const replyDiv = document.createElement("div");
            replyDiv.classList.add("replyDiv");

            const messageDiv = document.createElement("div");
            messageDiv.classList.add("messageDiv");

            // Fetch reply details
            fetchReplyDetails(messageData.replyingTo).then(replyDetails => {
                replyName.textContent = replyDetails.name;
                if (replyDetails.video) {
                    const video = document.createElement("video");
                    video.src = replyDetails.video;
                    video.style.width = "50px";
                    video.style.height = "50px";
                    video.style.objectFit = "cover";
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
                    replyDiv.appendChild(gif);
                } else if (replyDetails.img) {
                    const img = document.createElement("img");
                    img.src = replyDetails.img;
                    img.style.width = "50px";
                    img.style.height = "50px";
                    img.style.objectFit = "cover";
                    replyDiv.appendChild(img);
                } else if (replyDetails.audio)  {
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
            chatBubble.textContent = messageData.message
        }
    } else if (messageData.video) {
     const chatVideo = document.createElement("video");
     chatVideo.src = messageData.video;
     chatVideo.autoplay = true;
     chatVideo.loop = true;
     chatVideo.muted = true;
     chatVideo.style.width = "100%";
     chatVideo.style.height = "100%";
     chatVideo.controls = true;
     chatBubble.appendChild(chatVideo);
        
    } else if (messageData.img) {
        const img = document.createElement("img");
        img.src = messageData.img;
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        chatBubble.appendChild(img);
    } else if (messageData.gif) {
        
    
        const gif = document.createElement("video");
        gif.id = "gifVideo";
        gif.src = messageData.gif;
        gif.autoplay = true;
        gif.loop = true;
        gif.muted = true;
        gif.style.height = "100%";
        gif.style.width = "100%";
        gif.style.objectFit = "cover";
        gif.controls = true;
       
        
        chatBubble.appendChild(gif);
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

     
    quoteReplyMessageId.textContent;
    // Message data
    const messageData = {
        message: messageText,
        id: messageRef.key,
        time: serverTimestamp(),
        uid: uid,
        replyingTo: quoteReplyMessageId.textContent || null // Always include replyingTo, even if null
    };

    // Save message to database
    set(messageRef, messageData)
        .then(() => {
            messageInput.value = ""; // Clear input after sending
            quoteReplyDivCon.style.display = "none"; // Hide quote reply div
            quoteReplyMessageId.textContent = ""; // Clear stored message ID
        })
        .catch((error) => {
            console.error("Error sending message:", error);
        });
}

// Listen for new messages in real-time
onChildAdded(messagesRef, (snapshot) => {
    displayMessage(snapshot.val());
});

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
 
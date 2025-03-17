// Import Firebase modules
import { 
    getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL 
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
import { 
    getDatabase, ref, push, set, serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

// Firebase setup
const auth = getAuth();
const database = getDatabase();
const storage = getStorage();

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
const chatName = getQueryParam("chat") || "genChat"; // Default to genChat if not provided
// Get elements
const uploadImageDiv = document.getElementById("uploadImageDiv");
const uploadVideoDiv = document.getElementById("uploadVideoDiv");
const uploadAudioDiv = document.getElementById("uploadAudioDiv");

const imageInput = document.createElement("input");
imageInput.type = "file";
imageInput.accept = "image/*";
imageInput.style.display = "none";
document.body.appendChild(imageInput);

const videoInput = document.createElement("input");
videoInput.type = "file";
videoInput.accept = "video/*";
videoInput.style.display = "none";
document.body.appendChild(videoInput);

const audioInput = document.createElement("input");
audioInput.type = "file";
audioInput.accept = "audio/*";
audioInput.style.display = "none";
document.body.appendChild(audioInput);

const progressBarContainer = document.getElementById("progressBarContainer");
const progressBar = document.getElementById("progressBar");

// Image upload button event listener
uploadImageDiv.addEventListener("click", () => {
    imageInput.click();
});

// Handle image upload
imageInput.addEventListener("change", async (event) => {
    uploadFile(event.target.files[0], "chatImages", "img");
});

// Video upload button event listener
uploadVideoDiv.addEventListener("click", () => {
    videoInput.click();
});

// Handle video upload
videoInput.addEventListener("change", async (event) => {
    uploadFile(event.target.files[0], "chatVideos", "video");
});

// Audio upload button event listener
uploadAudioDiv.addEventListener("click", () => {
    audioInput.click();
});

// Handle audio upload
audioInput.addEventListener("change", async (event) => {
    uploadFile(event.target.files[0], "chatAudios", "audio");
});

/**
 * Function to handle file upload (image, video, or audio)
 * @param {File} file - File selected by the user
 * @param {string} folder - Folder name in Firebase Storage
 * @param {string} type - Message type (img, video, audio)
 */
async function uploadFile(file, folder, type) {
    if (!file) return;

    const user = auth.currentUser;
    if (!user) {
        alert("You need to be logged in to upload a file.");
        return;
    }

    const fileRef = storageRef(storage, `${folder}/${user.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    progressBarContainer.style.display = "block";
    
    uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progressBar.style.width = `${progress}%`;
        progressBar.textContent = `${Math.round(progress)}%`;
    },
    (error) => {
        console.error(`Error uploading ${type}:`, error);
        progressBarContainer.style.display = "none";
    },
    async () => {
        const fileUrl = await getDownloadURL(uploadTask.snapshot.ref);
        const messageRef = push(ref(database, `group-chat/${chatName}/message`));
        
        const messageData = {
            [type]: fileUrl,
            id: messageRef.key,
            time: serverTimestamp(),
            uid: user.uid
        };
        
        set(messageRef, messageData)
            .then(() => {
                console.log(`${type} uploaded successfully.`);
                progressBarContainer.style.display = "none";
            })
            .catch((error) => {
                console.error(`Error saving ${type} message:`, error);
            });
    });
}

// Upload menu toggle
const uploadMenu = document.getElementById("uploadMenu");
const uploadDiv = document.getElementById("uploadDiv");

uploadDiv.addEventListener("click", () => {
    uploadMenu.style.display = "grid";
});

// Hide upload menu when clicking outside of it
document.body.addEventListener("click", (event) => {
    if (!uploadMenu.contains(event.target) && !uploadDiv.contains(event.target)) {
        uploadMenu.style.display = "none";
    }
});

let mediaRecorder;
let audioChunks = [];
let recordStartTime;
let timerInterval;

document.getElementById("recordDiv").addEventListener("click", async () => {
    document.getElementById("recordPopUpDiv").style.display = "flex";

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];
        recordStartTime = Date.now();

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };

        mediaRecorder.start();
        startTimer();
        console.log("Recording started...");
    } catch (error) {
        console.error("Error accessing microphone:", error);
        alert("Microphone access is required to record audio.");
    }
});

document.getElementById("goRecordBtn").addEventListener("click", async () => {
    if (!mediaRecorder) return;

    mediaRecorder.stop();
    clearInterval(timerInterval);
    document.getElementById("recordReader").textContent = "0:00"; // Reset timer UI
    console.log("Recording stopped...");

    mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        audioChunks = [];

        uploadRecordedAudio(audioBlob);
        document.getElementById("recordPopUpDiv").style.display = "none";
    };
});

document.getElementById("cancelRecordBtn").addEventListener("click", () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
        mediaRecorder.stop();
    }
    clearInterval(timerInterval);
    document.getElementById("recordReader").textContent = "0:00";
    document.getElementById("recordPopUpDiv").style.display = "none";
});

// Function to start the recording timer
function startTimer() {
    const recordReader = document.getElementById("recordReader");
    timerInterval = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - recordStartTime) / 1000);
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;
        recordReader.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }, 1000);
}

// Upload recorded audio
async function uploadRecordedAudio(audioBlob) {
    const user = auth.currentUser;
    if (!user) {
        alert("You need to be logged in to upload audio.");
        return;
    }

    const fileName = `recorded_${Date.now()}.webm`;
    const fileRef = storageRef(storage, `chatRecords/${user.uid}/${fileName}`);
    const uploadTask = uploadBytesResumable(fileRef, audioBlob);

    progressBarContainer.style.display = "block";

    uploadTask.on("state_changed",
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progressBar.style.width = `${progress}%`;
            progressBar.textContent = `${Math.round(progress)}%`;
        },
        (error) => {
            console.error("Error uploading recorded audio:", error);
            progressBarContainer.style.display = "none";
        },
        async () => {
            const fileUrl = await getDownloadURL(uploadTask.snapshot.ref);
            const messageRef = push(ref(database, `group-chat/${chatName}/message`));

            const messageData = {
                record: fileUrl,
                id: messageRef.key,
                time: serverTimestamp(),
                uid: user.uid
            };

            set(messageRef, messageData)
                .then(() => {
                    console.log("Recorded audio uploaded successfully.");
                    progressBarContainer.style.display = "none";
                })
                .catch((error) => {
                    console.error("Error saving recorded audio message:", error);
                });
        }
    );
}

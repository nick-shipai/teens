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
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let penColor = "black"; // Default pen color

// Resize canvas to match its container
function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
}

// Get correct coordinates
function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX || (e.touches && e.touches[0]?.clientX);
    const y = e.clientY || (e.touches && e.touches[0]?.clientY);
    return [x - rect.left, y - rect.top];
}

// Start drawing
function startDrawing(e) {
    e.preventDefault(); // Prevent scrolling on touch devices
    isDrawing = true;
    [lastX, lastY] = getMousePos(e);

    // Start the path immediately at the starting point
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
}

// Draw function
function draw(e) {
    if (!isDrawing) return;
    e.preventDefault(); // Prevent unwanted scrolling

    let [x, y] = getMousePos(e);

    ctx.strokeStyle = penColor;
    ctx.lineWidth = 10;
    ctx.lineCap = "round";

    ctx.lineTo(x, y);
    ctx.stroke();

    [lastX, lastY] = [x, y]; // Update last position
}

// Stop drawing
function stopDrawing() {
    isDrawing = false;
    ctx.closePath(); // Close the path when drawing stops
}

// Event listeners for mouse
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

// Event listeners for touch
canvas.addEventListener("touchstart", startDrawing);
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener("touchcancel", stopDrawing);

// Show canvas and initialize it
const paint = document.getElementById("uploadDrawingDiv");

paint.addEventListener("click", () => {
    const canvasDivCon = document.getElementById("canvasDivCon");
    canvasDivCon.style.display = "flex"; // Show the canvas container
    resizeCanvas(); // Resize the canvas to match its container
});

// Change pen color
const changePenColorDiv = document.getElementById("changePenColorDiv");
changePenColorDiv.addEventListener("click", (event) => {
    const target = event.target;
    if (target.id) {
        penColor = target.id; // Set pen color based on the clicked element's ID
    }
});

// Close canvas
const closeCanvas = document.getElementById("cancelCanvasBtn");

closeCanvas.addEventListener("click", () => {
    const canvasDivCon = document.getElementById("canvasDivCon");
    canvasDivCon.style.display = "none"; // Hide the canvas container
});

// Send canvas drawing as an image
const sendCanvasBtn = document.getElementById("sendCanvasBtn");

sendCanvasBtn.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user) {
        alert("You need to be logged in to send a drawing.");
        return;
    }
    const canvasDivCon = document.getElementById("canvasDivCon");
    canvasDivCon.style.display = "none"; // Hide the canvas container

    // Convert canvas to image data
    canvas.toBlob(async (blob) => {
        if (!blob) return;

        const fileRef = storageRef(storage, `chatImages/${user.uid}/drawing_${Date.now()}.png`);
        const uploadTask = uploadBytesResumable(fileRef, blob);

        progressBarContainer.style.display = "block";

        uploadTask.on("state_changed", (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progressBar.style.width = `${progress}%`;
            progressBar.textContent = `${Math.round(progress)}%`;
        },
        (error) => {
            console.error("Error uploading drawing:", error);
            progressBarContainer.style.display = "none";
        },
        async () => {
            const fileUrl = await getDownloadURL(uploadTask.snapshot.ref);
            const messageRef = push(ref(database, `group-chat/${chatName}/message`));

            const messageData = {
                img: fileUrl,
                id: messageRef.key,
                time: serverTimestamp(),
                uid: user.uid
            };

            set(messageRef, messageData)
                .then(() => {
                    console.log("Drawing uploaded successfully.");
                    progressBarContainer.style.display = "none";
                    const canvasDivCon = document.getElementById("canvasDivCon");
                    canvasDivCon.style.display = "none"; // Hide the canvas container
                })
                .catch((error) => {
                    console.error("Error saving drawing message:", error);
                });
        });
    });
});
const openGiv = document.getElementById("uploadGivDiv");

openGiv.addEventListener("click", () => {
    const gifDivCon = document.getElementById("gifDivCon");
    gifDivCon.style.display = "flex"; // Show the GIF container
});
const gifGrid = document.getElementById("gifGrid");
const searchGiv = document.getElementById("searchGiv");
const goGifBtn = document.getElementById("goGifBtn");
const cancelGifBtn = document.getElementById("cancelGifBtn");
const gifDivCon = document.getElementById("gifDivCon");
const apiKey = "GuUL2YMPiTWV2ZfAkTR3Sz16JG53klfr";

let selectedGifUrl = "";
let selectedGifMp4Url = "";

// Function to fetch and display GIFs
async function fetchGifs(query = "") {
    const endpoint = query
        ? `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=20`
        : `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=20`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();

        gifGrid.innerHTML = ""; // Clear previous GIFs

        data.data.forEach((gif) => {
            const gifDiv = document.createElement("div");
            gifDiv.className = "gif-item";
            gifDiv.style.height = "100px";
            gifDiv.style.width = "100%";
            gifDiv.style.backgroundColor = "#d2d2d2";
            gifDiv.style.borderRadius = "10px";

            const video = document.createElement("video");
            video.src = gif.images.original.mp4;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.style.height = "100%";
            video.style.width = "100%";
            video.style.objectFit = "cover";

            gifDiv.appendChild(video);
            gifGrid.appendChild(gifDiv);

            gifDiv.addEventListener("click", () => {
                selectedGifUrl = gif.images.original.url; // GIF URL
                selectedGifMp4Url = gif.images.original.mp4; // MP4 URL
                document.querySelectorAll(".gif-item").forEach((item) => {
                    item.style.border = "none";
                });
                gifDiv.style.border = "2px solid blue"; // Highlight selected GIF
                
            });
        });
    } catch (error) {
        console.error("Error fetching GIFs:", error);
    }
}

// Fetch trending GIFs on load
fetchGifs();

// Search GIFs on input
searchGiv.addEventListener("input", (event) => {
    const query = event.target.value.trim();
    fetchGifs(query);
});

// Cancel GIF selection
cancelGifBtn.addEventListener("click", () => {
    gifDivCon.style.display = "none"; // Hide GIF container
    selectedGifUrl = ""; // Reset selected GIF
    selectedGifMp4Url = ""; // Reset selected MP4
});

// Send selected GIF
goGifBtn.addEventListener("click", async () => {
    if (!selectedGifUrl || !selectedGifMp4Url) {
        alert("Please select a GIF to send.");
        return;
    }

    gifDivCon.style.display = "none";


    const user = auth.currentUser;
    if (!user) {
        alert("You need to be logged in to send a GIF.");
        return;
    }

    const mp4Blob = await fetch(selectedGifMp4Url).then((res) => res.blob());
    const fileRef = storageRef(storage, `chatGifs/${user.uid}/gif_${Date.now()}.mp4`);
    const uploadTask = uploadBytesResumable(fileRef, mp4Blob);

    progressBarContainer.style.display = "block";

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            progressBar.style.width = `${progress}%`;
            progressBar.textContent = `${Math.round(progress)}%`;
        },
        (error) => {
            console.error("Error uploading GIF MP4:", error);
            progressBarContainer.style.display = "none";
        },
        async () => {
            const mp4Url = await getDownloadURL(uploadTask.snapshot.ref);
            const messageRef = push(ref(database, `group-chat/${chatName}/message`));

            const messageData = {
                gif: mp4Url, // Save GIF URL
                id: messageRef.key,
                time: serverTimestamp(),
                uid: user.uid,
            };

            set(messageRef, messageData)
                .then(() => {
                    console.log("GIF sent successfully.");
                    gifDivCon.style.display = "none"; // Hide GIF container
                    selectedGifUrl = ""; // Reset selected GIF
                    selectedGifMp4Url = ""; // Reset selected MP4
                    progressBarContainer.style.display = "none";
                })
                .catch((error) => {
                    console.error("Error sending GIF:", error);
                });
        }
    );
});

document.addEventListener("deviceready", onDeviceReady, false);

let mediaRec;
let filePath;

function onDeviceReady() {
    console.log("Cordova is ready");
}

function recordAudio() {
    let fileName = "recording_" + new Date().getTime() + ".mp3"; // Unique filename
    filePath = cordova.file.externalDataDirectory + fileName; // Save in app data

    mediaRec = new Media(filePath, 
        () => console.log("Recording Success"),
        (err) => console.error("Recording Error: ", err)
    );

    mediaRec.startRecord();
    console.log("Recording started...");
}

function stopRecording() {
    if (mediaRec) {
        mediaRec.stopRecord();
        console.log("Recording stopped. Saved at:", filePath);
    }
}
document.addEventListener("deviceready", function () {
    document.addEventListener("backbutton", function () {
        navigator.notification.confirm(
            "Do you want to exit?",  // Message
            function (buttonIndex) {
                if (buttonIndex === 1) { // 'Yes' button pressed
                    navigator.app.exitApp();
                }
            },
            "Exit App", ["Yes", "No"] // Title and Button Labels
        );
    }, false);
}, false);

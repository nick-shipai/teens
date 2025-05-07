// This is the main JavaScript file for the Cordova application.
document.addEventListener("deviceready", function () {
    try {
        // Handle back button
        document.addEventListener("backbutton", function () {
            if (navigator.notification && navigator.app) {
                navigator.notification.confirm(
                    "Do you want to exit?",  // Message
                    function (buttonIndex) {
                        if (buttonIndex === 1) { // 'Yes' button pressed
                            navigator.app.exitApp();
                        }
                    },
                    "Exit App", ["Yes", "No"] // Title and Button Labels
                );
            } else {
                console.warn("Navigator notification or app is not available.");
            }
        }, false);
    } catch (error) {
        alert("Error handling back button: " + error.message);
        console.error("Error handling back button:", error);
    }
}, false);

document.addEventListener("deviceready", function () {
    try {
        // Handle back button
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
    } catch (error) {
        alert("Error handling back button: " + error.message);
        console.error("Error handling back button:", error);
    }
}, false);

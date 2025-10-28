// public/sendNotification.js
document.addEventListener("DOMContentLoaded", async () => {
    const button = document.querySelector("#sendNotification");
    if (!button) {
        console.error("Element \#sendNotification not found.");
        return;
    }

    button.addEventListener("click", async () => {
        const title = "Test Notification";
        const content = "This is a test notification sent from the client.";
        const icon = "https://tuwi.nl/favicon.ico";
        const userId = "75";
        const type = "INFO";
        const restrictionUrl = "";
        const duration = 3;

        if (!userId) {
            alert("Please enter a userId.");
            return;
        }

        try {
            const res = await fetch("/notify", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({userId, title, content, icon, type, restrictionUrl, duration})
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok || !data.success) {
                throw new Error(data.error || `HTTP ${res.status}`);
            }
        } catch (err) {
            console.error("Error sending notification:", err);
        }
    })
});
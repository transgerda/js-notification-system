const userId = "75";

const socket = io({ query: { userId } });

socket.on('notification', data => {
    showNotification(data);
});

document.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.id = 'notifications';
    document.body.appendChild(container);
})

function showNotification({ title, content, icon, type, restrictionUrl, duration }) {
    if (restrictionUrl) {
        const currentUrl = window.location.href;
        if (!currentUrl.includes(restrictionUrl)) {
            console.log(`Notification restricted to URL containing: ${restrictionUrl}. Current URL: ${currentUrl}`);
            return;
        }
    }
    const durationMs = (duration && !isNaN(duration)) ? duration * 1000 : 10000;

    const container = document.getElementById('notifications');
    const div = document.createElement('div');
    div.classList.add('notification');
    div.innerHTML = `
        ${icon ? `<img src="${icon}" class="icon" />` : ''}
        <div class="text">
            <strong>${title}</strong>
            <p>${content}</p>
        </div>
        <button class="close-btn">&times;</button>
    `;

    const fadeOutDuration = 500; // ms
    const fadeOutDelay = Math.max(0, durationMs - fadeOutDuration + 50);
    div.style.animation = `slideIn 0.3s ease-out, fadeOut ${fadeOutDuration}ms ease-out ${fadeOutDelay}ms`;

    // Add event listener to remove on click
    div.querySelector('.close-btn').addEventListener('click', () => {
        div.remove();
    });

    container.appendChild(div);

    // Auto remove after 10s
    setTimeout(() => {
        div.remove();
    }, durationMs);
}

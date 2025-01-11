document.addEventListener('DOMContentLoaded', function () {
    const avatarCards = document.querySelectorAll('.avatar-card');
    const saveBotButton = document.getElementById('save-bot');
    const bot = document.getElementById('bot');
    const botNameDisplay = document.getElementById('bot-name-display');

    let selectedAvatar = localStorage.getItem('selectedAvatar') || 'pedro';

    // Update bot display function
    function updateBotDisplay() {
        if (bot) {
            bot.style.backgroundImage = `url('images/bot/${selectedAvatar}.png')`; // Updated path
            console.log("Bot image path:", `images/bot/${selectedAvatar}.png`);
        }
    }

    // Initial bot display update
    updateBotDisplay();

    if (avatarCards.length > 0) {
        // Update selected avatar visual
        avatarCards.forEach(card => {
            const avatar = card.getAttribute('data-avatar');

            if (avatar === selectedAvatar) {
                card.style.borderColor = '#007bff';
            }

            // Avatar selection handler
            card.addEventListener('click', () => {
                avatarCards.forEach(c => c.style.borderColor = 'transparent');
                card.style.borderColor = '#007bff';
                selectedAvatar = avatar;
                updateBotDisplay();
            });
        });
    }

    if (saveBotButton) {
        saveBotButton.addEventListener('click', () => {
            localStorage.setItem('selectedAvatar', selectedAvatar);
            alert("Bot saved successfully!");
            window.location.href = 'index.html';
        });
    }
});
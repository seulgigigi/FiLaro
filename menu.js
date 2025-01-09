document.addEventListener('DOMContentLoaded', function () {
    const avatarCards = document.querySelectorAll('.avatar-card');
    const botNameInput = document.getElementById('bot-name');
    const saveBotButton = document.getElementById('save-bot');
    const bot = document.getElementById('bot');
    const botNameDisplay = document.getElementById('bot-name-display');

    let selectedAvatar = localStorage.getItem('selectedAvatar') || 'pedro';
    let botName = localStorage.getItem('botName') || '';

    // Get base URL for GitHub Pages
    const baseUrl = window.location.pathname.includes('/FiLaro') 
        ? '/your-repo-name' 
        : '';

    function updateBotDisplay() {
        if (bot) {
            bot.style.backgroundImage = `url('${baseUrl}/images/bot/${selectedAvatar}.png')`;
        }
        if (botNameDisplay) {
            botNameDisplay.textContent = botName;
        }
    }

    updateBotDisplay();


    if (avatarCards.length > 0) {
        // Update selected avatar visual
        avatarCards.forEach(card => {
            if (card.getAttribute('data-avatar') === selectedAvatar) {
                card.style.borderColor = '#007bff';
            }

            // Avatar selection handler
            card.addEventListener('click', () => {
                avatarCards.forEach(c => c.style.borderColor = 'transparent');
                card.style.borderColor = '#007bff';
                selectedAvatar = card.getAttribute('data-avatar');
                updateBotDisplay();
            });
        });
    }

    if (saveBotButton) {
        saveBotButton.addEventListener('click', () => {
            botName = botNameInput.value.trim();
            if (!botName) {
                alert("Please enter a name for your bot!");
                return;
            }

            localStorage.setItem('selectedAvatar', selectedAvatar);
            localStorage.setItem('botName', botName);
            
            alert("Bot saved successfully!");
            window.location.href = 'index.html';
        });
    }

    if (botNameInput && botName) {
        botNameInput.value = botName;
    }
});

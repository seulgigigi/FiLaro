document.addEventListener('DOMContentLoaded', function () {
    const avatarCards = document.querySelectorAll('.avatar-card');
    const saveBotButton = document.getElementById('save-bot');
    const bot = document.getElementById('bot');
    const botNameDisplay = document.getElementById('bot-name-display');
    const speechBubble = document.getElementById('speech-bubble');

    let selectedAvatar = localStorage.getItem('selectedAvatar') || 'pedro';

    // Bot phrases to cycle through
    const botPhrases = [
        "Kamusta!",
        "Kamusta kana?",
        "Hello!",
        "Tara laro!",
        "r u g",
        "Welcome sa FiLaro!",
        "Let's play!",
        "Ready ka na ba?",
        "Taraaa",
        "Game na!",
        "I miss you",
        "Hi!",
    ];

    // Function to make the bot say something
    function botSay() {
        if (speechBubble) {
            const randomPhrase = botPhrases[Math.floor(Math.random() * botPhrases.length)];
            speechBubble.textContent = randomPhrase;
            speechBubble.style.display = 'block';
            setTimeout(() => {
                speechBubble.style.display = 'none';
            }, 3000); // Hide the bubble after 3 seconds
        }
    }

    // Update bot display function
    function updateBotDisplay() {
        if (bot) {
            bot.style.backgroundImage = `url('images/bot/${selectedAvatar}.png')`; // Updated path
            console.log("Bot image path:", `images/bot/${selectedAvatar}.png`);
        }
    }

    // Initial bot display update
    updateBotDisplay();

    // Start the bot's speech interval
    setInterval(botSay, 5000); // Say something every 5 seconds

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
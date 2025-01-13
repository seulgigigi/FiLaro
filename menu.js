document.addEventListener('DOMContentLoaded', function () {
    const avatarCards = document.querySelectorAll('.avatar-card');
    const saveBotButton = document.getElementById('save-bot');
    const bot = document.getElementById('bot');
    const botNameDisplay = document.getElementById('bot-name-display');
    const speechBubble = document.getElementById('speech-bubble');

    let selectedAvatar = localStorage.getItem('selectedAvatar') || 'pedro';

    // Bot phrases to cycle through
// Bot characteristics
const botCharacteristics = {
    pedro: {
        name: "Pedro",
        description: "The default generic bot. Pedro is here to help and guide you through the game!",
        phrases: [
            "Hello",
            "Kamusta",
            "Let's go",
            "Hi",
            "Good day",
        ]
    },
    Jose: {
        name: "Jose",
        description: "The enthusiastic bot. Jose is always excited and ready to play with you!",
        phrases: [
            "Kaya mo to!",
            "Tara na!",
            "Let's go!",
            "Simulan natin!",
            "Game na!",
            "G!",
        ]
    },
    King: {
        name: "King",
        description: "The goal-oriented bot. King is focused on winning and achieving high scores!",
        phrases: [
            "Focus lang!",
            "Kaya mo yan!",
            "Aim high!",
            "Push mo yan!",
            "Wag susuko!",
            "Go for the win!"
        ]
    },
    maria: {
        name: "Maria",
        description: "The shy bot. Maria is quiet but loves to observe and learn from others.",
        phrases: [
            "kamusta",
            "hello",
            "hi",
            "game on",
            "game",
            "let's go"
        ]
    },
    norbert: {
        name: "Norbert",
        description: "The stoic bot. Norbert is calm, composed, and always keeps a cool head.",
        phrases: [
            "Stay calm.",
            "Keep it steady.",
            "You got this.",
            "No rush.",
            "Stay focused."
        ]
    },
};

// Function to make the bot say something
function botSay() {
    const selectedAvatar = localStorage.getItem('selectedAvatar') || 'pedro';
    const bot = botCharacteristics[selectedAvatar];

    if (bot && bot.phrases) {
        const randomPhrase = bot.phrases[Math.floor(Math.random() * bot.phrases.length)];
        const speechBubble = document.getElementById('speech-bubble');

        if (speechBubble) {
            speechBubble.textContent = randomPhrase;
            speechBubble.style.display = 'block';
            setTimeout(() => {
                speechBubble.style.display = 'none';
            }, 3000); // Hide the bubble after 3 seconds
        }
    }
}

 // Update bot display function
function updateBotDisplay() {
    const selectedAvatar = localStorage.getItem('selectedAvatar') || 'pedro';
    const bot = document.getElementById('bot');

    if (bot) {
        bot.style.backgroundImage = `url('images/bot/${selectedAvatar}.png')`;
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
            localStorage.setItem('selectedAvatar', selectedAvatar); // Save the selected avatar
            updateBotDisplay(); // Update the bot's display
        });
    });
};
 

    if (saveBotButton) {
        saveBotButton.addEventListener('click', () => {
            localStorage.setItem('selectedAvatar', selectedAvatar);
            alert("Bot saved successfully!");
            window.location.href = 'index.html';
        });
    }
});
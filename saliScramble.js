let currentWord = '';
let currentDefinition = '';
let currentSentence = '';
let scrambledWord = '';
let attempts = 0;
let maxAttempts = 2; // Reduced to 2 attempts
let difficultyLevel = 1; // Default difficulty level (1 = Easy, 2 = Medium, 3 = Hard)
let score = 0; // Track the user's score
let round = 0; // Track the current round
const maxRounds = 5; // 5 words per session

// Hardcoded word list for SALITA mode
const words = [
    // Easy (5 letters or less)
    { word: "SIKLAB", definition: "Biglaang pagsiklab ng apoy o emosyon", sentence: "Ang <span class='blank'>_____</span> ay nangyayari nang bigla." },
    { word: "PANTAS", definition: "Matalinong tao", sentence: "Siya ay isang <span class='blank'>_____</span> sa kanyang klase." },
    { word: "DUYOG", definition: "Paglalaho ng araw o buwan", sentence: "Ang <span class='blank'>_____</span> ng buwan ay nagbigay ng kasiyahan sa mga tao." },
    { word: "HIMIG", definition: "Melodiya o tunog", sentence: "Ang <span class='blank'>_____</span> ng awit ay nakakakilig." },
    { word: "SIMSIM", definition: "Dahan-dahang pag-inom upang malasahan", sentence: "Ang <span class='blank'>_____</span> ng tubig ay nakakapagpalain." },
    { word: "LUMBAY", definition: "Malalim na kalungkutan", sentence: "Nakaramdam ng <span class='blank'>_____</span> siya matapos ang kanyang pagkawala." },
    { word: "PINID", definition: "Pagsasara ng pintuan o bintana", sentence: "Ang <span class='blank'>_____</span> ng bintana ay nagbigay ng kaginhawahan." },
    { word: "BUGHAW", definition: "Kulay asul (gamit sa tula o malikhain)", sentence: "Ang <span class='blank'>_____</span> na langit ay napakaganda." },
    { word: "WAGAS", definition: "Malinis walang kapintasan at walang hanggan", sentence: "Ang <span class='blank'>_____</span> na pag-ibig ay hindi madaling makuha." },
    { word: "AGOS", definition: "Pagdaloy ng tubig o hangin sa isang direksyon", sentence: "Ang <span class='blank'>_____</span> ng ilog ay nakakapagpalain." },

    // Medium (6-7 letters)
    { word: "HAPIL", definition: "Malupit na pagkatalo", sentence: "Nakaramdam ng <span class='blank'>_____</span> siya matapos ang kanyang pagkatalo." },
    { word: "DIWA", definition: "Kaluluwa o espiritu", sentence: "Ang <span class='blank'>_____</span> ng tao ay mahalaga." },
    { word: "GUNITA", definition: "Alaala o memorya", sentence: "Ang <span class='blank'>_____</span> ng kanyang ama ay hindi madaling makalimutan." },
    { word: "HILOM", definition: "Tahimik na pagpapagaling", sentence: "Ang <span class='blank'>_____</span> ng kalikasan ay nakakapagpalain." },
    { word: "LAKIP", definition: "Kasama o kalakip", sentence: "Ang <span class='blank'>_____</span> ng mga dokumento ay mahalaga." },
    { word: "LIRIP", definition: "Unang liwanag ng umaga", sentence: "Ang <span class='blank'>_____</span> ng araw ay nagbigay ng kasiyahan." },
    { word: "LINGAP", definition: "Pag-aaruga o pag-aalaga", sentence: "Ang <span class='blank'>_____</span> ng mga magulang ay hindi madaling makuha." },
    { word: "LUKTOS", definition: "Pagbaluktot ng papel o dahon", sentence: "Ang <span class='blank'>_____</span> ng papel ay nakakapagpalain." },
    { word: "MUTYA", definition: "Mahalagang hiyas o perlas", sentence: "Ang <span class='blank'>_____</span> ng dagat ay napakaganda." },
    { word: "PAGKIT", definition: "Pandikit o pantali", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay nakakapagpalain." },

    // Hard (8+ letters)
    { word: "PAGOD", definition: "Kapaguran o hingal", sentence: "Nakaramdam ng <span class='blank'>_____</span> siya matapos ang kanyang pagod." },
    { word: "PANATA", definition: "Pangako o sumpa", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay hindi madaling makuha." },
    { word: "PUGAY", definition: "Paggalang o pagbati", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay nakakapagpalain." },
    { word: "RIKIT", definition: "Kagandahan o kariktan", sentence: "Ang <span class='blank'>_____</span> ng mga tanawin ay napakaganda." },
    { word: "SALIK", definition: "Elemento o sangkap", sentence: "Ang <span class='blank'>_____</span> ng mga bagay ay mahalaga." },
    { word: "SINAG", definition: "Liwanag na nanggagaling sa araw", sentence: "Ang <span class='blank'>_____</span> ng araw ay nagbigay ng kasiyahan." },
    { word: "SIPING", definition: "Nasa tabi o malapit", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay nakakapagpalain." },
    { word: "TAGURI", definition: "Titulo o palayaw", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay nakakapagpalain." },
    { word: "TALA", definition: "Bituin o pangalan", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay nakakapagpalain." },
    { word: "TALAS", definition: "Katalasan ng isip", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay nakakapagpalain." },
];

// Bot phrases
const botPhrases = {
    welcome: [
        "Tara na!",
        "Let's go!",
        "Simulan natin!",
        "Game na!",
        "Sali na!",
    ],
    correct: [
        "Ang galing!",
        "Galing mo!",
        "Wow!",
        "Astig!",
        "Nice one bro!",
        "Perfect!",
        "Sobrang husay!",
        "Panalo!",
    ],
    incorrect: [
        "Sayang!",
        "Muntik na!",
        "Subukan ulit!",
        "Kaya mo yan!",
        "Malapit na!",
        "Next time!",
        "Huwag mawalan ng pag-asa!",
    ],
};

// Function to make the bot say something
function botSay(phraseType) {
    const phrases = botPhrases[phraseType];
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    const speechBubble = document.getElementById('speech-bubble');
    if (speechBubble) {
        speechBubble.textContent = randomPhrase;
        speechBubble.style.display = 'block';
        setTimeout(() => {
            speechBubble.style.display = 'none';
        }, 3000); // Hide the bubble after 3 seconds
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Load the saved bot avatar from localStorage
    const savedAvatar = localStorage.getItem('selectedAvatar') || 'pedro'; // Default to 'pedro' if no avatar is saved
    const bot = document.getElementById('bot');

    // Update the bot's avatar
    if (bot) {
        bot.style.backgroundImage = `url('images/bot/${savedAvatar}.png')`;
        console.log("Bot image path:", `images/bot/${savedAvatar}.png`);
    }

    // Modal functionality
    const modal = document.getElementById('instructionsModal');
    const instructionBtn = document.getElementById('instructionButton');
    const closeBtn = document.querySelector('.close');

    instructionBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Game buttons
    document.getElementById('startGame').addEventListener('click', startGame);
    document.getElementById('submitGuess').addEventListener('click', checkGuess);
    document.getElementById('nextWord').addEventListener('click', nextRound);
    document.getElementById('hintButton').addEventListener('click', showHint);
    document.getElementById('reshuffleButton').addEventListener('click', reshuffleWord);
});



// Function to scramble a word
function scrambleWord(word) {
    const arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}

// Function to start the game
function startGame() {
    document.getElementById('startGame').classList.add('hidden'); // Hide the start button
    document.getElementById('game').classList.remove('hidden'); // Show the game container
    document.getElementById('nextWord').classList.add('hidden'); // Hide the next button initially
    botSay('welcome'); // Bot says a welcoming phrase
    nextRound(); // Start the first round
}

// Function to update the difficulty level
function updateDifficulty() {
    difficultyLevel = parseInt(document.getElementById('difficultySlider').value);
    document.getElementById('difficultyValue').textContent = difficultyLevel;
    resetGame(); // Reset the game with the new difficulty
}

// Function to reset the game
function resetGame() {
    attempts = 0;
    nextRound();
}

// Function to check the user's guess
function checkGuess() {
    const userGuess = document.getElementById('userGuess').value.trim().toLowerCase();

    if (userGuess.length !== currentWord.length) {
        alert(`Please guess a ${currentWord.length}-letter word!`);
        return;
    }

    attempts++;

    if (userGuess === currentWord) {
        document.getElementById('result').innerText = 'Correct! 🎉';
        revealSentence();
        document.getElementById('nextWord').classList.remove('hidden'); // Show the next button
        botSay('correct'); // Bot says a congratulatory phrase
        score++; // Increment score for correct guess
        return;
    }

    if (attempts >= maxAttempts) {
        document.getElementById('result').innerHTML = `
            <span style="color: red;">Incorrect! The word was:</span><br>
            <span style="color: green;">${currentWord.toUpperCase()}</span>
        `;
        revealSentence();
        document.getElementById('nextWord').classList.remove('hidden'); // Show the next button
        botSay('incorrect'); // Bot says an encouraging phrase
        return;
    }

    document.getElementById('userGuess').value = ''; // Clear the input field
    document.getElementById('result').innerText = `Try again! Attempts left: ${maxAttempts - attempts}`;
    botSay('incorrect'); // Bot says an encouraging phrase
}

// Function to reveal the sentence
function revealSentence() {
    const completeSentence = currentSentence.replace("<span class='blank'>_____</span>", `<span class='correct-word'>${currentWord.toUpperCase()}</span>`);
    document.getElementById('scrambledWord').innerText = currentWord.toUpperCase(); // Display the unscrambled word
    document.getElementById('sentence').innerHTML = completeSentence; // Display the sentence
    document.getElementById('definition').innerText = currentDefinition; // Display the definition
    document.getElementById('userGuess').style.display = 'none'; // Hide the input field
    document.getElementById('submitGuess').style.display = 'none'; // Hide the submit button
}

// Function to proceed to the next round
function nextRound() {
    round++;
    if (round > maxRounds) {
        // Redirect to results page
        window.location.href = `results.html?score=${score}`;
        return;
    }

    // Filter words based on difficulty level
    const filteredWords = words.filter(word => {
        if (difficultyLevel === 1) return word.word.length <= 5; // Easy: 5 letters or less
        if (difficultyLevel === 2) return word.word.length > 5 && word.word.length <= 7; // Medium: 6-7 letters
        if (difficultyLevel === 3) return word.word.length > 7; // Hard: 8+ letters
    });

    if (filteredWords.length === 0) {
        alert("No words available for the selected difficulty. Please adjust the difficulty level.");
        return;
    }

    // Pick a random word from the filtered list
    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    currentWord = filteredWords[randomIndex].word.toLowerCase();
    currentDefinition = filteredWords[randomIndex].definition;
    currentSentence = filteredWords[randomIndex].sentence;

    scrambledWord = scrambleWord(currentWord);

    // Update the UI
    document.getElementById('sentence').innerHTML = '';
    document.getElementById('scrambledWord').innerText = scrambledWord;
    document.getElementById('definition').innerText = '';
    document.getElementById('game').classList.remove('hidden');
    document.getElementById('result').innerText = '';
    document.getElementById('userGuess').value = '';
    document.getElementById('userGuess').style.display = 'inline-block';
    document.getElementById('submitGuess').style.display = 'inline-block';
    document.getElementById('nextWord').classList.add('hidden'); // Hide the next button

    attempts = 0; // Reset attempts for the new round
}

// Function to reshuffle the word
function reshuffleWord() {
    scrambledWord = scrambleWord(currentWord);
    document.getElementById('scrambledWord').innerText = scrambledWord;
}

// Function to show a hint
function showHint() {
    const hint = currentDefinition;
    document.getElementById('result').innerText = `Hint: ${hint}`;
}

// Initialize the game
document.getElementById('startGame').classList.remove('hidden'); // Show the start button initially
document.getElementById('game').classList.add('hidden'); // Hide the game container initially
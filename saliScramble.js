let currentWord = '';
let currentDefinition = '';
let currentSentence = '';
let scrambledWord = '';
let attempts = 0;
let currentRound = 0;
const maxRounds = 2; // Maximum rounds (20 words)

// Hardcoded word list for SALITA mode
const words = [
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
    { word: "TALIM", definition: "Kahusayan o kasanayan", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay nakakapagpalain." },
    { word: "TAMPOK", definition: "Tampulan ng pansin", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay nakakapagpalain." },
    { word: "TAROK", definition: "Pinakamalalim na bahagi", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay nakakapagpalain." },
    { word: "TIMPI", definition: "Pagpipigil ng sarili", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay nakakapagpalain." },
    { word: "TINDIG", definition: "Tayog o anyo", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay nakakapagpalain." },
    { word: "TITIG", definition: "Masinsinang pagtingin", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay nakakapagpalain." },
    { word: "TUGDA", definition: "Patakaran o alituntunin", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay nakakapagpalain." },
    { word: "ULILA", definition: "Naulila o nag-iisa", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay nakakapagpalain." },
    { word: "UNAWA", definition: "Pag-intindi o pagkaunawa", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay nakakapagpalain." },
    { word: "UNLAK", definition: "Pagbibigay ng karangalan", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay nakakapagpalain." },
    { word: "UNOS", definition: "Malakas na bagyo", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay nakakapagpalain." },
    { word: "UNTAG", definition: "Unang liwanag ng araw", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay nakakapagpalain." },
    { word: "WAGAS", definition: "Dalisay o walang bahid", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay nakakapagpalain." },
    { word: "YABAG", definition: "Tunog ng yapak", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay nakakapagpalain." }
];

document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('submitGuess').addEventListener('click', checkGuess);
document.getElementById('nextWord').addEventListener('click', nextRound);
document.getElementById('hintButton').addEventListener('click', showHint);

// Save game state to localStorage
function saveGameState() {
    const gameState = {
        currentWord: currentWord,
        currentDefinition: currentDefinition,
        currentSentence: currentSentence,
        scrambledWord: scrambledWord,
        attempts: attempts,
        currentRound: currentRound,
        maxRounds: maxRounds,
        words: words // Optional: Save the word list if needed
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
}

// Load game state from localStorage
function loadGameState() {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
        const gameState = JSON.parse(savedState);
        currentWord = gameState.currentWord;
        currentDefinition = gameState.currentDefinition;
        currentSentence = gameState.currentSentence;
        scrambledWord = gameState.scrambledWord;
        attempts = gameState.attempts;
        currentRound = gameState.currentRound;
        maxRounds = gameState.maxRounds;
        words = gameState.words || words; // Restore word list if saved
    }
}

// Load game state when the page loads
window.onload = function() {
    loadGameState(); // Load saved game state
    if (!currentWord) {
        nextRound(); // Start a new round if no saved state
    } else {
        // Restore the game UI with the saved state
        document.getElementById('scrambledWord').innerText = scrambledWord;
        document.getElementById('definition').innerText = currentDefinition;
        document.getElementById('game').classList.remove('hidden');
        updateRoundDisplay(); // Update the round display
    }
};

function startGame() {
    document.getElementById('startGame').style.display = 'none'; // Hide the start button
    document.getElementById('nextWord').style.display = 'inline-block'; // Show the next button
    currentRound = 0; // Reset rounds
    nextRound(); // Start the first round
}

function updateRoundDisplay() {
    document.getElementById('roundDisplay').innerText = `${currentRound}/${maxRounds}`;
}

// Attach an event listener to the input field
document.getElementById('userGuess').addEventListener('keydown', function (event) {
    // Check if the Enter key is pressed
    if (event.key === 'Enter') {
        // Prevent default form submission behavior (if any)
        event.preventDefault();

        // Trigger the submit button's click event
        document.getElementById('submitGuess').click();
    }
});

function scrambleWord(word) {
    const arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
}

function checkGuess() {
    const userGuess = document.getElementById('userGuess').value.trim().toLowerCase();

    if (userGuess.length !== currentWord.length) {
        alert(`Please guess a ${currentWord.length}-letter word!`);
        return;
    }

    attempts++;

    // Clear and rebuild the guess display for the current attempt
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = ''; // Clear previous guess row
    const guessRow = document.createElement('div');
    guessRow.className = 'guess-row';

    let letterStatus = new Array(currentWord.length).fill('wrong');
    const currentWordArr = currentWord.split('');

    // Determine letter status
    userGuess.split('').forEach((letter, index) => {
        if (letter === currentWordArr[index]) {
            letterStatus[index] = 'correct';
        }
    });

    userGuess.split('').forEach((letter, index) => {
        if (letterStatus[index] !== 'correct' && currentWordArr.includes(letter)) {
            letterStatus[index] = 'wrong-position';
        }
    });

    // Build the row with animated letter boxes
    userGuess.split('').forEach((letter, index) => {
        const letterBox = document.createElement('span');
        letterBox.className = `letter-box ${letterStatus[index]}`;
        letterBox.innerText = letter.toUpperCase();
        guessRow.appendChild(letterBox);

        // Add animation for each letter
        setTimeout(() => {
            letterBox.classList.add('flip-in');
        }, index * 100); // Stagger animations slightly
    });

    resultDiv.appendChild(guessRow);

    if (userGuess === currentWord) {
        document.getElementById('result').innerText = 'Correct! 🎉';
        revealSentence(); // Reveal the sentence
        document.getElementById('nextWord').style.display = 'inline-block'; // Show the next button
        return;
    }

    if (attempts >= 3) {
        document.getElementById('result').innerHTML = `
            <span style="color: red;">Incorrect! The word was:</span><br>
            <span style="color: green;">${currentWord.toUpperCase()}</span>
        `;
        revealSentence(); // Reveal the sentence
        document.getElementById('nextWord').style.display = 'inline-block'; // Show the next button
        return;
    }

    document.getElementById('userGuess').value = '';
    saveGameState(); 
}

function revealSentence() {
    const completeSentence = currentSentence.replace("<span class='blank'>_____</span>", `<span class='correct-word'>${currentWord.toUpperCase()}</span>`);
    document.getElementById('scrambledWord').innerText = currentWord.toUpperCase(); // Display the unscrambled word
    document.getElementById('sentence').innerHTML = completeSentence; // Display the sentence
    document.getElementById('definition').innerText = currentDefinition;
    document.getElementById('userGuess').style.display = 'none'; // Hide the input field
    document.getElementById('submitGuess').style.display = 'none'; // Hide the submit button
}

function nextRound() {
    if (currentRound >= maxRounds) {
        // Display the final score when all rounds are completed
        alert(`Game over! You have completed all rounds. Your score: ${currentRound}/${maxRounds}`);
        document.getElementById('game').classList.add('hidden');
        return;
    }

    currentRound++;

    // Pick a random word from the list
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex].word.toLowerCase();
    currentDefinition = words[randomIndex].definition;
    currentSentence = words[randomIndex].sentence;

    scrambledWord = scrambleWord(currentWord);
    
    // Clear the sentence section when moving to the next round
    document.getElementById('sentence').innerHTML = ''; // Clear the example sentence
    document.getElementById('scrambledWord').innerText = scrambledWord;
    document.getElementById('definition').innerText = ''; // Hide definition initially
    document.getElementById('game').classList.remove('hidden');
    document.getElementById('result').innerText = '';
    document.getElementById('userGuess').value = '';
    document.getElementById('userGuess').style.display = 'inline-block'; // Show the input field
    document.getElementById('submitGuess').style.display = 'inline-block'; // Show the submit button
    document.getElementById('nextWord').style.display = 'none'; // Hide the next button
    
    // Dynamically set maxlength for the input field
    document.getElementById('userGuess').setAttribute('maxlength', currentWord.length);

    attempts = 0; // Reset attempts for each round
    saveGameState(); 
    updateRoundDisplay(); // Update the round display
}

// Function to toggle the hint visibility
function showHint() {
    const definitionElement = document.getElementById('definition');
    if (definitionElement.classList.contains('visible')) {
        // Hide the hint
        definitionElement.classList.remove('visible');
        definitionElement.innerText = '';
    } else {
        // Show the hint
        definitionElement.classList.add('visible');
        definitionElement.innerText = currentDefinition;
    }
}

// Event listener for the hint button
document.getElementById('hintButton').addEventListener('click', showHint);

function revealSentence() {
    const completeSentence = currentSentence.replace("<span class='blank'>_____</span>", `<span class='correct-word'>${currentWord.toUpperCase()}</span>`);
    document.getElementById('scrambledWord').innerText = currentWord.toUpperCase(); // Display the unscrambled word
    document.getElementById('sentence').innerHTML = completeSentence; // Display the sentence
    document.getElementById('definition').innerText = currentDefinition;
    document.getElementById('userGuess').style.display = 'none'; // Hide the input field
    document.getElementById('submitGuess').style.display = 'none'; // Hide the submit button
}
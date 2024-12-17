let word = [];
let currentWord = '';
let currentDefinition = '';
let scrambledWord = '';
let attempts = 0;
let currentRound = 0;
const maxRounds = 20; // Maximum rounds (20 words)

// Hardcoded word list for SALITA mode
const words = [
    { word: "SIKLAB", definition: "Biglaang pagsiklab ng apoy o emosyon" },
    { word: "PANTAS", definition: "Matalinong tao" },
    { word: "DUYOG", definition: "Paglalaho ng araw o buwan" },
    { word: "HIMIG", definition: "Melodiya o tunog" },
    { word: "SIMSIM", definition: "Dahan-dahang pag-inom upang malasahan" },
    { word: "LUMBAY", definition: "Malalim na kalungkutan" },
    { word: "PINID", definition: "Pagsasara ng pintuan o bintana" },
    { word: "BUGHAW", definition: "Kulay asul (gamit sa tula o malikhain)" },
    { word: "WAGAS", definition: "Malinis walang kapintasan at walang hanggan" },
    { word: "AGOS", definition: "Pagdaloy ng tubig o hangin sa isang direksyon" },
    { word: "HAPIL", definition: "Malupit na pagkatalo" },
    { word: "DIWA", definition: "Kaluluwa o espiritu" },
    { word: "GUNITA", definition: "Alaala o memorya" },
    { word: "HILOM", definition: "Tahimik na pagpapagaling" },
    { word: "LAKIP", definition: "Kasama o kalakip" },
    { word: "LIRIP", definition: "Unang liwanag ng umaga" },
    { word: "LINGAP", definition: "Pag-aaruga o pag-aalaga" },
    { word: "LUKTOS", definition: "Pagbaluktot ng papel o dahon" },
    { word: "MUTYA", definition: "Mahalagang hiyas o perlas" },
    { word: "PAGKIT", definition: "Pandikit o pantali" },
    { word: "PAGOD", definition: "Kapaguran o hingal" },
    { word: "PANATA", definition: "Pangako o sumpa" },
    { word: "PUGAY", definition: "Paggalang o pagbati" },
    { word: "RIKIT", definition: "Kagandahan o kariktan" },
    { word: "SALIK", definition: "Elemento o sangkap" },
    { word: "SINAG", definition: "Liwanag na nanggagaling sa araw" },
    { word: "SIPING", definition: "Nasa tabi o malapit" },
    { word: "TAGURI", definition: "Titulo o palayaw" },
    { word: "TALA", definition: "Bituin o pangalan" },
    { word: "TALAS", definition: "Katalasan ng isip" },
    { word: "TALIM", definition: "Kahusayan o kasanayan" },
    { word: "TAMPOK", definition: "Tampulan ng pansin" },
    { word: "TAROK", definition: "Pinakamalalim na bahagi" },
    { word: "TIMPI", definition: "Pagpipigil ng sarili" },
    { word: "TINDIG", definition: "Tayog o anyo" },
    { word: "TITIG", definition: "Masinsinang pagtingin" },
    { word: "TUGDA", definition: "Patakaran o alituntunin" },
    { word: "ULILA", definition: "Naulila o nag-iisa" },
    { word: "UNAWA", definition: "Pag-intindi o pagkaunawa" },
    { word: "UNLAK", definition: "Pagbibigay ng karangalan" },
    { word: "UNOS", definition: "Malakas na bagyo" },
    { word: "UNTAG", definition: "Unang liwanag ng araw" },
    { word: "WAGAS", definition: "Dalisay o walang bahid" },
    { word: "YABAG", definition: "Tunog ng yapak" }
];

document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('submitGuess').addEventListener('click', checkGuess);
document.getElementById('nextWord').addEventListener('click', nextRound);

// Save game state to localStorage
function saveGameState() {
    const gameState = {
        currentWord: currentWord,
        currentDefinition: currentDefinition,
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

function nextRound() {
    if (currentRound >= maxRounds) {
        alert('Game over! You have completed all rounds.');
        document.getElementById('game').classList.add('hidden');
        return;
    }

    currentRound++;

    // Pick a random word from the list
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex].word.toLowerCase();
    currentDefinition = words[randomIndex].definition;

    scrambledWord = scrambleWord(currentWord);
    
    document.getElementById('scrambledWord').innerText = scrambledWord;
    document.getElementById('definition').innerText = currentDefinition;
    document.getElementById('game').classList.remove('hidden');
    document.getElementById('result').innerText = '';
    document.getElementById('userGuess').value = '';
    
    // Dynamically set maxlength for the input field
    document.getElementById('userGuess').setAttribute('maxlength', currentWord.length);

    attempts = 0; // Reset attempts for each round
    saveGameState(); 
    updateRoundDisplay(); // Update the round display
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
        nextRound(); // Proceed to the next round
        return;
    }

    if (attempts >= 5) {
        document.getElementById('result').innerHTML = `Game over! The word was:<br><span>${currentWord.toUpperCase()}</span>`;
        return;
    }    

    document.getElementById('userGuess').value = '';
    saveGameState(); 
}
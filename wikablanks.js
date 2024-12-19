// Sample sentences, choices, and definitions
const sentences = [
    {
        sentence: "Sa may kabisera umupo si Ibarra. Ang magkabilang dulo naman ay pinagtatalunan ng dalawang pari kung sino sa kanila ang dapat na <span class='blank'>_____</span> roon.",
        correctAnswer: "Lumikmo", // Label the correct answer here
        choices: ["Lumikmo", "Sumabad", "Agam-agam", "Tumayo"],
        definition: "Umupo."
    },
    {
        sentence: "Naudlot ang pagpapaliwanag ni Ibarra sapagkat biglang <span class='blank'>_____</span> si Padre Damaso.",
        correctAnswer: "Sumabad", // Label the correct answer here
        choices: ["Masatsat", "Pasaring", "Sable", "Sumabad"],
        definition: "Umabala sa isang usapan"
    },
    {
        sentence: "<span class='blank'>_____</span> si Simoun sa gitna ng sala, sugatang-sugata.",
        correctAnswer: "Lumagapak", // Label the correct answer here
        choices: ["Sinisikil", "Lumagapak", "Pusil", "Masusupil"],
        definition: "Nahulog o bumagsak, lalo na mula sa isang mataas na lugar o posisyon."
    },
    {
        sentence: "<span class='blank'>_____</span> si Simoun sa gitna ng sala, sugatang-sugata.",
        correctAnswer: "Lumagapak", // Label the correct answer here
        choices: ["Sinisikil", "Lumagapak", "Pusil", "Masusupil"],
        definition: "Nahulog o bumagsak, lalo na mula sa isang mataas na lugar o posisyon."
    },
    // Add more sentences here...
];

let currentSentenceIndex = 0;
let correctAnswers = 0; // Counter for correct answers

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Shuffle the sentences array
shuffleArray(sentences);

// Function to display the current sentence and choices
function displaySentence() {
    const sentence = sentences[currentSentenceIndex];
    document.querySelector('.sentence').innerHTML = sentence.sentence;
    document.getElementById('choice1').textContent = sentence.choices[0];
    document.getElementById('choice2').textContent = sentence.choices[1];
    document.getElementById('choice3').textContent = sentence.choices[2];
    document.getElementById('choice4').textContent = sentence.choices[3];

    // Update the progress counter
    document.getElementById('progress-counter').textContent = `${currentSentenceIndex + 1}/${sentences.length}`;

    // Enable all choice buttons
    document.querySelectorAll('.choice').forEach(button => {
        button.disabled = false;
    });
}

// Function to check the answer
function checkAnswer(choice) {
    const sentence = sentences[currentSentenceIndex];
    const resultText = document.getElementById('result-text');
    const result = document.getElementById('result');

    // Disable all choice buttons to prevent further clicks
    document.querySelectorAll('.choice').forEach(button => {
        button.disabled = true;
    });

    if (choice === sentence.correctAnswer) {
        // Increment the correct answers counter
        correctAnswers++;

        // Replace the blank with the correct word
        const completeSentence = sentence.sentence.replace("<span class='blank'>_____</span>", `<span class='correct-word'>${sentence.correctAnswer}</span>`);
        document.querySelector('.sentence').innerHTML = completeSentence;

        // Display the definition
        resultText.innerHTML = `<span class="correct-indicator">Correct!</span> The word "${sentence.correctAnswer}" means: <br><strong class="definition">${sentence.definition}</strong>`;
        resultText.classList.add('correct');
    } else {
        // Replace the blank with the correct word
        const completeSentence = sentence.sentence.replace("<span class='blank'>_____</span>", `<span class='correct-word'>${sentence.correctAnswer}</span>`);
        document.querySelector('.sentence').innerHTML = completeSentence;

        resultText.innerHTML = `<span class="wrong-indicator">Wrong!</span> The correct word is "${sentence.correctAnswer}" which means: <br><strong class="definition">${sentence.definition}</strong>`;
        resultText.classList.add('wrong');
    }

    // Show the "Next Word" button
    document.getElementById('next-sentence').classList.remove('hidden');
    result.classList.remove('hidden');
}

// Event listeners for choices
document.getElementById('choice1').addEventListener('click', () => checkAnswer(document.getElementById('choice1').textContent));
document.getElementById('choice2').addEventListener('click', () => checkAnswer(document.getElementById('choice2').textContent));
document.getElementById('choice3').addEventListener('click', () => checkAnswer(document.getElementById('choice3').textContent));
document.getElementById('choice4').addEventListener('click', () => checkAnswer(document.getElementById('choice4').textContent));

// Event listener for next sentence
document.getElementById('next-sentence').addEventListener('click', () => {
    currentSentenceIndex++;
    if (currentSentenceIndex < sentences.length) {
        displaySentence();
        document.getElementById('result').classList.add('hidden');
        document.getElementById('next-sentence').classList.add('hidden');
    } else {
        // Display final score when all sentences are completed
        alert(`You've completed all the sentences! Your score: ${correctAnswers}/${sentences.length}`);
    }
});

// Initialize the game
displaySentence();
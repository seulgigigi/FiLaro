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
        choices: ["Sumatsat", "Nagpasaring", "Sable", "Sumabad"],
        definition: "Umabala sa isang usapan"
    },
    {
        sentence: "<span class='blank'>_____</span> si Simoun sa gitna ng sala, sugatang-sugatan.",
        correctAnswer: "Lumagapak", // Label the correct answer here
        choices: ["Sinisikil", "Lumagapak", "Pusil", "Nasupil"],
        definition: "Nahulog o bumagsak, lalo na mula sa isang mataas na lugar o posisyon."
    },
    {
        sentence: "<span class='blank'>_____</span> si Simoun sa gitna ng sala, sugatang-sugata.",
        correctAnswer: "Lumagapak", // Label the correct answer here
        choices: ["Sinisikil", "Lumagapak", "Pusil", "Nasupil"],
        definition: "Nahulog o bumagsak, lalo na mula sa isang mataas na lugar o posisyon."
    },
    {
        sentence: "Lagi silang may <span class='blank'>_____</span> kung pakikinggan ba sila ng mga nasa kapangyarihan.",
        correctAnswer: "Agam-agam",
        choices: ["Agam-agam", "Binuling", "Bulastog", "Masusupil"],
        definition: "Pag-aalinlangan"
    },
    {
        sentence: "Ang mga kaganitian ay <span class='blank'>_____</span> maigi at inilatag sa harap ng mga mag-aaral.",
        correctAnswer: "Binuling",
        choices: ["Binuling", "Binulastog", "Sinupil", "Indulgencia"],
        definition: "Pinakinis o pinakintab"
    },
    {
        sentence: "Siya'y <span class='blank'>_____</span>, kaya't madalas magyabang sa mga mag-aaral.",
        correctAnswer: "Bulastog",
        choices: ["Bulastog", "Di-masusupil", "Indulgencia", "Kumabig"],
        definition: "Mayabang"
    },
    {
        sentence: "Ang galing ng mga tao ay <span class='blank'>_____</span>.",
        correctAnswer: "Di-masusupil",
        choices: ["Di-masusupil", "Indulgencia", "Kumabig", "Katampalasanan"],
        definition: "Hindi kayang pigilan o hindi kayang suplin"
    },
    {
        sentence: "Ang <span class='blank'>_____</span> ay isang utang na loob ng simbahan.",
        correctAnswer: "Indulgencia",
        choices: ["Indulgencia", "Kabig", "Katampalasanan", "Lagapak"],
        definition: "Utang na loob o pagpapatawad na ibinibigay ng simbahan sa mga kasalanan ng isang tao"
    },
    {
        sentence: "Siya ang <span class='blank'>_____</span> ni Basilio, laging nagsisilibing tagapagtanggol.",
        correctAnswer: "Kabig",
        choices: ["Kabig", "Katampalasanan", "Kaalit", "Usisero"],
        definition: "Isang tao na kaalyado o kasangga sa isang layunin o laban"
    },
    {
        sentence: "Hindi ko kayang itaguyod ang <span class='blank'>_____</span> at kalupitan ng kanyang ginawa.",
        correctAnswer: "Katampalasanan",
        choices: ["Katampalasanan", "Galak", "Busilak", "Pasaring"],
        definition: "Isang uri ng kaluptian o masamang gawain"
    },
    {
        sentence: "<span class='blank'>_____</span> si Simoun sa gitna ng sala, sugatang-sugata.",
        correctAnswer: "Lumagpak",
        choices: ["Lumagpak", "Masatsat", "Nagpasaring", "Pusil"],
        definition: "Nangangahulugang nahulog o bumagsak, lalo na mula sa isang mataas na lugar o posisyon"
    },
    {
        sentence: "Siya'y isang <span class='blank'>_____</span> na hindi nakapigil sa kanyang mga sinasabi.",
        correctAnswer: "Masatsat",
        choices: ["Masatsat", "Pasaring", "Pusil", "Sable"],
        definition: "Isang tao na mahilig magsalita nang mobilis at walang tigil, na kadalasan ay hindi iniisip ang mga sinasabi"
    },
    {
        sentence: "Sa <span class='blank'>_____</span> ni Isagani, naramdaman ng mga mag-aaral ang hinanakit.",
        correctAnswer: "Pasaring",
        choices: ["Pasaring", "Pusil", "Sable", "Sinisikil"],
        definition: "Parinig o isang uri ng hindi direktang pahayag na ginagamit upang magbigay ng mensahe o puna sa ibang tao"
    },
    {
        sentence: "Bumunot si Basilio ng <span class='blank'>_____</span> upang ipagtanggol ang kanyang sarili.",
        correctAnswer: "Pusil",
        choices: ["Pusil", "Sable", "Sinisikil", "Hudyat"],
        definition: "Isang uri ng malilt na baril na ginagamit sa malapitan o mobilisang laban"
    },
    {
        sentence: "Hawak ni Simoun ang <span class='blank'>_____</span> na parang isang simbolo ng kanyang kapangyarihan.",
        correctAnswer: "Sable",
        choices: ["Sable", "Sinisikil", "Hudyat", "Kagyat"],
        definition: "Isang uri ng espada na may kurbadong talim"
    },
    {
        sentence: "Ang mga mahihirap ay <span class='blank'>_____</span> ng mga may kapangyarihan sa lipunan.",
        correctAnswer: "Sinisikil",
        choices: ["Sinisikil", "Sinusupil", "Kagyat", "Inaakay"],
        definition: "Isang aksyon na nagsasaad ng pagpapahirap, pagpilit na pigilan, o pagsupil ng isang bagay o tao"
    },
    {
        sentence: "Ang <span class='blank'>_____</span> ng kanilang tagumpay ay isang malakas na tunog.",
        correctAnswer: "Hudyat",
        choices: ["Hudyat", "Kagyat", "Yumao", "Bulwagan"],
        definition: "Isang senyales o tanda na nagpapahiwatig ng isang bagay na malapit nang mangyari"
    },
    {
        sentence: "<span class='blank'>_____</span> na lumapit ang mga tao sa simbahan.",
        correctAnswer: "Kagyat",
        choices: ["Kagyat", "Pusil", "Pasaring", "Makupad"],
        definition: "Nangangahulugang mabilis o walang delay, ibig sabihin ay nangyari ito agad-agad o hindi na naghintay pa ng matagal"
    },
    {
        sentence: "Ang <span class='blank'>_____</span> niyang lolo ay iniwan ang maraming alaala sa kanilang pamilya.",
        correctAnswer: "Yumao",
        choices: ["Yumao", "Huwad", "Balingkinitan", "Tinyente"],
        definition: "Pumanaw o namatay"
    },
    {
        sentence: "Ang <span class='blank'>_____</span> ng paaralan ay puno ng mga mag-aaral na naghintay para sa seremonya.",
        correctAnswer: "Bulwagan",
        choices: ["Bulwagan", "Kwartel", "Rehas", "Huwad"],
        definition: "Isang malaking silid o gusali kung saan nagaganap ang mga pagtitipon o pagdiriwang"
    },
    {
        sentence: "Nagpadala siya ng <span class='blank'>_____</span> sa kanyang kalbigan upang ipaldam ang kanyang pagdating.",
        correctAnswer: "Telegrama",
        choices: ["Telegrama", "Tinyente", "Kagalakan", "Kwartel"],
        definition: "Isang mensahe na ipinapadala sa pamamagitan ng telegrapo, karaniwang may mahalagang impormasyon"
    },
    {
        sentence: "Ang <span class='blank'>_____</span> ay nagbigay ng utos sa kanyang mga sundalo bago ang laban.",
        correctAnswer: "Tinyente",
        choices: ["Tinyente", "Huwad", "Kabaro", "Tuso"],
        definition: "Isang ranggo sa militar, katumbas ng lieutenant sa Ingles"
    },
    {
        sentence: "Ang <span class='blank'>_____</span> na saksi ay nagdulot ng kalituhan sa paglilitis.",
        correctAnswer: "Huwad",
        choices: ["Huwad", "Magalak", "Tuso", "Balingkinitan"],
        definition: "Sinungaling o hindi totoo; pekeng"
    },
    {
        sentence: "Ang mga sundalo ay nagtipun-tipon sa <span class='blank'>_____</span> bago ang kanilang misyon.",
        correctAnswer: "Kwartel",
        choices: ["Kwartel", "Rehas", "Bulwagan", "Himlayan"],
        definition: "Tirahan o himpilan ng mga sundalo"
    },
    {
        sentence: "Nakita niya ang mga <span class='blank'>_____</span> na bakal na bumabalot sa bintana ng kulungan.",
        correctAnswer: "Rehas",
        choices: ["Rehas", "Balingkinitan", "Malapad", "Ganid"],
        definition: "Bakal na pangkulong; ginagamit bilang hadlang o bilangguan"
    },
    {
        sentence: "Ang <span class='blank'>_____</span> niyang katawan ay umagaw ng atensyon sa lahat.",
        correctAnswer: "Balingkinitan",
        choices: ["Balingkinitan", "Hinimlay", "Ganid", "Malapad"],
        definition: "Payat o may magandang pangangatawan"
    },
    {
        sentence: "<span class='blank'>_____</span> siya sa kanyang kama pagkatapos ng isang mahabang araw ng trabaho.",
        correctAnswer: "Humimlay",
        choices: ["Humimlay", "Ganid", "Lumagapak", "Sinariwa"],
        definition: "Nahiga o natulog nang mahimbing; pumanaw"
    },
    {
        sentence: "Ang <span class='blank'>_____</span> na negosyante ay hindi nag-atubiling mandaya upang kumita ng mas malaki.",
        correctAnswer: "Ganid",
        choices: ["Ganid", "Matuwid", "Patas", "Tuso"],
        definition: "Sakim o labis na pagnanasa para sa kayamanan o kapakinabangan"
    },
    {
        sentence: "May <span class='blank'>_____</span> sa dingding na nagpapapasok ng liwanag mula sa labas.",
        correctAnswer: "Siwang",
        choices: ["Siwang", "Balakid", "Nitso", "Lilipol"],
        definition: "Malilt na puwang o butas, karaniwang ginagamit para sa ilaw o hangin"
    },
    {
        sentence: "<span class='blank'>_____</span> niya ang mga masasayang alaala mula sa kanyang pagkabata.",
        correctAnswer: "Sinariwa",
        choices: ["Sinariwa", "Kinaligtaan", "Nilipol", "Pinilosopo"],
        definition: "Mullng ipinakita o inalala; ibinalik sa alaala"
    },
    {
        sentence: "Ang <span class='blank'>_____</span> ni San Pedro ay nasa gitna ng simbahan at dinarayo ng mga deboto.",
        correctAnswer: "Nitso",
        choices: ["Nitso", "Lilipol", "Bagsik", "Bulwagan"],
        definition: "Isang estatwa o larawang inukit, kadalasang may kaugnayan sa relihiyon"
    },
    {
        sentence: "Ang mga ganid na tao ay <span class='blank'>_____</span> ang lahat ng bagay na nakikita nilang hadlang sa kanilang layunin.",
        correctAnswer: "Lilipol",
        choices: ["Lilipol", "Pilosopo", "Yumao", "Bulwagan"],
        definition: "Pupuksa o lilipulin; aalisin nang tuluyan"
    },
    {
        sentence: "Si <span class='blank'>_____</span> Tasyo ay kilala bilang isang tao na may malalim na pag-unawa sa kalagayan ng lipunan.",
        correctAnswer: "Pilosopo",
        choices: ["Pilosopo", "Yumao", "Kapitan", "Kabaro"],
        definition: "Isang tao na nag-aaral at nag-isip tungkol sa mga pangunahing tanong ng buhay; madalas may malalim na kaalaman at pananaw"
    }
];


let currentSentenceIndex = 0;
let correctAnswers = 0; // Counter for correct answers
let usedSentences = []; // Track used sentences to avoid repetition

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const botPhrases = {
    pedro: {
        welcome: [
            "Hello!",
            "Kamusta!",
            "Let's go!",
            "Hi!",
            "Good day!",
        ],
        correct: [
            "Good job!",
            "Well done!",
            "Nice one!",
            "You got it!",
            "Perfect!",
        ],
        incorrect: [
            "Try again!",
            "Almost there!",
            "Don't give up!",
            "You can do it!",
            "Next time!",
        ],
    },
    Jose: {
        welcome: [
            "Kaya mo to!",
            "Tara na!",
            "Let's go!",
            "Simulan natin!",
            "Game na!",
            "G!",
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
    },
    King: {
        welcome: [
            "Focus lang!",
            "Let's win this!",
            "Aim high!",
            "Push mo yan!",
            "Go for the win!",
        ],
        correct: [
            "You're unstoppable!",
            "High score incoming!",
            "Perfect!",
            "You're a champion!",
            "Keep winning!",
        ],
        incorrect: [
            "Stay focused!",
            "Don't give up!",
            "You can do better!",
            "Push harder!",
            "Next round!",
        ],
    },
    maria: {
        welcome: [
            "Kamusta...",
            "Hello...",
            "Let's play...",
            "Game on...",
            "Hi...",
        ],
        correct: [
            "Good job...",
            "Well done...",
            "Nice...",
            "You got it...",
            "Perfect...",
        ],
        incorrect: [
            "Try again...",
            "Almost...",
            "Don't give up...",
            "You can do it...",
            "Next time...",
        ],
    },
    norbert: {
        welcome: [
            "Stay calm.",
            "Let's begin.",
            "Keep it steady.",
            "No rush.",
            "Stay focused.",
        ],
        correct: [
            "Well done.",
            "You got this.",
            "Perfect.",
            "Excellent.",
            "Keep it up.",
        ],
        incorrect: [
            "Stay calm.",
            "Try again.",
            "No rush.",
            "You can do it.",
            "Next time.",
        ],
    },
};
function botSay(phraseType) {
    const selectedAvatar = localStorage.getItem('selectedAvatar') || 'pedro'; // Default to 'pedro' if no avatar is selected
    const phrases = botPhrases[selectedAvatar][phraseType]; // Get the phrases for the selected bot and phrase type

    if (phrases) {
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
});

// Function to get a random sentence that hasn't been used yet
function getRandomSentence() {
    const availableSentences = sentences.filter(sentence => !usedSentences.includes(sentence));
    if (availableSentences.length === 0) {
        return null; // No more sentences available
    }
    const randomIndex = Math.floor(Math.random() * availableSentences.length);
    const sentence = availableSentences[randomIndex];
    usedSentences.push(sentence); // Mark this sentence as used
    return sentence;
}

// Function to randomize the placement of the correct answer
function randomizeChoices(sentence) {
    const choices = [...sentence.choices];
    const correctAnswer = sentence.correctAnswer;
    shuffleArray(choices); // Shuffle the choices
    const correctIndex = choices.indexOf(correctAnswer);
    if (correctIndex === -1) {
        choices[Math.floor(Math.random() * choices.length)] = correctAnswer; // Ensure the correct answer is included
    }
    return choices;
}

// Function to display the current sentence and choices
function displaySentence() {
    const sentence = getRandomSentence();
    if (!sentence) {
        // No more sentences available, end the game
        alert(`You've completed all the sentences! Your score: ${correctAnswers}/10`);
        window.location.href = `results-wikablanks.html?score=${correctAnswers}`;
        return;
    }

    const randomizedChoices = randomizeChoices(sentence);
    document.querySelector('.sentence').innerHTML = sentence.sentence;
    document.getElementById('choice1').textContent = randomizedChoices[0];
    document.getElementById('choice2').textContent = randomizedChoices[1];
    document.getElementById('choice3').textContent = randomizedChoices[2];
    document.getElementById('choice4').textContent = randomizedChoices[3];

    // Update the progress counter to show only up to 10 questions
    document.getElementById('progress-counter').textContent = `${currentSentenceIndex + 1}/10`;

    // Enable all choice buttons
    document.querySelectorAll('.choice').forEach(button => {
        button.disabled = false;
    });
}

// Event listener for next sentence
document.getElementById('next-sentence').addEventListener('click', () => {
    currentSentenceIndex++;
    if (currentSentenceIndex < 10) { // Limit the game to 10 questions
        displaySentence();
        document.getElementById('result').classList.add('hidden');
        document.getElementById('next-sentence').classList.add('hidden');
    } else {
        // Redirect to results page when all sentences are completed
        window.location.href = `results-wikablanks.html?score=${correctAnswers}`;
    }
});

// Function to check the answer
function checkAnswer(choice) {
    const sentence = usedSentences[currentSentenceIndex]; // Use the current sentence from usedSentences
    const resultText = document.getElementById('result-text');
    const result = document.getElementById('result');

    // Disable all choice buttons to prevent further clicks
    document.querySelectorAll('.choice').forEach(button => {
        button.disabled = true;
    });

    if (choice === sentence.correctAnswer) {
        botSay('correct');
        // Increment the correct answers counter
        correctAnswers++;

        // Replace the blank with the correct word
        const completeSentence = sentence.sentence.replace("<span class='blank'>_____</span>", `<span class='correct-word'>${sentence.correctAnswer}</span>`);
        document.querySelector('.sentence').innerHTML = completeSentence;

        // Display the definition
        resultText.innerHTML = `<span class="correct-indicator">Correct!</span> The word "${sentence.correctAnswer}" means: <br><strong class="definition">${sentence.definition}</strong>`;
        resultText.classList.add('correct');
    } else {
        botSay('incorrect');
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

// Initialize the game
displaySentence();

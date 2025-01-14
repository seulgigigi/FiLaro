let currentWord = '';
let currentDefinition = '';
let currentSentence = '';
let scrambledWord = '';
let attempts = 0;
let maxAttempts = 2; // Reduced to 2 attempts
let difficultyLevel = 1; // Default difficulty level (1 = Easy, 2 = Medium, 3 = Hard)
let score = 0; // Track the user's score
let round = 0; // Track the current round
let reshuffleUsed = false; // Track if reshuffle has been used for the current word
const maxRounds = 10; // 10 words per session
let usedWords = []; // Track used words for the current session


const words = [
    { word: "AGOS", definition: "Ang paglipat-lipat ng tubig o hangin sa isang partikular na direksyon", sentence: "Ang <span class='blank'>_____</span> ng ilog ay nakakapagpalain." },
    { word: "HIMIG", definition: "Ang tunog o melody na nararanasan sa musika", sentence: "Ang <span class='blank'>_____</span> ng awit ay nakakakilig." },
    { word: "DUYOG", definition: "Proseso ng paglalaho o pagtatago ng araw o buwan", sentence: "Ang <span class='blank'>_____</span> ng buwan ay nagbigay ng kasiyahan sa mga tao." },
    { word: "PINID", definition: "Proseso ng pagsasara o pagsalakay ng isang bagay", sentence: "Ang <span class='blank'>_____</span> ng bintana ay nagbigay ng kaginhawahan." },
    { word: "BUGHAW", definition: "Kulay asul na ginagamit sa tula o malikhain na uri", sentence: "Ang <span class='blank'>_____</span> na langit ay napakaganda." },
    { word: "WAGAS", definition: "Epekto ng malinis at walang hanggan na pag-ibig", sentence: "Ang <span class='blank'>_____</span> na pag-ibig ay hindi madaling makuha." },
    { word: "LUMBAY", definition: "Matinding kalungkutan o kaguluhan sa loob", sentence: "Nakaramdam ng <span class='blank'>_____</span> siya matapos ang kanyang pagkawala." },
    { word: "SIKLAB", definition: "Biglang pag-usbong o paglalabas ng apoy o emosyon", sentence: "Ang <span class='blank'>_____</span> ay nangyayari nang bigla." },
    { word: "PANTAS", definition: "Tao na may matalinong isip at makakagawa ng mabuting desisyon", sentence: "Siya ay isang <span class='blank'>_____</span> sa kanyang klase." },
    { word: "SIMSIM", definition: "Proseso ng dahan-dahang pag-inom para malasahan", sentence: "Ang <span class='blank'>_____</span> ng tubig ay nakakapagpalain." },
    { word: "HAPIL", definition: "Malupit at matagal na pagkatalo", sentence: "Nakaramdam ng <span class='blank'>_____</span> siya matapos ang kanyang pagkatalo." },
    { word: "DIWA", definition: "Espiritwal na parte ng tao o kaluluwa", sentence: "Ang <span class='blank'>_____</span> ng tao ay mahalaga." },
    { word: "GUNITA", definition: "Alaala o talaan ng nakaraang karanasan", sentence: "Ang <span class='blank'>_____</span> ng kanyang ama ay hindi madaling makalimutan." },
    { word: "HILOM", definition: "Proseso ng tahimik at natural na pagpapagaling", sentence: "Ang <span class='blank'>_____</span> ng kalikasan ay nakakapagpalain." },
    { word: "LAKIP", definition: "Bagay o tao na nasa loob o kasama sa isang grupo", sentence: "Ang <span class='blank'>_____</span> ng mga dokumento ay mahalaga." },
    { word: "LIRIP", definition: "Unang liwanag o aurora ng umaga", sentence: "Ang <span class='blank'>_____</span> ng araw ay nagbigay ng kasiyahan." },
    { word: "LINGAP", definition: "Pag-aalaga o pagpapahalaga sa kailangan", sentence: "Ang <span class='blank'>_____</span> ng mga magulang ay hindi madaling makuha." },
    { word: "LUKTOS", definition: "Proseso ng pagbaluktot o pagkukulat ng papel", sentence: "Ang <span class='blank'>_____</span> ng papel ay nakakapagpalain." },
    { word: "MUTYA", definition: "Mahalagang hiyas o simbolo ng kagandahan", sentence: "Ang <span class='blank'>_____</span> ng dagat ay napakaganda." },
    { word: "PAGKIT", definition: "Pandikit o relasyon sa pagitan ng mga tao", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay nakakapagpalain." },
    { word: "ABOT-TANAW", definition: "Ang pinakadulo ng maaaring makita o maabot ng tingin", sentence: "Ang <span class='blank'>_____</span> ng kanyang pangarap ay abot-kamay na." },
    { word: "AGAM-AGAM", definition: "Pagdududa o pangamba tungkol sa isang bagay", sentence: "May <span class='blank'>_____</span> siya sa mga nangyayari sa kanyang paligid." },
    { word: "ALPAS", definition: "Makawala mula sa pagkakatali o pagkakulong", sentence: "Ang ibon ay nakawala sa hawla at <span class='blank'>_____</span>." },
    { word: "ALYAS", definition: "Ibang pangalan na ginagamit sa halip ng tunay na pangalan", sentence: "Ang <span class='blank'>_____</span> niya ay Juan Dela Cruz." },
    { word: "ANI", definition: "Ang panahon ng pag-aani ng mga bunga o pananim", sentence: "Malapit na ang <span class='blank'>_____</span> ng palay sa bukid." },
    { word: "ANINO", definition: "Isang madilim na hugis na nabubuo dahil sa ilaw na tumatama sa isang bagay", sentence: "Ang <span class='blank'>_____</span> niya ay humaba dahil sa liwanag ng araw." },
    { word: "BANGIS", definition: "Kasuklam-suklam na kalupitan o kabagsikan", sentence: "Ang <span class='blank'>_____</span> ng leon ay nakita ng lahat." },
    { word: "BANGUNGOT", definition: "Isang masamang panaginip na nagdudulot ng takot o kaba", sentence: "Nagising siya mula sa isang masamang <span class='blank'>_____</span>." },
    { word: "BATID", definition: "Alam o nauunawaan ang isang bagay", sentence: "Batid niya ang lahat ng nangyayari sa kanyang pamilya." },
    { word: "BAYANIHAN", definition: "Pagkakaisa ng mga tao sa pagtutulungan para sa isang layunin", sentence: "Makikita ang <span class='blank'>_____</span> sa kanilang bayan." },
    { word: "BIGHANI", definition: "Matinding pagkahumaling o pagkagusto sa isang bagay", sentence: "Ang kanyang <span class='blank'>_____</span> sa sining ay hindi matatawaran." },
    { word: "BUKAL", definition: "Isang likas na labasan ng tubig mula sa ilalim ng lupa", sentence: "Pumunta sila sa <span class='blank'>_____</span> upang uminom ng sariwang tubig." },
    { word: "BULALAKAW", definition: "Isang bituing nahuhulog mula sa langit", sentence: "Nakita nila ang <span class='blank'>_____</span> sa kalangitan kagabi." },
    { word: "BULWAGAN", definition: "Isang maluwang na lugar sa loob ng gusali, karaniwang sa pasukan", sentence: "Nagtipon ang mga tao sa malaking <span class='blank'>_____</span> para sa pulong." },
    { word: "DAMBANA", definition: "Isang lugar ng pagsamba o pagpaparangal", sentence: "Nag-alay siya ng bulaklak sa <span class='blank'>_____</span> ng kanilang simbahan." },
    { word: "DAMBUHALA", definition: "Napakalaking nilalang o bagay", sentence: "Ang <span class='blank'>_____</span> ng kanilang bagong gusali ay kapansin-pansin." },
    { word: "DANAW", definition: "Isang maliit na lawa o pond", sentence: "Naglaro ang mga bata sa tabi ng <span class='blank'>_____</span>." },
    { word: "DANGAL", definition: "Karangalan o respeto sa sarili", sentence: "Ipinaglaban niya ang kanyang <span class='blank'>_____</span> sa harap ng akusasyon." },
    { word: "DATI", definition: "Nagpapahiwatig ng nakaraan o karaniwang kalagayan", sentence: "Ang <span class='blank'>_____</span> niyang trabaho ay isa lamang guro." },
    { word: "GUNITA", definition: "Pag-alala o pagbabalik ng mga nakaraang alaala", sentence: "Laging bumabalik sa kanya ang <span class='blank'>_____</span> ng kanilang masasayang sandali." },
    { word: "GUNIGUNI", definition: "Isang bagay na naiisip o nararamdaman ngunit hindi totoo", sentence: "Marami siyang <span class='blank'>_____</span> tungkol sa mga bagay na hindi naman nagaganap." },
    { word: "HABI", definition: "Paglikha ng isang bagay sa pamamagitan ng paghahabi ng mga sinulid", sentence: "Ang kanyang lola ay bihasa sa <span class='blank'>_____</span> ng mga banig." },
    { word: "HAGULGOL", definition: "Malakas at matinding pag-iyak", sentence: "Ang kanyang <span class='blank'>_____</span> ay narinig sa buong paligid." },
    { word: "HALAS", definition: "Nakaubos o halos wala nang natira", sentence: "Ang tubig sa balon ay <span class='blank'>_____</span> na." },
    { word: "HINAGPIS", definition: "Matinding kalungkutan o dalamhati", sentence: "Ang kanyang puso ay puno ng <span class='blank'>_____</span> matapos ang pagkawala ng kanyang kaibigan." },
    { word: "HIMBING", definition: "Malalim at maayos na pagtulog", sentence: "Siya'y natutulog nang <span class='blank'>_____</span> matapos ang pagod na araw." },
    { word: "HINAHON", definition: "Pagiging kalmado at mahinahon sa gitna ng pagsubok", sentence: "Humanga siya sa <span class='blank'>_____</span> ng kanyang kaibigan sa oras ng problema." },
    { word: "HINGAL", definition: "Paghingang mabigat at mabilis dahil sa pagod", sentence: "Hingal na hingal siya matapos ang matinding takbo." },
    { word: "HUKBO", definition: "Isang pangkat ng mga sundalo", sentence: "Dumating ang <span class='blank'>_____</span> upang ipagtanggol ang bayan." },
    { word: "IBAYO", definition: "Ang kabilang panig ng isang bagay", sentence: "Nasa <span class='blank'>_____</span> ng ilog ang kanilang tahanan." },
    { word: "IPINAGPALIBAN", definition: "Pinaatras o hindi itinuloy sa nakatakdang oras", sentence: "Ang pagpupulong ay <span class='blank'>_____</span> sa susunod na linggo." },
    { word: "ISIPAN", definition: "Kapangyarihang mag-isip o magdesisyon", sentence: "Laging abala ang kanyang <span class='blank'>_____</span> sa mga bagong ideya." },
    { word: "ISLA", definition: "Pulo o bahagi ng lupa na napapaligiran ng tubig", sentence: "Ang kanilang bakasyon ay ginanap sa isang maliit na <span class='blank'>_____</span>." },
    { word: "KABABALAGHAN", definition: "Mga bagay na hindi maipaliwanag at tila kakaiba", sentence: "Maraming <span class='blank'>_____</span> ang nangyari sa lumang bahay na iyon." },
    { word: "KALIS", definition: "Isang uri ng matalim na sandata o espada", sentence: "Ang sinaunang mandirigma ay may dalang <span class='blank'>_____</span> sa kanyang digmaan." },
    { word: "KANLUNGAN", definition: "Isang ligtas na lugar na nagbibigay proteksyon", sentence: "Ang bahay ng kanyang lola ay naging kanyang <span class='blank'>_____</span>." },
    { word: "KAPALARAN", definition: "Ang tadhana o nakaatang na mangyayari sa isang tao", sentence: "Hindi natin alam kung ano ang ating <span class='blank'>_____</span> sa hinaharap." },
    { word: "KARAMDAMAN", definition: "Isang uri ng sakit o kondisyon ng katawan", sentence: "Siya'y matagal nang pinahihirapan ng kanyang <span class='blank'>_____</span>." },
    { word: "KARIMLAN", definition: "Matinding kadiliman o kawalan ng liwanag", sentence: "Ang <span class='blank'>_____</span> ng gabi ay bumalot sa buong bayan." },
    { word: "KASAYSAYAN", definition: "Ang pagtalakay ng mga pangyayari mula sa nakaraan", sentence: "Inaaral ng mga mag-aaral ang <span class='blank'>_____</span> ng Pilipinas." },
    { word: "KASUNDUAN", definition: "Isang kasunduan o pangakong napagkasunduan ng dalawang panig", sentence: "Pinirmahan nila ang <span class='blank'>_____</span> para sa proyekto." },
    { word: "KATIPAN", definition: "Isang taong kasintahan o ipinangakong pakakasalan", sentence: "Siya'y iniibig ng kanyang <span class='blank'>_____</span> ng buong puso." },
    { word: "KAWAL", definition: "Isang sundalo o mandirigma", sentence: "Ang matapang na <span class='blank'>_____</span> ay handang mamatay para sa bayan." },
    { word: "KILOS", definition: "Ang galaw o aksyon ng isang tao", sentence: "Ang kanyang <span class='blank'>_____</span> ay mabilis at mapagmatyag." },
    { word: "KINANG", definition: "Ang liwanag o ningning ng isang bagay", sentence: "Ang <span class='blank'>_____</span> ng kanyang hikaw ay kapansin-pansin." },
    { word: "KUTA", definition: "Isang lugar na napapalibutan ng pader o proteksyon", sentence: "Ang lumang <span class='blank'>_____</span> ay nagsilbing proteksyon laban sa mga kaaway." },
    { word: "LIKAS", definition: "Natural o likha ng kalikasan", sentence: "Ang kanyang kagandahan ay <span class='blank'>_____</span> at walang halong anumang produkto." },
    { word: "LINGAP", definition: "Pag-aaruga o malasakit sa isang tao", sentence: "Ang kanyang <span class='blank'>_____</span> sa mga bata ay hindi matatawaran." },
    { word: "LUNSOD", definition: "Isang malaking bayan na sentro ng kalakalan o politika", sentence: "Lumaki siya sa isang tahimik na <span class='blank'>_____</span> malapit sa kabundukan." },
    { word: "MADLA", definition: "Isang malaking grupo ng mga tao o tao sa publiko", sentence: "Ang kanyang talumpati ay kinagiliwan ng <span class='blank'>_____</span>." },
    { word: "MAGILIW", definition: "Maamo, mabait, at mapagmalasakit na pag-uugali", sentence: "Ang kanyang <span class='blank'>_____</span> na pagtanggap sa mga bisita ay kinagigiliwan ng lahat." },
    { word: "MALASAKIT", definition: "Pagpapakita ng pagmamalasakit o pakikidama sa iba", sentence: "Ang kanyang <span class='blank'>_____</span> sa mga nangangailangan ay hindi mapapantayan." },
    { word: "MAPAGPAKUMBABA", definition: "Ang pagiging mababa ang loob o hindi mapagmataas", sentence: "Siya'y laging <span class='blank'>_____</span> sa kabila ng kanyang mga tagumpay." },
    { word: "MASINOP", definition: "Maingat at masusing pag-aayos ng mga bagay-bagay", sentence: "Ang kanyang pamamahay ay <span class='blank'>_____</span> at laging malinis." },
    { word: "MASUSI", definition: "Isang maingat at detalyadong pagsusuri o pag-aaral", sentence: "Ang <span class='blank'>_____</span> nilang pag-aaral ay nagbunga ng magandang resulta." },
    { word: "MATAIMTIM", definition: "Taos-puso at tapat na damdamin o pag-uugali", sentence: "Mataimtim siyang nanalangin bago ang pagsusulit." },
    { word: "MATAKAW", definition: "Isang taong sobra kung kumain", sentence: "Siya'y kilala bilang <span class='blank'>_____</span> sa kanilang pamilya." },
    { word: "MAYUMI", definition: "Mapino at pino ang kilos o gawi", sentence: "Ang kanyang <span class='blank'>_____</span> na pagkilos ay kinagiliwan ng lahat." },
    { word: "MUSMOS", definition: "Batang bata o inosenteng tao", sentence: "Ang mga <span class='blank'>_____</span> ay walang muwang sa mga problema ng buhay." },
    { word: "NAKATUON", definition: "Nakalagay o naka-focus sa isang bagay", sentence: "Ang kanyang isipan ay <span class='blank'>_____</span> sa kanyang mga pangarap." },
    { word: "PAHIWATIG", definition: "Pagtuturo o pagpapahiwatig ng isang bagay nang hindi direktang sinasabi", sentence: "Nagbigay siya ng <span class='blank'>_____</span> na may problema ang proyekto." },
    { word: "PANGANIB", definition: "Banta o posibleng mapanganib na sitwasyon", sentence: "Nasa <span class='blank'>_____</span> siya ng buhay noong aksidente." },
    { word: "PIGHATI", definition: "Matinding kalungkutan o pagdurusa", sentence: "Ang kanyang puso ay puno ng <span class='blank'>_____</span> matapos mawala ang kanyang mahal sa buhay." },
    { word: "SALAPI", definition: "Pera o yaman na ginagamit sa pangangalakal", sentence: "Wala siyang sapat na <span class='blank'>_____</span> upang bilhin ang kanyang mga pangarap." },
    { word: "SAMBIT", definition: "Mga salitang binibigkas nang biglaan o mula sa damdamin", sentence: "Ang kanyang <span class='blank'>_____</span> ay narinig ng lahat ng naroroon." },
    { word: "SINAG", definition: "Liwanag na nanggagaling mula sa araw o ibang bagay", sentence: "Ang <span class='blank'>_____</span> ng araw ay bumalot sa buong tanawin." },
    { word: "SINAPUPUNAN", definition: "Tiyan o lugar kung saan lumalaki ang sanggol sa loob ng ina", sentence: "Inalagaan niya ang kanyang <span class='blank'>_____</span> habang siya'y nagdadalang-tao." },
    { word: "TALIM", definition: "Matulis na bahagi ng isang bagay na ginagamit sa paghiwa", sentence: "Ang <span class='blank'>_____</span> ng kutsilyo ay sapat upang hiwain ang karne." },
    { word: "TANGHALAN", definition: "Isang lugar o entablado para sa pagtatanghal", sentence: "Ang kanilang dula ay itinanghal sa malaking <span class='blank'>_____</span> ng bayan." },
    { word: "TUKSO", definition: "Isang bagay na nagpapahiwatig o nagpapalakas ng pagnanais", sentence: "Siya'y nag-iwas sa <span class='blank'>_____</span> ng mga kasamaan." },
    { word: "ULAP", definition: "Isang puti o madilim na anyo sa langit na naglalaman ng tubig", sentence: "Ang makapal na <span class='blank'>_____</span> ay nagbabanta ng ulan." },
    { word: "WAGAS", definition: "Tapat at walang bahid-dungis na damdamin", sentence: "Ang kanyang pagmamahal ay <span class='blank'>_____</span> at walang kapantay." },
    { word: "YABAG", definition: "Tunog ng hakbang ng paa habang naglalakad", sentence: "Narinig ko ang <span class='blank'>_____</span> ng kanyang sapatos sa pasilyo." },
    { word: "Paglalakbay", definition: "Proseso ng paglalakbay o paghahatid sa ibang lugar", sentence: "Gusto ko maglakbay sa ibang bansa." },
    { word: "Halimbawa", definition: "Uri o ekemplo na nagpapakita ng ideya", sentence: "Ito ay isang halimbawa ng pangungusap." },
    { word: "Digmaan", definition: "Kapangyarihan o paglalaban sa pagitan ng magkaiba", sentence: "Ang digmaan ay nakakasira ng buhay." },
    { word: "Taglamig", definition: "Panahong malamig at panahon", sentence: "Hindi siya sanay sa temperatura ng taglamig." },
    { word: "Burol", definition: "Naglalapit na malawak na tanawin", sentence: "Ang burol ay may magandang tanawin." },
    { word: "Larawan", definition: "Gamit para sa pagtuklas o pag-istorya", sentence: "Gusto ko maglarawan ng isang tanawin." },
    { word: "Silya", definition: "Gamit para sa pag-upo", sentence: "Ginagamit ang silya para sa pag-upo." }
];


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

// Function to show instructions using the bot
function showInstructions() {
    const bot = document.getElementById('bot');
    const speechBubble = document.getElementById('speech-bubble');

    if (bot && speechBubble) {
        // Enlarge the bot
        bot.classList.add('enlarged');
        speechBubble.classList.add('instructions');

        // Display the instructions in the speech bubble
        speechBubble.innerHTML = `
            <h3>Instructions</h3>
            <p>1. 10 words.</p>
            <p>2. Unscramble the word displayed in the boxes.</p>
            <p>3. You have 2 attempts to guess the correct word.</p>
            <p>4. Use the hint button if you need help.</p>
            <p>5. Click 'Reshuffle' to reshuffle the word.</p>
            <p>6. Color feedback:</p>
            <ul>
                <li><span style="color: green;">Green</span>: Correct letter in the right position.</li>
                <li><span style="color: red;">Red</span>: Correct letter in the wrong position.</li>
                <li><span style="color: gray;">Gray</span>: Incorrect letter.</li>
            </ul>
        `;
        speechBubble.style.display = 'block';

        // Hide the instructions after 5 seconds
        setTimeout(() => {
            bot.classList.remove('enlarged');
            speechBubble.classList.remove('instructions');
            speechBubble.style.display = 'none';
        }, 5000); // Hide after 5 seconds
    }
}

// Event listener for the instruction button
document.getElementById('instructionButton').addEventListener('click', showInstructions);

    // Game buttons
    document.getElementById('startGame').addEventListener('click', startGame);
    document.getElementById('submitGuess').addEventListener('click', checkGuess);
    document.getElementById('nextWord').addEventListener('click', nextRound);
    document.getElementById('hintButton').addEventListener('click', showHint);
    document.getElementById('reshuffleButton').addEventListener('click', reshuffleWord);
});


function resetGameState() {
    usedWords = []; // Reset used words for a new session
    score = 0; // Reset score
    round = 0; // Reset round
    reshuffleUsed = false; // Reset reshuffle usage
    attempts = 0; // Reset attempts
}


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
    resetGameState(); // Reset the game state for a new session
    document.getElementById('startGame').classList.add('hidden'); // Hide the start button
    document.getElementById('game').classList.remove('hidden'); // Show the game container
    document.getElementById('nextWord').classList.add('hidden'); // Hide the next button initially
    botSay('welcome'); // Bot says a welcoming phrase
    nextRound(); // Start the first round
}

// Function to reset the game
function resetGame() {
    attempts = 0;
    nextRound();
}

// Add this to your existing JavaScript file

// Function to update the Wordle-style boxes based on the user's input
function updateWordleBoxes(userInput) {
    const scrambledWordContainer = document.getElementById('scrambledWord');
    const boxes = scrambledWordContainer.querySelectorAll('.wordle-box');

    // Clear all boxes
    boxes.forEach(box => {
        box.textContent = '';
        box.style.backgroundColor = '#fff'; // Reset to white
        box.style.color = '#000'; // Reset text color
    });

    // Update the boxes with the user's input
    for (let i = 0; i < userInput.length; i++) {
        if (boxes[i]) {
            boxes[i].textContent = userInput[i].toUpperCase();
        }
    }

    // Apply color feedback dynamically
    for (let i = 0; i < userInput.length; i++) {
        const guessedLetter = userInput[i];
        const correctLetter = currentWord[i];

        if (guessedLetter === correctLetter) {
            // Letter is in the correct position (green)
            boxes[i].style.backgroundColor = '#4caf50'; // Green
            boxes[i].style.color = '#fff'; // White text
        } else if (currentWord.includes(guessedLetter)) {
            // Letter is correct but in the wrong position (red)
            boxes[i].style.backgroundColor = '#ff3131'; // Red
            boxes[i].style.color = '#fff'; // White text
        } else {
            // Letter is not in the word (gray)
            boxes[i].style.backgroundColor = '#ccc'; // Gray
            boxes[i].style.color = '#000'; // Black text
        }
    }
}

function checkGuess() {
    const userGuess = document.getElementById('userGuess').value.trim().toLowerCase();

    if (userGuess.length !== currentWord.length) {
        alert(`Please guess a ${currentWord.length}-letter word!`);
        return;
    }

    attempts++;

    // Create a new line of boxes for the user's input
    const guessContainer = document.createElement('div');
    guessContainer.classList.add('guess-container');
    document.getElementById('game').insertBefore(guessContainer, document.getElementById('userGuess'));

    // Generate Wordle-style boxes for the user's guess
    for (let i = 0; i < userGuess.length; i++) {
        const box = document.createElement('div');
        box.classList.add('wordle-box');
        box.textContent = userGuess[i].toUpperCase();
        guessContainer.appendChild(box);

        // Apply color feedback
        const correctLetter = currentWord[i];
        if (userGuess[i] === correctLetter) {
            box.style.backgroundColor = '#4caf50'; // Green
            box.style.color = '#fff'; // White text
        } else if (currentWord.includes(userGuess[i])) {
            box.style.backgroundColor = '#ff3131'; // Red
            box.style.color = '#fff'; // White text
        } else {
            box.style.backgroundColor = '#ccc'; // Gray
            box.style.color = '#000'; // Black text
        }
    }

    if (userGuess === currentWord) {
        document.getElementById('result').innerText = 'Correct! 🎉';
        revealSentence(); // Display the unscrambled word in Wordle-style boxes
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
        revealSentence(); // Display the unscrambled word in Wordle-style boxes
        document.getElementById('nextWord').classList.remove('hidden'); // Show the next button
        botSay('incorrect'); // Bot says an encouraging phrase
        return;
    }

    document.getElementById('userGuess').value = ''; // Clear the input field
    document.getElementById('result').innerText = `Try again! Attempts left: ${maxAttempts - attempts}`;
    botSay('incorrect'); // Bot says an encouraging phrase
}

// Function to reveal the sentence and the unscrambled word in Wordle-style boxes
function revealSentence() {
    const completeSentence = currentSentence.replace("<span class='blank'>_____</span>", `<span class='correct-word'>${currentWord.toUpperCase()}</span>`);
    document.getElementById('sentence').innerHTML = completeSentence; // Display the sentence
    document.getElementById('definition').innerText = currentDefinition; // Display the definition
    document.getElementById('userGuess').style.display = 'none'; // Hide the input field
    document.getElementById('submitGuess').style.display = 'none'; // Hide the submit button

    // Display the unscrambled word in Wordle-style boxes
    const scrambledWordContainer = document.getElementById('scrambledWord');
    scrambledWordContainer.innerHTML = ''; // Clear previous boxes

    for (let i = 0; i < currentWord.length; i++) {
        const box = document.createElement('div');
        box.classList.add('wordle-box');
        box.textContent = currentWord[i].toUpperCase();
        box.style.backgroundColor = '#4caf50'; // Green for correct letters
        box.style.color = '#fff'; // White text
        scrambledWordContainer.appendChild(box);
    }
}

function nextRound() {
    round++;
    reshuffleUsed = false; // Reset reshuffle usage for the new round

    // Clear all generated lines of boxes
    const guessContainers = document.querySelectorAll('.guess-container');
    guessContainers.forEach(container => container.remove());

    // Update the progress counter
    document.getElementById('progress-counter').textContent = `${round}/${maxRounds}`;

    if (round > maxRounds) {
        // Redirect to results page
        window.location.href = `results.html?score=${score}`;
        return;
    }

    // Pick a random word from the words list
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex].word.toLowerCase();
    currentDefinition = words[randomIndex].definition;
    currentSentence = words[randomIndex].sentence;

    usedWords.push(currentWord); // Add the word to the usedWords array

    scrambledWord = scrambleWord(currentWord);

    // Generate Wordle-style boxes for the scrambled word
    const scrambledWordContainer = document.getElementById('scrambledWord');
    scrambledWordContainer.innerHTML = ''; // Clear previous boxes

    for (let i = 0; i < scrambledWord.length; i++) {
        const box = document.createElement('div');
        box.classList.add('wordle-box');
        box.textContent = scrambledWord[i].toUpperCase();
        scrambledWordContainer.appendChild(box);
    }

    // Update the UI
    document.getElementById('sentence').innerHTML = '';
    document.getElementById('definition').innerText = '';
    document.getElementById('game').classList.remove('hidden');
    document.getElementById('result').innerText = '';
    document.getElementById('userGuess').value = '';
    document.getElementById('userGuess').style.display = 'inline-block';
    document.getElementById('submitGuess').style.display = 'inline-block';
    document.getElementById('nextWord').classList.add('hidden'); // Hide the next button

    // Set the maxlength of the input field to the length of the scrambled word
    document.getElementById('userGuess').maxLength = scrambledWord.length;

    attempts = 0; // Reset attempts for the new round
}

function reshuffleWord() {
    if (reshuffleUsed) {
        // Display the message in the game UI instead of using alert()
        const messageElement = document.getElementById('message');
        if (messageElement) {
            messageElement.textContent = "You can only reshuffle once per word!";
            messageElement.style.display = 'block'; // Show the message
            setTimeout(() => {
                messageElement.style.display = 'none'; // Hide the message after 3 seconds
            }, 3000);
        }
        return;
    }

    // Reshuffle the word
    scrambledWord = scrambleWord(currentWord);

    // Update the Wordle-style boxes for the reshuffled word
    const scrambledWordContainer = document.getElementById('scrambledWord');
    scrambledWordContainer.innerHTML = ''; // Clear previous boxes

    for (let i = 0; i < scrambledWord.length; i++) {
        const box = document.createElement('div');
        box.classList.add('wordle-box');
        box.textContent = scrambledWord[i].toUpperCase();
        scrambledWordContainer.appendChild(box);
    }

    reshuffleUsed = true; // Mark reshuffle as used

    // Optionally, display a success message for reshuffling
    const messageElement = document.getElementById('message');
    if (messageElement) {
        messageElement.textContent = "Word reshuffled!";
        messageElement.style.display = 'block'; // Show the message
        setTimeout(() => {
            messageElement.style.display = 'none'; // Hide the message after 3 seconds
        }, 3000);
    }
}
// Function to show a hint
function showHint() {
    const hint = currentDefinition;
    document.getElementById('result').innerText = `Hint: ${hint}`;
}


console.log("Used Words:", usedWords);
console.log("Filtered Words:", filteredWords);

// Initialize the game
document.getElementById('startGame').classList.remove('hidden'); // Show the start button initially
document.getElementById('game').classList.add('hidden'); // Hide the game container initially
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

// Hardcoded word list for SALITA mode
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
    { word: "Ito", definition: "Panghalip na nagpapakita o nangangailangan ng isang malapit na bagay", sentence: "Ito ang libro na ginagamit ko sa aking klase." },
    { word: "Oo", definition: "Pangwakas na pagpapakita ng pagkakasundo o pagpapatotoo", sentence: "Kailangan ba ng tulong? Oo, sige." },
    { word: "Hindi", definition: "Pangwakas na pagpapakita ng pagtanggi o pagtukoy ng hindi totoo", sentence: "Gusto mo ba ng tsokolate? Hindi, salamat." },
    { word: "Gusto", definition: "Pagpapahayag ng kagustuhan o pagpapahayag ng pagninilay", sentence: "Gusto ko ang mga mansanas." },
    { word: "Tama", definition: "Nakapaghihiwalay o tumpak na tumpak", sentence: "Ang sagot ay tama." },
    { word: "Totoo", definition: "Katotohanan o sandaling totoo", sentence: "Ang kuwento ay totoo." },
    { word: "Libre", definition: "Walang bayad o hindi may limitasyon", sentence: "Ang serbisyo ay libre." },
    { word: "Kamay", definition: "Bahagi ng katawan na ginagamit para sa paghahatid ng mga bagay", sentence: "Magandang kamay mo." },
    { word: "Kailangan", definition: "Pangangailangan o kailangang bagay", sentence: "Kailangan ko ng isang kape." },
    { word: "Eleksyon", definition: "Prosesong pambansa o lokal para pumili ng opisyal", sentence: "Ang eleksyon ay mahalaga sa demokrasya." },
    { word: "Pagbabago", definition: "Proseso ng pag-alis at pagdagdag ng bagay o ideya", sentence: "Ang pagbabago ay kailangan ng panahon." },
    { word: "Dyaryo", definition: "Pamahayagang pampubliko na naglalathala ng balita at impormasyon", sentence: "Nagbabasa ako ng dyaryo sa umaga." },
    { word: "Balita", definition: "Mga kaugnayang impormasyon o kwento", sentence: "Ang balita ay nakakagulat." },
    { word: "Salamat", definition: "Pagsasabi ng pasasalamat o pagpapakahulugan", sentence: "Salamat sa tulong mo." },
    { word: "Magturo", definition: "Proseso ng pagtuturong nagbibigay ng kaalaman", sentence: "Gusto ko magturo sa mga bata." },
    { word: "Kompyuter", definition: "Elektronikong makina para sa pagproseso ng datos", sentence: "Ginagamit ko ang kompyuter sa aking trabaho." },
    { word: "Basahin", definition: "Proseso ng pagbasa o pagtuturo", sentence: "Gusto ko magbasa ng mga nobela." },
    { word: "Libro", definition: "Aklat na naglalaman ng impormasyon o kwento", sentence: "Mayroon akong isang libro tungkol sa kasaysayan." },
    { word: "Lapis", definition: "Bagay na ginagamit para mag-inscribe o magtala", sentence: "Ginagamit ko ang lapis para sa pagrereport." },
    { word: "Paglalakbay", definition: "Proseso ng paglalakbay o paghahatid sa ibang lugar", sentence: "Gusto ko maglakbay sa ibang bansa." },
    { word: "Kapit-bahay", definition: "Tao na nangunguna sa kapitbahayan", sentence: "Ang aking kapit-bahay ay mabait." },
    { word: "Pumatay", definition: "Aktong nagresulta sa kagat ng buhay", sentence: "Ang pumatay ng tao ay hindi tama." },
    { word: "Kumilos", definition: "Aksyon ng pagkilos o paggalaw", sentence: "Kailangan kumilos ngayon." },
    { word: "Halimbawa", definition: "Uri o ekemplo na nagpapakita ng ideya", sentence: "Ito ay isang halimbawa ng pangungusap." },
    { word: "Digmaan", definition: "Kapangyarihan o paglalaban sa pagitan ng magkaiba", sentence: "Ang digmaan ay nakakasira ng buhay." },
    { word: "Patay", definition: "Nakakahawa o walang buhay", sentence: "Ang hayop ay patay." },
    { word: "Takot", definition: "Emosyong nagpapakilala ng pag-iwan o pagkawala", sentence: "Nakaramdam ng takot siya sa gabi." },
    { word: "Maglaro", definition: "Aksyon ng paglalaro o pagtutugma", sentence: "Gusto ko maglaro ng basketbol." },
    { word: "Mabagal", definition: "Nakakahawa o mahina", sentence: "Ang kotse ay mabagal sa daan." },
    { word: "Malakas", definition: "May malakas na enerhiya o kakayahan", sentence: "Ang tunog ay malakas." },
    { word: "Malaki", definition: "May malaking sukat o dimsyon", sentence: "Ang bahay ay malaki." },
    { word: "Masarap", definition: "May magandang lasa o gustong kainin", sentence: "Ang pagkain ay masarap." },
    { word: "Saan", definition: "Pangwakas na nagpapakita ng lugar", sentence: "Saan ka pupunta?" },
    { word: "Ngiti", definition: "Mukhang nagpapakita ng kagandahang-loob", sentence: "May ngiti ang mukha niya." },
    { word: "Pag-ibig", definition: "Sentro ng kasing-kasing at pagpapaligay", sentence: "Ang pag-ibig ay mahalaga sa buhay." },
    { word: "Bakit", definition: "Pangwakas na nagpapakita ng dahilan", sentence: "Bakit hindi mo ginawa ang trabaho?" },
    { word: "Paano", definition: "Pangwakas na nagpapakita ng paraan o estilo", sentence: "Paano mo ginawa ang bagay?" },
    { word: "Kailan", definition: "Pangwakas na nagpapakita ng panahon", sentence: "Kailan mo ginawa ang bagay?" },
    { word: "Taba", definition: "May malaking sukat o mahaba", sentence: "Ang bata ay may taba." },
    { word: "Buhok", definition: "Naglalapit na parte ng katawan", sentence: "Ang buhok niya ay mahaba." },
    { word: "Bangko", definition: "Institusyon o lugar para sa pera", sentence: "Ginagamit ko ang bangko para sa aking pangangailangan sa pera." },
    { word: "Pera", definition: "Salapi o halaga para sa pagbili", sentence: "Kailangan ko ng pera para sa pagbili." },
    { word: "Amoy", definition: "Naglalapit na odor o lasa", sentence: "Ang amoy ng pagkain ay maaliwalas." },
    { word: "Kalsada", definition: "Lugar para sa paglalakbay ng sasakyan", sentence: "Ang kalsada ay malinis." },
    { word: "Ulan", definition: "Mga alabok ng tubig mula sa langit", sentence: "Nag-ulan ngayong umaga." },
    { word: "Kama", definition: "Gamit para sa pagtulog", sentence: "Ginagamit ko ang kama para magtulog." },
    { word: "Kumain", definition: "Aksyon ng pagkakain o pag-inom", sentence: "Gusto ko kumain ng manok." },
    { word: "Asukal", definition: "Gamit para sa pagtanghal o pagluto", sentence: "Ginagamit ang asukal para sa pagluto." },
    { word: "Itlog", definition: "Produkto ng ibon para sa pagluto", sentence: "Ginagamit ang itlog para sa pagluto ng tokwa't baboy." },
    { word: "Tinapay", definition: "Pagkain na ginagamit sa sandwich", sentence: "Ginagamit ang tinapay para sa sandwich." },
    { word: "Gatas", definition: "Lakbay para sa pagluto ng tsokolate", sentence: "Ginagamit ang gatas para sa pagluto ng tsokolate." },
    { word: "Yelo", definition: "Tubig na nakabugo para sa pagluto ng refreskante", sentence: "Ginagamit ang yelo para sa pagluto ng refreskante." },
    { word: "Puso", definition: "Central na bahagi ng katawan", sentence: "Ang puso ay mahalaga sa katawan." },
    { word: "Dugo", definition: "Tubig na nakakahawa para sa pagpapaligta ng oksiheno", sentence: "Ang dugo ay nakakatulong sa pagpapaligta ng oksiheno." },
    { word: "Tag-araw", definition: "Peryodong mainit na panahon", sentence: "Ang tag-araw ay mainit." },
    { word: "Bumili", definition: "Aksyon ng pagbili o pagkuha ng bagay", sentence: "Gusto ko bumili ng isang bag." },
    { word: "Tindahan", definition: "Lugar para sa pagbili ng mga gamit", sentence: "Ginagamit ko ang tindahan para sa pagbili ng mga gamit." },
    { word: "Magtanong", definition: "Aksyon ng pagtatanong o paghahanap ng impormasyon", sentence: "Gusto ko magtanong tungkol sa produkto." },
    { word: "Tumakbo", definition: "Aksyon ng pagtakbo o paggalaw", sentence: "Gusto ko tumakbo sa umaga." },
    { word: "Sulat", definition: "Mga salita o impormasyon na naitulat", sentence: "Ginagamit ko ang sulat para sa pagpapahayag ng aking mga damdamin." },
    { word: "Malamig", definition: "Naglalapit na temperatura o kondisyon", sentence: "Ang lugar ay malamig." },
    { word: "Lupa", definition: "Gitnang bahagi ng planeta para sa paglago ng plants", sentence: "Ang lupa ay mahalaga para sa paglago ng plants." },
    { word: "Taglamig", definition: "Peryodong malamig na panahon", sentence: "Ang taglamig ay lamig." },
    { word: "Umakyat", definition: "Aksyon ng pagtataas o paglalakbay sa bundok", sentence: "Gusto ko umakyat ng bundok." },
    { word: "Burol", definition: "Naglalapit na malawak na tanawin", sentence: "Ang burol ay may magandang tanawin." },
    { word: "Salamin", definition: "Gamit para sa pagtingin sa sarili", sentence: "Ginagamit ang salamin para sa pagtingin sa sarili." },
    { word: "Damo", definition: "Luntiang nabubuhay sa ibabaw ng lupa", sentence: "Ang damo ay lunti." },
    { word: "Trabaho", definition: "Aktibidad para sa pagkain o sustento", sentence: "Ang trabaho ay mahalaga para sa pagkain." },
    { word: "Klase", definition: "Grupong nag-aaral o nagtuturo", sentence: "Ang klase ay may mahusay na mga mag-aaral." },
    { word: "Kanta", definition: "Musikal na komposisyon o awit", sentence: "Ang kanta ay nakakakilig." },
    { word: "Tunog", definition: "Naglalapit na pagkakasalita o pagkakasalita", sentence: "Ang tunog ay malakas." },
    { word: "Pagbisita", definition: "Aksyon ng pagbabisita o paghahanap ng tao", sentence: "Gusto ko magbisita sa mga kaibigan ko." },
    { word: "Malambot", definition: "May sukat na halaman o tissu", sentence: "Ang tela ay malambot." },
    { word: "Saya", definition: "Naglalapit na kasing-kasing o pagpapaligay", sentence: "Ang paglalaro ay nakakasaya." },
    { word: "Milyon", definition: "Bagay na may isang milyong sandali", sentence: "Mayroon akong isang milyon na mga sandali." },
    { word: "Mayaman", definition: "May malaking pera o gamit", sentence: "Ang tao ay mayaman." },
    { word: "Eroplano", definition: "Mga sasakyan sa himpapawid para sa paglalakbay", sentence: "Ginagamit ang eroplano para sa paglalakbay." },
    { word: "Mundo", definition: "Kapaligiran o buong yerra", sentence: "Ang mundo ay mahalaga sa lahat ng tao." },
    { word: "Sumbrero", definition: "Gamit para sa pagprotektahan mula sa araw", sentence: "Ginagamit ang sumbrero para sa pagprotektahan sa araw." },
    { word: "Trak", definition: "Gamit para sa pagpapadala ng mga bagay", sentence: "Ang trak ay ginagamit para sa pagpapadala ng mga bagay." },
    { word: "Ilong", definition: "Bahagi ng katawan na naglalapit sa paghahalat", sentence: "Ang ilong ay mahalaga para sa paghahalat." },
    { word: "Pakinggan", definition: "Aksyon ng pagpakinggan o pagtunton", sentence: "Kailangan kong pakinggan ang awit." },
    { word: "Makinig", definition: "Aksyon ng pagtunton o pag-aalala", sentence: "Gusto ko makinig sa musika." },
    { word: "Bahay", definition: "Lugar para sa pamilya o kapamilya", sentence: "Ang bahay ay mahalaga para sa pamilya." },
    { word: "Larawan", definition: "Gamit para sa pagtuklas o pag-istorya", sentence: "Gusto ko maglarawan ng isang tanawin." },
    { word: "Atin", definition: "Panghalip na nagpapakita ng pagkakasama", sentence: "Atin ang bahay na ito." },
    { word: "Amin", definition: "Panghalip na nagpapakita ng pagkakasama", sentence: "Amin ang bahay na ito." },
    { word: "Sarili", definition: "Kapwa o tungkulin sa pagiging tao", sentence: "Ang sarili ay mahalaga." },
    { word: "Malapit", definition: "Naglalapit na distansya o relasyon", sentence: "Ang tao ay malapit sa akin." },
    { word: "Langit", definition: "Naglalapit na lugar sa himpapawid", sentence: "Ang langit ay azul." },
    { word: "Bayaran", definition: "Aksyon ng pagbabayad o pagtanggap ng pera", sentence: "Kailangan magbayad para sa serbisyo." },
    { word: "Magbayad", definition: "Aksyon ng pagbabayad o pagtanggap ng pera", sentence: "Kailangan magbayad para sa serbisyo." },
    { word: "Orasan", definition: "Gamit para sa pagtatantiya ng oras", sentence: "Ginagamit ang orasan para sa pagtatantiya ng oras." },
    { word: "Radyo", definition: "Gamit para sa pagtanggap ng balita o musika", sentence: "Ginagamit ang radyo para sa pagtanggap ng balita." },
    { word: "Singsing", definition: "Hiyas para sa pagtanghal o proteksyon", sentence: "Ang singsing ay mahalagang hiyas." },
    { word: "Tumunog", definition: "Aksyon ng pagtunog o pagiging malupit", sentence: "Ang singsing ay tumunog." },
    { word: "Silya", definition: "Gamit para sa pag-upo", sentence: "Ginagamit ang silya para sa pag-upo." },
    { word: "Bakal", definition: "Matatag na metal na ginagamit sa mga gamit", sentence: "Ang bakal ay matatag." },
    { word: "Kalye", definition: "Lugar para sa paglalakbay ng sasakyan", sentence: "Ang kalye ay malinis." },
    { word: "Opisina", definition: "Lugar para sa pagsasalita o pagsasanay", sentence: "Ginagamit ang opisina para sa trabaho." },
    { word: "Paglalakbay", definition: "Aksyon ng paglalakbay o paghahatid sa ibang lugar", sentence: "Gusto ko maglakbay sa ibang bansa." },
    { word: "Madapa", definition: "Aksyon ng pagdapa o pagdala sa daan", sentence: "Ang tao ay madapa sa daan." },
    { word: "Bulaklak", definition: "Magandang halaman na may bunga o kwento", sentence: "Ang bulaklak ay maganda." },
    { word: "Umaasa", definition: "Aksyon ng pag-asa o pagpapakita ng pagtanggap", sentence: "Ang pag-asa ay mahalaga sa buhay." },
    { word: "Pag-asa", definition: "Emosyong nagpapakita ng pagtanggap o pag-iral", sentence: "Ang pag-asa ay mahalaga sa buhay." },
    { word: "Lugar", definition: "Naglalapit na lugar o lokasyon", sentence: "Ang lugar ay mahusay." },
    { word: "Saan", definition: "Pangwakas na nagpapakita ng lugar", sentence: "Saan ka pupunta?" },
    { word: "Mabuhay", definition: "Nagpapakita ng pagpapaligay o pagpapalakas", sentence: "Mabuhay ang Pilipinas!" },
    { word: "Pagkatapos", definition: "Pangwakas na nagpapakita ng pagtatapos", sentence: "Pagkatapos ng trabaho, gustong-gusto ko magpahinga." },
    { word: "Tao", definition: "Hayop na may pag-iisip at pagpapakita", sentence: "Ang tao ay may mga damdamin." },
    { word: "Lalaking Tao", definition: "Tao na lalaki", sentence: "Ang lalaking tao ay may mga damdamin." },
    { word: "Lalaki", definition: "Tao na lalaki", sentence: "Ang lalaki ay may mga damdamin." },
    { word: "Dumating", definition: "Aksyon ng pagdating o paghahatid", sentence: "Ang tao ay dumating ngayong umaga." },
    { word: "Mabuti", definition: "Nagpapakita ng tumpak na tumpak o katuparan", sentence: "Ang bagay ay mabuti." },
    { word: "Pangalan", definition: "Pangalan o tawag ng tao", sentence: "Ang pangalan ko ay Juan." },
    { word: "Napaka", definition: "Pangwakas na nagpapakita ng malaking halaga", sentence: "Ang bagay ay napaka mahal." },
    { word: "Sobra", definition: "Nagpapakita ng malaking halaga o sobrang kailangan", sentence: "Ang bagay ay sobra sa kailangan." },
    { word: "Pagod", definition: "Nagpapakita ng malaking kagipitan o pagtitingin", sentence: "Nakaramdam ng pagod siya matapos ang trabaho." },
    { word: "Gusto", definition: "Nagpapakita ng kagustuhan o pagpapahalaga", sentence: "Gusto ko lang magpahinga." },
    { word: "Lang", definition: "Pangwakas na nagpapakita ng limitasyon", sentence: "Gusto ko lang magpahinga." }
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
            <p>2. Unscramble the word.</p>
            <p>3. You have 2 attempts to guess the correct word.</p>
            <p>4. Use the hint button if you need help.</p>
            <p>5. Click 'Reshuffle' to reshuffle the word.</p>
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
    reshuffleUsed = false; // Reset reshuffle usage for the new round

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
    document.getElementById('scrambledWord').innerText = scrambledWord;
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
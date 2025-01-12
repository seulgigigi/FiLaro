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
    
    { word: "PANATA", definition: "Pangako o sumpa", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay hindi madaling makuha." },
    { word: "PUGAY", definition: "Paggalang o pagbati", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay nakakapagpalain." },
    { word: "RIKIT", definition: "Kagandahan o kariktan", sentence: "Ang <span class='blank'>_____</span> ng mga tanawin ay napakaganda." },
    { word: "SALIK", definition: "Elemento o sangkap", sentence: "Ang <span class='blank'>_____</span> ng mga bagay ay mahalaga." },
    { word: "SINAG", definition: "Liwanag na nanggagaling sa araw", sentence: "Ang <span class='blank'>_____</span> ng araw ay nagbigay ng kasiyahan." },
    { word: "SIPING", definition: "Nasa tabi o malapit", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay nakakapagpalain." },
    { word: "TAGURI", definition: "Titulo o palayaw", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay nakakapagpalain." },
    { word: "TALAS", definition: "Katalasan ng isip", sentence: "Ang <span class='blank'>_____</span> ng mga tao ay nakakapagpalain." },
    { word: "TAMPAL", definition: "Sampal o palo", sentence: "Ang <span class='blank'>_____</span> ay hindi dapat ginagawa sa bata." },
    { word: "TAMPOK", definition: "Pangunahing tauhan o sentro", sentence: "Siya ang <span class='blank'>_____</span> ng palabas." },
    { word: "TANIKALA", definition: "Kadena o tanikala", sentence: "Ang <span class='blank'>_____</span> ay ginamit upang itali ang hayop." },
    { word: "TAMPUHAY", definition: "Pagkakataon o pagkakataon", sentence: "Ang <span class='blank'>_____</span> ay dapat samantalahin." },
    { word: "TANGLAW", definition: "Liwanag o ilaw", sentence: "Ang <span class='blank'>_____</span> ng kandila ay nagbigay ng kasiyahan." },
    { word: "TANOD", definition: "Bantay o guwardiya", sentence: "Ang <span class='blank'>_____</span> ay nagbabantay sa bahay." },
    { word: "TAPAT", definition: "Matapat o totoo", sentence: "Ang <span class='blank'>_____</span> na tao ay mahalaga." },
    { word: "TARIK", definition: "Matarik o matinding pagtaas", sentence: "Ang <span class='blank'>_____</span> ng bundok ay nakakatakot." },
    { word: "TATAG", definition: "Tibay o katatagan", sentence: "Ang <span class='blank'>_____</span> ng pamilya ay mahalaga." },
    { word: "TAWID", definition: "Paglipat o pagtawid", sentence: "Ang <span class='blank'>_____</span> ng ilog ay nakakatakot." },
    { word: "MARILAG", definition: "Maganda", sentence: "Ang <span class='blank'>_____</span> ng tanawin ay nakakamangha." },
    { word: "KATIPAN", definition: "Romantikong kapareha ng isang tao", sentence: "Ang <span class='blank'>_____</span> ay laging nagbibigay ng suporta." },
    { word: "MARAHUYO", definition: "Pagkaakit ng isang tao sa kagandahan ng bagay o isa pang tao", sentence: "Siya ay <span class='blank'>_____</span> sa ganda ng kalikasan." },
    { word: "PAGSAMO", definition: "Ang akto ng pagmamakaawa; maaari ring tumukoy sa paghingi ng tulong sa pamamagitan ng panalangin", sentence: "Ang <span class='blank'>_____</span> ay makapangyarihan kapag bukal sa puso." },
    { word: "BALINTATAW", definition: "Ang itim na bahagi ng mata na dinadaanan ng liwanag tungo sa retina", sentence: "Ang <span class='blank'>_____</span> ay mahalaga sa paningin ng tao." },
    { word: "KINAIYA", definition: "Mga katangiang taglay ng isang tao na bumubuo sa kaniyang pagkatao", sentence: "Ang <span class='blank'>_____</span> ay nagpapakilala sa tunay na pagkatao ng isang indibidwal." },
    { word: "SAPANTAHA", definition: "Kutob o palagay; ang kolokyal na salitang kadalasang ginagamit para rito ay ang terminong 'akala'", sentence: "Ang <span class='blank'>_____</span> ay maaaring magdulot ng hindi tamang konklusyon." },
    { word: "SAMYO", definition: "Salitang hindi na kadalasang ginagamit na nangangahulugang halimuyak", sentence: "Ang <span class='blank'>_____</span> ng bulaklak ay nakakapagpasaya ng puso." },
    { word: "KALINAW", definition: "Kapayapaan", sentence: "Ang <span class='blank'>_____</span> ay mahalaga para sa maayos na pamumuhay." },
    { word: "ASIKOT", definition: "Makalumang salitang Tagalog na tumutukoy sa taong pakalat-kalat", sentence: "Ang <span class='blank'>_____</span> ay hindi dapat maging modelo ng kabataan." },
    { word: "AWON", definition: "Pormal na salitang Tagalog na maaaring gamitin panghalili sa salitang 'oo'", sentence: "Ang <span class='blank'>_____</span> ay isang matikas na pagpapahayag ng pagsang-ayon." },
    { word: "KALATAS", definition: "Binigkas o nakasulat na paraan ng pakikipagkomunikasyon na karaniwang para sa pangkat ng mga tao", sentence: "Ang <span class='blank'>_____</span> ay mahalaga sa pagpapahayag ng opinyon." },
    { word: "WINGKAG", definition: "Pwersahang pagbukas ng kandado gamit ang isang baras", sentence: "Ang <span class='blank'>_____</span> ay hindi dapat gawin nang walang pahintulot." },
    { word: "TUNGGAK", definition: "Pag-angat ng ulo ng ahas o ng ulo ng isda mula sa tubig", sentence: "Ang <span class='blank'>_____</span> ay isang magandang tanawin sa dagat." },
    { word: "KINAADMAN", definition: "Kaalaman", sentence: "Ang <span class='blank'>_____</span> ay kayamanan na hindi mananakaw." },
    { word: "ALPAS", definition: "Ang akto ng paglaya o makapag-maluwag", sentence: "Ang <span class='blank'>_____</span> ay simbolo ng kalayaan." },
    { word: "ALIBUGHA", definition: "Iresponsable; walang pakundangan sa paggastos ng salapi o yaman", sentence: "Ang <span class='blank'>_____</span> ay hindi dapat maging ugali ng isang tao." },
    { word: "LUNINGNING", definition: "Liwanag o ningning", sentence: "Ang <span class='blank'>_____</span> ng mga bituin ay nakakapagbigay ng pag-asa." },
    { word: "KATAMPALASANAN", definition: "Kabastusan, kasamaan at kalokohan", sentence: "Ang <span class='blank'>_____</span> ay hindi dapat pinapalampas." },
    { word: "PARIKITAN", definition: "Ang pagandahin ang isang bagay", sentence: "Ang <span class='blank'>_____</span> ay isang sining na dapat pagyamanin." },
    { word: "PASINAYA", definition: "Pagtatalaga sa tungkulin", sentence: "Ang <span class='blank'>_____</span> ay isang mahalagang seremonya." },
    { word: "YAMOT", definition: "Inis o walang pasensya", sentence: "Ang <span class='blank'>_____</span> ay hindi dapat ipakita sa harap ng iba." },
    { word: "HUMALING", definition: "Pagkakaroon ng matinding pagmamahal o damdamin sa isang tao o bagay", sentence: "Ang <span class='blank'>_____</span> ay maaaring magdulot ng kaligayahan o kalungkutan." },
    { word: "BALDOG", definition: "Pagkauntog o pagtama ng katawan sa lupa ng hindi inaasahan", sentence: "Ang <span class='blank'>_____</span> ay maaaring magdulot ng sakit." },
    { word: "UNGKAT", definition: "Pagbanggit ng mga bagay o salita na nakalipas na", sentence: "Ang <span class='blank'>_____</span> ay maaaring magdulot ng alitan." },
    { word: "TALASTAS", definition: "Pagpapalitan ng impormasyon o kaalaman", sentence: "Ang <span class='blank'>_____</span> ay mahalaga sa komunikasyon." },
    { word: "SINUPIN", definition: "Pagtago o pag-ayos", sentence: "Ang <span class='blank'>_____</span> ng mga gamit ay dapat gawin nang maayos." },
    { word: "PAGDARAHOP", definition: "Pagkagutom o kahirapan", sentence: "Ang <span class='blank'>_____</span> ay isang malaking problema sa lipunan." },
    { word: "PAHIMAKAS", definition: "Isang huling paalam o salita", sentence: "Ang <span class='blank'>_____</span> ay puno ng emosyon at pagmamahal." },
    { word: "KILATIS", definition: "Ang pagkilala o pagsusuri", sentence: "Ang <span class='blank'>_____</span> ay mahalaga sa pagpili ng tamang desisyon." },
    { word: "BALAAN", definition: "Bigyan ng paunang paalala", sentence: "Ang <span class='blank'>_____</span> ay mahalaga upang maiwasan ang problema." },
    { word: "BALIGHO", definition: "Laban sa katwiran", sentence: "Ang <span class='blank'>_____</span> ay hindi dapat paniwalaan." },
    { word: "BINULING", definition: "Pinakinis", sentence: "Ang <span class='blank'>_____</span> na kahoy ay napakaganda." },
    { word: "BUKTOT", definition: "Nakakatakot", sentence: "Ang <span class='blank'>_____</span> na kuwento ay nagpapakilabot." },
    { word: "BULASTOG", definition: "Mayabang", sentence: "Ang <span class='blank'>_____</span> ay hindi dapat tularan." },
    { word: "BUNTON", definition: "Tambak o tumpok", sentence: "Ang <span class='blank'>_____</span> ng basura ay dapat linisin." },
    { word: "DALAMHATI", definition: "Paghihirap ng kalooban", sentence: "Ang <span class='blank'>_____</span> ay mahirap pigilan." },
    { word: "DALISAY", definition: "Puro, walang dungis", sentence: "Ang <span class='blank'>_____</span> na tubig ay mahalaga sa kalusugan." },
    { word: "DAYUKDOK", definition: "Gutom na gutom", sentence: "Ang <span class='blank'>_____</span> ay nararamdaman ng mga taong walang makain." },
    { word: "DI-MASUSUPIL", definition: "Di mapipigil", sentence: "Ang <span class='blank'>_____</span> na damdamin ay mahirap kontrolin." },
    { word: "DINALUHONG", definition: "Sinugod", sentence: "Ang <span class='blank'>_____</span> na hayop ay nakakatakot." },
    { word: "DOMINUS VOBISCUM", definition: "Sumaiyo ang Panginoon", sentence: "Ang <span class='blank'>_____</span> ay isang makabuluhang pagbati." },
    { word: "DUMANAK", definition: "Dumaloy", sentence: "Ang <span class='blank'>_____</span> na dugo ay nakakatakot." },
    { word: "DUPIKAL", definition: "Sunod-sunod na tunog ng kampana", sentence: "Ang <span class='blank'>_____</span> ay naririnig tuwing misa." },
    { word: "ENTRESWELO", definition: "Mesanin, isang silid na mas mababa sa pangalawang palapag", sentence: "Ang <span class='blank'>_____</span> ay isang magandang lugar para magpahinga." },
    { word: "ESKAPARATE", definition: "Salaming dibisyon", sentence: "Ang <span class='blank'>_____</span> ay ginagamit sa pagpapakita ng mga produkto." },
    { word: "GINUGOL", definition: "Inaksaya", sentence: "Ang <span class='blank'>_____</span> na oras ay hindi na mababawi." },
    { word: "GORA", definition: "Sombrero", sentence: "Ang <span class='blank'>_____</span> ay ginagamit para protektahan ang ulo sa araw." },
    { word: "HUDYAT", definition: "Palatandaan", sentence: "Ang <span class='blank'>_____</span> ay mahalaga sa pagtukoy ng direksyon." },
    { word: "HUKOM", definition: "Tagahatol", sentence: "Ang <span class='blank'>_____</span> ay may malaking responsibilidad sa korte." },
    { word: "IGINUGUMON", definition: "Inilulubog", sentence: "Ang <span class='blank'>_____</span> na barko ay nakakatakot." },
    { word: "IGINUGUPO", definition: "Pinaghihina", sentence: "Ang <span class='blank'>_____</span> na damdamin ay mahirap pigilan." },
    { word: "INDULGENCIA", definition: "Utang na loob", sentence: "Ang <span class='blank'>_____</span> ay isang mahalagang konsepto sa kultura." },
    { word: "IPALULON", definition: "Ipalunok, ipakain", sentence: "Ang <span class='blank'>_____</span> ay dapat gawin nang maingat." },
    { word: "IPIPIIT", definition: "Ikukulong", sentence: "Ang <span class='blank'>_____</span> ay isang parusa sa mga nagkasala." },
    { word: "ISKOBA", definition: "Brush", sentence: "Ang <span class='blank'>_____</span> ay ginagamit sa paglilinis ng sahig." },
    { word: "KABIG", definition: "Kakampi", sentence: "Ang <span class='blank'>_____</span> ay mahalaga sa pagwawagi ng laban." },
    { word: "KABUHUNGAN", definition: "Kasamaan", sentence: "Ang <span class='blank'>_____</span> ay hindi dapat pamarisan." },
    { word: "KABYAWAN", definition: "Asukarera", sentence: "Ang <span class='blank'>_____</span> ay isang lugar kung saan ginagawa ang asukal." },
    { word: "KAGYAT", definition: "Kaagad-agad", sentence: "Ang <span class='blank'>_____</span> na pagtugon ay mahalaga sa panahon ng krisis." },
    { word: "KAHALANGDON", definition: "Dignidad", sentence: "Ang <span class='blank'>_____</span> ay dapat ingatan sa lahat ng pagkakataon." },
    { word: "KAHINDIK-HINDIK", definition: "Katakot-takot", sentence: "Ang <span class='blank'>_____</span> na pangyayari ay hindi malilimutan." },
    { word: "KALAKIP", definition: "Kasama", sentence: "Ang <span class='blank'>_____</span> na dokumento ay mahalaga sa aplikasyon." },
    { word: "KALANTIRIIN", definition: "Inisin", sentence: "Ang <span class='blank'>_____</span> ay hindi dapat gawin sa kapwa." },
    { word: "KANDILI", definition: "Proteksyon", sentence: "Ang <span class='blank'>_____</span> ay mahalaga para sa kaligtasan." },
    { word: "KAPIGHATIAN", definition: "Kahirapan, kalungkutan", sentence: "Ang <span class='blank'>_____</span> ay mahirap pigilan." },
    { word: "KARUMATA", definition: "Kalesa, karuwahe", sentence: "Ang <span class='blank'>_____</span> ay isang tradisyonal na sasakyan." },
    { word: "KASAGWAAN", definition: "Kapangitan", sentence: "Ang <span class='blank'>_____</span> ay hindi dapat pansinin." },
    { word: "KASIGABUHAN", definition: "Silakbo", sentence: "Ang <span class='blank'>_____</span> ng damdamin ay mahirap kontrolin." },
    { word: "KASTILYERO", definition: "Tagagawa ng mga paputok", sentence: "Ang <span class='blank'>_____</span> ay may mahalagang papel sa pagdiriwang." },
    { word: "KATAMPALASANAN", definition: "Kalupitan", sentence: "Ang <span class='blank'>_____</span> ay hindi dapat ipagwalang-bahala." },
    { word: "KATIGAN", definition: "Sang-ayunan", sentence: "Ang <span class='blank'>_____</span> ay mahalaga sa pagbuo ng desisyon." },
    { word: "KATUKAYO", definition: "Kapangalan", sentence: "Ang <span class='blank'>_____</span> ay isang magandang pagkakataon para magkakilala." },
    { word: "KILATISIN", definition: "Uriin, kilalanin", sentence: "Ang <span class='blank'>_____</span> ay mahalaga sa pagpili ng tamang produkto." },
    { word: "KIMI", definition: "Namumula ang pisngi", sentence: "Ang <span class='blank'>_____</span> ay tanda ng kahihiyan." },
    { word: "KINAKATIGAN", definition: "Pinapakinggan o kinakampihan", sentence: "Ang <span class='blank'>_____</span> ay mahalaga sa pagpapasya." },
    { word: "KINULATA", definition: "Hinampas; pinukpok ng baril", sentence: "Ang <span class='blank'>_____</span> na hayop ay nakakatakot." },
    { word: "KUTSERO", definition: "Ang nagkokontrol sa kabayo", sentence: "Ang <span class='blank'>_____</span> ay may mahalagang papel sa transportasyon." },
    { word: "KOPA", definition: "Goblet", sentence: "Ang <span class='blank'>_____</span> ay ginagamit sa pag-inom ng alak." },
    { word: "KUWAKONG", definition: "Pinaglalagyan ng Tabako", sentence: "Ang <span class='blank'>_____</span> ay isang tradisyonal na gamit." },
    { word: "KUWALTA", definition: "Salapi, pera", sentence: "Ang <span class='blank'>_____</span> ay mahalaga sa pang-araw-araw na pamumuhay." },
    { word: "LAKAYO", definition: "Komikero (clown)", sentence: "Ang <span class='blank'>_____</span> ay nagbibigay ng saya sa mga tao." },
    { word: "LASUG-LASOG", definition: "Wasak, punit-punit, durog", sentence: "Ang <span class='blank'>_____</span> na damit ay hindi na magagamit." },
    { word: "LIHIS", definition: "Salungat", sentence: "Ang <span class='blank'>_____</span> na opinyon ay dapat respetuhin." },
    { word: "LIPAKIN", definition: "Hamakin", sentence: "Ang <span class='blank'>_____</span> ay hindi dapat gawin sa kapwa." },
    { word: "LIPOS", definition: "Puno", sentence: "Ang <span class='blank'>_____</span> na kahon ay mahirap buhatin." },
    { word: "LIWASAN", definition: "Parke, plasa", sentence: "Ang <span class='blank'>_____</span> ay isang magandang lugar para magpahinga." },
    { word: "LUBAY", definition: "Tigil o patid", sentence: "Ang <span class='blank'>_____</span> ay mahalaga sa pagpapahinga." },
    { word: "LUBONG", definition: "Lamay", sentence: "Ang <span class='blank'>_____</span> ay isang tradisyonal na seremonya." },
    { word: "LUMAGPAK", definition: "Bumagsak, nahulog", sentence: "Ang <span class='blank'>_____</span> na puno ay nakakatakot." },
    { word: "MABIMBIN", definition: "Maantala", sentence: "Ang <span class='blank'>_____</span> ay hindi dapat gawin sa trabaho." },
    { word: "MAGARA", definition: "Magarbo", sentence: "Ang <span class='blank'>_____</span> na kasuotan ay ginagamit sa espesyal na okasyon." },
    { word: "MAGPALIKAW-LIKAW", definition: "Magpaligoy-ligoy", sentence: "Ang <span class='blank'>_____</span> ay hindi dapat gawin sa pagpapaliwanag." },
    { word: "MAGTUTUDLO", definition: "Propesor", sentence: "Ang <span class='blank'>_____</span> ay may malaking impluwensya sa mga mag-aaral." },
    { word: "MAHALUGHOG", definition: "Halungkatin; suriing mabuti", sentence: "Ang <span class='blank'>_____</span> ay mahalaga sa paghahanap ng impormasyon." },
    { word: "MAKAHUMA", definition: "Makagalaw", sentence: "Ang <span class='blank'>_____</span> ay mahalaga para sa kalusugan." },
    { word: "MALAMLAM", definition: "Mapanglaw", sentence: "Ang <span class='blank'>_____</span> na panahon ay nakakapagpabagabag." },
    { word: "MAPAKALI", definition: "Mapalagay", sentence: "Ang <span class='blank'>_____</span> ay mahalaga para sa kalmado ng isip." },
    { word: "MAPANIIL", definition: "Mapang-abuso", sentence: "Ang <span class='blank'>_____</span> ay hindi dapat pamarisan." },
    { word: "MAPANUDYO", definition: "Mapanukso", sentence: "Ang <span class='blank'>_____</span> ay maaaring magdulot ng alitan." },
    { word: "MARINGAL", definition: "Marangya", sentence: "Ang <span class='blank'>_____</span> na seremonya ay puno ng kasaysayan." },
    { word: "MASASAL", definition: "Mabilis at malakas na ubo", sentence: "Ang <span class='blank'>_____</span> ay maaaring sintomas ng sakit." },
    { word: "MASATSAT", definition: "Masalita, madaldal", sentence: "Ang <span class='blank'>_____</span> ay maaaring nakakainis sa iba." },
    { word: "MASAWATA", definition: "Masupil", sentence: "Ang <span class='blank'>_____</span> ay mahalaga para sa disiplina." },
    { word: "MASIGABO", definition: "Mainit na pagtanggap, palakpakan", sentence: "Ang <span class='blank'>_____</span> ay nagpapakita ng suporta." },
    { word: "MASINSINAN", definition: "Seryosong pag-uusap", sentence: "Ang <span class='blank'>_____</span> ay mahalaga sa pagresolba ng problema." },
    { word: "MATUTUDLA", definition: "Tatamaan", sentence: "Ang <span class='blank'>_____</span> ay maaaring magdulot ng sakit." },
    { word: "MAWAGLIT", definition: "Mawala", sentence: "Ang <span class='blank'>_____</span> ay maaaring magdulot ng pagkabalisa." },
    { word: "MULALA", definition: "Tanga; hangal; mangmang", sentence: "Ang <span class='blank'>_____</span> ay hindi dapat tularan." },
    { word: "MULATO", definition: "Mestisang negro", sentence: "Ang <span class='blank'>_____</span> ay isang magandang halimbawa ng pagkakaiba-iba." },
    { word: "MUOG", definition: "Pader", sentence: "Ang <span class='blank'>_____</span> ay ginagamit para sa proteksyon." },
    { word: "NAANINAG", definition: "Makita", sentence: "Ang <span class='blank'>_____</span> ay mahalaga sa pagtukoy ng direksyon." },
    { word: "NABALISA", definition: "Nag-alala; hindi mapakali, nalungkot", sentence: "Ang <span class='blank'>_____</span> ay mahirap pigilan." },
    { word: "NAG-AATUBILI", definition: "Nag-aalinlangan", sentence: "Ang <span class='blank'>_____</span> ay maaaring magdulot ng pagkabahala." },
    { word: "NAGBABANTULOT", definition: "Nag-aalinlangan", sentence: "Ang <span class='blank'>_____</span> ay maaaring magdulot ng pagkabahala." },
    { word: "NAGBUNSOD", definition: "Nagtulak", sentence: "Ang <span class='blank'>_____</span> ay mahalaga sa pag-abot ng tagumpay." },
    { word: "NAGBUWAL", definition: "Nabagsak", sentence: "Ang <span class='blank'>_____</span> na puno ay nakakatakot." },
    
];
// Bot phrases
const botPhrases = {
    welcome: [
        "Kaya mo to!",
        "Tara na!",
        "Let's go!",
        "Simulan natin!",
        "Game na!",
        "g",
        "g"
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

/// Function to reshuffle the word
function reshuffleWord() {
    if (reshuffleUsed) {
        alert("You can only reshuffle once per word!");
        return;
    }
    scrambledWord = scrambleWord(currentWord);
    document.getElementById('scrambledWord').innerText = scrambledWord;
    reshuffleUsed = true; // Mark reshuffle as used
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
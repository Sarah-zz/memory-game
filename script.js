// ---------------------
// FONCTIONS DE BASE
// ---------------------

// Crée une carte HTML
function createCard(CardUrl) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = CardUrl;

    const cardContent = document.createElement('img');
    cardContent.classList.add('card-content');
    cardContent.src = CardUrl;

    card.appendChild(cardContent);
    return card;
}

// Duplique un tableau pour créer les paires
function duplicateArray(array) {
    return [...array, ...array];
}

// Mélange un tableau
function shuffleArray(array) {
    return array.sort(() => 0.5 - Math.random());
}

// ---------------------
// VARIABLES DU JEU
// ---------------------

const cards = [
    'https://picsum.photos/id/237/100/100',
    'https://picsum.photos/id/238/100/100',
    'https://picsum.photos/id/239/100/100',
    'https://picsum.photos/id/240/100/100',
    'https://picsum.photos/id/241/100/100',
    'https://picsum.photos/id/242/100/100',
    'https://picsum.photos/id/243/100/100',
    'https://picsum.photos/id/28/100/100'
];

const gameBoard = document.getElementById('game-board');
const message = document.getElementById('message');
const victoryText = document.getElementById('victory-text');
const restartBtn = document.getElementById('restart-btn');

let allCards = shuffleArray(duplicateArray(cards));

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// ---------------------
// INITIALISATION DU PLATEAU
// ---------------------

function setupBoard() {
    gameBoard.innerHTML = '';
    message.style.display = 'none';

    allCards = shuffleArray(duplicateArray(cards));

    allCards.forEach(url => {
        const cardEl = createCard(url);
        gameBoard.appendChild(cardEl);
    });

    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

// ---------------------
// LOGIQUE DU JEU
// ---------------------

function checkVictory() {
    const allCardsOnBoard = document.querySelectorAll('.card');
    const allDone = document.querySelectorAll('.card.done').length === allCardsOnBoard.length;
    if (allDone) {
        message.style.display = 'block';
        victoryText.textContent = "🎉 Bravo ! Tu as trouvé toutes les paires !";
    }
}

// Gestion du clic sur une carte
gameBoard.addEventListener('click', function(e) {
    const card = e.target.closest('.card');
    if (!card || lockBoard || card.classList.contains('done')) return;

    const img = card.querySelector('.card-content');

    // Ignore si déjà visible
    if (img.style.opacity === "1") return;

    // Retourne la carte
    img.style.opacity = "1";

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;

    // Si les cartes correspondent
    if (firstCard.dataset.value === secondCard.dataset.value) {
        firstCard.classList.add('found', 'done');
        secondCard.classList.add('found', 'done');

        // Applique filtre gris sur l'image
        firstCard.querySelector('.card-content').style.filter = "grayscale(100%) brightness(0.7)";
        secondCard.querySelector('.card-content').style.filter = "grayscale(100%) brightness(0.7)";

        setTimeout(() => {
            checkVictory();
        }, 400); // laisse le temps à l'animation

        firstCard = null;
        secondCard = null;
        lockBoard = false;

    } else {
        // Pas la même paire → retour
        setTimeout(() => {
            firstCard.querySelector('.card-content').style.opacity = "0";
            secondCard.querySelector('.card-content').style.opacity = "0";

            firstCard = null;
            secondCard = null;
            lockBoard = false;
        }, 800);
    }
});

// ---------------------
// BOUTON RECOMMENCER
// ---------------------

restartBtn.addEventListener('click', () => {
    setupBoard();
});

// ---------------------
// DEMARRAGE INITIAL
// ---------------------
setupBoard();

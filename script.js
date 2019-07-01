const DEFAULT_CARD = 'images/bg.png';

let playBtn = document.getElementById('play');
let highBtn = document.getElementById('high');
let lowBtn = document.getElementById('low');
let card1 = document.getElementById('currentCard');
let card2 = document.getElementById('nextCard');
let statusText = document.getElementById('statusText');
let scoreText = document.getElementById('score');

let score = 0; // Initialize score as 0 on beginning of the game.
let isPlaying = false;
let deckOfCards;
let currentCard;
let nextCard;

playBtn.addEventListener('click', () => {
    // Create deck.
    deckOfCards = createDeck()
    // Show game buttons.
    showGameButtons();
    // Information.
    statusText.innerText = 'Guess the next card value.';
    // Score
    scoreText.innerText = 'Score: ' + score;

    // Generate cards.
    currentCard = getRandomCard(deckOfCards);
    nextCard = getRandomCard(deckOfCards);
    // Display current card img.
    showCard(card1, currentCard);

    // On start, do not next card.
    card2.src = DEFAULT_CARD;
});

// Game logic
highBtn.addEventListener('click', () => {
    // If next card value is greater than current. -> Proceed.
    // If not then end game.
    if (nextCard.val >= currentCard.val) {
        correctGuess();

        currentCard = nextCard;
        showCard(card1, currentCard);

        // Generate next card if deckofcards has more than 1 card.
        // If not, then next card should be null.
        if (deckOfCards.length > 1) {
            nextCard = getRandomCard(deckOfCards);
        } else {
            nextCard = null;
        }

        if (nextCard == null) {
            console.log('Next card is null.');
            hideGameButtons();
            statusText.innerText = 'Congrats! You guessed all of the cards.';
        }

        console.log('Current: ' + currentCard.img);
        console.log('Next: ' + nextCard.img);

    } else {
        wrongGuess();
    }
});

lowBtn.addEventListener('click', () => {
    // If next card value is greater than current. -> Proceed.
    // If not then end game.
    if (nextCard.val <= currentCard.val) {
        correctGuess();

        currentCard = nextCard;
        showCard(card1, currentCard);

        if (deckOfCards.length > 1) {
            nextCard = getRandomCard(deckOfCards);
        } else {
            nextCard = null;
        }

        if (nextCard == null) {
            console.log('Next card is null.');
            hideGameButtons();
            statusText.innerText = 'Congrats! You guessed all of the cards.';
        }

        console.log('Current: ' + currentCard.img);
        console.log('Next: ' + nextCard.img);
    } else {
        wrongGuess();
    }
});


function correctGuess() {
    // Increase score
    score++;
    // Change information and score text.
    statusText.innerText = 'Correct! Now next.';
    scoreText.innerText = 'Score: ' + score;
}


function wrongGuess() {
    // Show the img of next card
    card2.src = nextCard.img;
    // Change the information
    statusText.innerText = 'Wrong guess.';
    reset();
}

function reset() {
    // Hide game buttons
    hideGameButtons();
    // Reset Deck and score
    deckOfCards = createDeck();
    score = 0;
}


function showCard(card, data) {
    // <img src="?">
    card.src = data.img;
    // <img alt="?">
    card.alt = data.val;
}


function getRandomCard(cards) {
    if (cards == null || cards.length == 1) {
        return null;
    }

    let index = getRandomInt(0, cards.length);
    let chosenCard = cards[index];

    if (chosenCard == null) {
        chosenCard = DEFAULT_CARD;

        return {
            'img': chosenCard,
            'val': ''
        }
    }

    let cardVal = chosenCard.slice(chosenCard.lastIndexOf('/') + 1, chosenCard.indexOf('.'));
    cardVal = parseInt(cardVal);
    let cardIndex = cards.indexOf(chosenCard);
    cards.splice(cardIndex, 1);

    return {
        'img': chosenCard,
        'val': cardVal
    }
}


function showGameButtons() {
    // This will show high and low btn
    // and hide play btn.
    playBtn.style.display = 'none';
    highBtn.style.visibility = 'visible';
    lowBtn.style.visibility = 'visible';
    scoreText.style.display = 'block';
}


function hideGameButtons() {
    // This will hide the high and low btn
    // and show play btn.
    playBtn.style.display = 'block';
    highBtn.style.visibility = 'hidden';
    lowBtn.style.visibility = 'hidden';
}


function createDeck() {
    let deck = [];

    for (let f = 1; f <= 4; f++) {

        let flower = '';
        if (f == 1) {
            flower = 'clovers';
        } else if (f == 2) {
            flower = 'diamonds';
        } else if (f == 3) {
            flower = 'hearts';
        } else {
            flower = 'spades';
        }

        for (let i = 1; i <= 13; i++) {
            let fn = 'images/' + flower + '/' + i.toString() + '.png';
            deck.push(fn);
        }

    }

    return deck;
}


function getRandomInt(from, to) {
    min = Math.ceil(from)
    max = Math.ceil(to)
    return Math.floor(Math.random() * (max - min)) + min
}

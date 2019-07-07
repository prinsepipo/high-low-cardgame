const DEFAULT_CARD = 'images/bg.png';

let playBtn = document.getElementById('play');
let highBtn = document.getElementById('high');
let lowBtn = document.getElementById('low');
let card1 = document.getElementById('currentCard');
let card2 = document.getElementById('nextCard');
let currentCardText = document.getElementById('currentCardText');
let nextCardText = document.getElementById('nextCardText');
let statusText = document.getElementById('statusText');
let scoreText = document.getElementById('score');
let highScoreText = document.getElementById('highScore');
let cardsLeftText = document.getElementById('cardsLeft');

let score = 0; // Initialize score as 0 on beginning of the game.
let highScore = 0;
let cardsLeft = 52;
let deckOfCards;
let currentCard;
let nextCard;

playBtn.addEventListener('click', () => {
    // Create deck.
    deckOfCards = createDeck()
    // Show game buttons.
    showGameUI();
    // Information.
    statusText.innerText = 'Guess the next card value.';
    // Score
    scoreText.innerText = 'Score: ' + score;
    // Cards Left
    cardsLeftText.innerText = cardsLeft;

    // Generate cards.
    currentCard = getRandomCard(deckOfCards);
    nextCard = getRandomCard(deckOfCards);
    // Display current card img.
    showCard(card1, currentCard);

    currentCardText.innerText = currentCard.name;
    nextCardText.innerText = 'Next Card';

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
            hideGameUI();
            statusText.innerText = 'Congrats! You guessed all of the cards.';
        }

        console.log('Current: ' + currentCard.img);
        console.log('Next: ' + nextCard.img);

    } else {
        wrongGuess();
        nextCardText.innerText = nextCard.name
    }
    currentCardText.innerText = currentCard.name;
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
            hideGameUI();
            statusText.innerText = 'Congrats! You guessed all of the cards.';
        }

        console.log('Current: ' + currentCard.img);
        console.log('Next: ' + nextCard.img);
    } else {
        wrongGuess();
        nextCardText.innerText = nextCard.name
    }
    currentCardText.innerText = currentCard.name;
});


function correctGuess() {
    // Increase score
    score++;
    // Decrease cards left
    cardsLeft--;
    // Change information, score text, and cards left text.
    statusText.innerText = 'Correct! Now next.';
    scoreText.innerText = 'Score: ' + score;
    cardsLeftText.innerText = cardsLeft;
}


function wrongGuess() {
    // Check high score.
    if (score > highScore) {
        highScore = score;
        highScoreText.innerText = 'High Score: ' + highScore;
    }
    // Show the img of next card
    card2.src = nextCard.img;
    // Change the information
    statusText.innerText = 'Wrong guess.';
    reset();
}

function reset() {
    // Hide game buttons
    hideGameUI();
    // Reset Deck and score and cards left
    deckOfCards = createDeck();
    score = 0;
    cardsLeft = 52;
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
    let cardName = '';

    if (chosenCard == null) {
        chosenCard = DEFAULT_CARD;

        return {
            'name': cardName,
            'img': chosenCard,
            'val': ''
        }
    }

    let cardVal = chosenCard.slice(chosenCard.lastIndexOf('/') + 1, chosenCard.indexOf('.'));
    cardVal = parseInt(cardVal);
    let cardIndex = cards.indexOf(chosenCard);
    cards.splice(cardIndex, 1);

    if (index >= 0 && index <= 12) {
        cardName = cardVal + ' of Clovers';
    } else if (index >= 13 && index <= 25) {
        cardName = cardVal + ' of Diamonds';
    } else if (index >= 26 && index <= 38) {
        cardName = cardVal + ' of Hearts';
    } else if (index >= 39 && index <= 51) {
        cardName = cardVal + ' of Spades';
    } else {
        cardName = '';
    }

    return {
        'name': cardName,
        'img': chosenCard,
        'val': cardVal
    }
}


function showGameUI() {
    // This will show high and low btn
    // and hide play btn.
    playBtn.style.display = 'none';
    highBtn.style.visibility = 'visible';
    lowBtn.style.visibility = 'visible';
    scoreText.style.display = 'block';
    highScoreText.style.display = 'block';
}


function hideGameUI() {
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

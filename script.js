let playBtn = document.getElementById('play');
let highBtn = document.getElementById('high');
let lowBtn = document.getElementById('low');
let card1 = document.getElementById('card1');
let statusText = document.getElementById('statusText');
let scoreText = document.getElementById('score');
let deckOfCards = createDeck();
const DEFAULT_CARD = 'images/bg.png';

playBtn.addEventListener('click', () => {
    // Initialize score as 0 on beginning of the game.
    let score = 0;
    scoreText.innerText = 'Score: ' + score;

    statusText.innerText = 'Guess the next card value.';
    console.log('Game Start!');
    // Show game buttons.
    showGameButtons();

    // Generate cards.
    let currentCard = getRandomCard(deckOfCards);
    let nextCard = getRandomCard(deckOfCards);

    console.log('Current: ' + currentCard.img);
    console.log('Next: ' + nextCard.img);

    // Display current card img.
    showCard(card1, currentCard);

    // Game logic
    highBtn.addEventListener('click', () => {
        console.log('Guess: High');
        // If next card value is greater than current. -> Proceed.
        // If not then end game.
        if (nextCard.val >= currentCard.val) {
            // increase score
            score++;

            statusText.innerText = 'Correct! Now next.';
            scoreText.innerText = 'Score: ' + score;
            console.log('Correct! ' + nextCard.val + ' > ' + currentCard.val);

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
            statusText.innerText = 'Wrong guess.';
            hideGameButtons();
            deckOfCards = createDeck();
            score = 0;
        }
    });

    lowBtn.addEventListener('click', () => {
        console.log('Guess: Low');
        // If next card value is greater than current. -> Proceed.
        // If not then end game.
        if (nextCard.val <= currentCard.val) {
            // increase score
            score++;

            statusText.innerText = 'Correct! Now next.';
            scoreText.innerText = 'Score: ' + score;
            console.log('Correct! ' + nextCard.val + ' < ' + currentCard.val);

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
            statusText.innerText = 'Wrong guess.';
            hideGameButtons();
            deckOfCards = createDeck();
            score = 0;
        }
    });

});

function showCard(card, data) {
    card.src = data.img;
    card.alt = data.val;
}


function getRandomCard(cards) {
    if (cards.length == 1) {
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
    highBtn.style.display = 'inline';
    lowBtn.style.display = 'inline';
    scoreText.style.display = 'block';
}


function hideGameButtons() {
    // This will hide the high and low btn
    // and show play btn.
    playBtn.style.display = 'block';
    highBtn.style.display = 'none';
    lowBtn.style.display = 'none';
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

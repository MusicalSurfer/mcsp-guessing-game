// Minimum and maximum values for guessing game
const minGuess = 1;
const maxGuess = 10;

// Flag to determine if the game should repeat
let repeatGame = true;

// Object to hold player highscores
let players = {};

// Main function to run the guessing game
function guessGame() {
    // Generate a new random number for each game
    const secretNumber = getRandomIntInclusive(minGuess, maxGuess);

    let guesses = 0;
    let userName = prompt("Please enter your name");

    while (true) {
        // Get user input and check for edge cases
        let userInput = userPrompt();
        if (edgeCases(userInput)) {
            continue;
        }

        // Compare user input with the secret number
        switch (true) {
            case userInput < secretNumber:
                alert('Sorry ' + userName + ', Guess higher.');
                guesses++;
                break;
            case userInput > secretNumber:
                alert('Sorry ' + userName + ', Guess lower.');
                guesses++;
                break;
            case userInput === secretNumber:
                guesses++;
                // Check if the player is new or has a better/worse score
                let newPlayerAdded = newPlayerAdd(userName, guesses);
                if (newPlayerAdded) {
                    alert('That is correct ' + userName + '! You have been added to the playerbase with a highscore of: ' + guesses + ' guesses!');
                }
                return;
            default:
                alert("Invalid input");
                break;
        }
    }
}

// Function to add a new player or update an existing player's score
function newPlayerAdd(userName, guesses) {
    if (!(userName in players)) {
        addPlayer(userName, guesses);
        return true; // Player was added for the first time
    } else {
        // Compare current score with previous highScore
        let difference = guesses - players[userName].highScore;
        alert('That is correct ' + userName + '! You ' + (difference < 0 ? 'beat' : (difference > 0 ? 'did better' : 'tied with')) + ' your previous attempt by ' + Math.abs(difference) + '!');
        players[userName].highScore = Math.min(guesses, players[userName].highScore);
        return false; // Player already existed in players object
    }
}

// Function to generate a random number between min and max (inclusive)
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + min);
}

// Function to prompt the user for a guess
function userPrompt() {
    return Number(prompt("Please guess the secret number between " + minGuess + " and " + maxGuess + "."));
}

// Function to check for edge cases (NaN, null, not an integer)
function edgeCases(userNumber) {
    if (isNaN(userNumber) || userNumber === null || !Number.isInteger(userNumber)) {
        alert("Please enter a valid input");
        return true; // Input is invalid
    }
    return false; // Input is a number/integer
}

// Function to prompt the user at the end of the game asking if they want to play again
function playAgain() {
    let redo = prompt('Play Again? Type "yes", or "no."').toLowerCase();
    return redo === "yes"; // Return true if user enters "yes"
}

// Main loop: while repeatGame is true, repeat guessGame and update repeatGame using playAgain
while (repeatGame) {
    guessGame();
    repeatGame = playAgain();
}

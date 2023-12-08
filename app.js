// Minimum number of guesses.
const minGuess = 1;

//Maximum number of guesses.
const maxGuess = 10;

// Assign random number to secret number.
const secretNumber = getRandomIntInclusive(minGuess, maxGuess);

// Variable to hold whether or not the game will repeat at the end.
let repeatGame = true;

// Object to hold player highscores.
let players = {
    // Method that adds players to the players object when called.
    addPlayer: function (userName, guesses) {
        // Creates a new object for player.
        let newPlayer = {
            highScore: guesses
        }
        // Adds new object to main players object.
        this[userName] = newPlayer;
    }
}

// Main function to calculate the guessing game.
function guessGame() {
    // Number of current user guesses.
    let guesses = 0;
    // Prompts user for userName.
    let userName = prompt("Please enter your name");

    while (true) { // While loop breaks when return is called.     
        //Prompt the user for a guess and parse into a number.
        let userInput = userPrompt();
        // Check for edge cases
        if (edgeCases(userInput)) {
            continue; // If true skip the loop and prompt again, otherwise continue.
        }
        // Switch case to determine if userInput === secretNumber. If input !== secretNumber, increment guesses and move to next case.
        switch (true) {
            case userInput < secretNumber: alert('Sorry ' + userName + ', Guess higher.'); guesses++; break;
            case userInput > secretNumber: alert('Sorry ' + userName + ', Guess lower.'); guesses++; break;
            case userInput === secretNumber: guesses++; let newPlayerAdded = newPlayerAdd(userName, guesses)
                // If newPlayerAdded returns true, then alert new player message.
                if (newPlayerAdded) {
                    alert('That is correct ' + userName + '! You have been added to the playerbase with a highscore of: ' + guesses + ' guesses!');
                }
                return; // Breaks while loop and function.
            default: alert("Invalid input"); break; // Edge case for string values.
        }
    }
}
// Function that adds a new player to the playerbase if they do not exist in the players object. If a player does already exist, compare their current score with previous highScore.
function newPlayerAdd(userName, guesses) {
    // If userName does not exist in the players object, add them.
    if (!(userName in players)) {
        players.addPlayer(userName, guesses)
        return true; // Returns true if player was added for the first time.
    }
    else {
        // Displays how many more guesses were needed from previous highscore.
        if (players[userName].highScore < guesses) {
            alert('That is correct ' + userName + '! You did better in your last game by ' + (guesses - players[userName].highScore) + '!');
        }
        // Displays how fewer guesses were needed from previous highscore.
        else if (players[userName].highScore > guesses) {
            alert('That is correct ' + userName + '! And you beat your previous attempt by ' + (players[userName].highScore - guesses) + '!');
            players[userName].highScore = guesses;
        }
        // Displays if highScore was a tie.
        else {
            alert('That is correct ' + userName + '! You have tied with your previous attempt of ' + guesses + '!');
        }
        return false; // Returns false if player already existed in players object.
    }
}
// Function uses minGuess and maxGuess to calculate random number.
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + min);
}

// Function to create prompt for user.
function userPrompt() {
    let answer = Number(prompt("Please guess the secret number between " + minGuess + " and " + maxGuess + "."));
    return answer; // returns prompt input.
}
// Edge cases that cover NaN, null, and not a integer.
function edgeCases(userNumber) {
    if (isNaN(userNumber) || userNumber === null || !Number.isInteger(userNumber)) {
        alert("Please enter a valid input");
        return true; // returns true if input is invalid.
    }
    return false; // returns false if input is a number/integer.
}
// Function that gives prompt to user at the end of the game asking if they want to play again.
function playAgain() {
    // Prompts the user to play again.
    let redo = prompt('Play Again? Type "yes", or "no."').toLowerCase();
    return redo === "yes"; // returns true if user enters "yes."
}
// While repeatGame function returns true, repeat guessGame. After game finishes, run playAgain function to update repeatGame value.
while (repeatGame) {
    guessGame(); // Main game invocation.
    repeatGame = playAgain(); // Returns boolean.
}
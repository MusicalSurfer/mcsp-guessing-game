// Minimum number of guesses.
const minGuess = 1;

//Maximum number of guesses.
const maxGuess = 10;

// Assign random number to secret number.
const secretNumber = getRandomIntInclusive(minGuess, maxGuess);

// Variable to hold whether or not the game will repeat at the end.
let repeatGame = true;
// Function uses minGuess and maxGuess to calculate random number.
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + min);
}

// Function to create prompt for user.
function userPrompt() {
    let answer = Number(prompt("Please guess the secret number between " + minGuess + " and " + maxGuess + "."));
    return answer;
}
// Edge cases that cover NaN, null, and not a integer.
function edgeCases(userNumber) {
    if (isNaN(userNumber) || userNumber === null || !Number.isInteger(userNumber)) {
        alert("Please enter a valid input");
        return true;
    }
    return false;
}
// Function that gives prompt to user at the end of the game asking if they want to play again.
function playAgain() {
    // Prompts the user to play again.
    let redo = prompt('Play Again? Type "yes", or "no."');
    let result = false;
    // Updates the result variable.
    if (redo === "yes") {
        result = true;
    }
    return result;
}
// Main function to calculate the guessing game.
function guessGame() {
    // Number of current user guesses.
    let guesses = [];
    // Prompts user for userName.
    let userName = prompt("Please enter your name");
    // While loop breaks when return is called.
    while (true) {
        //Prompt the user for a guess and parse into a number.
        let userInput = userPrompt();
        // Check for edge cases
        if (edgeCases(userInput)) {
            continue; // Skip the loop and prompt again, otherwise continue.
        }
        // Switch case to determine if userInput === secretNumber. If input !== secretNumber, increment guesses and move to next case.
        switch (true) {
            case userInput < secretNumber: alert('Sorry ' + userName + ', Guess higher.'); guesses.push(userInput); break;
            case userInput > secretNumber: alert('Sorry ' + userName + ', Guess lower.'); guesses.push(userInput); break;
            case userInput === secretNumber: guesses.push(userInput); alert('That is correct ' + userName + '! Your previous guesses were: "' + guesses.join(", ") + '!"'); return; // Breaks while loop and function.
            default: alert("Invalid input"); break;
        }
    }
}

while (repeatGame) {
    guessGame();
    repeatGame = playAgain();
}
// Minimum number of guesses.
const minGuess = 1;

//Maximum number of guesses.
const maxGuess = 10;

// Assign random number to secret number.
const secretNumber = getRandomIntInclusive(minGuess, maxGuess);

// Function uses minGuess and maxGuess to calculate random number.
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + min);
}

// Function to create prompt for user.
function userPrompt() {
    let answer = Number(prompt("Please guess the secret number between " + minGuess + " and " + maxGuess + "."));
    return answer;
}
function edgeCases(userNumber) {
    if (isNaN(userNumber) || userNumber === null || !Number.isInteger(userNumber)) {
        alert("Please enter a valid input");
        return false;
    }
    return true;
}
// Main function to calculate the guessing game.
function guessGame() {
    // Number of current user guesses.
    let guesses = 0;
    // While loop breaks when return is called.
    while (true) {
        //Prompt the user for a guess and parse into a number.
        let userInput = userPrompt();
        // Check for edge cases
        if (!edgeCases(userInput)) {
            continue; // Skip the loop and prompt again, otherwise continue.
        }
        // Switch case to determine if userInput === secretNumber. If input !== secretNumber, increment guesses and move to next case.
        switch (true) {
            case userInput < secretNumber: alert('Higher'); guesses++; break;
            case userInput > secretNumber: alert('Lower'); guesses++; break;
            case userInput === secretNumber: guesses++; alert('Correct! You guessed ' + guesses + ' times.'); return; // Breaks while loop.
            default: alert("Invalid input"); break;
        }
    }
}
// Invoke main function.
guessGame();
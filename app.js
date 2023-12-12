// Minimum and maximum values for guessing game
const minGuess = 1;
const maxGuess = 10;

let repeatGame = true; // Flag to determine if the game should repeat
let players = {}; // Object to hold player highscores
let userName = prompt("Please enter your name"); // Stores user name.

// Main function to run the guessing game
let guessGame = () => {
    const secretNumber = getRandomIntInclusive(minGuess, maxGuess); // Generate a new random number for each game

    let guesses = 0; // Start guesses at 0.

    // Loops until broken by correct user guess.
    while (true) {
        let userInput = userPrompt(); // Get user input.
        // Returns true if input is invalid.
        if (edgeCases(userInput)) {
            continue; // If input is invalid, return back to beginning of while loop
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
                let newPlayerAdded = newPlayerAdd(userName, guesses); // Check if the player is new or has a better/worse score

                // If player was added as a new player, display welcome message.
                if (newPlayerAdded) {
                    alert('That is correct ' + userName + '! You have been added to the playerbase with a highscore of: ' + guesses + ' guesses!');
                }
                return; // Exit Function when guess is correct.
            default:
                alert("Invalid input");
                break;
        }
    }
}

// Function to add a new player or update an existing player's score
let newPlayerAdd = (userName, guesses) => {
    if (!(userName in players)) {
        addPlayer(userName, guesses); // Use addPlayer function to create new player object.
        return true; // Return true if player was added for the first time.
    } else {
        let difference = guesses - players[userName].highScore; // Compare current score with previous highScore.

        // Use ternary to decide if the user receives a tie, win, or lose message based on the difference variable. If number is negative do to more guesses than highScore, use Math.abs()
        alert('That is correct ' + userName + '! You ' + (difference < 0 ? 'beat' : (difference > 0 ? 'did better' : 'tied with')) + ' on your previous attempt by ' + Math.abs(difference) + ' guesses!');

        players[userName].highScore = Math.min(guesses, players[userName].highScore); // Take the minimum between the highScore and current guess score and equate that to new highScore.
        return false; // Return false if player already existed in players object.
    }
}

// Function used by newPlayer add to create a new player.
let addPlayer = (userName, guesses) => {
    let newPlayer = { highScore: guesses }; // Declare a new object for new player.
    players[userName] = newPlayer; // Add new player object to players object.
}

// Function to generate a random number between min and max (inclusive)
let getRandomIntInclusive = (min, max) => {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + min);
}

// Function to prompt the user for a guess
let userPrompt = () => {
    return Number(prompt("Please guess the secret number between " + minGuess + " and " + maxGuess + "."));
}

// Function to check for edge cases
let edgeCases = (userNumber) => {
    // Checks for falsy values of NaN, null, 0, as well as if the guess is higher than the max guess.
    if (!userNumber || userNumber < minGuess || userNumber > maxGuess) {
        alert("Please enter a valid input");
        return true; // Input is invalid
    }
    return false; // Input is a number/integer
}

// Function to prompt the user at the end of the game asking if they want to play again
let playAgain = () => {
    let redo = confirm('Play Again?');
    return redo; // Return true if user enters "yes"
}

// Main loop: while repeatGame is true, repeat guessGame and update repeatGame using playAgain.
while (repeatGame) {
    guessGame(); // Run guessGame
    repeatGame = playAgain(); // Update repeatGame value at the end of the game.
}
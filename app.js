let minGuess = 1;
let maxGuess = 10;
const secretNumber = getRandomIntInclusive(maxGuess);

function getRandomIntInclusive(max) {
    return Math.floor(Math.random() * max) + 1;
}
var userInput = prompt("Please guess the secret number");

function guessOnce(input) {
    let guessedCorrectly = false;

    while (!guessedCorrectly) {
        input = parseInt(input);

        switch (true) {
            case input < secretNumber:
                alert("Higher");
                input = prompt("Please guess the secret number");
                break;
            case input > secretNumber:
                alert("Lower");
                input = prompt("Please guess the secret number");
                break;
            case input === secretNumber:
                alert("Correct");
                guessedCorrectly = true;
                break;
            default:
                alert("Invalid input");
                input = prompt("Please guess the secret number");
        }
    }
}
guessOnce(userInput);

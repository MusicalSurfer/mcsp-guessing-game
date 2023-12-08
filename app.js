const minGuess = 1;
const maxGuess = 10;
const secretNumber = getRandomIntInclusive(minGuess, maxGuess);

function getRandomIntInclusive(min, max) {
    return Math.floor(
        Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + min
    );
}
var userInput = prompt(
    "Please guess the secret number between " +
        minGuess +
        " and " +
        maxGuess +
        "."
);

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

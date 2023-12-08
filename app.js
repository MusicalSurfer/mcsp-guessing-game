const minGuess = 1;
const maxGuess = 10;
const secretNumber = getRandomIntInclusive(minGuess, maxGuess);
var userInput = prompt("Please guess the secret number between " + minGuess + " and " + maxGuess + ".");


function getRandomIntInclusive(min, max) {
    return Math.floor(
        Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + min
    );
}
function guessOnce(input) {
    let guessedCorrectly = false;
    input = parseInt(input);

    while (!guessedCorrectly) {
        switch (true) {
            case input < secretNumber:
                alert("Higher");
                break;
            case input > secretNumber:
                alert("Lower");
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
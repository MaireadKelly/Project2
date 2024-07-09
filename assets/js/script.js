// SCRIPT.JS
document.addEventListener("DOMContentLoaded", function() {
    let board = document.getElementById('board');
    let guessInput = document.getElementById('guess-input');
    let submitButton = document.getElementById('submit-button');
    let message = document.getElementById('message');
    let keyboard = document.getElementById('keyboard');
    let words = ["apple", "grape", "berry", "peach", "melon"];
    let answer = words[Math.floor(Math.random() * words.length)].toUpperCase();
    let currentRow = 0;

    // CREATE THE GAME BOARD
    function createBoard() {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 5; j++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('id', `cell-${i}-${j}`);
                board.appendChild(cell);
            }
        }
    };

    document.addEventListener("keyup", (e) => {

        if (guessesRemaining === 0) {
            return
        }
    
        let pressedKey = String(e.key)
        if (pressedKey === "Backspace" && nextLetter !== 0) {
            deleteLetter()
            return
        }
    
        if (pressedKey === "Enter") {
            checkGuess()
            return
        }
    
        let found = pressedKey.match(/[a-z]/gi)
        if (!found || found.length > 1) {
            return
        } else {
            insertLetter(pressedKey)
        }
    })

    document.addEventListener("keyup", (e) => {

    if (guessesRemaining === 0) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

    // CHECK THE PLAYERS GUESS
    function checkGuess() {
        let guess = guessInput.value.toUpperCase();
        if (guess.length !== 5) {
            message.textContent = "Guess must be 5 letters long";
            return;
        }
        message.textContent = "";
        
        for (let i = 0; i < 5; i++) {
            let cell = document.getElementById(`cell-${currentRow}-${i}`);
            cell.textContent = guess[i];
            if (guess[i] === answer[i]) {
                cell.classList.add('correct');
            } else if (answer.includes(guess[i])) {
                cell.classList.add('present');
            } else {
                cell.classList.add('absent');
            }
        }
        
        if (guess === answer) {
            message.textContent = "Congratulations! You've guessed the word!";
            submitButton.disabled = true;
            guessInput.disabled = true;
        } else {
            currentRow++;
            if (currentRow === 6) {
                message.textContent = `Game over! The word was ${answer}`;
                submitButton.disabled = true;
                guessInput.disabled = true;
            }
        }
        
        guessInput.value = "";
    }

    // EVENT LISTENERS
    submitButton.addEventListener('click', checkGuess);
    guessInput.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            checkGuess();
        }
    });

    // INITIALISE THE GAME
    createBoard();
     
});
document.addEventListener("DOMContentLoaded", function () {
    let board = document.getElementById('board');
    let guessInput = document.getElementById('guess-input');
    let submitButton = document.getElementById('submit-button');
    let message = document.getElementById('message');
    let words = ["apple", "horse", "roast", "store", "happy"];
    let answer = words[Math.floor(Math.random() * words.length)].toUpperCase();
    let currentRow = 0;

    function createBoard() {
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 5; j++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('id', `cell-${i}-${j}`);
                board.appendChild(cell);
            }
        }
    }

    function checkGuess() {
        let guess = guessInput.value.toUpperCase();
        if (guess.length !== 5) {
            message.textContent = "Word must be 5 letters long";
            return;
        }

        message.textContent = "";
        
        let guessLetters = guess.split('');
        let answerLetters = answer.split('');
        let correctLetters = new Array(5).fill(false);

        // First pass: Check for correct letters
        for (let i = 0; i < 5; i++) {
            if (guessLetters[i] === answerLetters[i]) {
                correctLetters[i] = true;
                answerLetters[i] = null;
            }
        }

        // Second pass: Check for present letters and absent letters
        for (let i = 0; i < 5; i++) {
            let cell = document.getElementById(`cell-${currentRow}-${i}`);
            cell.textContent = guessLetters[i];
            if (correctLetters[i]) {
                cell.classList.add('correct');
            } else if (answerLetters.includes(guessLetters[i])) {
                cell.classList.add('present');
                answerLetters[answerLetters.indexOf(guessLetters[i])] = null;
            } else {
                cell.classList.add('absent');
            }
        }

        if (guess === answer) {
            message.textContent = "Well Done!! You Guessed Right!!";
            submitButton.disabled = true;
            guessInput.disabled = true;
        } else {
            currentRow++;
            if (currentRow === 6) {
                message.textContent = `Game Over! The word was ${answer}`;
                submitButton.disabled = true;
                guessInput.disabled = true;
            }
        }

        guessInput.value = "";
    }

    submitButton.addEventListener('click', checkGuess);

    guessInput.addEventListener('keydown', function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            checkGuess();
        }
    });

    document.addEventListener("keyup", function (event) {
        let pressedKey = event.key.toUpperCase();
        if (pressedKey === "BACKSPACE") {
            guessInput.value = guessInput.value.slice(0, -1);
        } else if (pressedKey.match(/^[A-Z]$/) && guessInput.value.length < 5) {
            guessInput.value += pressedKey;
        } else if (pressedKey === "ENTER") {
            checkGuess();
        }
    });

    // Add event listeners to on-screen keyboard buttons
    document.querySelectorAll('.keyboard-button').forEach(button => {
        button.addEventListener('click', function () {
            let key = this.textContent.toUpperCase();
            if (key === 'DEL') {
                guessInput.value = guessInput.value.slice(0, -1);
            } else if (key === 'ENTER') {
                checkGuess();
            } else if (guessInput.value.length < 5) {
                guessInput.value += key;
            }
        });
    });

    createBoard();
});

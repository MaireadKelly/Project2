/*jshint esversion: 6*/
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

    /*RESTART GAME FUNCTION*/
    function restartGame() {
        currentRow = 0;
        answer = words[Math.floor(Math.random() * words.length)].toUpperCase();
        message.textContent = "";
        guessInput.value = "";
        guessInput.disabled = false;
        submitButton.disabled = false;
        board.innerHTML = "";
        createBoard();
    }

    function checkGuess() {
        let guess = guessInput.value.toUpperCase();
        if (guess.length !== 5) {
            message.textContent = "Word must be 5 letters long";
            return;
        }

        message.textContent = "";
        /*LOOP TO CHECK FOR REPEATED LETTERS*/
        let correctLetters = new Array(5).fill(false);
        let guessLetters = guess.split('');
        let answerLetters = answer.split('');

        //FIRST PASS: CHECK FOR CORRECT LETTERS
        for (let i = 0; i < 5; i++) {
            if (guessLetters[i] === answerLetters[i]) {
                correctLetters[i] = true;
                answerLetters[i] = null;
            }
        }
        // SECOND PASS: CHECK FOR PRESENT LETTERS
        for (let i = 0; i < 5; i++) {
            let cell = document.getElementById(`cell-${currentRow}-${i}`);
            cell.textContent = guess[i];
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
            setTimeout(restartGame, 3000); /*RESTART AFTER 3MINS*/

        } else {
            currentRow++;
            if (currentRow === 6) {
                message.textContent = `Game Over! The word was ${answer}`;
                submitButton.disabled = true;
                guessInput.disabled = true;
                setTimeout(restartGame, 3000); /*RESTART AFTER 3MINS*/
            }
        }
        guessInput.value = "";
    }

    submitButton.addEventListener('click', checkGuess);
    
    guessInput.addEventListener('keydown', function (event) {
        let pressedKey = event.key.toUpperCase();
        if (pressedKey === "BACKSPACE") {
            event.preventDefault();
            guessInput.value = guessInput.value.slice(0, -1);
        }
        else if (pressedKey = "ENTER") {
            event.preventDefault();
            checkGuess();
        }
        else if (pressedKey.match(/^[A-Z]$/) && guessInput.value.length < 5) {
            event.preventDefault();
        }
        }
    });


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
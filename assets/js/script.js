/*jshint esversion: 6*/
document.addEventListener("DOMContentLoaded", function () {
    let board = document.getElementById('board');
    let guessInput = document.getElementById('guess-input');
    let submitButton = document.getElementById('submit-button');
    let message = document.getElementById('message');
    let playAgainButton = document.getElementById('play-again-button');
    
    let answer = words[Math.floor(Math.random() * words.length)].toUpperCase();
    let currentRow = 0;
    let gameEnded = false; 


    function createBoard() {
        board.innerHTML = ''; 
        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 5; j++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('id', `cell-${i}-${j}`);
                board.appendChild(cell);
            }
        }
    }

    // RESTART GAME FUNCTION
    function restartGame() {
        currentRow = 0;
        answer = words[Math.floor(Math.random() * words.length)].toUpperCase();
        message.textContent = "";
        guessInput.value = "";
        guessInput.disabled = false;
        submitButton.disabled = false;
        board.innerHTML = "";
        createBoard();
        gameEnded = false;
        playAgainButton.style.display = "none"; // Hide the button when restarting the game
    }

    // CHECK GUESS FUNCTION
    function checkGuess() {
        let guess = guessInput.value.toUpperCase();
        if (guess.length !== 5) {
            message.textContent = "Word must be 5 letters long";
            return;
        }

        message.textContent = "";
        let correctLetters = new Array(5).fill(false);
        let guessLetters = guess.split('');
        let answerLetters = answer.split('');

        // CHECK FOR CORRECT LETTERS
        for (let i = 0; i < 5; i++) {
            if (guessLetters[i] === answerLetters[i]) {
                correctLetters[i] = true;
                answerLetters[i] = null;
            }
        }

        // CHECK FOR PRESENT LETTERS
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
            gameEnded = true; 
            playAgainButton.style.display = "block"; 
        } else {
            currentRow++;
            if (currentRow === 6) {
                message.textContent = `Game Over! The word was ${answer}`;
                submitButton.disabled = true;
                guessInput.disabled = true;
                gameEnded = true; 
                playAgainButton.style.display = "block"; 
            }
        }
        guessInput.value = "";
    }

    // SUBMIT BUTTON EVENT LISTENER
    submitButton.addEventListener('click', checkGuess);

    // KEY EVENT LISTENERS
    guessInput.addEventListener('keydown', function (event) {
        let pressedKey = event.key.toUpperCase();

            if (pressedKey === "BACKSPACE") {
            event.preventDefault();
            guessInput.value = guessInput.value.slice(0, -1);
        }
        
        else if (pressedKey === "ENTER") {
            event.preventDefault();
            if (gameEnded) {
                restartGame();
            } else {
                checkGuess();
            }
        }
        
        else if (pressedKey.match(/^[A-Z]$/) && guessInput.value.length < 5) {
            event.preventDefault();
            guessInput.value += pressedKey;
        }
    });

    // ON-SCREEN KEYBOARD EVENT LISTENERS
    document.querySelectorAll('.keyboard-button').forEach(button => {
        button.addEventListener('click', function () {
            let key = this.textContent.toUpperCase();
            if (key === 'DEL') {
                guessInput.value = guessInput.value.slice(0, -1);
            } else if (key === 'ENTER') {
                if (gameEnded) { 
                    restartGame();
                } else {
                    checkGuess();
                }
            } else if (guessInput.value.length < 5) {
                guessInput.value += key;
            }
        });
    });

    //  "PLAY AGAIN" BUTTON
    playAgainButton.addEventListener('click', restartGame);

    createBoard();
});

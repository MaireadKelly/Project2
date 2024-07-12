/*jshint esversion: 6*/
document.addEventListener("DOMContentLoaded", function () {
    //GET REFERENCES TO DOM ELEMENTS
    let board = document.getElementById('board');
    let guessInput = document.getElementById('guess-input');
    let submitButton = document.getElementById('submit-button');
    let message = document.getElementById('message');
    let playAgainButton = document.getElementById('play-again-button');
    let answer = words[Math.floor(Math.random() * words.length)].toUpperCase();
    let currentRow = 0;

  //FUNCTION CREATE THE GAME BOARD  
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

    // FUNCTION TO UPDATE ON-SCREEN KEYBOARD KEYS BASED ON GUESSES
    function updateKeyStates(letter, state) {
        let buttons = document.querySelectorAll('.keyboard-button');
        buttons.forEach(button => {
            if (button.textContent.toUpperCase() === letter) {
                button.classList.remove('correct', 'present', 'absent');
                button.classList.add(state);
            }
        });
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
        playAgainButton.style.display = "none"; // Hide the button when restarting the game
    }

    //RESET THE KEYBOARD BUTTON STATES
        let buttons = document.querySelectorAll('.keyboard-button');
        buttons.forEach(button => {
            button.classList.remove('correct', 'present', 'absent');
        });

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
        
            // UPDATE ON-SCREEN KEYBOARD FUNCTIONS
            guessLetters.forEach(letter => {
                if (letter) { // Check if it's not null
                    let state = 'absent';
                    if (correctLetters[guessLetters.indexOf(letter)]) {
                        state = 'correct';
                    } else if (answerLetters.includes(letter)) {
                        state = 'present';
                    }
                    updateKeyStates(letter, state);
                }
            });
        
            if (guess === answer) {
                message.textContent = "Well Done!! You Guessed Right!!";
                submitButton.disabled = true;
                guessInput.disabled = true;
                playAgainButton.style.display = "block"; 
            } else {
                currentRow++;
                if (currentRow === 6) {
                    message.textContent = `Game Over! The word was ${answer}`;
                    submitButton.disabled = true;
                    guessInput.disabled = true;
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
                checkGuess();
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
                checkGuess();
            } else if (guessInput.value.length < 5) {
                guessInput.value += key;
            }
        });
    });

    //  "PLAY AGAIN" BUTTON
    playAgainButton.addEventListener('click', restartGame);

    // INITIALISE THE GAME BOARD
    createBoard();
});

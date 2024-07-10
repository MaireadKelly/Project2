document.addEventListener("DOMContentLoaded", function() {
    let board = document.getElementById('board');

    function createBoard() {
        for (let i = 0; i < 6; i++) {
            for(let j = 0; j < 5; j++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('id', `cell-${i}-${j}`);
                board.appendChild(cell);
            }
        }
    }

    createBoard();
})
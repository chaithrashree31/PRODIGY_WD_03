const board = document.getElementById('game-board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let isGameActive = true;
let gameMode = 'human';  // Default mode

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];


function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === player;
        });
    });
}
document.getElementById('restartButton').addEventListener('click', function() {
    // Your restart game logic here
});



function checkDraw() {
    return [...cells].every(cell => cell.textContent);
}

function placeMark(cell, player) {
    if (cell.textContent === '' && isGameActive) {
        cell.textContent = player;
        if (checkWin(player)) {
            alert(`Player ${player} win the Game..!`);
            isGameActive = false;
            return;
        }
        if (checkDraw()) {
            alert('This Game is Draw..!');
            isGameActive = false;
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (gameMode === 'computer' && currentPlayer === 'O') {
            computerMove();
        }
    }
}
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (gameMode === 'computer' && currentPlayer === 'O') return;
        placeMark(cell, currentPlayer);
    });
});


restartButton.addEventListener('click', () => {
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    isGameActive = true;
});

gameModeSelect.addEventListener('change', (e) => {
    gameMode = e.target.value;
    restartButton.click();  
});
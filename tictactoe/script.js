// Writing the code for a Tic Tac Toe game
// This script handles the game logic, including marking cells, changing the turn, 
// checking for a winner, updating the score and restarting

// Creating the variables for the game
let currentTurn = '✔'; // Player 1 starts
let player1Score = 0;
let player2Score = 0;
let gameActive = true; // To check if the game is still active

// Display the current turn on the page at the start
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('current-turn').innerText = currentTurn;
});

// Function to change the turn
function changeTurn(change) {
    // Checking if the game is over then don't change the turn as its not logical to change the turn even if the game is over
    if (change !== 1){
        currentTurn = currentTurn === '✔' ? '❌' : '✔';
        document.getElementById('current-turn').innerText = currentTurn;
    }
}
// Function to mark a cell
function mark(cellId) {
    if (!gameActive) return; // If the game is not active, do nothing

    const cell = document.getElementById(cellId);
    if (cell.innerHTML !== '') return; // Cell already marked

    cell.innerHTML = currentTurn;
    // Use setTimeout to allow the DOM to update before checking for winner
    setTimeout(() => {
        changeTurn(checkWinner());
    }, 10);
}
// Function to check for a winner
function checkWinner() {
    const cells = document.querySelectorAll('.cell');
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];  
    // Check each winning combination
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].innerHTML && cells[a].innerHTML === cells[b].innerHTML && cells[a].innerHTML === cells[c].innerHTML) {
            gameActive = false; // Game ends
            updateScore(cells[a].innerHTML);
            return 1;
        }
    }
    // Check for a draw
    if ([...cells].every(cell => cell.innerHTML !== '')) {
        gameActive = false; // Game ends
        alert('It\'s a draw!');
        return 1;
    }
}

// Function to update the score
function updateScore(winner){
    player = document.getElementById(winner);
    player.innerHTML = parseInt(player.innerHTML) + 1;
    // Creating an increasing effect on the plyaer's score using css styles
    player.style.color = 'green';
    player.style.fontSize = '1.5em';
    setTimeout(() => {
        player.style.color = '';
        player.style.fontSize = '';
    }, 500);
}

// Function to restart the game
function restart(){
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.innerHTML = ''); // Clear all cells
    currentTurn = document.getElementById('turn_selection').value;
    document.getElementById('current-turn').innerText = currentTurn;
    gameActive = true; // Game is active again
}
const statusDisplay = document.querySelector('.game-status');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();
// winningcondition mark all 3 in a row combinations 3 row, 3, columns and 2 diagonol possibilities
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
// playerchange function verify state again X. if X is true swap to player O if false swap to player X
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}
// for loop cycles through all 8 win conditions to verify hand winner based on cell state
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
// if statements check state of all 3 cells in each windcondition array        
        let a = gameState[winCondition[0]];
        
        let b = gameState[winCondition[1]];
        
        let c = gameState[winCondition[2]];
       
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}
// cellClick verifies if cell 
function handleCellClick(clickedCellEvent) {
//.target grabs info from data cell index and returns string
    const clickedCell = clickedCellEvent.target;
    //parseInt string to numeric value
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
//check to see if cell has already been clicked 
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}
// once gamestatus is no longer true game restarts and reverts current player to X and clears all Cell information to blank strings
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}
// evenlistener added to .cell to make them able to be clicked as well as restart button
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

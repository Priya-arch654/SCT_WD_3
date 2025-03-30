const board = document.getElementById("board");
const statusText = document.getElementById("status");
let cells = [];
let currentPlayer = "X";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

function createBoard() {
    board.innerHTML = "";
    boardState.forEach((cell, index) => {
        let div = document.createElement("div");
        div.classList.add("cell");
        div.dataset.index = index;
        div.addEventListener("click", handleCellClick);
        board.appendChild(div);
        cells.push(div);
    });
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (boardState[index] !== "" || !gameActive) return;
    
    boardState[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add("taken");
    
    if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }
    
    if (!boardState.includes("")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }
    
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

function restartGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's Turn";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("taken");
    });
}

createBoard();

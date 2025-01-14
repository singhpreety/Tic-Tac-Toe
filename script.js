  document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset');
    const resultScreen = document.getElementById('resultScreen');
    const resultMessage = document.getElementById('resultMessage');
    const newGameButton = document.getElementById('newGame');

    let currentPlayer = 'X';
    let gameActive = true;
    const gameState = Array(9).fill(null);

    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    function checkWinner() {
      for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
          return gameState[a];
        }
      }
      return gameState.includes(null) ? null : 'Draw';
    }

    function showResult(winner) {
      resultMessage.textContent = winner === 'Draw' ? "It's a draw!" : `Player ${winner} wins!`;
      resultScreen.classList.add('active');
    }

    function updateMessage() {
      const winner = checkWinner();
      if (winner) {
        gameActive = false;
        showResult(winner);
      } else {
        message.textContent = `Player ${currentPlayer}'s turn`;
      }
    }

    function handleCellClick(event) {
      const cell = event.target;
      const cellIndex = cell.getAttribute('data-index');

      if (gameState[cellIndex] || !gameActive) {
        return;
      }

      gameState[cellIndex] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.classList.add('taken');

      const winner = checkWinner();
      if (winner) {
        updateMessage();
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateMessage();
      }
    }

    function resetGame() {
      gameActive = true;
      currentPlayer = 'X';
      gameState.fill(null);
      board.innerHTML = '';
      initializeBoard();
      message.textContent = "Player X's turn";
      resultScreen.classList.remove('active');
    }

    function initializeBoard() {
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
      }
    }

    resetButton.addEventListener('click', resetGame);
    newGameButton.addEventListener('click', resetGame);

    initializeBoard();
    updateMessage();
  });

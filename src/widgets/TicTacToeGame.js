import React, { useState } from 'react';

const TicTacToeGame = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] === null && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      checkWinner(newBoard, currentPlayer);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWinner = (board, player) => {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] === player && board[b] === player && board[c] === player) {
        setWinner(player);
        break;
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  const renderCell = (index) => {
    return (
      <div
        className="cell"
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </div>
    );
  };

  return (
    <div className="tic-tac-toe">
      <h2 className="title">Tic Tac Toe</h2>
      <div className="board">
        {board.map((cell, index) => (
          <div key={index} className="row">
            {renderCell(index)}
          </div>
        ))}
      </div>
      {winner && (
        <div className="winner">
          <p>Player {winner} wins!</p>
          <button className="play-again" onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default TicTacToeGame;

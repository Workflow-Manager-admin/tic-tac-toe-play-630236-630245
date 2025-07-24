import React from 'react';

const GameBoard = ({ squares, onSquareClick }) => {
  return (
    <div className="game-board">
      {squares.map((value, index) => (
        <button
          key={index}
          className="square"
          onClick={() => onSquareClick(index)}
          disabled={value !== null}
        >
          {value}
        </button>
      ))}
    </div>
  );
};

export default GameBoard;

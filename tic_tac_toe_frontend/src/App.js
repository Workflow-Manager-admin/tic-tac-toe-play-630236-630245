import React, { useState, useEffect } from 'react';
import './App.css';
import GameBoard from './components/GameBoard';
import Controls from './components/Controls';
import { calculateWinner, getAIMove } from './utils/gameUtils';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [gameMode, setGameMode] = useState('PVP'); // 'PVP' or 'AI'
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const gameWinner = calculateWinner(squares);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (gameMode === 'AI' && !isXNext && !gameWinner) {
      // AI's turn
      const timer = setTimeout(() => {
        const aiMove = getAIMove(squares);
        if (aiMove !== null) {
          handleSquareClick(aiMove);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [squares, isXNext, gameMode]);

  const handleSquareClick = (index) => {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const handleNewGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const handleModeChange = (newMode) => {
    setGameMode(newMode);
    handleNewGame();
  };

  const getGameStatus = () => {
    if (winner === 'draw') {
      return "It's a draw!";
    } else if (winner) {
      return `Winner: ${winner}`;
    } else {
      return `Next player: ${isXNext ? 'X' : 'O'}${gameMode === 'AI' && !isXNext ? ' (AI)' : ''}`;
    }
  };

  return (
    <div className="App">
      <div className="game-container">
        <h1>Tic Tac Toe</h1>
        <div className="game-status">{getGameStatus()}</div>
        <GameBoard 
          squares={squares}
          onSquareClick={handleSquareClick}
        />
        <Controls
          onNewGame={handleNewGame}
          onModeChange={handleModeChange}
          currentMode={gameMode}
        />
      </div>
    </div>
  );
}

export default App;

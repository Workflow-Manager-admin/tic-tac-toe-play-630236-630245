import React from 'react';

const Controls = ({ onNewGame, onModeChange, currentMode }) => {
  return (
    <div className="controls">
      <button className="btn btn-primary" onClick={onNewGame}>
        New Game
      </button>
      <button 
        className="btn btn-accent"
        onClick={() => onModeChange(currentMode === 'AI' ? 'PVP' : 'AI')}
      >
        {currentMode === 'AI' ? 'Switch to PVP' : 'Switch to AI'}
      </button>
    </div>
  );
};

export default Controls;

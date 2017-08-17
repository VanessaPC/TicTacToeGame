import React, { Component } from 'react';
import Board from './Board';

import './App.css';

class Game extends React.Component {
// changes for the settings player of the game 

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}


export default Game;

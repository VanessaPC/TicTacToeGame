import React, { Component } from 'react';
import {calculateWinner} from './GameAlgorithm.js'
import './App.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default class Board extends React.Component{
  constructor() {
    super(); 
    this.handleChanges = this.handleChanges.bind(this);
    this.initialSetup = this.initialSetup.bind(this);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      player: 0,
    };
  }
   
  initialSetup() {
     this.setState({
             squares: Array(9).fill(null),
             xIsNext: ({
                checked: false,
             }),
            player: 0,
      });
     return this.setState;
  }
  
  handleChanges(e){ 
    this.setState({
      xIsNext: e.target.value === 'X',
      player: e.target.value,
    });
  }
  
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (this.state.player === 0) {
        this.setState({
             squares: Array(9).fill(null),
        });
     return this.setState;
    }
    if (calculateWinner(squares)) {
      return;
    }  else if (squares.indexOf(null) === -1 && !calculateWinner(squares)) {
      this.status = 'Its a tie!';
      this.initialSetup();
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });

  }
  
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const player = this.player;
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="container">
        <div className="settings-game row">
          <div className="col-xs-12 col-md-12 col-lg-12 center">
            <h3>Tic Tac Toe game</h3>
            <p>Choose which one you want to play:</p>
            <ul>
            <li>
            <label>
                <input id="X" 
                    type="radio"
                    name="player"
                    value = 'X'
                    disabled = {this.state.player}
                    checked={this.state.player === 'X'}
                    onChange={this.handleChanges}
                />
                &nbsp; I am 'X'
            </label>
            </li>
            <li>
            <label>
                <input id="O" 
                        type="radio" 
                        name="player"  
                        value='O'
                        disabled = {this.state.player}
                        checked={this.state.player === 'O'}
                        onChange={this.handleChanges}
                    />
                &nbsp; I am 'O'
            </label>
            </li>
          </ul>
        </div>
        </div>
        <div className="status col-xs-12 col-md-12 col-lg-12 center">{status}</div>
        <div className="board-row col-xs-12 col-md-12 col-lg-12 center">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row col-xs-12 col-md-12 col-lg-12 center">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row col-xs-12 col-md-12 col-lg-12 center">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="col-xs-12 col-md-12 col-lg-12 center"> 
          <button type='submit'  onClick={this.initialSetup} className="submit-button">
            Clear game 
          </button>
        </div>
      </div>
    );
  }
}
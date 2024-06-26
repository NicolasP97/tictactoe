"use client";

import styles from "./Board.module.css";
import { useState } from "react";

function Square({
  value,
  onSquareClick,
}: {
  value: string;
  onSquareClick: any;
}) {
  return (
    <button className={styles.square} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, atMove }) {
  function handleClick(i) {
    if (squares[i] != null || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  function DrawBoard() {
    const boardRows = [];

    for (let i = 0; i < 3; i++) {
      let boardRow = [];
      for (let j = 0; j < 3; j++) {
        const index = i * 3 + j;
        boardRow.push(
          <Square
            key={index}
            value={squares[index]}
            onSquareClick={() => handleClick(index)}
          />
        );
      }
      boardRows.push(
        <div key={i} className={styles.boardrow}>
          {boardRow}
        </div>
      );
    }
    return <div>{boardRows}</div>;
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Finished! The Winner is: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className={styles.status}>{status}</div>
      <div className={styles.status}>You are at move #{atMove}</div>
      <div>
        <DrawBoard />
      </div>
    </>
  );
}

export function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          atMove={currentMove}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: { squares: any }) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

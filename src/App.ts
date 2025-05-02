import React, { useState } from 'react';
import Light from './components/light';
import Confetti from 'react-confetti';

type Board = boolean[][];

export function App(): JSX.Element {
  const generateNewBoard = (): Board => {
    const array: Board = [];
    for (let i = 0; i < 5; i++) {
      const row: boolean[] = [];
      for (let j = 0; j < 5; j++) {
        row.push(Math.random() < 0.5);
      }
      array.push(row);
    }
    return array;
  };

  const findNeighbors = (row: number, col: number): number[][] => {
    const neighbors: number[][] = [];
    const candidates: number[][] = [
      [row, col],
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1]
    ];
    for (let i = 0; i < candidates.length; i++) {
      const [r, c] = candidates[i];
      if (r >= 0 && r < 5 && c >= 0 && c < 5) {
        neighbors.push([r, c]);
      }
    }
    return neighbors;
  };

  const checkIfNeighborIncludes = (neighbors: number[][], row: number, col: number): boolean => {
    return neighbors.some(([r, c]) => r === row && c === col);
  };

  const handleLightClick = (row: number, col: number): void => {
    const neighbors = findNeighbors(row, col);
    setBoard(prevBoard =>
      prevBoard.map((prevRow, rowIndex) =>
        prevRow.map((val, colIndex) =>
          checkIfNeighborIncludes(neighbors, rowIndex, colIndex) ? !val : val
        )
      )
    );
    setMoves(prevMoves => prevMoves + 1);
  };

  const resetGame = (): void => {
    setBoard(generateNewBoard());
    setMoves(0);
  };

  const [board, setBoard] = useState<Board>(generateNewBoard());
  const [moves, setMoves] = useState<number>(0);

  const isGameOver: boolean = board.every(row => !row.includes(true));

  const lightElements = board.map((row: boolean[], rowIndex: number) => (
    <React.Fragment key={rowIndex}>
      {row.map((on: boolean, colIndex: number) => (
        <Light
          key={`${rowIndex}-${colIndex}`}
          row={rowIndex}
          col={colIndex}
          val={on}
          handleLightClick={handleLightClick}
          isGameOver={isGameOver}
        />
      ))}
    </React.Fragment>
  ));

  return (
    <div className="App">
      <main>
        {isGameOver && <Confetti recycle={false} numberOfPieces={1000} />}
        <header>
          <h1>Lights Out</h1>
          <p>Moves: {moves}</p>
        </header>
        <section className="board">{lightElements}</section>
        <button id="resetGameButton" onClick={resetGame}>
          Reset game
        </button>
      </main>
    </div>
  );
}

// Log to console
console.log('Hello console');

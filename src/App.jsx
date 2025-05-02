import React from 'react';
import Light from './components/light'
import Confetti from "react-confetti"

export function App(props) {
  
  function generateNewBoard(){
    const array = []
    for(let i = 0; i < 5; i++){
      const row = []
      for (let j = 0; j < 5; j++){
        row.push(Math.random() < 0.5)
      }
      array.push(row)
    }
    return array
  }

  function findNeighbors(row, col){
    const neighbors = []
    const candidates = [
      [row, col],
      [row-1, col],
      [row+1, col],
      [row, col-1],
      [row, col+1]
    ]
    for (let i = 0; i < candidates.length; i++){
      if (0 < candidates[i][0] < 5 && 0 < candidates[i][1] < 5){
        neighbors.push(candidates[i])
      }
    }
    return neighbors
  }

  function checkIfNeighborIncludes(neighbors, row, col){
    for(let i = 0; i < neighbors.length; i++){
      if (neighbors[i][0] === row && neighbors[i][1] === col){
        return true
      }
    }
    return false
  }

  function handleLightClick(row, col){
    const neighbors = findNeighbors(row, col)
    setBoard(prevBoard => prevBoard.map((prevRow, rowIndex) => prevRow.map((val, colIndex) => {
      if (checkIfNeighborIncludes(neighbors, rowIndex, colIndex)){
        return !val
      }
      else{
        return val
      }
    })))
    setMoves(prevMoves => prevMoves + 1)
  }

  function resetGame(){
    setBoard(generateNewBoard())
    setMoves(0)
  }

  const [board, setBoard] = React.useState(generateNewBoard())
  const [moves, setMoves] = React.useState(0)
  
  const isGameOver = board.every((row) => !row.includes(true))
  
  const lightElements = board.map((row, rowIndex) => {
    return (
      <>
        {row.map((on, colIndex) => {
          return (
            <Light
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex} 
              col={colIndex} 
              val={on}
              handleLightClick={handleLightClick}
              isGameOver={isGameOver}
            />
        )})}
      </>
    )
    })

  return (
    <div className='App'>
      <main>
        {
          isGameOver && 
              <Confetti
                  recycle={false}
                  numberOfPieces={1000}
              />
        }
        <header>
          <h1>Lights out</h1>
          <p>Moves: {moves}</p>
        </header>
        <section className="board">
          {lightElements}
        </section>
        <button id="resetGameButton" onClick={() => resetGame()}>Reset game</button>
      </main>
    </div>
  );
}

// Log to console
console.log('Hello console')
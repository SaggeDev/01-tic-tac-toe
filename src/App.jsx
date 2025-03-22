import './App.css'
import { React } from 'react'
import { useState } from 'react'

const TURNS = {
  X: 'x',
  O: 'o'
}

const Square = ({ children, updateBoard, index, isSelected }) => {//Esto es un componente
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const hadleClick = () => {
    updateBoard(index)

  }
  return (
    <div className={className} onClick={hadleClick}>
      {children}
    </div>
  )

}
const WINNER_COMBOS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6]  // Diagonal top-right to bottom-left
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)//Si no hay ganador, null

  const checkWinner = (board_to_check) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      console.log(combo)
      if(board_to_check[a]
        &&board_to_check[a]===board_to_check[b]
        &&board_to_check[b]===board_to_check[c]
      ){
        console.log(board_to_check[b])
        return board_to_check[a]
      }
    }
    return null

  }
  const resetGame=()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
  const checkEndGame=(newBoard)=>{
    return newBoard.every((cell)=>cell!==null)
  }
  const updateBoard = (index) => {
    //Si ya tiene algo que no es null, vuelve pa casa
    if (board[index]||winner) return
    const newBoard = [...board]//No se debe de cambiar el original porque react compara con la funcion set si hay que re-renderizar el componente
    //? Rest Operator: Agarra items y los mete en un array
    //? Spread Operator: Agarra los items de un array y los suelta
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    
    const newWinner=checkWinner(newBoard)
    if(newWinner){
      //Dado a que aa actualización de los estados en react es asíncrona, usamos el nuevo valor para no cometer errores de desarrollo
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
    

  }
  return (
    <main className='board'>
      <button onClick={resetGame}>Reset</button>
      <h1>Tic tac toe</h1>
      <section className='game'>
        {
          board.map((_, index) => {//? _ sirve para indicar que la variable está vacia intencionalemnte, para un valor real seria el propio valor y el index
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      {
        winner!==null&&(//TODO: Know what this is
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner===false
                  ?'Empate'
                  :'Ganó: '
                }
              </h2>
              <header className='win'>
                {winner&&<Square>{winner}</Square>}
              </header>
              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>

          </section>
        )

        }
      
    </main>
  )
}

export default App

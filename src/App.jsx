//* Importes
import './App.css'
import { React } from 'react'
import { useState } from 'react'
import { Square } from './components/Square'
import confetti from 'canvas-confetti'
import {TURNS,WINNER_COMBOS} from './constants'
import {checkEndGame, checkWinner} from './logic/boardCheck'
import { WinnerModal } from './components/WinnerModal'

//* Función principal
function App() {
  //^ Estados
  const [board, setBoard] = useState(Array(9).fill(null)) //Casillas vacias
  const [turn, setTurn] = useState(Math.random()>0.5?(TURNS.X):(TURNS.O))              //Empieza en X siempre
  const [winner, setWinner] = useState(null)            //Si no hay ganador, se mantendrá en null. Si lo hay, el tipo(O/X). Si es empate, false

  //^ Función -> para resetear los estados
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(Math.random()>0.5?(TURNS.X):(TURNS.O))
    setWinner(null)
  }

  //^ Función -> para resetear los estados
  const updateBoard = (index) => {
    if (board[index] || winner) return                            //Si la casilla ya está llena o hay un ganador, no hagas nada
    const newBoard = [...board]                                  //Atualizar el estado del tablero
    //? Rest Operator: Agarra items y los mete en un array
    //? Spread Operator: Agarra los items de un array y los suelta
    newBoard[index] = turn
    setBoard(newBoard)
    //Actualizar el turno con una ternaria
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)          //Saca el ganador
    if (newWinner) {                                //Si hay gandor, actualiza
      //Dado a que la actualización de los estados en react es asíncrona, usamos el nuevo valor para no cometer errores de desarrollo
      setWinner(newWinner)           
      confetti()             
    } else if (checkEndGame(newBoard)) {         //Si no lo hay, comprueba si hay empate
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
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square> {/*Si es true, se manda el estilo */}
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      {/*//^Función corta para mostrar un catel si hay ganador*/}
      <WinnerModal winner={winner} resetGame={resetGame}/>
    </main>
  )
}

export default App

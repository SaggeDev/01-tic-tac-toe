import {TURNS,WINNER_COMBOS} from '../constants'
//^ Función -> que devuelve el ganador
export const checkWinner = (board_to_check) => {            //Le pasamos todo el tablero
    for (const combo of WINNER_COMBOS) {              //Por cada posición ganadora
        const [a, b, c] = combo                        //Subdivide las posiciones
        if (board_to_check[a]                         //Si todas los dueños de las casillas son iguales
            && board_to_check[a] === board_to_check[b]
            && board_to_check[b] === board_to_check[c]
        ) {
            return board_to_check[a]                //Devuelveme el dueño 
        }
    }
    return null                              //Si no hay ganador, dame null
}
//^ Función -> para saber si es está todo lleno pero no hay ganador
export const checkEndGame = (newBoard) => {
    return newBoard.every((cell) => cell !== null) //Función corta que devuelve true si cada casilla está llena
}
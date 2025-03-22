//* Componente de los cuadraditos
export const Square = ({ children, updateBoard, index, isSelected }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`    //La clase varía dependiendo de si la variable renderizada existe(true) o no(false)
  const hadleClick = () => {
    updateBoard(index)
  }
  return (
    <div className={className} onClick={hadleClick}>
      {children}
    </div>
  )
}
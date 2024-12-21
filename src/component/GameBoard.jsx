const GameBoard = ({ onSelectSquare, board }) => {
  return(
    <div id="game-board">
      { board.map(( row, rowIndex ) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol,colIndex) => (
              <li key={colIndex}>
                <button onClick={() => onSelectSquare( rowIndex, colIndex )}
                  disabled={playerSymbol !== null}>{playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </div>
  )
}

export default GameBoard;
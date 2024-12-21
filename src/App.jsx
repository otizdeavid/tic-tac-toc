import { useState } from "react";

import Player from './component/Player';
import GameBoard from './component/GameBoard';
import GameOver from './component/GameOver';
import Log from './component/Log';
import { WINNING_COMBINATION } from './component/winning-combination';

const PLAYER = {
  X: 'player 1',
  O: 'player 2',
}

const initialGameBoard = [
  [ null, null, null ],
  [ null, null, null ],
  [ null, null, null ],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O'
  }
  return currentPlayer;
}                       

function deriveGameBoard(gameTurns) {
  let gameBoard = [...initialGameBoard.map((array) => [...array])];
  for(const turn of gameTurns) {
    const {square, player} = turn;
    const { row, col } = square;
    gameBoard [row][col] = player;
  }
  return gameBoard;
}

function deriveWinner( gameBoard, players ) {
  let winner;
  for (const combination of WINNING_COMBINATION ) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  
  const [players, setPlayers] = useState(PLAYER);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer( gameTurns );
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare ( rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedturns = [
        {square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prevTurns,
      ];

      return updatedturns;

    });
  }

  function handleRestart () { 
    setGameTurns([]);
  }


  function handlePlayerNameChange ( symbol, newName) {
    setPlayers(prevPlayers => {
      return{
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName={PLAYER.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
            />
          <Player
            initialName={PLAYER.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}/>
        </ol>
        {( winner || hasDraw) && (<GameOver winner = { winner } onRestart={handleRestart}/>)}
        <GameBoard 
          onSelectSquare={handleSelectSquare}
          board={gameBoard}/>
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App;

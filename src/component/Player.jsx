import { useState } from "react"

const Player = ({ initialName, symbol, isActive, onChangeName }) => {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);


  function handleEditClick () {
    setIsEditing((editing) => !editing);

    if(isEditing){
      onChangeName(symbol, playerName)
    }
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>

  if (isEditing) {
    editablePlayerName = < input 
      type="text"
      required
      value={playerName}
      onChange={(e)=> setPlayerName(e.target.value)}/>
  }

  return(
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{ isEditing ? "save" : "Edit" }</button>
    </li>
  )
}

export default Player;
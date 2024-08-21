import { useState } from "react";

export default function Player({name,symbol,isActive,changeName}){
   const  [editable,setEditable]=useState(false);
   const  [playerName,setPlayerName]=useState(name);
   const editHandler=()=>{
      // here we can set any name for paramenter the paramteter is defualt provided by react and it is the latest updated vlaue of state
    setEditable((edit)=>!edit);
    if(editable){
      changeName(symbol,playerName);
    }
    
   }
   const playerNameHandler=(event)=>{
      setPlayerName(event.target.value)
   }
return(
    <>
         <li className={isActive?'active':undefined}>
          <span className="player">
          {editable ?<input type="text" placeholder="Enter name" required value={playerName} onChange={playerNameHandler}/>:<span className="player-name">{playerName}</span>}
          <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={editHandler}> {editable ?'Save':'Edit'}</button>
        </li>
        </>
);
}
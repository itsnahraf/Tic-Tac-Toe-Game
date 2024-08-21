import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react";
import Log from "./components/Log";
import Gameover from "./components/GameOver";

 const WINNING_COMBINATIONS = [
  [
    { row: 0, column: 0 },
    { row: 0, column: 1 },
    { row: 0, column: 2 },
  ],
  [
    { row: 1, column: 0 },
    { row: 1, column: 1 },
    { row: 1, column: 2 },
  ],
  [
    { row: 2, column: 0 },
    { row: 2, column: 1 },
    { row: 2, column: 2 },
  ],
  [
    { row: 0, column: 0 },
    { row: 1, column: 0 },
    { row: 2, column: 0 },
  ],
  [
    { row: 0, column: 1 },
    { row: 1, column: 1 },
    { row: 2, column: 1 },
  ],
  [
    { row: 0, column: 2 },
    { row: 1, column: 2 },
    { row: 2, column: 2 },
  ],
  [
    { row: 0, column: 0 },
    { row: 1, column: 1 },
    { row: 2, column: 2 },
  ],
  [
    { row: 0, column: 2 },
    { row: 1, column: 1 },
    { row: 2, column: 0 },
  ],
];
const initialGameBoard=[
  [null,null,null],
  [null,null,null],
  [null,null,null],
];
const deriveActivePlayer=(gameTurns)=>{
  let currentPlayer='x';
      if(gameTurns.length>0 && gameTurns[0].player==='x'){
        currentPlayer='o';
      }
      return currentPlayer;
}
function App() {
  const [gameTurns,setGameTurns]=useState([]);
  const [palyers,setPlayers]=useState({
    x:'Player 1',
    o:'Player 2'
  });
  const changePlayerName=(symbol,newName)=>{
    setPlayers(prevPlayers=>{
      return{
        ...prevPlayers,
        [symbol]:newName
        //in above code we use []aray aign to dynmaiccaly populate player sign in object
      }
    })
  }
  // const [activePlayer,setActivePlayer]=useState('x');
  //we remove this state because it was kind of extra state we use helper functio and we user gaemturn state because from this we can derive the current ppalyer
  const activePlayer=deriveActivePlayer(gameTurns);
  
  const handleSelectSquare=(rowIndex,colIndex)=>{
    // setActivePlayer((curActivePlayer)=>curActivePlayer==='x'?'o':'x');
    setGameTurns((prevTurns)=>{
      const currentPlayer=deriveActivePlayer(prevTurns);
      //we are not using currentplayer state value in updated turns array in sqaure object because active player is another state and in that ccase we are in
      //aother state so active player does not guarente etaht its latest previous state so we turn around and get player value from prevTurns 
      const updatedTurns=[{square:{row:rowIndex,col:colIndex},player:currentPlayer},
        ...prevTurns];
        return updatedTurns;
    })
  }
//here weuse spread operator because  initialGameBoard is array and we can make copu of arary because we should not edit original array an we hav eto make 
//deep copy of  initialGameBoard array menas we just not copy the outer array but alsi ineery aray by maping ineer arays an copy
  let gameBoard=[...initialGameBoard.map(array=>[...array])];
    for(const turn of gameTurns){
        //here we get sqaure and player values form destrucing array pass from app component so we are updating gameBoard in this way rather then above
        //commemted logic
        const {square,player}=turn;
        const {row,col}=square;

        gameBoard[row][col]=player;
    }
    let winner=null;
    for(const combination of WINNING_COMBINATIONS){
      const firstSquareSymbol=gameBoard[combination[0].row][combination[0].column];
      const secondSquareSymbol=gameBoard[combination[1].row][combination[1].column];
      const thirdSquareSymbol=gameBoard[combination[2].row][combination[2].column];
      if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
        winner=palyers[firstSquareSymbol];
      }
    }
    const hasDraw=gameTurns.length===9 && !winner;
    const restartMatch=()=>{
      setGameTurns([]);
    }
  return (
    <main>
      <div id="game-container">
      <ol id="players" className="highlight-player" >
        <Player name={palyers.x} symbol="x" isActive={activePlayer==='x'} changeName={changePlayerName} />
        <Player name={palyers.o} symbol="o" isActive={activePlayer==='o'} changeName={changePlayerName} />
      </ol>
      {(winner || hasDraw) && <Gameover winner={winner} onRestart={restartMatch}/>}
      <GameBoard gameBoard={gameBoard} onSelectSquare={handleSelectSquare}/>
      </div>
      <Log  turns={gameTurns}/>
    </main>
  )
}

export default App



export default function GameBoard({onSelectSquare,gameBoard}){
    // const [gameBoard,setGameBoard]=useState(initialGameBoard);
    // const handleSelectSquare=(rowIndex,colIndex)=>{
    //     setGameBoard((prevgameBoard)=>{
    //         const updatedBoard=[...prevgameBoard.map(innerArray=>[...innerArray])];
    //         updatedBoard[rowIndex][colIndex]=activePlayerSymbol;
    //         return updatedBoard;
    //     })
    //     onSelectSquare();
    // }

    //as we have to check winningcombination so we move that gameboard logic into app component to lift state up
    // let gameBoard=initialGameBoard;
    // for(const turn of turns){
    //     //here we get sqaure and player values form destrucing array pass from app component so we are updating gameBoard in this way rather then above
    //     //commemted logic
    //     const {square,player}=turn;
    //     const {row,col}=square;

    //     gameBoard[row][col]=player;
    // }
    return(
        <>
        <ol id="game-board">
      {gameBoard.map( (row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={()=>onSelectSquare(rowIndex,colIndex)} disabled={playerSymbol!==null}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
        </>
    );

}
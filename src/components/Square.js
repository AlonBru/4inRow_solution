import React, {useState,useEffect} from 'react';

function Square({id,state}) {
    const [board, setBoard] = useState([[]]); 
    const [winner, setWinner] = useState();
    let playerName = ''
    switch(state){
      case 1:
        playerName = 'player1'
        break;
      case 2:
        playerName = 'player2'
        break;
      default:
        playerName = ''
      }
  return (
    <div id={'square'+id} className="Square" >
       <div className={playerName} ></div>
    </div>
  );
}


export default Square;

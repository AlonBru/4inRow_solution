import React, {useState,useEffect} from 'react';
import Modal from '@material-ui/core/Modal';
import Square from './Square';

function Board() {
    const [board, setBoard] = useState([[]]); 
    const [winner, setWinner] = useState();
    const [turn, setTurn] = useState(true); // true => player1's turn
    const [turnCount, setTurnCount] = useState(1); // true => player1's turn
    
    function emptyBoard(){
        const gameBoard = [];
        for(let i = 0; i < 7; i++){
          gameBoard[i] = new Array(6).fill(0)
          // gameBoard[i] = []
          // const column= gameBoard[i]
          // for (let a=0; a<6; a++){
          //   column.push(0)
          
        };
        setBoard(gameBoard);
        setWinner(false);
    }
    const columnClick = (i) => {
      let column= board[i]
      if(column.includes(0)){
        let row= column.indexOf(0)
        const newBoard = [...board]
        newBoard[i][row] =turn?1:2
        setBoard(newBoard)
        setTurnCount(turnCount+1)
        setTurn(!turn)
        if (turnCount>6){
          checkWin(i,row)
        }
      }
    }
    useEffect(() => {
        emptyBoard();
    }, [])
    
    const checkColumn = (column) => {
      let string = board[column].join('')
      if (string.includes('1111')){
        setWinner(1)
        return true
      }
      if (string.includes('2222')){
        setWinner(2)
        return true
      }
    }

    const checkRow= (row) => {
      let string = board.map(x=>x[row]).join('')
      if (string.includes('1111')){
        setWinner(1)
        return true
      }
      if (string.includes('2222')){
        setWinner(2)
        return true
      }
    }

    const checkDiagonalRight = (column,row) => {// diagonal from left to right
      const diagonal = []
      let startCol = column>row?column-row:0; 
      let startRow = row>column?row-column:0;
      while(startCol<7&&startRow<6){
        diagonal.push(board[startCol][startRow])
        startCol++
        startRow++
      }
      let string = diagonal.join('')
      if (string.includes('1111')){
        setWinner(1)
        return true
      }
      if (string.includes('2222')){
        setWinner(2)
        return true
      }
    }
    
    const checkDiagonalLeft = (column,row) => {// from right => left
      const diagonal = []
      let startCol = column+row<6?column+row:6; 
      let startRow = row-(6-column)>0?row-(6-column):0;
      while(startCol>0&&startRow<6){
        diagonal.push(board[startCol][startRow])
        startCol--
        startRow++
      }
      let string = diagonal.join('')
      console.log(string)
      if (string.includes('1111')){
        setWinner(1)
        return true
      }
      if (string.includes('2222')){
        setWinner(2)
        return true
      }
    }

    function checkWin (column,row) {
      if(checkColumn(column)){return}
      if(checkRow(row)){return}
      if(checkDiagonalLeft(column,row)){return}
      if(checkDiagonalRight(column,row)){return}
      if(turnCount===42){
        setWinner('tie')
      }

    }
  return (
      <>
    <div className="Board">
      <p>turn #: {turnCount}</p>
        {
            board.map((column, i) => {
                return <>
                {i===0&& <div className="divider" />} {/* the red column separating each column */}
                <div className="Column" id={`column${i}`} onClick={()=>{columnClick(i)}}>
                {
                    column.map((square,i)=><Square id={i} state={square}/>)
                }
                </div>
                <div className="divider" /> {/* the red column separating each column */}
                </>
            })
        }
    </div>

            <Modal open={winner? true : false} onClose={()=> {emptyBoard();setTurnCount(1)}}>
                <div className ='winModal'>
                    <h2>Game Finished !</h2>
                    <h2>{winner ==='tie'? 'A Tie !':`Winner is: player ${winner}`}</h2>
                </div>
            </Modal>
        </>

  );
}


export default Board;

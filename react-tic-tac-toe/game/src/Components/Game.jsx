import React, {useState, useMemo} from 'react';
import './Game.css';
import Board from './Board';
import StartNewGame from './StartNewGame';

export default function Game() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [draw, setDraw] = useState(0);
  const [winSquare, setWinSquare] = useState([])
  const [gameEnd, setGameEnd] = useState(false);

  const winArray = [];



  const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [0, 4, 8], 
        [0, 3, 6],
        [1, 4, 7],
        [2, 4, 6],
        [2, 5, 8],
        [3, 4, 5],
        [6, 7, 8]
    ]

    for(let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            winArray.push(a,b,c)
            return squares[a]
        }
    }
    return null
}

  const winner = calculateWinner(board);


  const handleClick = (index) => {

    const boardCopy = [...board];


    

    if(winner || boardCopy[index]) return

    boardCopy[index] = xIsNext ? 'X' : 'O';

    setDraw(draw + 1);

    setBoard(boardCopy);
    setXIsNext(!xIsNext);     
    
  }

  const win = () => {
    return <StartNewGame newGame={newGame}  winner={winner} setWinSquare={setWinSquare} winSquare={winSquare} gameEnd={gameEnd} setGameEnd={setGameEnd}/>;
  }




  const newGame = () => {
    setBoard(Array(9).fill(null));
    setDraw(0)
  }


  const setWinner = () => {
    setWinSquare([...winArray])
  }

  return (
    <div className='wrapper'>

      {winner ?  <h1 className='winner'>Победитель: {winner} </h1> :  draw == board.length ? <h1 className='winner'>Ничья</h1> : <h3 className='player'>Сейчас ходит: {xIsNext ? 'X' : 'O'}</h3>}
      <Board gameEnd={gameEnd} setGameEnd={setGameEnd} squares={board} click={handleClick} winArray={winArray} setWinner={setWinner} winSquare={winSquare}/>
      {winner ? win() : draw == board.length ? win() : ''}
    </div>
  )
}

import React, {useState} from 'react'
import './Board.css';
import Square from './Square';

export default function Board({squares, click, setWinner, winSquare, winArray, gameEnd, setGameEnd}) {
  return (
    <div className='board'>
      {squares.map((square, index) => {
        return <Square end={gameEnd} setEnd={setGameEnd} winArray={winArray} key={index} id={index} value={square} winner={setWinner} winSquare={winSquare} onClick={() => click(index)}/>
      })}
    </div>
  )
}

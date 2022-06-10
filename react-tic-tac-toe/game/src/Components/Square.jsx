import React, {useState} from 'react'
import './Square.css';

export default function Square(props) {



  const squareClick = () => {
    props.onClick();
    props.winner()
  }

  const checkWin = () => {
    props.winner();
    if(props.winSquare.length == 3) {
      props.setEnd(true);
    }
  }

  return (
    <button className={props.end == true ? props.winArray.includes(props.id) ? 'square green' : 'square dis' : 'square'} onClick={squareClick} onMouseMove={checkWin}>
      {props.value}
    </button>
  )
}

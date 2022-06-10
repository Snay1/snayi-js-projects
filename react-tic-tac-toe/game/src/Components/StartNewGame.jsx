import React from 'react'
import './StartNewGame.css'

export default function StartNewGame({newGame, gameEnd, setGameEnd, setWinSquare}) {

  const restartGame = () => {
    newGame();
    setGameEnd(false);
    setWinSquare([])
  }

  return (
    <button className={'newGame'} onClick={restartGame}>Начать новую игру</button>
  )
}

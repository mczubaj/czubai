import { useState } from 'react'
import './Game.css'

const Game = () => {
  const correctWord = 'PENIS'

  const [inputtedWord, setInputtedWord] = useState('')
  const [submittedWords, setSubmittedWords] = useState([])
  const [isVictoryMode, setIsVictoryMode] = useState(false)

  const handleInputChange = (event) => {
    setInputtedWord(event.target.value.toUpperCase())
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const colorizedWord = colorizeSubmittedWord()
    setSubmittedWords([...submittedWords, colorizedWord])
    inputtedWord === correctWord && setIsVictoryMode(true)
    setInputtedWord('')
  }
  const colorizeSubmittedWord = () => {
    const letters = inputtedWord.split('')
    const lettersWithSpans = letters.map((letter, index) => {
      let className = ''
      if (letter === correctWord.charAt(index)) {
        className = 'green'
      } else if (correctWord.includes(letter)) {
        className = 'yellow'
      }

      return <span className={className + ' letter'}>{letter}</span>
    })

    return lettersWithSpans
  }

  return (
    <div className="container">
      <div>
        {submittedWords.map((word) => (
          <div className="word" key={word}>
            {word}
          </div>
        ))}
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          value={inputtedWord}
          onChange={handleInputChange}
          maxLength="5"
          minLength="5"
        ></input>
      </form>
      {isVictoryMode && <div className="victory-message">YOU WIN!!</div>}
    </div>
  )
}

export default Game

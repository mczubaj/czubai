import { useState } from 'react'
import './Game.css'
import randomWord from './random-word'
import { v4 as uuidv4 } from 'uuid'
import englishWords from 'an-array-of-english-words'
import keys from './keyboard-keys'

const Game = () => {
  const correctWord = randomWord.toUpperCase()
  const maxTries = 6
  const fiveLetterEnglishWords = englishWords.filter(
    (word) => word.length === 5
  )

  const [inputtedWord, setInputtedWord] = useState('')
  const [submittedWords, setSubmittedWords] = useState([])
  const [gameResult, setGameResult] = useState('')
  const [currentTry, setCurrentTry] = useState(1)
  const [isValidWordWarning, setIsValidWordWarning] = useState(false)
  const [keyboardKeys, setKeyboardKeys] = useState(keys)

  const handleInputChange = (event) => {
    isValidWordWarning && setIsValidWordWarning(false)
    setInputtedWord(event.target.value.toUpperCase())
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const isValidWordInputted = fiveLetterEnglishWords.some(
      (word) => word.toUpperCase() === inputtedWord
    )
    if (!isValidWordInputted) {
      setIsValidWordWarning(true)
      return
    }

    const colorizedWord = colorizeSubmittedWord()
    setSubmittedWords([...submittedWords, colorizedWord])
    setCurrentTry(currentTry + 1)

    if (inputtedWord === correctWord) {
      setGameResult('won')
    } else if (currentTry === maxTries) {
      setGameResult('lost')
    }

    setInputtedWord('')
  }

  const colorizeSubmittedWord = () => {
    const letters = inputtedWord.split('')
    const unguessedLetters = []

    const markHits = letters.map((letter, index) => {
      const correctLetter = correctWord.charAt(index)

      if (letter === correctLetter) {
        updateKeyboardKeys(letter, 'found')
        return (
          <span className="letter green" key={uuidv4()}>
            {letter}
          </span>
        )
      } else {
        unguessedLetters.push(correctLetter)
        return letter
      }
    })

    const markMisses = markHits.map((letter) => {
      if (!(typeof letter === 'string')) {
        return letter
      }

      let className = ''
      if (unguessedLetters.some((unguessedL) => unguessedL === letter)) {
        updateKeyboardKeys(letter, 'missed')
        className = 'letter yellow'
      } else {
        className = 'letter'
      }

      return (
        <span className={className} key={uuidv4()}>
          {letter}
        </span>
      )
    })

    return markMisses
  }

  const updateKeyboardKeys = (letter, status) => {
    const keysCopy = keyboardKeys
    const keyToUpdate = keysCopy.find((key) => key.key === letter)

    if (keyToUpdate.status === 'found') {
      return
    }

    keyToUpdate.status = status

    setKeyboardKeys(keysCopy)
  }

  return (
    <div className="container">
      <div>
        {submittedWords.map((word) => (
          <div className="word" key={uuidv4()}>
            {word}
          </div>
        ))}
      </div>
      {!gameResult && (
        <form className="form" onSubmit={handleSubmit}>
          <input
            value={inputtedWord}
            onChange={handleInputChange}
            maxLength="5"
            minLength="5"
          />
          {isValidWordWarning && (
            <div className="valid-word-warning">Please enter valid words!</div>
          )}
        </form>
      )}
      {gameResult === 'won' && <div className="victory-message">YOU WIN!!</div>}
      {gameResult === 'lost' && (
        <div className="defeat-message">YOU LOSE :(</div>
      )}
      <div className="keyboard-container">
        {keyboardKeys.map((key) => (
          <div className={`key ${key.status}`} key={uuidv4()}>
            {key.key}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Game

import { useState } from 'react'
import './Game.css'
import getRandomWord from './get-random-word'
import { v4 as uuidv4 } from 'uuid'
import englishWords from 'an-array-of-english-words'
import keys from './keyboard-keys'

const Game = () => {
  const maxTries = 6
  const fiveLetterEnglishWords = englishWords.filter(
    (word) => word.length === 5
  )

  const [inputtedWord, setInputtedWord] = useState('')
  const [submittedWords, setSubmittedWords] = useState([])
  const [correctWord, setCorrectWord] = useState(getRandomWord().toUpperCase())
  const [gameResult, setGameResult] = useState('')
  const [currentTry, setCurrentTry] = useState(1)
  const [isValidWordWarning, setIsValidWordWarning] = useState(false)
  const [keyboardKeys, setKeyboardKeys] = useState(keys)
  const [isCharLimitWarning, setIsCharLimitWarning] = useState(false)

  const handleInputChange = (event) => {
    isValidWordWarning && setIsValidWordWarning(false)
    setInputtedWord(event.target.value.toUpperCase())
  }

  const handleSubmit = (event) => {
    event && event.preventDefault()

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
        updateKeyboardKeys(letter, 'absent')
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
    let keyToUpdate
    for (const row of keyboardKeys) {
      keyToUpdate = row.find((key) => key.key === letter)
      if (keyToUpdate) break
    }

    if (keyToUpdate.status === 'found') {
      return
    }

    keyToUpdate.status = status
    setKeyboardKeys(keyboardKeys)
  }

  const resetGame = () => {
    setCorrectWord(getRandomWord().toUpperCase())
    setInputtedWord('')
    setSubmittedWords([])
    setGameResult('')
    setCurrentTry(1)
    setIsValidWordWarning(false)
    setIsCharLimitWarning(false)
    keyboardKeys.forEach((row) => row.forEach((key) => (key.status = '')))
  }

  const handleKeyboardClick = (key) => {
    isValidWordWarning && setIsValidWordWarning(false)
    isCharLimitWarning && setIsCharLimitWarning(false)

    if (key === 'ENTER' && inputtedWord.length !== 5) {
      setIsCharLimitWarning(true)
    } else if (key === 'ENTER') {
      handleSubmit()
    } else if (key === '\u232b') {
      inputtedWord.length > 0 &&
        setInputtedWord(inputtedWord.substring(0, inputtedWord.length - 1))
    } else if (inputtedWord.length === 5) {
      setIsCharLimitWarning(true)
    } else {
      setInputtedWord(inputtedWord + key)
    }
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
            <div className="input-warning">Please enter valid words!</div>
          )}
          {isCharLimitWarning && (
            <div className="input-warning">Please enter 5 letters!</div>
          )}
        </form>
      )}
      {gameResult === 'won' && (
        <div className="result-message victory">YOU WIN!!</div>
      )}
      {gameResult === 'lost' && (
        <div className="result-message defeat">YOU LOSE :(</div>
      )}
      {gameResult && (
        <button type="button" onClick={() => resetGame()}>
          PLAY AGAIN
        </button>
      )}

      <div className="keyboard-container">
        {keyboardKeys.map((row) => (
          <div className="keyboard-row" key={uuidv4()}>
            {row.map((key) => (
              <div
                className={`key ${key.status}`}
                onClick={() => handleKeyboardClick(key.key)}
                key={uuidv4()}
              >
                {key.key}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Game

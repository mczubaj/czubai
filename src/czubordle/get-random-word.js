import { words } from 'popular-english-words'

const fiveLetterWords = words
  .getMostPopular(5000)
  .filter((word) => word.length === 5)
const getRandomWord = () =>
  fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)]

export default getRandomWord

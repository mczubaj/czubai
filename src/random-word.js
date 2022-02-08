import { words } from 'popular-english-words'

const fiveLetterWords = words
  .getMostPopular(3000)
  .filter((word) => word.length === 5)
const randomWord =
  fiveLetterWords[Math.floor(Math.random() * fiveLetterWords.length)]

export default randomWord

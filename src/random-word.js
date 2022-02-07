const words = require('an-array-of-english-words').filter(
  (word) => word.length === 5
)
const randomWord = words[Math.floor(Math.random() * words.length)]

export default randomWord

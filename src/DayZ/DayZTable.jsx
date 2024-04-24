import React from 'react'
import './DayZTable.css'

const DayZTable = () => {
  // @ts-ignore
  const directory = require.context('./images', false)
  const imagePaths = directory
    .keys()
    .map((filename) => filename.replace('./', './images/'))

  return (
    <div className="dayz-container">
      <header className="dayz-header">
        DayZ Aftermath Base Building Recipes
      </header>
      <div className="dayz-images-container">
        {imagePaths.map((path) => (
          <img
            width="310"
            height="620"
            className="image"
            src={require(`${path}`)}
            key={path}
            alt={''}
          />
        ))}
      </div>
    </div>
  )
}

export default DayZTable

import './App.css'
import Game from './czubordle/Game/Game'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const HomeMenu = () => (
  <div>
    <ul>
      <li>
        <Link to="/czubordle">czubordle</Link>
      </li>
      <li>
        <Link to="/dayzrecipes">dayzrecipes</Link>
      </li>
    </ul>
  </div>
)

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<HomeMenu />} />
      <Route path="/czubordle" element={<Game />} />
      <Route path="/dayzrecipes"></Route>
    </Routes>
  </Router>
)

export default App

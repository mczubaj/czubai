import DayZTable from './DayZ/DayZTable'
import Game from './czubordle/Game'
import { Routes, Route, Link } from 'react-router-dom'

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
  <Routes>
    <Route exact path="/" element={<HomeMenu />} />
    <Route path="/czubordle" element={<Game />} />
    <Route path="/dayzrecipes" element={<DayZTable />}></Route>
  </Routes>
)

export default App

import './App.css'
import Header from './components/Header/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Film from './pages/FilmPage/Film'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/film/:id' element={<Film />}></Route>
      </Routes>
    </div>

  )
}

export default App

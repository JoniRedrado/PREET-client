import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Detail from './Pages/Detail/Detail'

// import './App.css'

function App() {


  return (
    
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/:id' element={<Detail/>}/>
      {/* <Route path='/create' element={<Create/>}/> */}
    </Routes>
  )
}

export default App

import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Detail from "./Pages/Detail/Detail";
import NavBar from "./Components/NavBar/NavBar";

// import './App.css'

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Detail />} />
        {/* <Route path='/create' element={<Create/>}/> */}
      </Routes>
    </div>
  );
}

export default App;

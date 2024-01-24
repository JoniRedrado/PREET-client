import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Detail from "./Pages/Detail/Detail";
import NavBar from "./Components/NavBar/NavBar";
import CreatePage from "./Pages/Create/CreatePage";
import UpdatePage from "./Pages/Update/UpdatePage"

// import './App.css'

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Detail />} />
        <Route path='/create' element={<CreatePage/>}/>
        <Route path='/update' element={<UpdatePage/>}/>
      </Routes>
    </div>
  );
}

export default App;

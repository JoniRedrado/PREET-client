import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Detail from "./Pages/Detail/Detail";
import CreatePage from "./Pages/Create/CreatePage";
import UpdatePage from "./Pages/Update/UpdatePage";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import Settings from "./Pages/Settings/Settings";
import BookedSuccesfully from "./Pages/BookedSuccesfully/BookedSuccesfully";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Favorites from "./Pages/Favorites/Favorites";
import UserFavorites from "./Pages/Favorites/userFavorites/userFavorites";
import styles from "./App.module.css"
import SearchResult from "./Pages/SearchResult/SearchResult";
import BookingsHistory from "./Pages/BookingsHistory/BookingsHistory";
import { useDarkMode } from "./DarkModeContext/DarkModeContext";
// import './App.css'

function App() {

  const { darkMode } = useDarkMode();

  return (
    <div className={`${styles.mainDiv} ${darkMode ? styles.darkMode : ''}`}>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/update/:id" element={<UpdatePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/booked" element={<BookedSuccesfully />} />
        <Route path="/search/:nombreHotel" element={<SearchResult />} />
        <Route path="/favorites" element={<Favorites/>} />
        <Route path="/userFavorites" element={<UserFavorites/>} />
        <Route path="/myreservations" element={<BookingsHistory/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

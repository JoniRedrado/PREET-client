import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Detail from "./Pages/Detail/Detail";
import CreatePage from "./Pages/Create/CreatePage";
import UpdatePage from "./Pages/Update/UpdatePage";
import Dashboard from "./Components/Dashboard/Dashboard";
import Settings from "./Pages/Settings/Settings";
import BookedSuccesfully from "./Pages/BookedSuccesfully/BookedSuccesfully";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
// import Favorites from "./Pages/Favorites/Favorites";
import UserFavorites from "./Pages/Favorites/userFavorites/userFavorites";
import styles from "./App.module.css"
import SearchResult from "./Pages/SearchResult/SearchResult";
import BookingsHistory from "./Pages/BookingsHistory/BookingsHistory";
// import LoginAdmin from "./Pages/LoginAdmin/LoginAdmin";
import GestionUsers from "./Components/Dashboard/GestionUsers/GestionUsers";
import GestionHotels from "./Components/Dashboard/GestionHotels/GestionHotels";
import GestionRooms from "./Components/Dashboard/GestionRooms/GestionRooms";
import GestionFeedBack from "./Components/Dashboard/GestionFeedback/GestionFeedBack";
import { useDarkMode } from "./DarkModeContext/DarkModeContext";
import UpdateRooms from "./Components/UpdateRooms/UpdateRooms";
import BookingDetails from "./Pages/BookingDetail/BookingDetails";
import CreateRooms from "./Components/CreateRooms/CreateRooms"
import NewRegister from "./Pages/NewRegister/NewRegister";
import NewLogin from "./Pages/NewLogin/NewLogin";
import Graphics from "./Components/Dashboard/Metrics/Graphics"
import ChatBotBottom from "./Components/ChatBotBottom/ChatBotBottom";
import { axiosInterceptorRequest } from "./Components/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./redux/actions";
import { useEffect } from "react";
import axios from "axios";
// import './App.css'

axiosInterceptorRequest();

function App() {
  const token = useSelector((state) => state.token);
  const { darkMode } = useDarkMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    (async function(){
      try{
        const { data } = await axios.get(`${import.meta.env.VITE_BACK_URL}/verify`);
        if(data.message === 'Token ok'){
          console.log('token ok');
          dispatch(setToken(true));
        } 
      }catch(error){
        navigate('/');
        console.log('token fail:');
      }
    })();
  }, [token]);
  
  return (
    <div className={`${styles.mainDiv} ${darkMode ? styles.darkMode : ''}`}>
      <Routes>
        {/* No mostrar el encabezado y el pie de página en la ruta /register1 */}
        <Route path="/register" element={<NewRegister />} />
        <Route path="/login" element={<NewLogin/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/create" element={<CreatePage />} />
                {/* <Route path="/update/:id" element={<UpdatePage />} /> */}
                <Route path="/settings" element={<Settings />} />
                <Route path="/booked" element={<BookedSuccesfully />} />
                <Route path="/search/" element={<SearchResult />} />
                {/* <Route path="/favorites" element={<Favorites />} /> */}
                <Route path="/userFavorites" element={<UserFavorites />} />
                <Route path="/myreservations" element={<BookingsHistory />} />
                {/* <Route path="/admin" element={<LoginAdmin />} /> */}
                <Route path="/dashboard/users" element={<GestionUsers />} />
                <Route path="/dashboard/hotels" element={<GestionHotels />} />
                <Route path="/dashboard/feedback" element={<GestionFeedBack />} />
                <Route path="/dashboard/rooms" element={<GestionRooms />} />
                <Route path="/dashboard/graphics" element={<Graphics/>} />
                <Route path="/updaterooms/:id" element={<UpdateRooms />} />
                <Route path="/bookingDetails/:id" element={<BookingDetails />} />
                <Route path="/createrooms" element={<CreateRooms />} />
              </Routes>
              <Footer />
              <ChatBotBottom/>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

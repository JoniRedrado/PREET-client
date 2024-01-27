import { Link } from "react-router-dom";
import template from "../../assets/Logo-White.svg";
import SearchBar from "../SearchBar/SearchBar";
// import Filters from "../Filters/Filters";


import style from "./NavBar.module.css";
import { useDispatch } from "react-redux";
import { getAllHotels, resetCurrentPage } from "../../redux/actions";

function NavBar() {

  const dispatch = useDispatch()

  const handleHomeButton = () => {
    dispatch(resetCurrentPage())
    dispatch(getAllHotels())
  }

  return (
    <div className={style.container}>
      <Link to="/" onClick={handleHomeButton}>
        <img src={template} width="18%" />
      </Link>
      <SearchBar/>
      {/* <Filters/> */}
      <Link to="/create">
        <button>Create Hotel</button>
      </Link>
    </div>
  );
}

export default NavBar;
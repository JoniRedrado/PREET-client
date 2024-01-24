// import { Link } from "react-router-dom";
import template from "../../assets/Logo-White.svg";
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";
import { NavLink } from "react-router-dom";

import style from "./NavBar.module.css";

function NavBar() {
  return (
    <div className={style.container}>
      <NavLink to="/">
        <img src={template} width="18%" />
      </NavLink>
      <SearchBar />
      <Filters />
      {/* <Link to="/create"> */}
      <button>Create Hotel</button>
      {/* </Link> */}
    </div>
  );
}

export default NavBar;

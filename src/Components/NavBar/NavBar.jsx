import { Link } from "react-router-dom";
import template from "../../assets/Logo-White.svg";
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";

import style from "./NavBar.module.css";

function NavBar() {
  return (
    <div className={style.container}>
      <Link to="/">
        <img src={template} width="18%" />
      </Link>
      <SearchBar/>
      <Filters/>
      <Link to="/create">
        <button>Create Hotel</button>
      </Link>
    </div>
  );
}

export default NavBar;

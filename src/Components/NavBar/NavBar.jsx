import { Link } from "react-router-dom";
import template from "../../assets/Logo-White.svg";
import SearchBar from "../SearchBar/SearchBar";
import Filters from "../Filters/Filters";

import style from "./NavBar.module.css";

function NavBar() {
  return (
    <div className={style.container}>
      <img src={template} width="18%" />
      <SearchBar/>
      <Filters/>
      <Link to="/create">
      <button>Crear Hotel</button>
      </Link>
    </div>
  );
}

export default NavBar;

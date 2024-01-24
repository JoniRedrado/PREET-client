// import { Link } from "react-router-dom";
import template from "../../assets/Logo-White.svg";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";

function NavBar() {
  return (
    <div className={style.container}>
      <img src={template} width="18%" />
      <SearchBar/>
      {/* <Link> */}
      <button>Crear Hotel</button>
      {/* </Link> */}
    </div>
  );
}

export default NavBar;

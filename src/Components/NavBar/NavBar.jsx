// import { Link } from "react-router-dom";
import template from "../../assets/file.jpg";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";

function NavBar() {
  return (
    <div className={style.container}>
      <img src={template} width="18%" />
      {/* <Link> */}
      <button>Crear Hotel</button>
      {/* </Link> */}
      <SearchBar/>
    </div>
  );
}

export default NavBar;

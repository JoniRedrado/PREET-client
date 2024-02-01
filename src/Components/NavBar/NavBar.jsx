import { Link, useNavigate } from "react-router-dom";
import template from "../../assets/Logo-White.svg";
import SearchBar from "../SearchBar/SearchBar";
import Modal from "react-modal";
import RegisterUser from "../../Pages/Register/Register";
import LoginForm from "../../Pages/Login/Login";
import style from "./NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllHotels,
  resetCurrentPage,
  showModal,
  userLog,
  filterParams,
} from "../../redux/actions";

function NavBar() {
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const modalRegister = useSelector((state) => state.showModal.register);
  const modalLogin = useSelector((state) => state.showModal.login);

  const defaultFilters = {
    country: "",
    stars: "",
    minPrice: "",
    maxPrice: "",
    orderBy: "",
    direction: "",
  };

  const handleHomeButton = () => {
    dispatch(filterParams(defaultFilters));
    dispatch(resetCurrentPage());
    dispatch(getAllHotels());
  };

  function openModal(option) {
    dispatch(showModal(option, true));
  }

  function closeModal(option) {
    dispatch(showModal(option, false));
    navigate("/");
  }

  function logout(option) {
    localStorage.removeItem("token");
    dispatch(showModal(option, false));
    dispatch(userLog());
    navigate("/");
  }

  return (
    <div className={style.container}>
      <Link to="/" onClick={handleHomeButton}>
        <img src={template} width="18%" />
      </Link>
      <div className={style.userButtons}>
        {token ? (
          <>
            <SearchBar />
            <Link to="/create">
              <button className={style.blueButton}>Create Hotel</button>
            </Link>
            <button onClick={() => logout("login")}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <button
              className={style.blueButton}
              onClick={() => openModal("register")}
            >
              Register
            </button>
            <div className={style.overlayModal}>
              <Modal
                isOpen={modalRegister}
                onAfterOpen={undefined}
                onRequestClose={() => closeModal("register")}
                onAfterClose={() => closeModal("register")}
                className={style.modalContent}
                style={{
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  },
                }}
                contentLabel="Login Modal"
              >
                <RegisterUser />
              </Modal>
            </div>
            <button onClick={() => openModal("login")} name="login">
              Login
            </button>
            <div className={style.overlayModal}>
              <Modal
                isOpen={modalLogin}
                onAfterOpen={undefined}
                onRequestClose={() => closeModal("login")}
                onAfterClose={() => closeModal("login")}
                className={style.modalContent}
                style={{
                  overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  },
                }}
                contentLabel="Login Modal"
              >
                <LoginForm />
              </Modal>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;

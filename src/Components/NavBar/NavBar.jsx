import { Link, useNavigate } from "react-router-dom";
import template from "../../assets/Logo-White.svg";
import Modal from "react-modal";
import RegisterUser from "../../Pages/Register/Register";
import LoginForm from "../../Pages/Login/Login";
import UserBar from "../UserBar/UserBar"; // Importa el UserBar
import style from "./NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllHotels,
  resetCurrentPage,
  showModal,
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


  return (
    <div className={style.container}>
      <div className={style.items}>
      <Link to="/" onClick={handleHomeButton}>
        <img src={template} width="18%" alt="Logo" className={style.logo}/>
      </Link>
      <div className={style.userButtons}>
        {token ? (
          <>
            <UserBar />
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
                ariaHideApp={false}
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
                ariaHideApp={false}
                contentLabel="Login Modal"
              >
                <LoginForm />
              </Modal>
            </div>
          </>
        )}
      </div>
      </div>
    </div>
  );
}

export default NavBar;
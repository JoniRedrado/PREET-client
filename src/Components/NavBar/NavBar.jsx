/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import template from "../../assets/Logo-White.svg";
import template2 from "../../assets/Logo.svg";
import Modal from "react-modal";
import RegisterUser from "../../Pages/Register/Register";
import LoginForm from "../../Pages/Login/Login";
import UserBar from "../UserBar/UserBar"; 
import style from "./NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { FaUserPlus } from 'react-icons/fa';
import { BsLock } from 'react-icons/bs';
import {
  getAllHotels,
  resetCurrentPage,
  showModal,
} from "../../redux/actions";
import { useDarkMode } from '../../DarkModeContext/DarkModeContext';

function NavBar({ heightNav }) {
  const token = localStorage.getItem("token");
  const { darkMode, toggleDarkMode } = useDarkMode();
  const dispatch = useDispatch();
  const {pathname} = useLocation();

  const modalRegister = useSelector((state) => state.showModal.register);
  const modalLogin = useSelector((state) => state.showModal.login);

  const handleHomeButton = () => {
    dispatch(resetCurrentPage());
    dispatch(getAllHotels());
  };

  function openModal(option) {
    dispatch(showModal(option, true));
  }

  function closeModal(option) {
    dispatch(showModal(option, false));
  }


  return (
    <div className={`${style.container} ${darkMode ? style.darkMode : ''}`} style={heightNav}>
      <div className={style.items}>
        <div className={style.logo}>
          {pathname === '/' 
            ? (
              <Link to="/" onClick={handleHomeButton}>
                <img src={template2} width="18%" alt="Logo" className={`${heightNav ? style.imgLogoSmall : style.imgLogo}`}/>
              </Link>
            )
            :
            (
              <Link to="/" onClick={handleHomeButton}>
                <img src={template} width="18%" alt="Logo" className={`${heightNav ? style.imgLogoSmall : style.imgLogo}`}/>
              </Link>
            )
          }
        </div>
      
      <div className={style.userButtons}>
        {token ? (
          <>
            <UserBar />
            <div>
              <i className={darkMode ? "bi bi-sun" : "bi bi-moon"} onClick={toggleDarkMode}></i>
            </div>
          </>
        ) : (
          <>
            <button
              className={style.buttons}
              onClick={() => openModal("register")}
            >
              <FaUserPlus/> Sign Up
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
            <button onClick={() => openModal("login")} name="login" className={style.buttons}>
              <BsLock/> Login
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
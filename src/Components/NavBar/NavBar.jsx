/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import template from "../../assets/Logo-White.svg";
import template2 from "../../assets/Logo.svg";
import Modal from "react-modal";
import RegisterUser from "../../Pages/Register/Register";
import LoginForm from "../../Pages/Login/Login";
import UserBar from "../UserBar/UserBar";
import { useDispatch, useSelector } from "react-redux";
import { FaUserPlus } from "react-icons/fa";
import { BsLock } from "react-icons/bs";
import { getAllHotels, resetCurrentPage, showModal } from "../../redux/actions";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import { useState, useEffect, useRef, Suspense } from "react";
import { useTranslation } from "react-i18next";
import "flag-icon-css/css/flag-icons.min.css";
import style from "./NavBar.module.css";

function NavBar({ heightNav }) {
  const token = localStorage.getItem("token");
  const { darkMode, toggleDarkMode } = useDarkMode();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();

  const modalRegister = useSelector((state) => state.showModal.register);
  const modalLogin = useSelector((state) => state.showModal.login);

  const locales = [
    {
      code: "en",
      country_code: "gb",
    },
    {
      code: "es",
      country_code: "es",
    },
  ];

  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    <div
      className={`${style.container} ${darkMode ? style.darkMode : ""}`}
      style={heightNav}
    >
      <div className={style.items}>
        <div className={style.logo}>
          {pathname === "/" ? (
            <Link to="/" onClick={handleHomeButton}>
              <img
                src={template2}
                width="18%"
                alt="Logo"
                className={`${heightNav ? style.imgLogoSmall : style.imgLogo}`}
              />
            </Link>
          ) : (
            <Link to="/" onClick={handleHomeButton}>
              <img
                src={template}
                width="18%"
                alt="Logo"
                className={`${heightNav ? style.imgLogoSmall : style.imgLogo}`}
              />
            </Link>
          )}
        </div>

        <div className={style.userButtons}>
          {token ? (
            <>
              <UserBar />

              <div ref={dropdownRef}>
                <button className={style.btnLink} onClick={toggleMenu}>
                  <i className="bi bi-globe2"></i>
                </button>
                {showMenu && (
                  <ul className={style.dropdownMenu}>
                    {locales.map(({ code, country_code }) => (
                      <li key={country_code}>
                        <button className={style.dropdownItem}>
                          <span
                            className={`flag-icon flag-icon-${country_code}`}
                            onClick={() => i18n.changeLanguage(code)}
                          ></span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <i
                  className={darkMode ? "bi bi-sun" : "bi bi-moon"}
                  onClick={toggleDarkMode}
                ></i>
              </div>
            </>
          ) : (
            <>
              <button
                className={style.buttons}
                onClick={() => openModal("register")}
              >
                <FaUserPlus /> {t("NavBar.signUp")}
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
              <button
                onClick={() => openModal("login")}
                name="login"
                className={style.buttons}
              >
                <BsLock /> {t("NavBar.logIn")}
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
              <div ref={dropdownRef}>
                <button className={style.btnLink} onClick={toggleMenu}>
                  <i className="bi bi-globe2"></i>
                </button>
                {showMenu && (
                  <ul className={style.dropdownMenu}>
                    {locales.map(({ code, country_code }) => (
                      <li key={country_code}>
                        <button className={style.dropdownItem}>
                          <span
                            className={`flag-icon flag-icon-${country_code}`}
                            onClick={() => i18n.changeLanguage(code)}
                          ></span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div>
                <i
                  className={darkMode ? "bi bi-sun" : "bi bi-moon"}
                  onClick={toggleDarkMode}
                ></i>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Suspense>
      <NavBar />
    </Suspense>
  );
}

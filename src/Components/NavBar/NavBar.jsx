/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import template from "../../assets/Logo-White.svg";
import template2 from "../../assets/Logo.svg";
import Modal from "react-modal";
import RegisterUser from "../../Pages/Register/Register";
import LoginForm from "../../Pages/Login/Login";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { FaUserPlus } from "react-icons/fa";
import { BsLock } from "react-icons/bs";
import { getAllHotels, resetCurrentPage, showModal } from "../../redux/actions";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import { useState, useRef, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "flag-icon-css/css/flag-icons.min.css";
import style from "./NavBar.module.css";
import Logo from "../../assets/logo.jpg"
import { MdLanguage, MdSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import axios from "axios";

function NavBar({ heightNav }) {
  const token = localStorage.getItem("token");
  const { darkMode, toggleDarkMode } = useDarkMode();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();

  const modalRegister = useSelector((state) => state.showModal.register);
  const modalLogin = useSelector((state) => state.showModal.login);

  const [userInfo, setUserInfo] = useState({
    name: "",
    lastName: "",
    profilePicture: "",
  })

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACK_URL}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserInfo({
          name:response.data.name,
          lastName: response.data.last_name,
          profilePicture: response.data.profile_picture,
        })
      })

      .catch((error) => {
        console.error(error);
      });
  }, [token]);

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

  const closeMenu = () => {
    setShowMenu(false);
  };

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

  const renderNavBar = () => {
    if (pathname === "/dashboard" || pathname === "/dashboard/"){
      return (
        <div 
          className={`${style.container} ${darkMode ? style.darkMode : ""}`}
          style={heightNav}
        >            
          <div className={style.userButtons}>
          <Sidebar/> 
          <div>
            <button onClick={toggleDarkMode} className={style.darkModeButton}>
               {darkMode ? (
                <MdSunny className={style.icon}/>
                ) : (
                  <IoMdMoon className={style.icon}/>
                )}
            </button>
          </div>
          <div ref={dropdownRef} onMouseLeave={closeMenu}>
            <button className={style.btnLink} onClick={toggleMenu}>
              <MdLanguage className={style.icon}/>
            </button>
            {showMenu && (
              <ul className={style.dropdownMenu}>
                {locales.map(({ code, country_code }) => (
                  <li key={country_code}>
                    <button className={style.dropdownItem}>
                      <span
                        className={`flag-icon flag-icon-${country_code}`}
                        onClick={() => {
                          i18n.changeLanguage(code);
                          closeMenu();
                        }}
                      ></span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            
          </div>
          </div>
          <div className={style.adminInfo}>
            <div className={style.imageContainer}>
              {userInfo.profilePicture ? (
                <img src={userInfo.profilePicture} alt="profile-picture" className={style.picture}/>
              ) : (
                <h1 className={style.nameText}>{userInfo.name.charAt(0).toUpperCase()}</h1>
            )}
            </div>
          
          <p className={style.wrapperText}>{userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1)} {userInfo.lastName.charAt(0).toUpperCase() + userInfo.lastName.slice(1)}</p>
          </div>
        </div>
      )
    } else {
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
              <div>
                <button onClick={toggleDarkMode} className={style.darkModeButton}>
                   {darkMode ? (
                    <MdSunny className={style.icon}/>
                    ) : (
                      <IoMdMoon className={style.icon}/>
                    )}
                </button>
              </div>
              <div ref={dropdownRef} onMouseLeave={closeMenu}>
                <button className={style.btnLink} onClick={toggleMenu}>
                  <MdLanguage className={style.icon}/>
                </button>
                {showMenu && (
                  <ul className={style.dropdownMenu}>
                    {locales.map(({ code, country_code }) => (
                      <li key={country_code}>
                        <button className={style.dropdownItem}>
                          <span
                            className={`flag-icon flag-icon-${country_code}`}
                            onClick={() => {
                              i18n.changeLanguage(code);
                              closeMenu();
                            }}
                          ></span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
          {token ? (
            <>
              <Sidebar/>
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
            </>
          )}
        </div>
      </div>
    </div>
      )
    }
  }
 
  return renderNavBar();
}

export default function WrappedApp() {
  return (
    <Suspense>
      <NavBar />
    </Suspense>
  );
}

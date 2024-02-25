/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import template from "../../assets/Logo-White.svg";
import template2 from "../../assets/Logo.svg";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch } from "react-redux";
import { FaUserPlus } from "react-icons/fa";
import { BsLock } from "react-icons/bs";
import { getAllHotels, resetCurrentPage, resetFiltersParams, setCurrency } from "../../redux/actions";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import { useState, useRef, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "flag-icon-css/css/flag-icons.min.css";
import style from "./NavBar.module.css";
import { MdLanguage, MdSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import axios from "axios";

function NavBar({ heightNav }) {
  const token = localStorage.getItem("token");
  const { darkMode, toggleDarkMode } = useDarkMode();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

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

  const currency = ["USD","EUR","COP", "ARS"];

  const [showMenu, setShowMenu] = useState({
    language: false,
    currency: false
  });
  
  const dropdownRef = useRef(null);

  const toggleMenu = (option) => {
    setShowMenu((prevShowMenu) => ({
      ...prevShowMenu,
      [option]: !prevShowMenu[option],
    }));
  };

  const closeMenu = () => {
    setShowMenu({ language: false, currency: false });
  };

  const handleHomeButton = () => {
    dispatch(resetCurrentPage());
    dispatch(resetFiltersParams())
    dispatch(getAllHotels());
  };

  const handleClickRegister = () => {
    navigate("/register")
  };

  const handleClickLogin = () => {
    navigate("/login")
  };

  const renderNavBar = () => {
    if (pathname === "/dashboard" || pathname === "/dashboard/"){
      return (
        <div 
          className={`${style.container2} ${darkMode ? style.darkMode : ""}`}
          style={heightNav}
        >         
          <div className={style.adminInfo}>
            <div className={style.imageContainer2}>
              {userInfo.profilePicture ? (
                <img src={userInfo.profilePicture} alt="profile-picture" className={style.picture}/>
              ) : (
                <h1 className={style.nameText}>{userInfo.name.charAt(0).toUpperCase()}</h1>
            )}
            </div>
          
          <p className={style.wrapperText}>{userInfo.name.charAt(0).toUpperCase() + userInfo.name.slice(1)} {userInfo.lastName.charAt(0).toUpperCase() + userInfo.lastName.slice(1)}</p>
          <Sidebar/> 
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
                src={template}
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
                <button className={style.btnLink} onClick={() => toggleMenu("language")}>
                  <MdLanguage className={style.icon}/>
                </button>
                {showMenu.language && (
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
              <div ref={dropdownRef} onMouseLeave={closeMenu}>
                <button className={style.btnLink} onClick={() => toggleMenu("currency")}>
                  <RiMoneyDollarCircleLine className={style.icon} />
                </button>
                {showMenu.currency && (
                  <ul className={style.dropdownMenu}>
                    {currency.map((currency_code) => (
                      <li key={currency_code}>
                        <button className={style.dropdownItem}>
                          <span
                            onClick={() => {
                              dispatch(setCurrency(currency_code));
                              closeMenu();
                            }}
                          >{currency_code}</span>
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
              <button className={style.buttons} onClick={handleClickRegister}>
                <FaUserPlus /> {t("NavBar.signUp")}
              </button>
              <button onClick={handleClickLogin}
                className={style.buttons}
              >
                <BsLock /> {t("NavBar.logIn")}
              </button>
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

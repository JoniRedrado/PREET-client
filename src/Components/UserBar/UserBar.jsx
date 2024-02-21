import { useState, useEffect, useRef, Suspense } from "react";
import {
  FaUser,
  FaHome,
  FaHistory,
  FaStar,
  FaSignOutAlt,
  FaUserCog,
} from "react-icons/fa";
import { useSpring, animated } from "react-spring";
import styles from "./UserbarStyles.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showModal, userLog } from "../../redux/actions";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import { useTranslation } from "react-i18next";

const UserBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const darkMode = useDarkMode();
  function logout(option) {
    localStorage.removeItem("token");
    localStorage.removeItem("rol")
    dispatch(showModal(option, false));
    dispatch(userLog());
    navigate("/");
  }

  const [showMenu, setShowMenu] = useState(false);
  const menuButtonRef = useRef(null);

  const menuAnimation = useSpring({
    opacity: showMenu ? 1 : 0,
    transform: showMenu ? "scale(1)" : "scale(0)",
  });

  const closeMenu = () => {
    setShowMenu(false);
  };

  const handleClickOutside = (event) => {
    if (
      menuButtonRef.current &&
      !menuButtonRef.current.contains(event.target)
    ) {
      // Cerrar el menú si se hace clic fuera de él
      closeMenu();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={`${styles.userBar} ${darkMode ? styles.darkMode : ""}`}>
      <button
        ref={menuButtonRef}
        className={styles.menuButton}
        onClick={() => setShowMenu(!showMenu)}
      >
        <FaUser /> {t("UserBar.welcome")}
      </button>

      <animated.div className={styles.menu} style={menuAnimation}>
        <Link to="/settings" className={styles.link}>
          <button>
            <FaUser /> {t("UserBar.manage")}
          </button>
        </Link>
        {/* <Link to="/create" className={styles.link}>
            <button>
                <FaHome /> Post Your Property
            </button>
        </Link> */}
        <Link to="/myreservations" className={styles.link}>
          <button>
            <FaHistory /> {t("UserBar.history")}
          </button>
        </Link>
        <Link to="/userFavorites" className={styles.link}>
          <button>
            <FaStar /> {t("UserBar.favorites")}
          </button>
        </Link>
        {/* <Link to="/dashboard" className={styles.link}>
            <button> 
            <FaUserCog /> Dashboard
            </button>
        </Link> */}
        <button onClick={() => logout("login")} className={styles.singOut}>
          <FaSignOutAlt /> {t("UserBar.out")}
        </button>
      </animated.div>
    </div>
  );
};

export default function WrappedApp() {
  return (
    <Suspense>
      <UserBar />
    </Suspense>
  );
}

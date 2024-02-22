import { useState, useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import logo from "../../assets/Logo.svg";
import { useSelector } from "react-redux";
import { MdMenu } from "react-icons/md";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import { useTranslation } from "react-i18next";
import DashboardTools from "../DashboardTools/DashboardTools";
import GestionHotels from "./GestionHotels/GestionHotels";
import GestionRooms from "./GestionRooms/GestionRooms";
import GestionUsers from "./GestionUsers/GestionUsers";
import Graphics from "./Metrics/Graphics";
import CreateForm from "../CreateForm/CreateForm";
import CreateRooms from "../CreateRooms/CreateRooms";
import Header from "../Header/Header";
import swal from "sweetalert";

const Dashboard = () => {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const { t } = useTranslation();
  const [menuShow, setMenuShow] = useState(false);
  const selectedOption = useSelector((state) => state.selectedOption);

  const graphics = "Graphics";
  const hotelManagement = "hotelManagement";
  const roomManagement = "roomManagement";
  const usersManagement = "usersManagement";
  const newHotel = "newHotel";
  const newRoom = "newRoom";

  const handleMenu = () => {
    setMenuShow(!menuShow);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        const rol = localStorage.getItem("rol");

        if (token && rol === "admin") {
        } else {
          swal(
            t("dashboard.swalErrorTitle"),
            t("dashboard.swalErrorText"),
            "error"
          );
          navigate("/");
        }
      } catch (error) {
        console.error("Error de autenticación:", error);
        navigate("/");
      }
    };
    checkAuth();
  }, [navigate]);

  const renderContent = (option) => {
    switch (option) {
      case graphics:
        return <Graphics />;

      case hotelManagement:
        return <GestionHotels />;

      case roomManagement:
        return <GestionRooms />;

      case usersManagement:
        return <GestionUsers />;

      case newHotel:
        return <CreateForm />;

      case newRoom:
        return <CreateRooms />;
      default:
        break;
    }
  };

  return (
    <div className={`${styles.mainDiv} ${darkMode ? styles.darkMode : ""}`}>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <div className={styles.wrapperLogo}>
            <img src={logo} alt="logo" className={styles.logo} />
          </div>
        </div>

        <div className={styles.headerContainer}>
          <div className={styles.menuContainer}>
            <button className={styles.menuButton} onClick={handleMenu}>
              <MdMenu className={styles.menuIcon} />
            </button>
          </div>
          <div className={styles.nav}>
            <Header />
          </div>
        </div>
      </div>
      <div className={styles.element}>
        <div className={styles.tools}>
          <DashboardTools />
        </div>
        <div className={styles.render}>{renderContent(selectedOption)}</div>
      </div>
    </div>
  );
};

export default function WrappedApp() {
  return (
    <Suspense>
      <Dashboard />
    </Suspense>
  );
}

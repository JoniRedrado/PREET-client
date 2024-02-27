/* eslint-disable no-undef */
import { Suspense } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./Header.module.css";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { pathname } = useLocation();
  const darkMode = useDarkMode();
  const { t } = useTranslation();

  const renderHeaderContent = () => {   
    if (pathname === "/") {
      return (
        <header
          className={`${styles.divHeader} ${darkMode.darkMode ? styles.darkMode : styles.header1}`}
        >
          <div className={styles.headerContainer}>
            <div className={styles.navbarContainer}>
              <NavBar />
            </div>
            <div className={styles.textContainer}>
              <h1>{t("Header.phrase")}</h1>
            </div>
          </div>
        </header>
      );
    } else if (pathname === "/dashboard" || pathname === "/dashboard/") {
      return (
        <header className={styles.dashboardHeader}>
          <div className={styles.headerContainer3}>
            <NavBar heightNav={{ height: "5px" }} />
          </div>
        </header>
      )
    } else {
      return (
        <header className={styles.header2}>
          <div className={styles.headerContainer2}>
            <NavBar heightNav={{ height: "5px" }} />
          </div>
        </header>
      );
    }
  };
  return renderHeaderContent();
};

export default function WrappedApp() {
  return (
    <Suspense>
      <Header />
    </Suspense>
  );
}

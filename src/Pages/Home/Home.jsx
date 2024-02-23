import { useEffect, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHotels, getAllCountries, userLog } from "../../redux/actions";
import Slider from "../../Components/Slider/Slider";
import TrendingCountries from "../../Components/TrendingCountries/TrendingCountries";
import { useDarkMode } from '../../DarkModeContext/DarkModeContext';
import styles from "./Home.module.css"
import SearchBar from "../../Components/SearchBar/SearchBar"
import axios from "axios";
import { useTranslation } from "react-i18next";

function Home() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const filteredHotels = useSelector((state) => state.filteredHotels);
  const currentPage = useSelector((state) => state.currentPage); 
  const userChanged = useSelector((state) => state.userChanged);
  const [userName, setUserName] = useState("")
  const { t } = useTranslation();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    axios
    .get(`${import.meta.env.VITE_BACK_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setUserName(response.data.name.charAt(0).toUpperCase() + response.data.name.slice(1))
    })

    .catch((error) => {
      console.error(error);
    });

    if (!filteredHotels.length) {
      dispatch(getAllHotels())
    }
    dispatch(getAllCountries());
    if (userChanged) {
      dispatch(userLog());
    }
  }, [currentPage, userLog, token]);

  return (
    <div className={`${styles.mainContainer} ${darkMode ? styles.darkMode : ''}`}>
      <div className={styles.searchContainer}>
        <div className={styles.titleContainer}>
          <span>{t("Home.span1")}{userName}{t("Home.span2")}</span>
          <p>{t("Home.p")}</p>
        </div>
        <div className={styles.searchbarContainer}>
          <SearchBar/>
        </div>
      </div>
      <div className={styles.trendingCountriesContainer}>
        <TrendingCountries/>
      </div>
      <div className={styles.sliderContainer}>
      <Slider />
      </div>
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
}
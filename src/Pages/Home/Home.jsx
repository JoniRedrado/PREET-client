import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHotels, getAllCountries, userLog } from "../../redux/actions";
import Slider from "../../Components/Slider/Slider";
import TrendingCountries from "../../Components/TrendingCountries/TrendingCountries";
import { useDarkMode } from '../../DarkModeContext/DarkModeContext';
import styles from "./Home.module.css"

function Home() {
  const dispatch = useDispatch();
  const filteredHotels = useSelector((state) => state.filteredHotels);
  const currentPage = useSelector((state) => state.currentPage); 
  const userChanged = useSelector((state) => state.userChanged);

  const { darkMode } = useDarkMode();

  useEffect(() => {

    if (!filteredHotels.length) {
      dispatch(getAllHotels())
    }
    dispatch(getAllCountries());
    if (userChanged) {
      dispatch(userLog());
    }
  }, [currentPage, userLog]);

  return (
    <div className={`${styles.mainContainer} ${darkMode ? styles.darkMode : ''}`}>
      <div className={styles.sliderContainer}>
      <Slider />
      </div>

      <div className={styles.trendingCountriesContainer}>
        <TrendingCountries/>
      </div>
    </div>
  );
}

export default Home;

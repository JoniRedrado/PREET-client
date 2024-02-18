import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllHotels, getAllCountries, userLog } from "../../redux/actions";
import Slider from "../../Components/Slider/Slider";
import TrendingCountries from "../../Components/TrendingCountries/TrendingCountries";
import { useDarkMode } from '../../DarkModeContext/DarkModeContext';
import styles from "./Home.module.css"

function Home() {
  const dispatch = useDispatch();
  const allHotels = useSelector((state) => state.allHotels)
  const searched = useSelector((state) => state.searched)
  const filteredHotels = useSelector((state) => state.filteredHotels);
  const currentPage = useSelector((state) => state.currentPage);
  // const filters = useSelector((state) => state.submitFilters);hbn    
  const userChanged = useSelector((state) => state.userChanged);
  const [noResults, setNoResults] = useState(false);

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

  useEffect(() => {
    if (filteredHotels.total === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
  }, [filteredHotels]);

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

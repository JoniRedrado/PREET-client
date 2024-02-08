import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "../../Components/Cards/Cards";
import { filterHotels, getAllCountries, userLog } from "../../redux/actions";
import Filters from "../../Components/Filters/Filters";
import TryAgain from "../../Components/Try again/TryAgain";
import Slider from "../../Components/Slider/Slider";
import { useDarkMode } from '../../DarkModeContext/DarkModeContext';
import styles from "./Home.module.css"

function Home() {
  const dispatch = useDispatch();
  const filteredHotels = useSelector((state) => state.filteredHotels);
  const currentPage = useSelector((state) => state.currentPage);
  const filters = useSelector((state) => state.submitFilters);
  const userChanged = useSelector((state) => state.userChanged);
  const [noResults, setNoResults] = useState(false);

  const { darkMode } = useDarkMode();
  /* console.log(filteredHotels); */

  useEffect(() => {
    dispatch(filterHotels(filters));
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

      <div className={styles.componentsContainer}>
      <Filters />
        {noResults ? (
          <TryAgain />
        ) : (
        <div>
          <Cards allHotels={filteredHotels} />
        </div>
      )}
      </div>
    </div>
  );
}

export default Home;

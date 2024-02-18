import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  filterHotels,
  filterParams,
  resetCurrentPage,
  getAllHotels,
} from "../../redux/actions";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import styles from "./Filters.module.css";

const Filters = () => {
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode(); 
  const [selectedStars, setSelectedStars] = useState([1, 2, 3, 4, 5])
  const [guest, setGuest] = useState(1)
  const defaultFilters = {
    country: "",
    stars: 5,
    minPrice: "",
    maxPrice: "",
    orderBy: "",
    direction: "",
    startDate: "",
    endDate: "",
    guest: 1
  };

  const filters = useSelector((state) => state.submitFilters) || defaultFilters;

  const allCountries = useSelector((state) => state.countries);

  
  const handleFilters = (e) => {
    const { name, value } = e.target;
    dispatch(filterParams({ ...filters, [name]: value }));
  };

  const handleReset = () => {
    dispatch(filterParams(defaultFilters));
    dispatch(resetCurrentPage());
    dispatch(getAllHotels());
    setSelectedStars([1, 2, 3, 4, 5])
    console.log(defaultFilters);
  };

  const applyFilters = () => {
    dispatch(filterHotels(filters));
    dispatch(resetCurrentPage());
  };

  const handleStarClick = (star) => {
    const newSelectedStars = [1, 2, 3, 4, 5].filter((selectedStar) => selectedStar <= star);
    setSelectedStars(newSelectedStars);
    dispatch(filterParams({ ...filters, stars: star}));
  };

  //Contador para la cantidad de personas
  const handleDecrease = () => {
    if (guest > 1) {
      setGuest(guest - 1)
      dispatch(filterParams({...filters, guest: guest - 1}))
    }
  }

  const handleIncrease = () => {
      setGuest(guest + 1)
      dispatch(filterParams({...filters, guest: guest + 1}))
  }

  const handleGuest = (e) => {
    e.preventDefault()
    setGuest(e.target.value)
    dispatch(filterParams({...filters, guest: e.target.value}))
  }
  
  return (
    <div className={`${styles.sidebar} ${darkMode ? styles.darkMode : ""}`}>
      <div className={styles.filterContainer}>
        <h2>Filter By:</h2>
        <div>
          <p>Persons</p>
            <button onClick={handleDecrease}> - </button>
            <input type="text" name="guest" value={guest} onChange={handleGuest} className={styles.personsCounterInput} />
            <button onClick={handleIncrease}> + </button>
        </div>
        <div className={styles.dates}>
          <div className={styles.date}>
            <p>Start</p>
            <input onChange={handleFilters} type="date" name="startDate" value={filters.startDate || ""} className={styles.dateInput} />
          </div>
          <div className={styles.date}>
            <p>End</p>
            <input onChange={handleFilters} type="date" name="endDate" value={filters.endDate || ""} className={styles.dateInput} />
          </div>
        </div>
        <div className={styles.countriesContainer}>
          <p>Countries</p>
          <select
            name="country"
            value={filters.country || ""}
            onChange={handleFilters}
            className={styles.select}
          >
            <option className={styles.option} value="">
              All Countries
            </option>
            {allCountries &&
              allCountries.map((country, index) => (
                <option value={index + 1} key={index} className={styles.option}>
                  {country}
                </option>
              ))}
          </select>
        </div>

        <div className={styles.starsSelect}>
          <p>Stars</p>
          <div className={styles.starsButtonsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`${styles.starButton} ${selectedStars.includes(star) ? styles.activeStar : styles.unactiveStar}`}
                    onClick={() => handleStarClick(star)}>
                  <span role="img" aria-label="star">&#x2605;</span>
                  </button>
                ))}
          </div>
         
        </div>

        <div className={styles.priceSelect}>
          <p>Price</p>
          <div className={styles.inputContainer}>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              placeholder="min"
              step="10"
              min="0"
              max="10000"
              value={filters.minPrice || ""}
              onChange={handleFilters}
              className={styles.input}
            />
          </div>

          <div className={styles.inputContainer}>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              placeholder="max"
              step="10"
              min="0"
              max="10000"
              value={filters.maxPrice || ""}
              onChange={handleFilters}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.orderContainer}>
          <div className={styles.orderByContainer}>
            <p>Order By </p>
            <select
              name="orderBy"
              value={filters.orderBy || ""}
              onChange={handleFilters}
              className={styles.select2}
            >
              <option value="" disabled className={styles.option} hidden>
                Order by
              </option>
              <option value="countryId" className={styles.option}>
                Country
              </option>
              <option value="stars" className={styles.option}>
                Stars
              </option>
              <option value="price" className={styles.option}>
                Price
              </option>
            </select>
          </div>

          <div className={styles.directionContainer}>
            <p>Direction </p>
            <select
              name="direction"
              value={filters.direction || ""}
              onChange={handleFilters}
              className={styles.select2}
            >
              <option value="" disabled hidden className={styles.option}>
                Direction
              </option>
              <option value="ASC" className={styles.option}>
                ↑
              </option>
              <option value="DESC" className={styles.option}>
                ↓
              </option>
            </select>
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          <button onClick={applyFilters} className={styles.applyButton}>
            Apply Filters
          </button>
          <button onClick={handleReset} className={styles.clearButton}>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
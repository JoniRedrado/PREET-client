import { useDispatch, useSelector } from "react-redux";
import {
  filterHotels,
  filterParams,
  resetCurrentPage,
  getAllHotels,
} from "../../redux/actions";
import styles from "./Filters.module.css";

const Filters = () => {
  const dispatch = useDispatch();

  const defaultFilters = {
    country: "",
    stars: "",
    minPrice: "",
    maxPrice: "",
    orderBy: "",
    direction: "",
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
    console.log(defaultFilters);
  };

  const applyFilters = () => {
    dispatch(filterHotels(filters));
    dispatch(resetCurrentPage());
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.filterContainer}>
        <h2>Filters</h2>
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
          <select
            name="stars"
            value={filters.stars || ""}
            onChange={handleFilters}
            className={styles.select}
          >
            <option value="" className={styles.option}>All</option>
            <option value="1" className={styles.option}>⭐</option>
            <option value="2" className={styles.option}>⭐⭐</option>
            <option value="3" className={styles.option}>⭐⭐⭐</option>
            <option value="4" className={styles.option}>⭐⭐⭐⭐</option>
            <option value="5" className={styles.option}>⭐⭐⭐⭐⭐</option>
          </select>
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
              <option value="countryId" className={styles.option}>Country</option>
              <option value="stars" className={styles.option}>Stars</option>
              <option value="price" className={styles.option}>Price</option>
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
              <option value="ASC" className={styles.option}>↑</option>
              <option value="DESC" className={styles.option}>↓</option>
            </select>
          </div>
        </div>
        <div className={styles.buttonsContainer}>
        <button onClick={applyFilters} className={styles.applyButton}>Apply Filters</button>
        <button onClick={handleReset} className={styles.clearButton}>
          Clear Filters
        </button>
        </div>

      </div>
    </div>
  );
};

export default Filters;
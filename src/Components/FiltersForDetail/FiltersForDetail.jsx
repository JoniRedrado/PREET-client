import { useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, filterParams } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import { useTranslation } from "react-i18next";
import searchValidation from "../../helpers/searchValidation";
import swal from "sweetalert";

import styles from "./FiltersForDetail.module.css";
import axios from "axios";

const FiltersForDetail = () => {
  const dispatch = useDispatch();
  const { darkMode } = useDarkMode();
  const { id } = useParams();
  const { t } = useTranslation();

  const defaultFilters = {
    minPrice: "",
    maxPrice: "",
    guest: "",
  };

  const [filtersApplied, setFiltersApplied] = useState(false);
  const [errors, setErrors] = useState({});
  
  const hotelDetail = useSelector((state) => state.hotelDetail);
  const filters = useSelector((state) => state.submitFilters) || defaultFilters;
  const globalCurrency = useSelector((state) => state.currency)
  const [convertedPrice, setConvertedPrice] = useState(1)

  const currencyConverter = async (fromCurrency) => {

    console.log("Currency from", globalCurrency);

    try {
      const response = await axios.get(`https://openexchangerates.org/api/latest.json?app_id=${import.meta.env.VITE_CURRENCY_API}&base=USD`)
    
      const toCurrency = response.data.rates[globalCurrency]
  
      console.log(toCurrency);

      const result = Math.round(fromCurrency / toCurrency);

      setConvertedPrice(result)
    } catch (error) {
      console.error(error)
    }
  }

  console.log(convertedPrice);

  const handleFilters = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    dispatch(filterParams({ ...filters, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  
  const getCurrentDate = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    const day = now.getDate()
    
    const formattedMont = month < 10 ? `0${month}` : `${month}`
    const formattedDay = day < 10 ? `0${day}` : `${day}`
    
    return `${year}-${formattedMont}-${formattedDay}`
  }
  
  console.log(filters);

  const applyFilters = async (e) => {

    e.preventDefault()

    const {name, value} = e.target
    
    const errorsValidation = searchValidation(filters.startDate, filters.endDate, t)
    
    if(Object.keys(errorsValidation).length === 0) {
      
        dispatch(filterParams({...filters, [name]: value}))

        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));

        dispatch(getDetail(id, {...filters, [name]: convertedPrice}))
        setFiltersApplied(true);

    } else {
      setErrors(errorsValidation)
    }
  };

  const handleReset = () => {
    dispatch(getDetail(id, defaultFilters));
    dispatch(filterParams(defaultFilters));
    setFiltersApplied(false);
  };

  useEffect(() => {
    if (
      filtersApplied &&
      Object.keys(hotelDetail).length !== 0 &&
      !hotelDetail.rooms
    ) {
      swal({
        title: "Not Found",
        text: t("FiltersForD.swalText"),
        icon: "warning",
        button: "Go back",
      });
    }
  }, [hotelDetail, filtersApplied]);

  return (
    <div className={`${styles.sidebar} ${darkMode ? styles.darkMode : ""}`}>
      <div className={styles.filterContainer}>
        <h2>{t("FiltersForD.title")}</h2>

        <div className={styles.dates}>
          <div>
            <p>{t("FiltersForD.start")}</p>
            <input
              onChange={handleFilters}
              type="date"
              name="startDate"
              value={filters.startDate || ""}
              min={getCurrentDate()}
            />
            {errors.startDate && <p className={styles.errorFilters}>{errors.startDate}</p>}
          </div>
          <div>
            <p>{t("FiltersForD.end")}</p>
            <input
              onChange={handleFilters}
              type="date"
              name="endDate"
              value={filters.endDate || ""}
              min={getCurrentDate()}
            />
            {errors.endDate && <p className={styles.errorFilters}>{errors.endDate}</p>}
          </div>
        </div>

        <div>
          <p>{t("FiltersForD.price")} ({globalCurrency})</p>
          <div className={styles.inputContainer}>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              placeholder="min"
              step="10"
              min="0"
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
              value={filters.maxPrice || ""}
              onChange={handleFilters}
              className={styles.input}
            />
          </div>
        </div>

        <div>
          <p>{t("FiltersForD.guests")}</p>
          <select
            name="guest"
            value={filters.guest}
            onChange={handleFilters}
            className={styles.guest}
          >
            <option value="" disabled hidden>
              {t("FiltersForD.option")}
            </option>
            {hotelDetail.rooms &&
              [...new Set(hotelDetail.rooms.map((room) => room.guest))]
                .sort((a, b) => a - b)
                .map((guest, index) => (
                  <option value={guest} key={index}>
                    {guest}
                  </option>
                ))}
          </select>
        </div>

        <div className={styles.buttonsContainer}>
          <button onClick={applyFilters} className={styles.applyButton}>
            {t("FiltersForD.applyBtn")}
          </button>
          <button onClick={handleReset} className={styles.clearButton}>
            {t("FiltersForD.resetBtn")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function WrappedApp() {
  return (
    <Suspense>
      <FiltersForDetail />
    </Suspense>
  );
}

import { useState, useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail, DetailFilterParams } from "../../redux/actions";
import { useParams } from "react-router-dom";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";
import { useTranslation } from "react-i18next";
import swal from "sweetalert";

import styles from "./FiltersForDetail.module.css";

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

  const [localFilters, setLocalFilters] = useState(defaultFilters);
  const [filtersApplied, setFiltersApplied] = useState(false);

  const hotelDetail = useSelector((state) => state.hotelDetail);

  const filters =
    useSelector((state) => state.submitRoomFilters) || defaultFilters;

  const handleFilters = (e) => {
    const { name, value } = e.target;
    setLocalFilters({ ...localFilters, [name]: value });
    dispatch(DetailFilterParams({ ...localFilters, [name]: value }));
  };

  const applyFilters = () => {
    dispatch(getDetail(id, filters));
    setFiltersApplied(true);
  };

  const handleReset = () => {
    setLocalFilters(defaultFilters);
    dispatch(getDetail(id, defaultFilters));
    dispatch(DetailFilterParams(defaultFilters));
    setFiltersApplied(false);
  };

  useEffect(() => {
    handleReset();
  }, []);

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
            />
          </div>
          <div>
            <p>{t("FiltersForD.end")}</p>
            <input
              onChange={handleFilters}
              type="date"
              name="endDate"
              value={filters.endDate || ""}
            />
          </div>
        </div>

        <div>
          <p>{t("FiltersForD.price")}</p>
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

        <div>
          <p>{t("FiltersForD.guests")}</p>
          <select
            name="guest"
            value={localFilters.guest}
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

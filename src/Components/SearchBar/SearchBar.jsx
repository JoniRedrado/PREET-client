import { useState, Suspense, useEffect } from "react";
import { filterParams, filterHotels, specificPage } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import s from "../SearchBar/SearchBar.module.css"
import { FaSearch, FaLocationArrow } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import searchValidation from "../../helpers/searchValidation";
import { useDarkMode } from "../../DarkModeContext/DarkModeContext";

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {darkMode} = useDarkMode()

  const [searchInput, setSearchInput] = useState("");
  const [guest, setGuest] = useState(1);
  const [errors, setErrors] = useState({});

  const defaultFilters = {
    name: "",
    country: "",
    startDate: "",
    endDate: "",
    guest: 1,
  };

  const filters = useSelector((state) => state.submitFilters || defaultFilters)

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

  const handleSearchInput = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setSearchInput(value)
    dispatch(filterParams({ ...filters, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const errorsValidation = searchValidation(filters.startDate, filters.endDate, t)

    if(Object.keys(errorsValidation).length === 0) {
      dispatch(specificPage(1));
      dispatch(filterHotels(filters))
      setSearchInput("")
      navigate(`/search/`);
    } else {
      setErrors(errorsValidation)
    }
  }

  const handleDecrease = () => {
    if (guest > 1) {
      setGuest(guest - 1)
      dispatch(filterParams({...filters, guest: guest - 1}))
    }
  }

  const handleIncrease = () => {
      if (guest < 6) {
        setGuest(guest + 1)
        dispatch(filterParams({...filters, guest: guest + 1}))
      }
  }

  // Manejar el cambio en el input del contador de personas
  const handleGuestChange = (e) => {
    // Este método evitará que el usuario modifique directamente el valor del input
    // Utilizamos el valor actual de 'guest' en lugar del valor ingresado por el usuario
    // Esto asegurará que el valor sea consistente con los botones de incremento y decremento
    e.preventDefault();
    const value = parseInt(e.target.value, 10); // Convertir el valor a entero
    if (!isNaN(value) && value >= 1 && value <= 6) { // Verificar si el valor está en el rango válido
      setGuest(value);
      dispatch(filterParams({...filters, guest: value}));
    }
  };

  useEffect(() => {
    dispatch(filterParams({...filters, guest: 1}))
  }, [])

  return (
    <div className={`${s.container} ${darkMode ? s.darkMode : ""}`}>
      <div className={s.searchBar}>
        <div className={`${s.iconContainer} ${darkMode ? s.darkMode : ""}`}>
          <FaLocationArrow className={`${s.searchIcon} ${darkMode ? s.darkMode : ""}`}/>
        </div>
        <input
          className={s.searchInput}
          type="text"
          placeholder={t("SearchBar.placeholder")}
          onChange={handleSearchInput}
          name='name'
          value={searchInput}
        />
      </div>
      <div className={s.filters}>
        <div className={s.startDate}>
          <div className={s.date}>
            <div className={s.checkContainer}>
              <p className={s.check}>Check-in</p>
            </div>
            <input type="date" name='startDate' onChange={handleFilters} min={getCurrentDate()} className={ s.dateInput } />
          </div>
          {errors.startDate && <p className={s.searchBarError}>{errors.startDate}</p>}
        </div>
        <div className={s.endDate}>
          <div className={s.date}>
            <div className={s.checkContainer}>
              <p className={s.check}>Check-out</p>
            </div>
            <input type="date" name='endDate' onChange={handleFilters} min={getCurrentDate()} className={ s.dateInput }/>
          </div>
          {errors.endDate && <p className={s.searchBarError}>{errors.endDate}</p>}
        </div>
        <div className={s.persons}>
          <div className={s.guests}>
            <p className={s.check2}>{t("SearchBar.guests")}</p>
          </div>
          <div className={`${s.buttonContainer} ${darkMode ? s.darkMode : ""}`}>
            <button onClick={handleDecrease}> - </button>
            <input 
              type="text" 
              name="guest" 
              value={guest} 
              readOnly
              onChange={handleGuestChange} 
              className={`${s.personsCounterInput} ${darkMode ? s.darkMode : ""}`} 
            />
            <button onClick={handleIncrease}> + </button>
          </div>
        </div>
        <div className={s.buttonContainer2}>
          <button onClick={handleSubmit} className={s.searchButton}>{t("SearchBar.button")}<FaSearch className={s.buttonIcon}/></button>
        </div>
      </div>
    </div>
  );
};

export default function WrappedApp() {
  return (
    <Suspense>
      <SearchBar />
    </Suspense>
  );
}
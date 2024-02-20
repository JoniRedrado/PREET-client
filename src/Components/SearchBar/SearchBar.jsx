import { useState, Suspense } from "react";
import { filterParams, filterHotels, specificPage } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import s from "../SearchBar/SearchBar.module.css"
import { FaSearch, FaLocationArrow } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [searchInput, setSearchInput] = useState("");
  const [guest, setGuest] = useState(1);

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
  };

  const handleSearchInput = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setSearchInput(value)
    dispatch(filterParams({ ...filters, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(specificPage(1));
    dispatch(filterHotels(filters))
    setSearchInput("")
    // location.pathname === "/" ? navigate(`/search/${encodeURIComponent(searchInput)}`) : null;
    navigate(`/search/`);
  }

  const handleDecrease = () => {
    if (guest > 1) {
      setGuest(guest - 1)
      dispatch(filterParams({...filters, guest: guest - 1}))
    }
  }

  const handleIncrease = () => {
      if (guest < 6) { // Limitar el número máximo de personas a 6
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

  return (
    <div className={s.container}>
      <div className={s.searchBar}>
        <div className={s.iconContainer}>
          <FaLocationArrow className={s.searchIcon} />
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
        <div className={s.date}>
          <div className={s.checkContainer}>
            <p className={s.check}>Check-in</p>
          </div>
          <input type="date" name='startDate' onChange={handleFilters} className={ s.dateInput } />
        </div>
        <div className={s.date}>
          <div className={s.checkContainer}>
            <p className={s.check}>Check-out</p>
          </div>
          <input type="date" name='endDate' onChange={handleFilters} className={ s.dateInput }/>
        </div>
        <div className={s.persons}>
          <p>Guests: </p>
          <div className={s.buttonContainer}>
            <button onClick={handleDecrease}> - </button>
            {/* Utilizamos readOnly para evitar la edición directa del input */}
            <input 
              type="text" 
              name="guest" 
              value={guest} 
              readOnly
              onChange={handleGuestChange} 
              className={s.personsCounterInput} 
            />
            <button onClick={handleIncrease}> + </button>
          </div>
        </div>
        <button onClick={handleSubmit} className={s.searchButton}>Search <FaSearch className={s.buttonIcon}/></button>
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
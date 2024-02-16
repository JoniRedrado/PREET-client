import { useState } from "react";
import { filterParams, filterHotels } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import s from "../SearchBar/SearchBar.module.css"
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [persons, setPersons] = useState(1)

  const defaultFilters = {
    name: "",
    country: "",
    startDate: "",
    endDate: "",
    persons: 1,
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
    dispatch(filterHotels(filters))
    setSearchInput("")
    // location.pathname === "/" ? navigate(`/search/${encodeURIComponent(searchInput)}`) : null;
    navigate(`/search/`);
  }

  //Contador para la cantidad de personas
  const handleDecrease = () => {
    if (persons > 1) {
      setPersons(persons - 1)
      dispatch(filterParams({...filters, persons: persons - 1}))
    }
  }

  const handleIncrease = () => {
      setPersons(persons + 1)
      dispatch(filterParams({...filters, persons: persons + 1}))
  }

  const handlePersons = (e) => {
    e.preventDefault()
    setPersons(e.target.value)
    dispatch(filterParams({...filters, persons: e.target.value}))
  }

  console.log(filters);
  return (
    <div className={s.container}>
      <div className={s.searchBar}>
        <FaSearch className={s.searchIcon} />
        <input
          className={s.searchInput}
          type="text"
          placeholder="Explore hotels or countries"
          onChange={handleSearchInput}
          name='name'
          value={searchInput}
        />
      </div>
      <div className={s.filters}>
        <div className={s.date}>
          <p>Check-in</p>
          <input type="date" name='startDate' onChange={handleFilters} className={ s.dateInput } />
        </div>
        <div className={s.date}>
          <p>Check-out</p>
          <input type="date" name='endDate' onChange={handleFilters} className={ s.dateInput }/>
        </div>
        <div>
          <p>Persons</p>
            <button onClick={handleDecrease}> - </button>
            <input type="text" name="persons" value={persons} onChange={handlePersons} className={s.personsCounterInput} />
            <button onClick={handleIncrease}> + </button>
        </div>
        <button onClick={handleSubmit} className={s.searchButton}>Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
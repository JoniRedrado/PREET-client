import { useState } from "react";
import { filterParams, resetCurrentPage, getAllHotels, filterHotels, getHotelByName } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import s from "../SearchBar/SearchBar.module.css"
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const defaultFilters = {
    name: "",
    country: "",
    entryDate: "",
    finishDate: "",
    persons: 1,
  };

  const filters = useSelector((state) => state.submitFilters || defaultFilters)

  const handleFilters = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setSearchInput(value)
    dispatch(filterParams({ ...filters, [name]: value }));
  };

  console.log(searchInput);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      let name = e.target.value;
      setSearchInput(name);
      dispatch(getHotelByName(name));
      setSearchInput("")
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getHotelByName(searchInput))
    setSearchInput("")
    // navigate(`/search/${encodeURIComponent(searchInput)}`);
  }

  return (
    <div className={s.container}>
      <div className={s.searchBar}>
        <FaSearch className={s.searchIcon} />
        <input
          className={s.searchInput}
          type="text"
          placeholder="Explore hotels or countries"
          onChange={handleFilters}
          onKeyPress={handleKeyPress}
          name={filters.name && filters.country}
          value={searchInput}
        />
      </div>
      <div className={s.filters}>
        <div className={s.date}>
          <p>Check-in</p>
          <input type="date" name='initialDate' className={ s.dateInput } />
        </div>
        <div className={s.date}>
          <p>Check-out</p>
          <input type="date" name='finalDate' className={ s.dateInput }/>
        </div>
        <div>
          <p>Persons</p>
          <select name="persons">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="+4">+4</option>
          </select>
        </div>
        <button onClick={handleSubmit} className={s.searchButton}>Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
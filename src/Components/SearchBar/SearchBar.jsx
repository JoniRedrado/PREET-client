import { useState } from "react";
import { getHotelByName } from "../../redux/actions";
import { useDispatch } from "react-redux";
import s from "../SearchBar/SearchBar.module.css"
import { FaSearch } from "react-icons/fa"

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      let name = e.target.value;
      setName(name);
      dispatch(getHotelByName(name));
      setName("")
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(getHotelByName(name))
    setName("")
  }

  const handleInputChange = async (e) => {
    let name = e.target.value;
    setName(name)
  };

  return (
    <div className={s.container}>
      <div className={s.searchBar}>
      <FaSearch className={s.searchIcon} />
      <input
        className={s.searchInput}
        type="text"
        placeholder="Explore destination cities or places"
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        value={name}
      />

      </div>
      <div className={s.filters}>
      <button onClick={handleSubmit} className={s.searchButton}>Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
import { useState } from "react";
import { getHotelByName } from "../../redux/actions";
import { useDispatch } from "react-redux";
import s from "../SearchBar/SearchBar.module.css"

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
    <div>
      <div className={s.searchBar}>
        <input
          className={s.searchInput}
          type="text"
          placeholder="Enter a name"
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          value={name}
        />
        <button onClick={handleSubmit}>Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
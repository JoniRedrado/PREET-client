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
    }
  };

  const handleInputChange = async (e) => {
    let name = e.target.value;
    setName(name)
    dispatch(getHotelByName(name));
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
      </div>
    </div>
  );
};

export default SearchBar;
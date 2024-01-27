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

  const handleSubmit = async (e) => {
    let name = e.target.value;
    setName(name);
    dispatch(getHotelByName(name));
  };

  const handleInputChange = async (e) => {
    let name = e.target.value;
    setName(name)
    dispatch(getHotelByName(name));
  };

  return (
    <div>
      <div className={s.search}>
        <input
          type="text"
          placeholder="Enter a name"
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          value={name}
        />
        <button type="submit" onClick={handleSubmit}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

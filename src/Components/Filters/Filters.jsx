import React from "react";
import { useDispatch } from "react-redux";
import {
  getAllHotels,
  filterByCountry,
  sortByPrice,
} from "../../redux/actions";
import { ASCENDING, DESCENDING } from "../../redux/sortConsts/sortConsts";

import style from "./Filters.module.css";

function Filters() {
  const dispatch = useDispatch();

  const handleCountryFilter = (e) => {
    const selection = e.target.value;
    if (selection === "all") {
      dispatch(getAllHotels());
    }
    dispatch(filterByCountry(selection));
  };

  const handleSortPrices = (e) => {
    const selection = e.target.value;
    if (selection === "all") {
      dispatch(getAllHotels());
    } else if (selection === "lowest") {
      dispatch(sortByPrice(ASCENDING));
    } else {
      dispatch(sortByPrice(DESCENDING));
    }
  };

  return (
    <div className={style.container}>
      <div className={style.countFilter}>
        <p>Countries</p>
        <select
          name="selectCountry"
          defaultValue="all"
          onChange={handleCountryFilter}
        >
          <option value="allCountries">All Countries</option>
          <option value="Argentina">Argentina</option>
          <option value="Brazil">Brazil</option>
          <option value="Chile">Chile</option>
          <option value="Colombia">Colombia</option>
          <option value="Ecuador">Ecuador</option>
          <option value="Mexico">Mexico</option>
          <option value="Peru">Peru</option>
          <option value="Uruguay">Uruguay</option>
          <option value="Venezuela">Venezuela</option>
          <option value="Paraguay">Paraguay</option>
        </select>
      </div>

      <div className={style.priceSort}>
        <p>Order by </p>
        <select
          name="selectPrice"
          defaultValue="All"
          onChange={handleSortPrices}
        >
          <option value="moreRelevant">More relevant</option>
          <option value="lowest">Price (lowest first)</option>
          <option value="highest">Price (highest first)</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;

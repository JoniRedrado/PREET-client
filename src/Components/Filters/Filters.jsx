import React from "react";
import { useDispatch } from "react-redux";
import {
  getAllHotels,
  filterByCountry,
  sortByPrice,
} from "../../redux/actions";
// import { ASCENDING, DESCENDING } from "../../redux/sortConsts/sortConsts";

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
    dispatch(sortByPrice(selection));
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
          <option value="all">All Countries</option>
          <option value="1">Argentina</option>
          <option value="2">Bolivia</option>
          <option value="3">Brazil</option>
          <option value="4">Chile</option>
          <option value="5">Colombia</option>
          <option value="6">Ecuador</option>
          <option value="7">French Guiana</option>
          <option value="8">Guyana</option>
          <option value="9">Malvinas</option>
          <option value="10">Paraguay</option>
          <option value="11">Peru</option>
          <option value="12">Surinam</option>
          <option value="13">Uruguay</option>
          <option value="14">Venezuela</option>
        </select>
      </div>

      <div className={style.priceSort}>
        <p>Order by </p>
        <select name="selectPrice" onChange={handleSortPrices}>
          <option value="moreRelevant">More relevant</option>
          <option value="lowest">Price (lowest first)</option>
          <option value="highest">Price (highest first)</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;

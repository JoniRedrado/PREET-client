// import React from "react";
// import { useDispatch } from "react-redux";
// import {
//   getAllHotels,
//   filterByCountry,
//   sortByPrice,
// } from "../../redux/actions";
// // import { ASCENDING, DESCENDING } from "../../redux/sortConsts/sortConsts";

// import style from "./Filters.module.css";

// function Filters() {
//   const dispatch = useDispatch();

//   const handleCountryFilter = (e) => {
//     const selection = e.target.value;
//     if (selection === "all") {
//       dispatch(getAllHotels());
//     }
//     dispatch(filterByCountry(selection));
//   };

//   const handleSortPrices = (e) => {
//     const selection = e.target.value;
//     dispatch(sortByPrice(selection));
//   };

//   return (
//     <div className={style.container}>
//       <div>
//         <p>Price</p>
//         <select>
//           <option>Price</option>
//         </select>
//       </div>
//       <div>
//         <p>Stars</p>
//         <select>
//           <option>Stars</option>
//         </select>
//       </div>
//       <div className={style.countFilter}>
//         <p>Countries</p>
//         <select
//           name="selectCountry"
//           defaultValue="all"
//           onChange={handleCountryFilter}
//         >
//           <option value="all">All Countries</option>
//           <option value="1">Argentina</option>
//           <option value="2">Bolivia</option>
//           <option value="3">Brazil</option>
//           <option value="4">Chile</option>
//           <option value="5">Colombia</option>
//           <option value="6">Ecuador</option>
//           <option value="7">French Guiana</option>
//           <option value="8">Guyana</option>
//           <option value="9">Malvinas</option>
//           <option value="10">Paraguay</option>
//           <option value="11">Peru</option>
//           <option value="12">Surinam</option>
//           <option value="13">Uruguay</option>
//           <option value="14">Venezuela</option>
//         </select>
//       </div>

      // <div className={style.priceSort}>
      //   <p>Order by </p>
      //   <select name="selectPrice" onChange={handleSortPrices}>
      //     <option value="moreRelevant">More relevant</option>
      //     <option value="lowest">Price (lowest first)</option>
      //     <option value="highest">Price (highest first)</option>
      //   </select>
      // </div>
//     </div>
//   );
// }

// export default Filters;

import { useDispatch, useSelector } from "react-redux"
import { filterHotels, filterParams } from "../../redux/actions"
// import s from "../Filters/Filters.module.css"
//*PRUEBA
// import { useState } from "react"
import './Filters.style.css'


const Filters = () => {
  
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.submitFilters)

  //*PRUEBA

  const handleFilters = (e) => {
    const { name, value } = e.target;
    dispatch(filterParams({...filters, [name]:value}));
  };

  const applyFilters = () => {
    dispatch(filterHotels(filters));
  };
 

  //*
  // let filtros = {}

  // const handleFilters = (e) =>{
  //   console.log(e);
  //   const newFilter = e.target.name
  //   const selection = e.target.value;
  //   filtros[newFilter] = selection
    
  //   dispatch(filterHotels(filtros))
  // } 

  return (
    <div>
      <div className="container-filtros">
        <div>
          <p>Countries</p>
          <select name="country" defaultValue="" onChange={handleFilters}>
            <option value="">All Countries</option>
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
        <div>
          <p>Stars</p>
          <select name="stars" onChange={handleFilters}>
            <option value="">Cualquiera</option>
            <option value="1">⭐</option>
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
          </select>
        </div>
        <div>
          <div>
            <label>Price range</label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              placeholder="min"
              step="10"
              min="0"
              max="10000"
              onChange={handleFilters}
            />
          </div>

          <div>
            <label>Price range</label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              placeholder="max"
              step="10"
              min="0"
              max="10000"
              onChange={handleFilters}
            />
          </div>
        </div>
        <div className="order">
          <div>
            <p>Order For </p>
            <select name="orderBy" onChange={handleFilters}>
              <option value="">Order For</option>
              <option value="countryId">Country</option>
              <option value="stars">Stars</option>
              <option value="price">Price</option>
            </select>
          </div>
          <div>
            <p>Direction </p>
            <select name="direction" onChange={handleFilters}>
              <option value="">Direction</option>
              <option value="ASC">↓</option>
              <option value="DESC">↑</option>
            </select>
          </div>
        </div>
        <button onClick={applyFilters}>Apply Filters</button>
      </div>
    </div>
  );
}

export default Filters;
import axios from "axios";

import {
  NEXT_PAGE,
  PREV_PAGE,
  SPECIFIC_PAGE,
  SET_CURRENT_PAGE,
  GET_ALL_HOTELS,
  GET_HOTEL_BY_NAME,
  GET_DETAIL,
  DELETE_HOTEL,
  FILTER_BY_COUNTRY,
  SORT_BY_PRICE,
  // POST_HOTEL,
  // GET_COUNTRIES
} from "./actions-types";

export const getAllHotels = () => {
  return async (dispatch) => {
    try {
      const endpoint = `http://localhost:3001/hotels`;
      const response = await axios.get(endpoint);
      dispatch({
        type: GET_ALL_HOTELS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
};
export const getHotelByName = (name) => {
  return async (dispatch) => {
    try {
      const endpoint = `http://localhost:3001/hotels?name=${name}`;
      const response = await axios.get(endpoint);
      dispatch({
        type: GET_HOTEL_BY_NAME,
        payload: response.data,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
};
export const getDetail = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/hotels/${id}`);
      return dispatch({
        type: GET_DETAIL,
        payload: response.data,
      });
    } catch (error) {
      window.alert("Error fetching hotels details");
    }
  };
};
export function setCurrentPage() {
  return {
    type: SET_CURRENT_PAGE,
    payload: 1,
  };
}
export const nextPage = () => {
  return function (dispatch, getStage) {
    const { currentPage } = getStage();
    dispatch({
      type: NEXT_PAGE,
      payload: currentPage + 1,
    });
  };
};
export const prevPage = () => {
  return function (dispatch, getStage) {
    const { currentPage } = getStage();
    dispatch({
      type: PREV_PAGE,
      payload: currentPage - 1,
    });
  };
};
export const specificPage = (page) => {
  return function (dispatch) {
    dispatch({
      type: SPECIFIC_PAGE,
      payload: page,
    });
  };
};

export const deleteHotel = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.delete(`http://localhost:3001/hotels/${id}`);
      return dispatch({
        type: DELETE_HOTEL,
        payload: response.data,
      });
    } catch (error) {
      window.alert("Error");
    }
  };
};

export function filterByCountry(country) {
  return async function (dispatch) {
    try {
      dispatch({ type: FILTER_BY_COUNTRY, payload: country });
    } catch (error) {
      console.log(error.message);
    }
  };
}

export function sortByPrice(order) {
  return async function (dispatch) {
    try {
      dispatch({ type: SORT_BY_PRICE, payload: order });
    } catch (error) {
      console.log(error.message);
    }
  };
}

// export const postHotel = (payload) => async dispatch => {
//   try {
//       const response = await axios.post('http://localhost:3001/hotels', payload);
      
//       dispatch({
//           type: POST_HOTEL,
//           payload: response.data
//       });
//   } catch (error) {
//       window.alert("Error adding new hotel", error.message)
//   }
// };

// export function getCountries() {
//   return async function (dispatch) {
//       try {
//           const response = await axios.get(`http://localhost:3001/countries`);
          
//           dispatch({
//               type: GET_COUNTRIES,
//               payload: response.data
//           });
//       } catch (error) {
//           console.error("Error fetching countries:", error);
//       }
//   };
// }
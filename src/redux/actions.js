import axios from "axios";

import { NEXT_PAGE, PREV_PAGE, SPECIFIC_PAGE, SET_CURRENT_PAGE, GET_ALL_HOTELS, GET_HOTEL_BY_NAME, GET_DETAIL } from "./actions-types";
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
      const response = await axios.get(
        `http://localhost:3001/hotels/${id}`
      );

      return dispatch ({
        type: GET_DETAIL,
        payload: response.data
      })
      }
      catch(error) {
        window.alert("Error fetching hotels details");
      }
  }
}
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


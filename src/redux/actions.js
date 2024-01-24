import axios from "axios";

import {
  GET_HOTELS,
  GET_DETAIL,
} from "./actions-types";

export const getHotels = () => {
  return async function(dispacth){
      try {
          const response = await axios(`http://localhost:3001/hotels`)

          return dispacth({
              type: GET_HOTELS,
              payload:response.data
          })
      } catch (error) {
          window.alert("Error getting hotels")
      }
  }
      
}

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

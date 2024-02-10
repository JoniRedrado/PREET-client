import axios from 'axios';

import {
  NEXT_PAGE,
  PREV_PAGE,
  SPECIFIC_PAGE,
  GET_ALL_HOTELS,
  // CLEAR_HOTELS_FILTERS,
  GET_HOTEL_BY_NAME,
  GET_DETAIL,
  DELETE_HOTEL,
  FILTER_BY_COUNTRY,
  SORT_BY_PRICE,
  // POST_HOTEL,
  // GET_COUNTRIES,
  FETCH_ITEMS_SUCCESS,
  FILTER_HOTELS,
  RESET_CURRENT_PAGE,
  HANDLE_FILTERS,
  GET_ALL_COUNTRIES,
  SHOW_MODAL,
  USER_LOG,
  GET_ALL_FAVORITES,
  USER_FAVORITES,
  HOTEL_FAVORITES,
  POST_FAVORITE,
  REMOVE_FAVORITE,
} from './actions-types';

export const getAllHotels = () => {
  return async (dispatch, getStage) => {
    const { currentPage } = getStage();
    try {
      const endpoint = `${import.meta.env.VITE_BACK_URL}/hotels?page=${currentPage}`;
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

//* Pendiente lógica para limpiar los filtros
// export const clearHotelsFilter = () => {
//   return async (dispatch) => {
//     try {
//       const endpoint = `${import.meta.env.VITE_BACK_URL}/hotels`;
//       const response = await axios.get(endpoint);
//       dispatch({
//         type: CLEAR_HOTELS_FILTERS,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.error(error.message);
//     }
//   };
// };

export const getAllCountries = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACK_URL}/countries`);
      dispatch({
        type: GET_ALL_COUNTRIES,
        payload: data,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const getHotelByName = (name) => {
  return async (dispatch, getStage) => {
    const { currentPage } = getStage();
    try {
      const endpoint = `${import.meta.env.VITE_BACK_URL}/hotels?name=${name}&page=${currentPage}`;
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
      const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/hotels/detail/${id}`);
      return dispatch({
        type: GET_DETAIL,
        payload: response.data,
      });
    } catch (error) {
      window.alert(`Error fetching hotels details`);
    }
  };
};

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

export const resetCurrentPage = () => {
  return function (dispatch) {
    dispatch({
      type: RESET_CURRENT_PAGE,
    });
  };
};

export const deleteHotel = (id) => {
  return async function (dispatch) {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACK_URL}/hotels/${id}`);
      return dispatch({
        type: DELETE_HOTEL,
        payload: response.data,
      });
    } catch (error) {
      window.alert(`Error`);
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
//       const response = await axios.post('${import.meta.env.VITE_BACK_URL}/hotels', payload);

//       dispatch({
//           type: POST_HOTEL,
//           payload: response.data
//       });
//   } catch (error) {
//       window.alert(`Error adding new hotel`, error.message)
//   }
// };

// export function getCountries() {
//   return async function (dispatch) {
//       try {
//           const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/countries`);

//           dispatch({
//               type: GET_COUNTRIES,
//               payload: response.data
//           });
//       } catch (error) {
//           console.error(`Error fetching countries:`, error);
//       }
//   };
// }

export const pagination = (page) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACK_URL}/hotels?page=${page}`
      );
      return dispatch({
        type: FETCH_ITEMS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.error(`Error fetching data:`, error);
    }
  };
};

// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFilters((prevFilters) => ({
//     ...prevFilters,
//     [name]: value,
//   }));
// };

export const filterParams = (params) => {
  /* console.log(params); */
  return function (dispatch) {
    dispatch({
      type: HANDLE_FILTERS,
      payload: params,
    });
  };
};

export const filterHotels = (params) => {
  return async (dispatch, getStage) => {
    const { currentPage } = getStage();
    try {
      const queryParams = {
        page: currentPage,
        stars: params.stars,
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        country: params.country,
        orderBy: params.orderBy,
        direction: params.direction,
      };

      const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/hotels`, {
        params: queryParams,
      });

      /* console.log(response.data); */
      dispatch({
        type: FILTER_HOTELS,
        payload: response.data,
      });
      /* console.log(`Respuesta del backend:`, response.data); */
    } catch (error) {
      console.error(`Error al filtrar hoteles:`, error);
    }
  };
};

export const showModal = (option, boolean) => {
  return {
      type: SHOW_MODAL,
      payload: {option, boolean}
  };
};

export const userLog = () => {
  return {
      type: USER_LOG,
  };
};

export const getAllFavorites = () => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/favorites`);
      console.log(response.data);
      return dispatch({
        type: GET_ALL_FAVORITES,
        payload: response.data,
      });
    } catch (error) {
        console.error(error)
    }
  };
}

export const userFavorites = (token) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/favorites/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return dispatch({
        type: USER_FAVORITES,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}

export const hotelFavorites = (hotelId) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACK_URL}/favorites/hotel/${hotelId}`);
      return dispatch({
        type: HOTEL_FAVORITES,
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};


export const postFavorite = (hotelId, token) => {
  return async function(dispatch){
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACK_URL}/favorites/${hotelId}`,{},{
      headers: {
        Authorization: `Bearer ${token}`
      }
      })
      return dispatch({
        type: POST_FAVORITE,
        payload: response.data,
      });
    } catch (error) {
      console.error(error)
    }
  }
}

export const removeFavorite = (id, token) => {
  return async function (dispatch) {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACK_URL}/favorites/${id}`
      , {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
      return dispatch({
        type: REMOVE_FAVORITE,
        payload: id,
      });
    } catch (error) {
      console.error(error);
    }
  };
};


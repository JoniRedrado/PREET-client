/* eslint-disable no-case-declarations */
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
  FETCH_ITEMS_SUCCESS,
  FILTER_HOTELS,
  RESET_CURRENT_PAGE,
  HANDLE_FILTERS,
  GET_ALL_COUNTRIES,
  SHOW_MODAL,
  USER_LOG,
} from "./actions-types";

let initialState = {
  filteredHotels: {},
  submitFilters: {},
  currentPage: 1,
  hotelDetail: {},
  countries: [],
  newHotel: {},
  searched: false,
  totalHotels: "",
  showModal: {
    register: false,
    login: false,
  },
  userChanged: false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_HOTELS:
      return {
        ...state,
        filteredHotels: action.payload,
        totalHotels: action.payload.total,
      };

    //* Pendiente de lógica para limpiar los filtros.
    // case CLEAR_HOTELS_FILTERS:
    //   return {
    //     ...state,
    //     filteredHotels: action.payload,
    //     totalHotels: action.payload.total,
    //   };

    case GET_HOTEL_BY_NAME:
      return {
        ...state,
        filteredHotels: action.payload,
        totalHotels: action.payload.total,
        currentPage: 1,
      };
    case NEXT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case PREV_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case SPECIFIC_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case RESET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: 1,
      };
    case GET_DETAIL:
      return {
        ...state,
        hotelDetail: action.payload,
      };
    case DELETE_HOTEL:
      return {
        ...state,
        allHotels: action.payload,
      };

    case FILTER_BY_COUNTRY:
      let countryFilter = [];
      if (action.payload === "all") {
        countryFilter = state.allHotels;
      } else {
        countryFilter = state.allHotels.filter(
          (hotel) => hotel.countryId == action.payload
        );
      }

      return {
        ...state,
        filteredHotels: countryFilter,
        currentPage: 1,
        searched: true,
      };

    case SORT_BY_PRICE:
      let priceOrder = [];
      if (action.payload === "moreRelevant") {
        priceOrder = [...state.allHotels];
      } else if (action.payload === "lowest") {
        priceOrder = [...state.allHotels].sort(
          (hotelA, hotelB) => hotelA.price - hotelB.price
        );
      } else if (action.payload === "highest") {
        priceOrder = [...state.allHotels].sort(
          (hotelA, hotelB) => hotelB.price - hotelA.price
        );
      }

      console.log(priceOrder);

      return {
        ...state,
        filteredHotels: priceOrder,
        currentPage: 1,
        searched: true,
      };

    // case POST_HOTEL:
    //   return{
    //       ...state,
    //       newHotel: action.payload
    //   }
    //   case GET_COUNTRIES:
    //     return{
    //         ...state,
    //         countries: action.payload
    //     }
    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        filteredHotels: action.payload,
        totalHotels: action.payload.total,
      };
    case FILTER_HOTELS:
      return {
        ...state,
        totalHotels: action.payload.total,
        filteredHotels: action.payload,
      };

    case HANDLE_FILTERS:
      return {
        ...state,
        submitFilters: action.payload,
      };

    case GET_ALL_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    case SHOW_MODAL:
      return {
        ...state,
        showModal: {
          ...state.showModal,
          [action.payload.option]: action.payload.boolean,
        },
      };
    case USER_LOG:
      return {
        ...state,
        userChanged: !state.userChanged
      };
    default:
      return state;
  }
}

export default rootReducer;

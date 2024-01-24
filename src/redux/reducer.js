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
} from "./actions-types";
import { ASCENDING, DESCENDING } from "./sortConsts/sortConsts";

let initialState = {
  allHotels: [],
  filteredHotels: [],
  currentPage: 1,
  hotelDetail: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_HOTELS:
      return {
        ...state,
        allHotels: action.payload,
      };

    case GET_HOTEL_BY_NAME:
      return {
        ...state,
        allHotels: action.payload,
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
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
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
      action.payload === "allCountries"
        ? (countryFilter = [...state.allHotels])
        : (countryFilter = [...state.allHotels].filter((hotel) =>
            hotel.address.split("-").pop().includes(action.payload)
          ));
      return {
        ...state,
        filteredHotels: countryFilter,
        currentPage: 1,
      };

    case SORT_BY_PRICE:
      let priceOrder = [...state.filteredHotels];
      priceOrder.sort((a, b) => {
        if (a.price < b.price) {
          return action.payload === ASCENDING ? -1 : 1;
        }
        if (a.price > b.price) {
          return action.payload === DESCENDING ? 1 : -1;
        }
        return 0;
      });
      return {
        ...state,
        filteredHotels: priceOrder,
        currentPage: 1,
      };

    default:
      return state;
  }
}

export default rootReducer;

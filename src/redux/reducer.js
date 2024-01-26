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
 FETCH_ITEMS_SUCCESS
} from "./actions-types";
import { ASCENDING, DESCENDING } from "./sortConsts/sortConsts";

let initialState = {
  allHotels: [],
  filteredHotels: [],
  currentPage: 1,
  hotelDetail: {},
  countries: [],
  newHotel: {},
  searched: false,
  totalPages:1
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
      console.log("reducer", action.payload);
      return {
        ...state,
        filteredHotels: action.payload,
        // currentPage: action.payload,
        // totalPages: action.payload,
        
      };
      
    default:
      return state;
  }
}

export default rootReducer;

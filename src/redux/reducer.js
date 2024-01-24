import { NEXT_PAGE, PREV_PAGE, SPECIFIC_PAGE, SET_CURRENT_PAGE, GET_ALL_HOTELS, GET_HOTEL_BY_NAME, GET_DETAIL } from "./actions-types";

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
          hotelDetail: action.payload
        }
    default:
      return state;
  }
}

export default rootReducer;

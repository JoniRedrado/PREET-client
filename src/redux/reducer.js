import {
  GET_HOTELS,
  GET_DETAIL,
} from "./actions-types";

let initialState = {
  hotels:{},
  allHotels:[],
  hotelDetail:{},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HOTELS:
      return{
        ...state,
        allHotels:action.payload,
        hotels:action.payload
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

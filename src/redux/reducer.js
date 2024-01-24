import { NEXT_PAGE, PREV_PAGE, SPECIFIC_PAGE, SET_CURRENT_PAGE } from "./actions-types";

let initialState = {
  currentPage: 1
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}

export default rootReducer;

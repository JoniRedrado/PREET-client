import {
  COUNTER
} from "./actions-types";

let initialState = {
  counter: 1
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case COUNTER:
      return {
        ...state,
        counter: action.payload
      }
    default:
      return state;
  }
}

export default rootReducer;

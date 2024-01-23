import {
  COUNTER,
} from "./actions-types";

export const contador = () => {
  return function (dispatch, getStage) {
    const { counter } = getStage()
    dispatch({
      type: COUNTER,
      payload: counter + 1,
    })
  }
};

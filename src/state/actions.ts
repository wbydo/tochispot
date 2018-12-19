import * as types from "./types";
import { Spot } from "./reducers";

export const init = () => {
  return {
    type: types.INIT,
  };
};

export const addSpot = (spot: Spot) => {
  return {
    payload: {
      spot,
    },
    type: types.ADD_SPOT,
  };
};

export const panTo = (spot: Spot) => {
  return {
    payload: {
      spot,
    },
    type: types.PAN_TO,
  };
};

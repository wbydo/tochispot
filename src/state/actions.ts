import * as types from "./types";
import { Spot } from "./middlewares";

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

export const filter = (visibleGenre: string) => {
  return {
    payload: {
      visibleGenre,
    },
    type: types.FILTER,
  };
};

export const reset = () => {
  return {
    type: types.RESET,
  };
};

import * as types from "./types";
import * as actions from "./actions";

import { Action as _Action } from "./util";

export type Action = _Action<typeof actions>;

export interface Spot {
  name: string;
  url: string;
  lat: number;
  lng: number;
  genres: string[];
}

export interface RootState {
  spots?: Spot[];
  genres?: Set<string>;
}

const addSpot = (state: RootState, action: ReturnType<typeof actions.addSpot>) => {
  if (state.genres === undefined || state.spots === undefined) {
    return {
      genres: new Set(action.payload.spot.genres),
      spots: [action.payload.spot],
    };
  } else {
    return {
      genres: new Set([...action.payload.spot.genres, ...state.genres]),
      spots: [action.payload.spot, ...state.spots],
    };
  }
};

const reducer = (state: RootState | undefined, action: Action) => {
  if (state === undefined) {
    return {};
  }
  switch (action.type) {
    case types.ADD_SPOT:
      return addSpot(state, action);

    default:
      return state;
  }
};

export default reducer;

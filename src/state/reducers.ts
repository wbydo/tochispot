import * as types from "./types";
import * as actions from "./actions";

import { Action as _Action } from "./util";

export type Action = _Action<typeof actions>;

export interface Spot {
  name: string;
  url: string;
  lat: number;
  lng: number;
}

export interface RootState {
  spots: Spot[] | null;
}

const addSpot = (state: RootState, action: ReturnType<typeof actions.addSpot>) => {
  if (state.spots === null) {
    return { spots: [action.payload.spot] };
  } else {
    return {
      spots: [action.payload.spot, ...state.spots],
    };
  }
};

const reducer = (state: RootState | undefined, action: Action) => {
  if (state === undefined) {
    return {spots: null};
  }
  switch (action.type) {
    case types.ADD_SPOT:
      return addSpot(state, action);

    default:
      return state;
  }
};

export default reducer;

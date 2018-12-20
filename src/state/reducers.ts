import * as types from "./types";
import * as actions from "./actions";

import { Action as _Action } from "./util";

export type Action = _Action<typeof actions>;

export interface SpotWithVisibility {
  name: string;
  url: string;
  lat: number;
  lng: number;
  genres: string[];
  visible: boolean;
}

export interface RootState {
  spots?: SpotWithVisibility[];
  genres?: Set<string>;
}

const addSpot = (state: RootState, action: ReturnType<typeof actions.addSpot>) => {
  if (state.genres === undefined || state.spots === undefined) {
    return {
      genres: new Set(action.payload.spot.genres),
      spots: [{...action.payload.spot, visible: true}],
    };
  } else {
    return {
      genres: new Set([...action.payload.spot.genres, ...state.genres]),
      spots: [{...action.payload.spot, visible: true}, ...state.spots],
    };
  }
};

const reducer = (state: RootState | undefined, action: Action): RootState => {
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

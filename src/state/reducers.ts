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
  genres?: {
    active: string | null,
    others: Set<string>,
  };
}

const addSpot = (state: RootState, action: ReturnType<typeof actions.addSpot>) => {
  if (state.genres === undefined || state.spots === undefined) {
    return {
      genres: {active: null, others: new Set(action.payload.spot.genres)},
      spots: [{...action.payload.spot, visible: true}],
    };
  } else {
    return {
      genres: {active: null, others: new Set([...action.payload.spot.genres, ...state.genres.others])},
      spots: [{...action.payload.spot, visible: true}, ...state.spots],
    };
  }
};

const extractActiveGenres = (spots: SpotWithVisibility[]): Set<string> => {
  const nested = spots
  .filter((spot) => spot.visible)
  .map((spot) => spot.genres);

  return new Set(Array.prototype.concat.apply([], nested));
};

const filter = (state: RootState, action: ReturnType<typeof actions.filter>) => {
  if (state.genres === undefined || state.spots === undefined) {
    throw new Error();
  }

  const {visibleGenre} = action.payload;
  const spots = state.spots.map((spot) => {
    if (spot.genres.includes(visibleGenre)) {
      return {...spot, visible: true};
    } else {
      return {...spot, visible: false};
    }
  });

  const genres = extractActiveGenres(spots);
  genres.delete(visibleGenre);

  return {
    genres: {
      active: visibleGenre,
      others: genres,
    },
    spots,
  };
};

const reducer = (state: RootState | undefined, action: Action): RootState => {
  if (state === undefined) {
    return {};
  }
  switch (action.type) {
    case types.ADD_SPOT:
      return addSpot(state, action);

    case types.FILTER:
      return filter(state, action);

    default:
      return state;
  }
};

export default reducer;

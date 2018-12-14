import * as url from "url";
import { Dispatch } from "redux";

import * as types from "./types";
import * as actions from "./actions";
import { RootState, Action, Spot } from "./reducers";

type JsonResult = Spot[];

interface Store {
  getState: () => RootState;
  dispatch: Dispatch;
}

type Middleware = (store: Store) => (next: Dispatch) => (action: Action) => void;

export const middleware: Middleware
    = (store: Store) => (next: Dispatch) => async (action: Action) => {

  switch (action.type) {
    case types.INIT:
      const baseUrl =  location.href;
      const targetUrl = url.resolve(baseUrl, "data/spot.json");
      const resp = await fetch(targetUrl);
      const result = (await resp.json()) as JsonResult;

      for (const spot of result) {
        next(actions.addSpot(spot));
      }
      break;

    default:
      next(action);
      break;
  }
};

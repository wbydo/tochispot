import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./reducers";
export { Spot, RootState } from "./reducers";

import * as _actions from "./actions";
export const actions = _actions;

import { MapManageer } from "./middlewares";

const maneger = new MapManageer();

const enhancer = composeWithDevTools(
  applyMiddleware(maneger.middleware),
);

const store = createStore(
  reducer,
  enhancer,
);

export default store;

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./reducers";
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

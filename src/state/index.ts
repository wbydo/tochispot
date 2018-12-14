import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./reducers";
import { middleware } from "./middlewares";

const enhancer = composeWithDevTools(
  applyMiddleware(middleware),
);

const store = createStore(
  reducer,
  enhancer,
);

export default store;

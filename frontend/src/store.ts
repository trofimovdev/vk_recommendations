import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./store/reducers";

const initialState = {};
const middleware = [thunk];

const composeEnhancers = compose;

const composedEnhancers = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, initialState, composedEnhancers);
export default store;

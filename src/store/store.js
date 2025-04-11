import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import treeReducer from "../reducers/treeReducer";

let reducers = combineReducers({
    treeReducer: treeReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

export default store;
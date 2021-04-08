import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

const ccreateRootReducer = history => combineReducers({
    router: connectRouter(history)
});

export default ccreateRootReducer;
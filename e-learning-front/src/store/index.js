import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { dashboardReducer, profileReducer } from '../reducers/user/UserReducers';
import { connectRouter, routerMiddleware} from "connected-react-router";
import entitiesReducer from './reducers/entities';
import authReducer from './reducers/auth';
import { createBrowserHistory } from 'history';

import authentication from './middleware/authentication';
import api from './middleware/api';



export const history = createBrowserHistory();

const reducer = combineReducers({
    router: connectRouter(history),
    entities : entitiesReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    profile: profileReducer
});



const store = configureStore({
    reducer,
    middleware : [
        ...getDefaultMiddleware(),
        authentication,
        routerMiddleware(history),
        api
    ]
});

export default store;

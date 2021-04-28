import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import api from './middleware/api';
import { authReducer, dashboardReducer, profileReducer } from '../reducers/user/UserReducers';

import { connectRouter, routerMiddleware} from "connected-react-router";

import entitiesReducer from './reducers/entities';
import logger from './middleware/logger';
import { createBrowserHistory } from 'history';


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
        routerMiddleware(history),
        api
    ]
});

export default store;

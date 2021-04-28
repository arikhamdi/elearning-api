import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import api from './middleware/api';
import { dashboardReducer, profileReducer } from '../reducers/user/UserReducers';

import { connectRouter, routerMiddleware} from "connected-react-router";

import entitiesReducer from './reducers/entities';
import authReducer from './reducers/auth';
import logger from './middleware/logger';
import { createBrowserHistory } from 'history';
import { authentication } from './middleware/authentication';


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
        api,
    ]
});

export default store;

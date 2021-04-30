import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import api from '../store/middleware/api';

import {coursesReducer, courseDetailsReducer, subjectsReducer, modulesReducer, contentReducer} from './course/CourseReducers';
import { authReducer, dashboardReducer, profileReducer } from './user/UserReducers';

import entitiesReducer from '../store/reducers/entities';

const reducer = combineReducers({
    entities : entitiesReducer,
    courseDetails : courseDetailsReducer,
    modules: modulesReducer,
    content : contentReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    profile: profileReducer
});


const store = configureStore({
    reducer ,
    middleware : [
        ...getDefaultMiddleware(),
        api
    ]
});

export default store;

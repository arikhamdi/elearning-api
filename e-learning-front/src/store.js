import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {coursesReducer, courseDetailsReducer, subjectsReducer} from './reducers/course/CourseReducers';
import { authReducer, dashboardReducer, profileReducer } from './reducers/user/UserReducers';

const reducer = combineReducers({
    courses : coursesReducer,
    courseDetails : courseDetailsReducer,
    subjects : subjectsReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    profile: profileReducer
});


let initialState = {}
const middleware = [thunk]; 
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
    )


export default store;
import { combineReducers } from 'redux';
import { authReducer, dashboardReducer, profileReducer } from './user/UserReducers';

export default combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
    profile: profileReducer
});

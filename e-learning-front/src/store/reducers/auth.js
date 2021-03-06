import { combineReducers } from 'redux';

import authReducer from '../user/auth';
import favorisReducer from '../user/favoris';
import profileReducer from '../user/profile';

export default combineReducers({
    auth: authReducer,
    favoris : favorisReducer,
    profile : profileReducer
});

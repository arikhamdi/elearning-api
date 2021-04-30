import { combineReducers } from 'redux';

import authReducer from '../user/auth';
import favorisReducer from '../user/favoris';

export default combineReducers({
    auth: authReducer,
    favoris : favorisReducer
});

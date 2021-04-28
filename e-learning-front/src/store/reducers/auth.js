import { combineReducers } from 'redux';

import authReducer from '../user/auth';

export default combineReducers({
    auth: authReducer
});

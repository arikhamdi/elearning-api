import { combineReducers } from 'redux';

import authReducer from '../user/auth';
import cartReducer from '../user/cart';

export default combineReducers({
    auth: authReducer,
    cart : cartReducer
});

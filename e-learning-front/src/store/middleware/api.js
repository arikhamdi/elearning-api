import axios from "axios";
import { API } from '../../config';
import * as actions from '../types/api';

const api = ({dispatch}) => next => async action => {

    if (action.type !== actions.apiRequest.type ) return next(action);
    
    const {url, method, data, onStart, onSuccess, onError } = action.payload;
    
    if (onStart) dispatch({type: onStart});
 
    next(action);

    try {
        
        const response = await axios.request({
            baseURL : API,
            url,
            method,
            data
        });
        // General
        dispatch(actions.apiRequestSuccess(response.data));
        // Specific
        if (onSuccess) dispatch({type: onSuccess, payload: response.data});
    } catch(error) {
        if (error.response) {
            // General
            dispatch(actions.apiRequestFailed(error?.response?.data));
            // Specific
            if (onError) dispatch({type: onError, payload: error.response.data});
        } else if (error.message) {
            console.log(JSON.stringify(error.message));
        } else {
            console.log('error', JSON.stringify(error));
        }
        
    }

}

export default api;
import {push } from 'react-router-redux';
import { isEmpty } from "../../utils/Utils";
import { apiRequestFailed }  from '../types/api';

const logger = store => next => action =>{
    
    if (action.type === apiRequestFailed.type ) {
            console.log('next', next);
            console.log('action', action.payload);
            // dispatch(push('/not-found'));
            // window.location.reload();
         next(action);
        }


        // console.log('redirect me')
        //  store.dispatch(push('/'))
         next(action);
        
        

    // console.log("store", store);
    // console.log("next", next);

    
};

export default logger;
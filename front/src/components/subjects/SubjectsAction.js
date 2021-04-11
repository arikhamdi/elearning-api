import axios from 'axios';
import { GET_SUBJECTS } from './SybjectsTypes';

export const getSubjects = () => async dispatch => {
    try {
        const response = await axios.get('subjects/');
        dispatch({
            type : GET_SUBJECTS,
            payload: response.data
        });

    } catch (error){
        console.log("Error: ", error);
    }
        
}
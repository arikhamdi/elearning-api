import axios from 'axios';
import {GET_COURSES, GET_COURSE_DETAIL} from './CoursesTypes';

export const getCourses = (param = "/") => async dispatch => {
    try {
        const response = await axios.get(param);
        dispatch({
            type: GET_COURSES,
            payload : response.data
        });
    } catch (error) {
        console.log("Error: ", error);
    }
}


export const getCourseDetail = param => async dispatch => {
        try {
            const response = await axios.get(param);
            dispatch({
                type: GET_COURSE_DETAIL,
                payload : response.data
            });
        } catch (error) {
            console.log("Error: ", error);
        }
    }

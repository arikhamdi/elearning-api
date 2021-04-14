import axios from 'axios';
import {
    GET_COURSES,
    COURSE_DETAIL_REQUEST,
    COURSE_DETAIL_SUCCESS,
    COURSE_DETAIL_FAIL,
    ENROLL_COURSE
} from './CoursesTypes';

export const getCourses = (param = "/") => dispatch => {
        axios.get(param)
        .then(response => {
            dispatch({
                type: GET_COURSES,
                payload : response.data
            })
        })
        .catch(error => console.log("Error: ", error))
}


export const getCourseDetails = param => async dispatch => {
        try {
            dispatch({type: COURSE_DETAIL_REQUEST});

            const { data } = await axios.get(param);
            // console.log(data)

            dispatch({
                type: COURSE_DETAIL_SUCCESS,
                payload : data
            });
        } catch (error) {
            dispatch({
                type: COURSE_DETAIL_FAIL,
                payload : error.response.data
            });
        }
    }


export const enroll = (isStudent) => dispatch => {
    axios.post(`/enroll/`);
    dispatch({
        type : ENROLL_COURSE,
        payload : !isStudent
    });
} 
import axios from 'axios';

import {
    GET_COURSES_REQUEST,
    GET_COURSES_SUCCESS,
    GET_COURSES_FAIL,
    COURSE_DETAIL_REQUEST,
    COURSE_DETAIL_SUCCESS,
    COURSE_DETAIL_FAIL,
    GET_SUBJECTS_REQUEST,
    GET_SUBJECTS_SUCCESS,
    GET_SUBJECTS_FAIL,
    ENROLL_COURSE
} from './CourseTypes';

export const getCourses = (param = "/") => dispatch => {

    dispatch({ type :GET_COURSES_REQUEST });
    axios.get(param)
    .then(response => {
        dispatch({
            type: GET_COURSES_SUCCESS,
            payload : response.data
        })
    })
    .catch(error => {
        dispatch({
            type: GET_COURSES_FAIL,
            payload : error.response.data
        })
    })
}

export const getCourseDetails = param => dispatch => {

        dispatch({type: COURSE_DETAIL_REQUEST});

        axios.get(param)
        .then(response => {
            dispatch({
                type: COURSE_DETAIL_SUCCESS,
                payload : response.data
            });
        })
        .catch(error => {
            dispatch({
                type: COURSE_DETAIL_FAIL,
                payload : error.response.data
            });
        })
}

export const getSubjects = () => dispatch => {

    dispatch({ type : GET_SUBJECTS_REQUEST });
    axios.get("/subjects/")
    .then(response => {
        dispatch({
            type: GET_SUBJECTS_SUCCESS,
            payload : [...response.data]
        })
    })
    .catch(error => {
        dispatch({
            type: GET_SUBJECTS_FAIL,
            payload : error
        })
    })
}

import axios from 'axios';
import { getSubscribedCourse } from '../user/UserActions';

import {
    GET_COURSES_REQUEST,
    GET_COURSES_SUCCESS,
    GET_COURSES_FAIL,
    COURSE_DETAIL_REQUEST,
    COURSE_DETAIL_SUCCESS,
    COURSE_DETAIL_FAIL,
    GET_STUDENT_COURSES_REQUEST,
    GET_STUDENT_COURSES_SUCCESS,
    GET_STUDENT_COURSES_FAIL,
    GET_MODULES_REQUEST,
    GET_MODULES_SUCCESS,
    GET_MODULES_FAIL,
    GET_CONTENT_REQUEST,
    GET_CONTENT_SUCCESS,
    GET_CONTENT_FAIL,
    GET_SUBJECTS_REQUEST,
    GET_SUBJECTS_SUCCESS,
    GET_SUBJECTS_FAIL,
    ENROLL_COURSE_REQUEST,
    ENROLL_COURSE_SUCCESS,
    ENROLL_COURSE_FAIL,
    CLEAR_ERROR
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
            payload : error
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
                payload : error
            });
        })
}

export const getStudentCourse = param => dispatch => {

    dispatch({type: GET_STUDENT_COURSES_REQUEST});

    axios.get(`/users/student/${param}/`)
    .then(response => {
        dispatch({
            type: GET_STUDENT_COURSES_SUCCESS,
            payload : response.data
        });
    })
    .catch(error => {
        dispatch({
            type: GET_STUDENT_COURSES_FAIL,
            payload : error
        });
    })
}

export const getContentById = (param, id) => dispatch => {

    dispatch({type: GET_CONTENT_REQUEST});

    axios.get(`/users/student/${param}/${id}/`)
    .then(response => {
        dispatch({
            type: GET_CONTENT_SUCCESS,
            payload : response.data
        });
    })
    .catch(error => {
        dispatch({
            type: GET_CONTENT_FAIL,
            payload : error
        });
    })
}

export const enrollStudent = param => dispatch => {

    dispatch({type: ENROLL_COURSE_REQUEST});

    axios.post(`${param}/enroll/`)
    .then(response => {
        dispatch(getSubscribedCourse());
        dispatch({
            type: ENROLL_COURSE_SUCCESS,
            payload : response.data.enrolled
        });
    })
    .catch(error => {
        dispatch({
            type: ENROLL_COURSE_FAIL,
            payload : error
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

export const clearErrors = () => dispatch => {
    dispatch({
        type: CLEAR_ERROR,
        payload : null
    })
}
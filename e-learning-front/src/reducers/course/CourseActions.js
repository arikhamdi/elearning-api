import axios from 'axios';
import { getSubscribedCourse } from '../user/UserActions';

import * as actions from './CourseTypes';

export const getCourses = (param = "/") => dispatch => {

    dispatch({ type : actions.GET_COURSES_REQUEST });
    axios.get(param)
    .then(response => {
        dispatch({
            type: actions.GET_COURSES_SUCCESS,
            payload : response.data
        })
    })
    .catch(error => {
        dispatch({
            type: actions.GET_COURSES_FAIL,
            payload : error
        })
    })
}

export const getCourseDetails = param => dispatch => {

        dispatch({type: actions.COURSE_DETAIL_REQUEST});

        axios.get(param)
        .then(response => {
            dispatch({
                type: actions.COURSE_DETAIL_SUCCESS,
                payload : response.data
            });
        })
        .catch(error => {
            dispatch({
                type: actions.COURSE_DETAIL_FAIL,
                payload : error
            });
        })
}

export const getStudentCourse = param => dispatch => {

    dispatch({type: actions.GET_STUDENT_COURSES_REQUEST});

    axios.get(`/users/student/${param}/`)
    .then(response => {
        dispatch({
            type: actions.GET_STUDENT_COURSES_SUCCESS,
            payload : response.data
        });
    })
    .catch(error => {
        dispatch({
            type: actions.GET_STUDENT_COURSES_FAIL,
            payload : error
        });
    })
}

export const getContentById = (param, id) => dispatch => {

    dispatch({type: actions.GET_CONTENT_REQUEST});

    axios.get(`/users/student/${param}/${id}/`)
    .then(response => {
        dispatch({
            type: actions.GET_CONTENT_SUCCESS,
            payload : response.data
        });
    })
    .catch(error => {
        dispatch({
            type: actions.GET_CONTENT_FAIL,
            payload : error
        });
    })
}

export const enrollStudent = param => dispatch => {

    dispatch({type: actions.ENROLL_COURSE_REQUEST});

    axios.post(`${param}/enroll/`)
    .then(response => {
        dispatch(getSubscribedCourse());
        dispatch({
            type: actions.ENROLL_COURSE_SUCCESS,
            payload : response.data.enrolled
        });
    })
    .catch(error => {
        dispatch({
            type: actions.ENROLL_COURSE_FAIL,
            payload : error
        });
    })
}


export const getSubjects = () => dispatch => {

    dispatch({ type : actions.GET_SUBJECTS_REQUEST });
    axios.get("/subjects/")
    .then(response => {
        dispatch({
            type: actions.GET_SUBJECTS_SUCCESS,
            payload : [...response.data]
        })
    })
    .catch(error => {
        dispatch({
            type: actions.GET_SUBJECTS_FAIL,
            payload : error
        })
    })
}

export const clearErrors = () => dispatch => {
    dispatch({
        type: actions.CLEAR_ERROR,
        payload : null
    })
}
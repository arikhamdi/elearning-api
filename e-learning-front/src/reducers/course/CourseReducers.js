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


export const coursesReducer = (state = { courses : [] }, action) => {
    switch(action.type) {
        case GET_COURSES_REQUEST:
            return {
                ...state,
                loading: true,
                courses : []
            };
        case GET_COURSES_SUCCESS:
            return {
                ...state,
                loading: false,
                courses : action.payload
            };
        case GET_COURSES_FAIL:
            return {
                loading: false,
                error : action.payload
            };
        default:
            return state;
    }
}

export const courseDetailsReducer = (state = { course : {} }, action) => {
    switch(action.type) {
        case COURSE_DETAIL_REQUEST:
            return {
                ...state,
                course : action.payload,
                loading: true
            };
        case COURSE_DETAIL_SUCCESS:
            if(localStorage.getItem('user'))
            return {
                ...state,
                course : action.payload,
                loading: false
            };
        case COURSE_DETAIL_FAIL:
            return {
                ...state,
                course : action.payload,
                error : action.payload
            };
        case ENROLL_COURSE:
            return {
                ...state,
                isStudent: action.payload
            };
        default:
            return state;
    }
}

export const subjectsReducer = (state = { subjects : [] }, action) => {
    switch(action.type) {
        case GET_SUBJECTS_REQUEST:
            return {
                ...state,
                subjects : []
            };
        case GET_SUBJECTS_SUCCESS:
            return {
                ...state,
                subjects : action.payload
            };
        case GET_SUBJECTS_FAIL:
            return {
                error : action.payload
            };
        default:
            return state;
    }
}


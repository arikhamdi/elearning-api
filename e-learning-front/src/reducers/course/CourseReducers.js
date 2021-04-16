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
        case ENROLL_COURSE_REQUEST:
        case GET_STUDENT_COURSES_REQUEST:
            return {
                ...state,
                loading: true
            };
        case COURSE_DETAIL_SUCCESS:
        case GET_STUDENT_COURSES_SUCCESS:
            let user = "";
            if(localStorage.getItem('user')){
                user = JSON.parse(localStorage.getItem('user'))                
            }
            return {
                ...state,
                course : action.payload,
                isStudent : (action.payload.students.filter((student) => student.email == user.email).length > 0),
                loading: false
            };
        case COURSE_DETAIL_FAIL:
        case ENROLL_COURSE_FAIL:
        case GET_STUDENT_COURSES_FAIL:
            return {
                ...state,
                loading: false,
                error : action.payload
            };
        case ENROLL_COURSE_SUCCESS:
            return {
                ...state,
                isStudent: action.payload
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export const modulesReducer = (state = { modules : {} }, action) => {
    switch(action.type) {
        case GET_MODULES_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_MODULES_SUCCESS:
            return {
                ...state,
                modules : action.payload,
                loading: false
            };
        case GET_MODULES_FAIL:
            return {
                ...state,
                loading: false,
                error : action.payload
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}

export const contentReducer = (state = { content : {} }, action) => {
    switch(action.type) {
        case GET_CONTENT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case GET_CONTENT_SUCCESS:
            return {
                ...state,
                content : action.payload,
                loading: false
            };
        case GET_CONTENT_FAIL:
            return {
                ...state,
                loading: false,
                error : action.payload
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: action.payload
            }
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


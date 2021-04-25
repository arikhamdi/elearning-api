import * as actions from './CourseTypes';

export const coursesReducer = (state = { courses : [] }, action) => {
    switch(action.type) {
        case actions.GET_COURSES_REQUEST:
            return {
                ...state,
                loading: true,
                courses : []
            };
        case actions.GET_COURSES_SUCCESS:
            return {
                ...state,
                loading: false,
                courses : action.payload
            };
        case actions.GET_COURSES_FAIL:
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
        case actions.COURSE_DETAIL_REQUEST:
        case actions.ENROLL_COURSE_REQUEST:
        case actions.GET_STUDENT_COURSES_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actions.COURSE_DETAIL_SUCCESS:
        case actions.GET_STUDENT_COURSES_SUCCESS:
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
        case actions.COURSE_DETAIL_FAIL:
        case actions.ENROLL_COURSE_FAIL:
        case actions.GET_STUDENT_COURSES_FAIL:
            return {
                ...state,
                loading: false,
                error : action.payload
            };
        case actions.ENROLL_COURSE_SUCCESS:
            return {
                ...state,
                isStudent: action.payload
            };
        case actions.CLEAR_ERROR:
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
        case actions.GET_MODULES_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actions.GET_MODULES_SUCCESS:
            return {
                ...state,
                modules : action.payload,
                loading: false
            };
        case actions.GET_MODULES_FAIL:
            return {
                ...state,
                loading: false,
                error : action.payload
            };
        case actions.CLEAR_ERROR:
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
        case actions.GET_CONTENT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actions.GET_CONTENT_SUCCESS:
            return {
                ...state,
                content : action.payload,
                loading: false
            };
        case actions.GET_CONTENT_FAIL:
            return {
                ...state,
                loading: false,
                error : action.payload
            };
        case actions.CLEAR_ERROR:
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
        case actions.GET_SUBJECTS_REQUEST:
            return {
                ...state,
                subjects : []
            };
        case actions.GET_SUBJECTS_SUCCESS:
            return {
                ...state,
                subjects : action.payload
            };
        case actions.GET_SUBJECTS_FAIL:
            return {
                error : action.payload
            };
        default:
            return state;
    }
}


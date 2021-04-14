import {
    GET_COURSES,
    COURSE_DETAIL_REQUEST,
    COURSE_DETAIL_SUCCESS,
    COURSE_DETAIL_FAIL,
    ENROLL_COURSE
} from './CoursesTypes';


export const coursesReducer = (state = { courses : [] }, action) => {
    switch(action.type) {
        case GET_COURSES:
            console.log('GET_COURSES: ', action.payload)
            return {
                ...state,
                courses : action.payload
            };

        default:
            return state;
    }
}

export const courseDetailReducer = (state = { course : {} }, action) => {
    switch(action.type) {
        case COURSE_DETAIL_REQUEST:
            return {
                loading: true
            };
        case COURSE_DETAIL_SUCCESS:
            if(localStorage.getItem('user'))
            return {
                loading: false,
                course : action.payload
                
            };
        case COURSE_DETAIL_FAIL:
            return {
                loading: false,
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


import {GET_COURSES, GET_COURSE_DETAIL} from './CoursesTypes';

const initialState = {
    course : {},
    courses : [] 
};

export const coursesReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_COURSES:
            return {
                ...state,
                courses : [...action.payload]
            };
        case GET_COURSE_DETAIL:
            return {
                ...state,
                course : action.payload
            };
        default:
            return state;
    }
}


import { GET_SUBJECTS } from './SybjectsTypes';

const initialState = {
    subjects: []
};

export const subjectsReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_SUBJECTS:
            return {
                ...state,
                subjects : [...action.payload]
            };
        default:
            return state;
    }
}
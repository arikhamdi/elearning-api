import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    DASHBOARD_REQUEST,
    DASHBOARD_SUCCESS,
    DASHBOARD_FAIL,
    SET_TOKEN,
    UNSET_CURRENT_USER
} from './UserTypes';

export const authReducer = (state = { user : {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case SIGNUP_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            };
        case LOGIN_SUCCESS:
        case SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case SET_TOKEN:
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload
            };
        case UNSET_CURRENT_USER:
            return {
                user : null,
                isAuthenticated: false,
            };
        default :
            return state;

    }
}

export const dashboardReducer = (state = { courses : [] }, action) => {
    switch (action.type) {
        case DASHBOARD_REQUEST:
            return {
                ...state,
                loading: true,
                courses : []
            };
        case DASHBOARD_SUCCESS:
            return {
                ...state,
                loading: false,
                courses : action.payload
            };
        case DASHBOARD_FAIL:
            return {
                loading: false,
                error : action.payload
                    };
        default :
            return state; 
    }
}

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    DASHBOARD_REQUEST,
    DASHBOARD_SUCCESS,
    DASHBOARD_FAIL,
    SET_TOKEN,
    UNSET_CURRENT_USER,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    CLEAR_ERROR
} from './UserTypes';

const initialState = {
    user : {},
    loading: false,
    isAuthenticated:false

}
export const authReducer = (state = { initialState }, action) => {
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
        case SET_TOKEN:
            return {
                ...state,
                token: action.payload
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
        case UNSET_CURRENT_USER:
            return initialState;
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

export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
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

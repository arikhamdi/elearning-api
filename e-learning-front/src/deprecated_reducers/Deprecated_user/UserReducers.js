import * as actions from './UserTypes';

const initialState = {
    user : {},
    loading: false,
    isAuthenticated:false

}

export const authReducer = (state = { initialState }, action) => {
    switch (action.type) {
        case actions.LOGIN_REQUEST:
        case actions.SIGNUP_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            };
        case actions.LOGIN_SUCCESS:
        case actions.SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            };
        case actions.SET_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        case actions.LOGIN_FAIL:
        case actions.SIGNUP_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };
        case actions.UNSET_CURRENT_USER:
            return initialState;
        default :
            return state;

    }
}

export const dashboardReducer = (state = { courses : [] }, action) => {
    switch (action.type) {
        case actions.DASHBOARD_REQUEST:
            return {
                ...state,
                loading: true,
                courses : []
            };
        case actions.DASHBOARD_SUCCESS:
            return {
                ...state,
                loading: false,
                courses : action.payload
            };
        case actions.DASHBOARD_FAIL:
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
        case actions.UPDATE_PROFILE_REQUEST:
        case actions.UPDATE_PASSWORD_REQUEST:
        case actions.RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actions.UPDATE_PROFILE_SUCCESS:
        case actions.UPDATE_PASSWORD_SUCCESS:
        case actions.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            };
        case actions.UPDATE_PROFILE_FAIL:
        case actions.UPDATE_PASSWORD_FAIL:
        case actions.RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
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

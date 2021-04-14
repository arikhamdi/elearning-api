import axios from 'axios';
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

import { setAxiosAuthToken } from '../../utils/Utils';


export const login = (userData, redirectTo) => dispatch => {
    dispatch({type : LOGIN_REQUEST});

    axios.post("/auth/login/", userData)
    .then(response => {
        const auth_token  = response.data.key;
        setAxiosAuthToken(auth_token);
        dispatch(setToken(auth_token));
        dispatch(getCurrentUser(redirectTo));
    })
    .catch(error => {
        if (error.response) {
            console.log('error.response', JSON.stringify(error.response.data));
            dispatch({
                type : LOGIN_FAIL,
                payload: error.response.data
            });
        } else if ('error.message', error.message) {
            console.log(JSON.stringify(error.message));
        } else {
            console.log('error', JSON.stringify(error));
        }
    })
}

export const getCurrentUser =  redirectTo => async dispatch => {
    try {
        const response = await axios.get("/auth/user/");

        const user = {
            email: response.data.email,
            first_name: response.data.first_name,
            last_name: response.data.last_name
        };
        localStorage.setItem("user", JSON.stringify(user));
        if (redirectTo !== "") {
            redirectTo();
          }
        dispatch(setCurrentUser(user, redirectTo));
    } catch (error) {
        dispatch(unsetCurrentUser());
    }
}

export const setCurrentUser = (user, redirectTo) => dispatch => {

    dispatch({
        type : LOGIN_SUCCESS,
        payload: user
    });
    
      if (redirectTo !== "") {
        redirectTo();
      }
}

export const setToken = token => dispatch => {
    setAxiosAuthToken(token);
    localStorage.setItem("token", token);
    dispatch({
        type: SET_TOKEN,
        payload: token
    });
};

export const unsetCurrentUser = () => dispatch => {
    setAxiosAuthToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({
        type: UNSET_CURRENT_USER
    });
};

export const logout = (redirectTo) => dispatch => {
    axios.post("/auth/logout/").then(
        response => {
            dispatch(unsetCurrentUser());
            redirectTo();
            window.location.reload();
            
            console.log('Logout successful.');
        }
    )
    .catch(error => {
        dispatch(unsetCurrentUser());
            console.log('error', error);
    })
}

export const signup = (userData) => dispatch => {
    dispatch({type : SIGNUP_REQUEST});

    axios.post("/auth/registration/", userData)
    .then(response => {
        dispatch({
            type : SIGNUP_SUCCESS,
            payload: response.data
        });
    })
    .catch(error => {
        if (error.response) {
            dispatch({
                type : SIGNUP_FAIL,
                payload: error.response.data
            });
        } else if ('error.message', error.message) {
            console.log(JSON.stringify(error.message));
        } else {
            console.log('error', JSON.stringify(error));
        }
    })
}


export const getDashboard = () => dispatch => {
    dispatch({type : DASHBOARD_REQUEST});

    axios.get("/users/dashboard/")
    .then(response => {
        dispatch({
            type : DASHBOARD_SUCCESS,
            payload: response.data
        });
    })
    .catch(error => {
        if (error.response) {
            dispatch({
                type : DASHBOARD_FAIL,
                payload: error.response.data
            });
        } else if ('error.message', error.message) {
            console.log(JSON.stringify(error.message));
        } else {
            console.log('error', JSON.stringify(error));
        }
    })
}


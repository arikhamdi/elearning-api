import axios from 'axios';
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

import { setAxiosAuthToken } from '../../utils/Utils';
import { Redirect } from 'react-router';


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

export const setToken = token => dispatch => {
    setAxiosAuthToken(token);
    localStorage.setItem("token", token);
    dispatch({
        type: SET_TOKEN,
        payload: token
    });
};

export const getCurrentUser =  redirectTo => async dispatch => {
    try {
        console.log('ok current axios')
        const response = await axios.get("/auth/user/");
        console.log('ok current after axios')
        const user = {
            email: response.data.email,
            first_name: response.data.first_name,
            last_name: response.data.last_name
        };
        localStorage.setItem("user", JSON.stringify(user));
        if (redirectTo !== "") {
            redirectTo();
          }
          console.log('ok current')
        dispatch(setCurrentUser(user, redirectTo));
    } catch (error) {
        console.log('error current')
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

// export const loadUser = () => dispatch => {
//     if (!isEmpty(localStorage.getItem("token"))) {
//         dispatch(setToken(localStorage.getItem("token")));
//     }

//     if (!isEmpty(localStorage.getItem("user"))) {
//         const user = JSON.parse(localStorage.getItem("user"));
//         dispatch(setCurrentUser(user, ""));
//     }
// }

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


export const updateProfile = (userData) => dispatch => {
    dispatch({type : UPDATE_PROFILE_REQUEST});
    console.log('profile')

    axios.put("/auth/user/", userData)
    .then(response => {
        dispatch(getCurrentUser(""));
        dispatch({
            type : UPDATE_PROFILE_SUCCESS,
            payload: response.data
        });
        dispatch(clearErrors());
    })
    .catch(error => {
        if (error.response) {
            dispatch({
                type : UPDATE_PROFILE_FAIL,
                payload: error.response.data
            });
        } else if ('error.message', error.message) {
            console.log(JSON.stringify(error.message));
        } else {
            console.log('error', JSON.stringify(error));
        }
    })
}

export const updatePassword = (userData) => dispatch => {
    dispatch({type : UPDATE_PASSWORD_REQUEST});

    axios.post("/auth/password/change/", userData)
    .then(response => {
        dispatch({
            type : UPDATE_PASSWORD_SUCCESS,
            payload: response.data
        });
        dispatch(clearErrors());
    })
    .catch(error => {
        if (error.response) {
            dispatch({
                type : UPDATE_PASSWORD_FAIL,
                payload: error.response.data
            });
        } else if ('error.message', error.message) {
            console.log(JSON.stringify(error.message));
        } else {
            console.log('error', JSON.stringify(error));
        }
    })
}

export const resetPassword = (email) => dispatch => {
    dispatch({type : RESET_PASSWORD_REQUEST});

    axios.post("/auth/password-reset/", email)
    .then(response => {
        dispatch({
            type : RESET_PASSWORD_SUCCESS,
            payload: response.data
        });
        dispatch(clearErrors());
    })
    .catch(error => {
        if (error.response) {
            console.log('error', error.response.data)
            dispatch({
                type : RESET_PASSWORD_FAIL,
                payload: error.response.data
            });
        } else if ('error.message', error.message) {
            console.log(JSON.stringify(error.message));
        } else {
            console.log('error', JSON.stringify(error));
        }
    })
}

export const resetPasswordConfirm = (userData) => dispatch => {
    dispatch({type : RESET_PASSWORD_REQUEST});

    axios.post("/auth/password-reset/confirm/", userData)
    .then(response => {
        dispatch({
            type : RESET_PASSWORD_SUCCESS,
            payload: response.data
        });
        dispatch(clearErrors());
    })
    .catch(error => {
        
        if (error.response) {
            console.log('error', error.response.data)
            dispatch({
                type : RESET_PASSWORD_FAIL,
                payload: error.response.data
            });
        } else if ('error.message', error.message) {
            console.log(JSON.stringify(error.message));
        } else {
            console.log('error', JSON.stringify(error));
        }
    })
}

export const clearErrors = () => dispatch => {
    dispatch({
        type: CLEAR_ERROR,
        payload : {}
    })
}

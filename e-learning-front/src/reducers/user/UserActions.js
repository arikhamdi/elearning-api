import axios from 'axios';

import * as actions from './UserTypes';

import { setAxiosAuthToken } from '../../utils/Utils';


export const login = (userData, redirectTo) => dispatch => {
    dispatch({type : actions.LOGIN_REQUEST});

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
                type : actions.LOGIN_FAIL,
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
        type: actions.SET_TOKEN,
        payload: token
    });
};

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
        type : actions.LOGIN_SUCCESS,
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
    localStorage.removeItem("subscribed");
    dispatch({
        type: actions.UNSET_CURRENT_USER
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
    dispatch({type : actions.SIGNUP_REQUEST});

    axios.post("/auth/registration/", userData)
    .then(response => {
        dispatch({
            type : actions.SIGNUP_SUCCESS,
            payload: response.data
        });
    })
    .catch(error => {
        if (error.response) {
            dispatch({
                type : actions.SIGNUP_FAIL,
                payload: error.response.data
            });
        } else if ('error.message', error.message) {
            console.log(JSON.stringify(error.message));
        } else {
            console.log('error', JSON.stringify(error));
        }
    })
}

export const getSubscribedCourse =  () =>  dispatch => {
    axios.get("/users/dashboard/")
    .then(response => {
        const subscribed = [];
        response.data.map(data => 
            subscribed.push(data.slug)
        )
        localStorage.setItem("subscribed", JSON.stringify(subscribed));
    })
    .catch(error => {
            console.log('error', JSON.stringify(error));  
    })
}

export const getDashboard = () => dispatch => {
    dispatch({type : actions.DASHBOARD_REQUEST});

    axios.get("/users/dashboard/")
    .then(response => {
        dispatch(getSubscribedCourse());
        dispatch({
            type : actions.DASHBOARD_SUCCESS,
            payload: response.data
        });
    })
    .catch(error => {
        if (error.response) {
            dispatch({
                type : actions.DASHBOARD_FAIL,
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
    dispatch({type : actions.UPDATE_PROFILE_REQUEST});
    console.log('profile')

    axios.put("/auth/user/", userData)
    .then(response => {
        dispatch(getCurrentUser(""));
        dispatch({
            type : actions.UPDATE_PROFILE_SUCCESS,
            payload: response.data
        });
        dispatch(clearErrors());
    })
    .catch(error => {
        if (error.response) {
            dispatch({
                type : actions.UPDATE_PROFILE_FAIL,
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
    dispatch({type : actions.UPDATE_PASSWORD_REQUEST});

    axios.post("/auth/password/change/", userData)
    .then(response => {
        dispatch({
            type : actions.UPDATE_PASSWORD_SUCCESS,
            payload: response.data
        });
        dispatch(clearErrors());
    })
    .catch(error => {
        if (error.response) {
            dispatch({
                type : actions.UPDATE_PASSWORD_FAIL,
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
    dispatch({type : actions.RESET_PASSWORD_REQUEST});

    axios.post("/auth/password-reset/", email)
    .then(response => {
        dispatch({
            type : actions.RESET_PASSWORD_SUCCESS,
            payload: response.data
        });
        dispatch(clearErrors());
    })
    .catch(error => {
        if (error.response) {
            console.log('error', error.response.data)
            dispatch({
                type : actions.RESET_PASSWORD_FAIL,
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
    dispatch({type : actions.RESET_PASSWORD_REQUEST});

    axios.post("/auth/password-reset/confirm/", userData)
    .then(response => {
        dispatch({
            type : actions.RESET_PASSWORD_SUCCESS,
            payload: response.data
        });
        dispatch(clearErrors());
    })
    .catch(error => {
        
        if (error.response) {
            console.log('error', error.response.data)
            dispatch({
                type : actions.RESET_PASSWORD_FAIL,
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
        type: actions.CLEAR_ERROR,
        payload : {}
    })
}

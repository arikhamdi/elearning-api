import { createSlice } from '@reduxjs/toolkit';
import { setAxiosAuthToken } from '../../utils/Utils';
import { Button, Modal } from "react-bootstrap";
import { apiRequest } from '../types/api';

const slice = createSlice({
    name : "auth",
    initialState : {
        user : {},
        loading : false,
        isAuthenticated: false,
        isRegistered: false,
        error: [],
    },
    reducers: {
        authRequest : (auth, action) => {
            auth.loading = true;
        },
        authRequestFail : (auth, action) => {
            auth.loading = false;            
            auth.error = action.payload;
        },
        loginSuccess : (auth, action) => {
            auth.loading = false;
            auth.isAuthenticated = true;
            const token = action.payload.key;
            setAxiosAuthToken(token);
            localStorage.setItem("token", token);
        },
        registrationSuccess : (auth, action) => {
            auth.loading = false;
            auth.isRegistered = true;
        },
        getCurrentUserSuccess: (auth, action) => {
            auth.user = action.payload;
            auth.isAuthenticated = true;
            localStorage.setItem("user", JSON.stringify(auth.user));
        },
        setCurrentUserSuccess: (auth, action) => {
            auth.user = action.payload;
            auth.isAuthenticated = true;
        },
        logoutSuccess : (auth, action) => {
            auth.loading = false;
        },
        unsetCurrentUserSuccess : (auth, action) => {
            setAxiosAuthToken("");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("favoris");
            auth.user = null;
            auth.isAuthenticated = false;
        }
    }
});

const {
    authRequest,
    authRequestFail,
    loginSuccess,
    registrationSuccess,
    getCurrentUserSuccess,
    setCurrentUserSuccess,
    unsetCurrentUserSuccess,
    logoutSuccess
} = slice.actions;

export default slice.reducer;


// Actions Creators


export const login = userData => async dispatch => {
    await dispatch(loginToServer(userData));
    await dispatch(getCurrentUser());
    await dispatch(setCurrentUser(JSON.parse(localStorage.getItem("user"))));
};

export const logout = session => async dispatch => {
    if (session === 'local'){
        console.log("local")
        await dispatch(unsetCurrentUser());
    } else {
        console.log("global")
        await dispatch(logoutFromServer());
        await dispatch(unsetCurrentUser());
    }
}

const loginToServer = userData => apiRequest({
    url : "/auth/login/",
    method: "Post",
    data: userData,
    onStart : authRequest.type,
    onSuccess : loginSuccess.type,
    onError : logoutSuccess.type
});

export const getCurrentUser = () => apiRequest({
    url : "/auth/user/",
    onStart : authRequest.type,
    onSuccess : getCurrentUserSuccess.type,
    onError : authRequestFail.type

})

export const setCurrentUser = user => dispatch => {
    if(user) return dispatch({type: setCurrentUserSuccess.type, payload: user});
    return unsetCurrentUser();
}

const unsetCurrentUser = () => dispatch => {
    dispatch({type: unsetCurrentUserSuccess.type});
}

const logoutFromServer = () => apiRequest({
    url : "/auth/logout/",
    method: "Post",
    onStart : authRequest.type,
    onSuccess : logoutSuccess.type,
    onError : authRequestFail.type
});


export const registration = userData => apiRequest({
    url: "/auth/registration/",
    method: "Post",
    data: userData,
    onStart : authRequest.type,
    onSuccess : registrationSuccess.type,
    onError : authRequestFail.type 
})

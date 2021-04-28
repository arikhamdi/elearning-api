import { createSlice } from '@reduxjs/toolkit';
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
            console.log(auth.error)
        },
        LoginSuccess : (auth, action) => {
            auth.loading = false;
            auth.isAuthenticated = true;
            localStorage.setItem("token", action.payload.key);
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
        }
    }
});

const {
    authRequest,
    authRequestFail,
    LoginSuccess,
    registrationSuccess,
    getCurrentUserSuccess,
    setCurrentUserSuccess
} = slice.actions;

export default slice.reducer;




// Actions Creators

export const login = userData => apiRequest({
    url : "/auth/login/",
    method: "Post",
    data: userData,
    onStart : authRequest.type,
    onSuccess : LoginSuccess.type,
    onError : authRequestFail.type
});

export const getCurrentUser = () => apiRequest({
    url : "/auth/user/",
    onStart : authRequest.type,
    onSuccess : getCurrentUserSuccess.type,
    onError : authRequestFail.type

})

export const setCurrentUser = user => dispatch => {
    dispatch({type: setCurrentUserSuccess.type, payload: user});
}

export const registration = userData => apiRequest({
    url: "/auth/registration/",
    method: "Post",
    data: userData,
    onStart : authRequest.type,
    onSuccess : registrationSuccess.type,
    onError : authRequestFail.type 
})
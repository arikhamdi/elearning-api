import { createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../types/api';

const slice = createSlice({
    name : "auth",
    initialState : {
        user : {},
        loading : false,
        isAuthenticated: false,
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
        authSuccess : (auth, action) => {
            auth.loading = false;
            auth.isAuthenticated = true;
            localStorage.setItem("token", action.payload.key);
        },
        getCurrentUserSuccess: (auth, action) => {
            auth.user = action.payload;
            auth.isAuthenticated = true;
            localStorage.setItem("user", JSON.stringify(auth.user));
            setCurrentUser(auth.user);
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
    authSuccess,
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
    onSuccess : authSuccess.type,
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
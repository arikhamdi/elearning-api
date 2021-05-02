import { createSlice } from '@reduxjs/toolkit';
import { getCurrentUser } from './auth';
import { apiRequest } from '../types/api';

const slice = createSlice({
    name : "profile",
    initialState: {
        userUpdated: {},
        profileLoading: false,
        isUpdated: false,
        lastFetch: null,
    },
    reducers: {
        profileRequest :(profile) => {
            profile.profileLoading = true;
        },
        profileRequestSuccess :(profile, action) => {
            profile.profileLoading = false;
            profile.isUpdated = true;
            profile.error = null
        },
        profileRequestFail :(profile, action) => {
            profile.profileLoading = false;
            profile.error = action.payload
        }
    }
});


const {
    profileRequest,
    profileRequestSuccess,
    profileRequestFail
} = slice.actions;

export default slice.reducer;

// Action Creators

export const updateProfile = userData => async dispatch => {
    await dispatch(putUpdatedUserInfoToServer(userData));
    await dispatch(getCurrentUser());
};

const putUpdatedUserInfoToServer = userData => apiRequest({
    url : "/auth/user/",
    method: "PUT",
    data: userData,
    onStart : profileRequest.type,
    onSuccess : profileRequestSuccess.type,
    onError : profileRequestFail.type
});

export const updatePassword = userData => apiRequest({
    url: "/auth/password/change/",
    method: "POST",
    data: userData,
    onStart : profileRequest.type,
    onSuccess : profileRequestSuccess.type,
    onError : profileRequestFail.type
});

export const resetPassword = email => apiRequest({
    url: "/auth/password-reset/",
    method: "POST",
    data: email,
    onStart : profileRequest.type,
    onSuccess : profileRequestSuccess.type,
    onError : profileRequestFail.type
});

export const resetPasswordConfirm = userData => apiRequest({
    url: "/auth/password-reset/confirm/",
    method: "POST",
    data: userData,
    onStart : profileRequest.type,
    onSuccess : profileRequestSuccess.type,
    onError : profileRequestFail.type
});
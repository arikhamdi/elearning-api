import { createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../types/api';


const slice = createSlice({
    name : "content",
    initialState: {
        content: {},
        loading: false,
        checkBoxloading: false,
        alreadySeen: [],
        lastFetch: null,
        error : ""
    },
    reducers: {
        contentRequest : (content) => {
            content.loading = true;
        },
        contentRequestFailed : (content, action) => {
            content.loading = false;
            content.error = action.payload;
        },
        contentReceived : (content, action) => {
            content.content  = action.payload;
            content.loading = false;
        },
        contentMarkedAsReadRequest : (content) => {
            content.checkBoxloading = true;
        },
        contentMarkedAsReadFail : (content, action) => {
            content.checkBoxloading = false;
            content.error = action.payload;
        },
        contentMarkedAsReadSuccess : (content, action) => {
            content.checkBoxloading = false;
            content.alreadySeen = action.payload?.already_seen;
        }
    }
})

const {
    contentRequest,
    contentRequestFailed,
    contentReceived,
    contentMarkedAsReadRequest,
    contentMarkedAsReadSuccess,
    contentMarkedAsReadFail
} = slice.actions;

export default slice.reducer;


// Actions Creators

export const loadcontents = url => apiRequest({
    url,
    onStart : contentRequest.type,
    onSuccess : contentReceived.type,
    onError : contentRequestFailed.type
});

export const markContentAsAlreadySeen = url => apiRequest({
    url: `/users/${url}`,
    method: "POST",
    onStart : contentMarkedAsReadRequest.type,
    onSuccess : contentMarkedAsReadSuccess.type,
    onError : contentMarkedAsReadFail.type
});

export const unmarkContentAsAlreadySeen = url => apiRequest({
    url: `/users/${url}`,
    method: "POST",
    onStart : contentMarkedAsReadRequest.type,
    onSuccess : contentMarkedAsReadSuccess.type,
    onError : contentMarkedAsReadFail.type
});



import { createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../types/api';


const slice = createSlice({
    name : "content",
    initialState: {
        content: {},
        loading: true,
        lastFetch: null,
        content_errors : ""
    },
    reducers: {
        contentRequest : (content, action) => {
            content.loading = true;
        },
        contentRequestFailed : (content, action) => {
            content.loading = true;
            content.content_errors = action.payload;
        },
        contentReceived : (content, action) => {
            content.content  = action.payload;
            content.loading = false;
           
        }
    }
})

const {
    contentRequest,
    contentRequestFailed,
    contentReceived
} = slice.actions;

export default slice.reducer;


// Actions Creators

export const Loadcontents = url => apiRequest({
    url,
    onStart : contentRequest.type,
    onSuccess : contentReceived.type,
    onError : contentRequestFailed.type
});


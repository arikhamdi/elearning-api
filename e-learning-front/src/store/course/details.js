import { createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../types/api';


const slice = createSlice({
    name : "courseDetails",
    initialState: {
        course: {},
        loading: false,
        lastFetch: null
    },
    reducers: {
        courseDetailsRequest : (courseDetails, action) => {
            courseDetails.loading = true;
        },
        courseDetailsRequestFailed : (courseDetails, action) => {
            courseDetails.loading = false;
            courseDetails.error = action.payload;
        },
        courseDetailsReceived : (courseDetails, action) => {
            courseDetails.course  = action.payload;
            courseDetails.loading = false;
        }
    }
})

const {
    courseDetailsRequest,
    courseDetailsRequestFailed,
    courseDetailsReceived,
} = slice.actions;

export default slice.reducer;


// Actions Creators

export const LoadCourseDetails = url => apiRequest({
    url,
    onStart : courseDetailsRequest.type,
    onSuccess : courseDetailsReceived.type,
    onError : courseDetailsRequestFailed.type
});




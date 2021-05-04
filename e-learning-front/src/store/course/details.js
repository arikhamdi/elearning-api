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
        },
        courseDetailsEditSuccess : (courseDetails, action) => {
            courseDetails.course  = action.payload;
            courseDetails.loading = false;
            courseDetails.error = null;
        },
        courseDeleted : (courseDetails, action) => {
            courseDetails.loading = false;
        }
    }
})

const {
    courseDetailsRequest,
    courseDetailsRequestFailed,
    courseDetailsReceived,
    courseDetailsEditSuccess,
    courseDeleted
} = slice.actions;

export default slice.reducer;


// Actions Creators

export const LoadCourseDetails = url => apiRequest({
    url,
    onStart : courseDetailsRequest.type,
    onSuccess : courseDetailsReceived.type,
    onError : courseDetailsRequestFailed.type
});

export const deleteCourse = url => apiRequest({
    url,
    method : "DELETE",
    onStart : courseDetailsRequest.type,
    onSuccess : courseDeleted.type,
    onError : courseDetailsRequestFailed.type
})


export const EditCourseDetails = (url, course) => apiRequest({
    url,
    method: "PUT",
    data: course,
    onStart : courseDetailsRequest.type,
    onSuccess : courseDetailsEditSuccess.type,
    onError : courseDetailsRequestFailed.type
});


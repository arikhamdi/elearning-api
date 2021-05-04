import { createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../types/api'; 


const slice = createSlice({
    name : "courses",
    initialState : {
        list: [],
        loading: false,
        lastFetch: null,
        error : {}
    },
    reducers: {
        coursesRequested : (courses, action) => {
            courses.loading = true;
        },
        coursesRequestFailed : (courses, action) => {
            courses.loading = false;
            courses.error = action.payload;
        },
        coursesReceived : (courses, action) => {
            courses.list = action.payload;
            courses.loading = false;
        },
        coursesCreatedSuccess : (courses, action) => {
            courses.list = action.payload;
            courses.error = null;
            courses.loading = false;
        }
    }
    
})

const {
    coursesReceived,
    coursesRequested,
    coursesRequestFailed,
    coursesCreatedSuccess
} = slice.actions;

export default slice.reducer;

// Actions Creators

export const LoadCourses = url => apiRequest({
    url,
    onStart : coursesRequested.type,
    onSuccess : coursesReceived.type,
    onError : coursesRequestFailed.type
});

export const addNewCourse = course => apiRequest({
    url : "/users/teacher/courses/",
    method: "POST",
    data: course,
    onStart : coursesRequested.type,
    onSuccess : coursesCreatedSuccess.type,
    onError : coursesRequestFailed.type
});

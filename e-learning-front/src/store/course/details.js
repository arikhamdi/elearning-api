import { createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../types/api';


const slice = createSlice({
    name : "courseDetails",
    initialState: {
        course: {},
        loading: false,
        button_loading: false,
        isStudent: false,
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
            
            if(localStorage.getItem('user')){
                const user = JSON.parse(localStorage.getItem('user')) ;
                courseDetails.isStudent = courseDetails.course.students.filter((student) => student.email == user.email).length > 0;
            }
            
            courseDetails.loading = false;
        },
        enrollStudentRequest : (courseDetails, action) => {
            courseDetails.button_loading = true;
        },
        enrollStudentRequestFail : (courseDetails, action) => {
            courseDetails.button_loading = false;
        },
        enrollStudentSuccess : (courseDetails, action) => {
            courseDetails.isStudent = action.payload.enrolled;
            courseDetails.button_loading = false;
        }
    }
})

const {
    courseDetailsRequest,
    courseDetailsRequestFailed,
    courseDetailsReceived,
    enrollStudentRequest,
    enrollStudentRequestFail,
    enrollStudentSuccess
} = slice.actions;

export default slice.reducer;


// Actions Creators

export const LoadCourseDetails = url => apiRequest({
    url,
    onStart : courseDetailsRequest.type,
    onSuccess : courseDetailsReceived.type,
    onError : courseDetailsRequestFailed.type
});

export const enrollStudent = url => apiRequest({
    url,
    method: "POST",
    onStart : enrollStudentRequest.type,
    onSuccess : enrollStudentSuccess.type,
    onError : enrollStudentRequestFail.type

})



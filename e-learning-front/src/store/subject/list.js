import { createSlice } from '@reduxjs/toolkit';

import { apiRequest } from '../types/api';


const slice = createSlice({
    name : "subjects",
    initialState : {
        list: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        subjectsrequested: (subjects, action) => {
            subjects.loading = true;
        },
        subjectsRequestFailed : (subjects, action) => {
            subjects.loading = false;
        },
        subjectsReceived : (subjects, action) => {
            subjects.list = action.payload;
            subjects.loading = false;
        }
        
    }
})

const {subjectsrequested, subjectsRequestFailed, subjectsReceived} = slice.actions;

export default slice.reducer;

export const loadSubjects = () => apiRequest({
    url: "/subjects/",
    onStart: subjectsrequested.type,
    onSuccess: subjectsReceived.type,
    onError: subjectsRequestFailed.type
});


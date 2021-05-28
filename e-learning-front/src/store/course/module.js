import { createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../types/api'; 


const slice = createSlice({
    name : "module",
    initialState : {
        list: [],
        moduleDetails: {},
        loading: false,
        lastFetch: null,
        error: {}
    },
    reducers: {
        moduleRequested : (module, action) => {
            module.loading = true;
        },
        moduleRequestFailed : (module, action) => {
            module.loading = false;
            module.error = action.payload;
        },
        moduleReceived : (module, action) => {
            module.list = action.payload;
            module.error = null;
            module.loading = false;
        },
        moduleDetailsReceived : (module, action) => {
            module.moduleDetails = action.payload;
            module.loading = false;
        },
        moduleEditionSuccess : (module, action) => {
            module.moduleDetails = action.payload;
            module.error = null;
            module.loading = false;
        },
        moduleDeletedSuccess : (module, action) => {
            module.error = null;
            module.loading = false;
        },
    }
    
});

const {
    moduleReceived,
    moduleRequested,
    moduleRequestFailed,
    moduleDetailsReceived,
    moduleEditionSuccess,
    moduleDeletedSuccess
} = slice.actions;

export default slice.reducer;


export const loadModule = url => apiRequest({
    url,
    onStart : moduleRequested.type,
    onSuccess : moduleDetailsReceived.type,
    onError : moduleRequestFailed.type
})

export const addNewModule =(url, module) => apiRequest({
    url,
    method: "POST",
    data: module,
    onStart : moduleRequested.type,
    onSuccess : moduleReceived.type,
    onError : moduleRequestFailed.type
});

export const editModule =(url, module) => apiRequest({
    url,
    method: "PATCH",
    data: module,
    onStart : moduleRequested.type,
    onSuccess : moduleEditionSuccess.type,
    onError : moduleRequestFailed.type
});

export const deleteModule =(url) => apiRequest({
    url,
    method: "DELETE",
    onStart : moduleRequested.type,
    onSuccess : moduleDeletedSuccess.type,
    onError : moduleRequestFailed.type
});
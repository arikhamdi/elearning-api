import { createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../types/api';

const slice = createSlice({
    name : "teacher",
    initialState : {
        list : [],
        loading : false,
        lastFetch: null
    },
    reducers: {
        
    }   
});
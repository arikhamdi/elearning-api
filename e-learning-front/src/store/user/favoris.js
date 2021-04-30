import { createSlice } from '@reduxjs/toolkit';
import { isEmpty } from '../../utils/Utils';
import { apiRequest } from '../types/api';

const slice = createSlice({
    name : "favoris",
    initialState: {
        favorisItems: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        favorisItemsRequest : (favoris, action) => {
            favoris.loading = true;
        },
        favorisSetItems : (favoris, action) => {
            favoris.loading = false;
            favoris.favorisItems = action.payload
            localStorage.setItem("favoris", JSON.stringify(favoris.favorisItems))
        },
        favorisAddItem : (favoris, action) => {
            favoris.loading = false;
            favoris.favorisItems.push(action.payload);
            localStorage.setItem("favoris", JSON.stringify(favoris.favorisItems))
        },
        favorisRemoveItem : (favoris, action) => {
            favoris.loading = false;
            favoris.favorisItems = favoris.favorisItems.filter(x => x.id !== action.payload.id);
            localStorage.setItem("favoris", JSON.stringify(favoris.favorisItems))
        },
        favorisRequestFail : (favoris, action) => {
            favoris.loading = false;
            favoris.errors = action.payload;
        }
    }
})

const {
    favorisItemsRequest,
    favorisSetItems,
    favorisAddItem,
    favorisRemoveItem,
    favorisRequestFail
} = slice.actions;

export default slice.reducer;

// Action Creators

export const addItemToFavoris = item => dispatch => {
    dispatch({type: favorisAddItem.type, payload: item});
} 

export const removeItemFromFavoris = item => dispatch => {
    dispatch({type: favorisRemoveItem.type, payload: item});
} 

export const setItemstoFavoris = favoris => dispatch => {
    dispatch({type : favorisSetItems.type, payload: favoris });
}

export const addItemToFavorisLoggedInUser = item => apiRequest({
    url: `/users/${item.slug}/favoris-add/`,
    method: "POST",
    onStart : favorisItemsRequest.type,
    onSuccess : favorisAddItem.type,
    onError : favorisRequestFail.type
})

export const removeItemToFavorisLoggedInUser = item => apiRequest({
    url: `/users/${item.slug}/favoris-remove/`,
    method: "POST",
    onStart : favorisItemsRequest.type,
    onSuccess : favorisRemoveItem.type,
    onError : favorisRequestFail.type
})

export const loadFavoris = () => apiRequest({
    url: "/users/dashboard/",
    onStart : favorisItemsRequest.type,
    onSuccess : favorisSetItems.type,
    onError : favorisRequestFail.type
});

export const mergeAllFavorisToLocalStorage = item => async dispatch => {
    if (!isEmpty(localStorage.getItem("favoris"))) {
        var localFavoris = JSON.parse(localStorage.getItem('favoris'));
        for (let course of localFavoris ){
            await dispatch(addItemToFavorisLoggedInUser(course));
        }
    }
    await dispatch(loadFavoris());
    
}


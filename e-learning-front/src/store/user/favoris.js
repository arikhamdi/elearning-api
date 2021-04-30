import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
    name : "favoris",
    initialState: {
        favorisItems: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        favorisSetItems : (favoris, action) => {
            favoris.favorisItems = action.payload
        },
        favorisAddItem : (favoris, action) => {
            favoris.favorisItems.push(action.payload);
            localStorage.setItem("favoris", JSON.stringify(favoris.favorisItems))
        },
        favorisRemoveItem : (favoris, action) => {
            favoris.favorisItems = favoris.favorisItems.filter(x => x.id !== action.payload);
            localStorage.setItem("favoris", JSON.stringify(favoris.favorisItems))
        }
    }
})

const {
    favorisSetItems,
    favorisAddItem,
    favorisRemoveItem
} = slice.actions;

export default slice.reducer;

// Action Creators

export const addItemToFavoris = item => dispatch => {
    dispatch({type: favorisAddItem.type, payload: item});
} 

export const removeItemFromFavoris = item => dispatch => {
    dispatch({type: favorisRemoveItem.type, payload: item.id});
} 

export const setItemtoFavoris = favoris => dispatch => {
    dispatch({type : favorisSetItems.type, payload: favoris });
}
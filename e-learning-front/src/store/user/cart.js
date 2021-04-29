import { createSlice } from '@reduxjs/toolkit';
import { apiRequest } from '../types/api';

const slice = createSlice({
    name : "cart",
    initialState: {
        cartItems: [],
        loading: false,
        lastFetch: null
    },
    reducers: {
        cartRequest : (cart, action) => {
            cart.loading = true;
        },
        cartSetItems : (cart, action) => {
            cart.cartItems = action.payload
        },
        cartAddItem : (cart, action) => {
            cart.cartItems.push(action.payload);
            localStorage.setItem("cart", JSON.stringify(cart.cartItems))
        },
        cartRemoveItem : (cart, action) => {
            cart.cartItems = cart.cartItems.filter(x => x.id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(cart.cartItems))
        }
    }
})

const {
    cartRequest,
    cartSetItems,
    cartAddItem,
    cartRemoveItem
} = slice.actions;

export default slice.reducer;

// Action Creators

export const addItemToCart = item => dispatch => {
    dispatch({type: cartAddItem.type, payload: item});
} 

export const removeItemFromCart = id => dispatch => {
    dispatch({type: cartRemoveItem.type, payload: id});
} 

export const setItemtoCart = cart => dispatch => {
    dispatch({type : cartSetItems.type, payload: cart });
}
import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
   name: 'cart',
   initialState: {
      userCart: JSON.parse( localStorage.getItem( 'cart' ) ) || [],
      userPurchased: [],
   },
   reducers: {
      onLoadCart: ( state, { payload } ) => {
         state.userCart = payload;
      },
      onCartItemAdded: ( state, { payload } ) => {
         state.userCart = payload;
      },
      onLoadPurchasedCart: ( state, { payload} ) => {
         state.userPurchased = payload;
      },
      onPayedCart: ( state, { payload } ) => {
         state.userCart = [];
         state.userPurchased = payload;
      },
      onLogoutCart: ( state ) => {
         state.isProductIn = false;
         state.userCart = [];
         state.userPurchased = [];
      },
   },
});

export const { 
   onLoadCart,
   onCartItemAdded, 
   onLoadPurchasedCart,
   onPayedCart,
   onLogoutCart,
} = cartSlice.actions;
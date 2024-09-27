import { createSlice } from '@reduxjs/toolkit';

export const productsUserSlice = createSlice({
   name: 'productsUser',
   initialState: {
      isLoadedUserProds: false,
      totalProductsUser: [],
      isSearchloaded: false,
      searchProducts: [],
   },
   reducers: {
      onLoadedProducts: ( state, { payload } ) => {
         state.isLoadedUserProds = true;
         state.totalProductsUser = payload;
      },
      onSearchProductUser: ( state, { payload } ) => {
         state.isLoadedUserProds = true;
         state.totalProductsUser = [...state.totalProductsUser];
         state.isSearchloaded = true;
         state.searchProducts = payload;
      },
   }
});

export const { 
   onLoadedProducts,
   onSearchProductUser,
 } = productsUserSlice.actions;
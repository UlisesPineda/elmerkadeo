import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
   name: 'category',
   initialState: {
      isLoadedCategories: false,
      categories: [],
      selectedCategory: [],
   },
   reducers: {
      onLoadedCategories: ( state, { payload } ) => {
        state.isLoadedCategories = true;
        state.categories = payload;
      },
      onSelectedCategory: ( state, { payload } ) => {
         state.isLoadedCategories = true;
         state.categories = [...state.categories];
         state.selectedCategory = payload;
      },
   },
});

export const { 
    onLoadedCategories,
    onSelectedCategory,
 } = categorySlice.actions;
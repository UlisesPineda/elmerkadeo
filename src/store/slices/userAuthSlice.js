import { createSlice } from '@reduxjs/toolkit';

export const userAuthSlice = createSlice({
   name: 'userAuth',
   initialState: {
      isUserAuth: localStorage.getItem('isUserAuth'),
      user: {},
   },
   reducers: {
      onLoginUser: ( state, { payload } ) => {
         state.isUserAuth = true;
         state.user = payload
      },
      onLogoutUser: ( state ) => {
        state.isUserAuth = false;
        state.user = {};
      },
   }
});

export const { 
    onLoginUser,
    onLogoutUser,
 } = userAuthSlice.actions;
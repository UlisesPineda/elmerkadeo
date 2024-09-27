import { createSlice } from '@reduxjs/toolkit';

export const alertMessageSlice = createSlice({
   name: 'alertMessage',
   initialState: {
      isAlertMessage: false,
      messages: {},
   },
   reducers: {
      onOpenAlertMessage: ( state, { payload } ) => {
         state.isAlertMessage = true;
         state.messages = payload;
      },
      onCloseAlertMessage: ( state ) => {
         state.isAlertMessage = false;
         state.messages = {};
      },
   }
});

export const { 
    onOpenAlertMessage,
    onCloseAlertMessage,
 } = alertMessageSlice.actions;
import { configureStore } from "@reduxjs/toolkit";

import { 
    alertMessageSlice, 
    cartSlice, 
    productsUserSlice, 
    promoSlice, 
    userAuthSlice, 
    categorySlice 
} from "./slices";

export const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        promo: promoSlice.reducer,
        userAuth: userAuthSlice.reducer,
        category: categorySlice.reducer,
        productsUser: productsUserSlice.reducer,
        alertMessage: alertMessageSlice.reducer,
    },
});
import { configureStore } from "@reduxjs/toolkit";
import item from './item';
import authSlice from './auth'

const store=configureStore({
    reducer:{
        item:item.reducer,
        auth:authSlice.reducer
    }
});

export default store;
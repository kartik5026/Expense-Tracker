import {configureStore} from '@reduxjs/toolkit';
import moneyReducer from "./MoneySlice"
export const Store = configureStore({
    reducer:{
        money:moneyReducer,
    }
})

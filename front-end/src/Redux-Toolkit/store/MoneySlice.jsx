import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cashIn:0,
    cashOut:0,
    total:0,
}
export const MoneySlice = createSlice({
    name:'money',
    initialState,
    reducers:{
        updateCashIn:(state)=>{

        },
        updateCashOut:(state)=>{

        },
        updateTotalCash:(state)=>{
            
        }
    }
})
export const {updateCashIn,updateCashOut,updateTotalCash} = MoneySlice.actions
export default MoneySlice.reducer;
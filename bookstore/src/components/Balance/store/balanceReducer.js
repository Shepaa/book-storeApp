import {createSlice} from "@reduxjs/toolkit";

const loadBalanceFromLocalStorage = () => {
    const balanceFromStorage = localStorage.getItem('balance');
    if (balanceFromStorage === null) {
        return 0.00;
    }
    const parsedBalance = parseFloat(balanceFromStorage);
    return isNaN(parsedBalance) ? 0.00 : parsedBalance;
};

const balanceReducerSlice = createSlice({
    name: "balance",
    initialState: {
        balance: loadBalanceFromLocalStorage(),
    },
    reducers: {
        setBalance: (state, {payload}) => {
            state.balance = payload;
            localStorage.setItem('balance', state.balance);
        }
    }
});

export const {setBalance} = balanceReducerSlice.actions;
export default balanceReducerSlice.reducer;

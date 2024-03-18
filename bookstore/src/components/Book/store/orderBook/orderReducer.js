import {createSlice} from "@reduxjs/toolkit";

const ordersSliceName = "orders";

const initialState = {
    orders: [],
    loading: false,
    error: null,
};
const ordersSlice = createSlice({
    name: ordersSliceName,
    initialState,
    reducers: {
        getOrdersLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        getOrdersSuccess: (state, { payload }) => {
            state.loading = false;
            state.orders = payload;
        },
        getOrdersError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        createOrder: (state, { payload }) => {
            payload.books = [];
            state.orders.push(payload);
        },
        addBookToOrder: (state, { payload }) => {
            const { orderId, bookId, quantity } = payload;
            const order = state.orders.find((order) => order.id === orderId);
            if (order) {
                const existingBook = order.books.find((book) => book.id === bookId);
                if (existingBook) {
                    existingBook.quantity += quantity;
                } else {
                    order.books.push({ id: bookId, quantity });
                }
            }
        },
        removeBookFromOrder: (state, { payload }) => {
            const { orderId, bookId } = payload;
            const order = state.orders.find((order) => order.id === orderId);
            if (order) {
                order.books = order.books.filter((book) => book.id !== bookId);
            }
        },
    },
});

export const {
    getOrdersLoading,
    getOrdersSuccess,
    getOrdersError,
    createOrder,
    addBookToOrder,
    removeBookFromOrder,
} = ordersSlice.actions;
export default ordersSlice.reducer;

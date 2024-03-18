import {configureStore} from "@reduxjs/toolkit";
import bookReducer from "../components/Book/store/book/bookReducer"
import favoriteBooksReducer from '../components/Favorite/store/favoritesReducer';
import balanceReducerSlice from "../components/Balance/store/balanceReducer"
import ordersSlice from "../components/Book/store/orderBook/orderReducer"

export const store = configureStore({
    reducer: {
        books: bookReducer,
        favoriteBooks: favoriteBooksReducer,
        balanceReducer: balanceReducerSlice,
        orderReducer: ordersSlice
    }
})
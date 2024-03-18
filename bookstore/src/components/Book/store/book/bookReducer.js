import {createSlice} from "@reduxjs/toolkit";

const BookSliceName = 'bookSliceName';

const DEFAULT_BOOK = {
    title: '',
    price: '',
    genre: '',
    imageURL: '',
    quantity: '',
    authorName: '',
    description: ''
};

const initialState = {
    book: DEFAULT_BOOK,
    booksList: [],
    listLoading: false,
    listError: ''
};


export const bookSlice = createSlice({
    name: BookSliceName,
    initialState,
    reducers: {
        getListLoading: (state) => {
            state.listLoading = true;
            state.listError = '';
        },
        getListSuccessfully: (state, {payload}) => {
            state.booksList = payload;
            state.listLoading = false;
        },
        reducer: (state, {payload}) => {
            state.listLoading = false;
            state.listError = payload;
        },
        // editItem: (state, {payload}) => {
        //     state.book = payload;
        // },
        // removeItem: (state, {payload}) => {
        //     state.booksList = state.booksList.filter((book) => book.id !== payload)
        // },
        // createItem: (state, {payload}) => {
        //     state.booksList = [...state.booksList, payload]
        // },
        // updateItem: (state, {payload}) => {
        //     state.book = DEFAULT_BOOK
        //     state.booksList = state.booksList.map((book) => book.id === payload.id ? payload : book)
        // }
    }
});


export const
    {
        reducer,
        getListLoading,
        getListSuccessfully,
    } = bookSlice.actions;
export default bookSlice.reducer;
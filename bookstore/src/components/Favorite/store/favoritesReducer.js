import { createSlice } from '@reduxjs/toolkit';

const loadFavoritesFromLocalStorage = () => {
    const favorites = localStorage.getItem('favoriteBooks');
    return favorites ? JSON.parse(favorites) : [];
};

const favoriteBooksSlice = createSlice({
    name: 'favoriteBooks',
    initialState: {
        books: loadFavoritesFromLocalStorage(),
    },
    reducers: {
        addToFavorites: (state, action) => {
            state.books.push(action.payload);
            localStorage.setItem('favoriteBooks', JSON.stringify(state.books));
        },
        removeFromFavorites: (state, action) => {
            state.books = state.books.filter(book => book.id !== action.payload);
            localStorage.setItem('favoriteBooks', JSON.stringify(state.books));
        },
    },
});

export const { addToFavorites, removeFromFavorites } = favoriteBooksSlice.actions;

export default favoriteBooksSlice.reducer;

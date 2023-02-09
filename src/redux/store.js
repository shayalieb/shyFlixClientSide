import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './reducers/movies';
import userReducer from './reducers/user';

//Creating Redux store, that is gonna take the state from the movies and user reducers
export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        user: userReducer,
    },
});

//Export the store the other files can use it
export default store;
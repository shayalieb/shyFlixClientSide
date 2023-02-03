import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './reducers/movies';
import userReducer from './reducers/user';
import tokenReducer from './reducers/token';



//Creating Redux store
export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        user: userReducer,
        token: tokenReducer,
    },
});


export default store;
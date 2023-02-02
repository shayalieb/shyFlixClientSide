import { createSlice } from "@reduxjs/toolkit";
import { GET_MOVIES, GET_MOVIE, GET_DIRECTOR, GET_GENRE, SET_FILTER } from '../../actions/actions'

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        list: [],
        filter: ''
    },
    reducers: {
        getMovies: (state, action) => {
            state.list = action.payload
        },

        setFilter: (state, actions) => {
            state.filter = actions.payload
        }
    }
});

export const { getMovies, setFilter } = moviesSlice.actions;
export default moviesSlice.reducer;
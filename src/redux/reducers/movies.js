import { createSlice } from "@reduxjs/toolkit";

//The moviesSlice will give us the current state of the movies array 
const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        list: [],
        filter: '',
    },
    //setting reducers and actions
    reducers: {
        setMovies: (state, action) => {
            state.list = action.payload;
        },
        setFilter: (state, action) => {
            state.filter = action.payload
        }
    }
});

//Export the actions
export const { setMovies, setFilter } = moviesSlice.actions;
//Export the reducer
export default moviesSlice.reducer;

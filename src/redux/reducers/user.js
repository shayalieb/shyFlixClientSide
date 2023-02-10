import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../../localStorage";

//Using the state of the local storage
const constantState = loadState();

//Creating the reducers for updating the state
const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: constantState ? constantState.user : null,
        token: constantState ? constantState.token : null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        }
    }
});

//Exporting the actions
export const { setUser, setToken } = userSlice.actions;
//Exporting the reducer
export default userSlice.reducer;
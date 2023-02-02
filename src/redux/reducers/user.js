import { createSlice } from "@reduxjs/toolkit";
import { LOGIN } from "../../actions/actions";
//import { store } from "../store"; 

const userSlice = createSlice({
    name: 'users',
    initialState: null,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        type: LOGIN,
        value
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer
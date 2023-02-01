import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
    name: 'token',
    initialState: null,
    reducers: {
        setToken: (state, action) => {
            state.user = action.payload
        }
    }
});

export const { seToken } = tokenSlice.actions;
export default tokenSlice.reducer;
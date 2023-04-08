import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminT } from "@shared/Admin";

const adminReducer = createSlice({
    name: "admin",
    initialState: {data: null} as {data: AdminT|null},
    reducers: {
        addAdmin: (state, action: PayloadAction<AdminT>) => {
            state.data = action.payload;
        }
    }
})

export default adminReducer.reducer;
export const { addAdmin } = adminReducer.actions;
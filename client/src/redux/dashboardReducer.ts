import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DashboardStatsT } from "@shared/Dashboard";

const dashboardReducer = createSlice({
    name: "dashboard",
    initialState: {data: null} as {data: DashboardStatsT|null},
    reducers: {
        addDashboard: (state, action: PayloadAction<DashboardStatsT>) => {
            state.data = action.payload
        }
    }
})

export default dashboardReducer.reducer;
export const { addDashboard } = dashboardReducer.actions 
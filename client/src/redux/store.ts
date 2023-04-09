import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminReducer";
import membershipTypeReducer from "./membershipTypeReducer";

export const store = configureStore({
    reducer: {
        admin: adminReducer,
        membership_types: membershipTypeReducer
    }
})

const state = store.getState();
export type RootState = typeof state;
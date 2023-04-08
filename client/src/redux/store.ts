import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminReducer";

export const store = configureStore({
    reducer: {
        admin: adminReducer
    }
})

const state = store.getState();
export type RootState = typeof state;
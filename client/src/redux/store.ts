import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminReducer";
import membershipTypeReducer from "./membershipTypeReducer";
import addonReducer from "./addonReducer";
import createMemberReducer from "./createMemberReducer";
import memberReducer from "./memberReducer";

export const store = configureStore({
    reducer: {
        admin: adminReducer,
        membership_types: membershipTypeReducer,
        addons: addonReducer,
        create_member_data: createMemberReducer,
        members: memberReducer
    }
})

const state = store.getState();
export type RootState = typeof state;
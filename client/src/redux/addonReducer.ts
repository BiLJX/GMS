import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddonT } from "@shared/Addon";
const addonReducer = createSlice({
    name: "addons",
    initialState: [] as AddonT[],
    reducers: {
        addAddonList: (state, action: PayloadAction<AddonT[]>) => {
            return state = action.payload
        },
        addAddon: (state, action: PayloadAction<AddonT>) => {
            return state = [action.payload, ...state];
        }
    }
})
export const { addAddon, addAddonList } = addonReducer.actions
export default addonReducer.reducer
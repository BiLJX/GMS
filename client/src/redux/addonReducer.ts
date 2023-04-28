import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddonT } from "@shared/Addon";
const addonReducer = createSlice({
    name: "addons",
    initialState: [] as AddonT[],
    reducers: {
        addAddonList: (state, action: PayloadAction<AddonT[]>) => {
            return state = action.payload
        },
        updateAddon: (state, action: PayloadAction<AddonT>) => {
            const i = state.findIndex(x=>x.addon_id === action.payload.addon_id);
            const _state = [...state];
            _state[i] = action.payload;
            return _state;
        },
        addAddon: (state, action: PayloadAction<AddonT>) => {
            return state = [action.payload, ...state];
        },
        removeAddon: (state, action: PayloadAction<string>) => {
            return state = state.filter(x=>x.addon_id !== action.payload);
        }
    }
})
export const { addAddon, addAddonList, updateAddon, removeAddon } = addonReducer.actions
export default addonReducer.reducer
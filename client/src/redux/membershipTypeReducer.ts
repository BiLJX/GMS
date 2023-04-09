import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MembershipTypeT } from "@shared/MembershipTypes";

const membershipTypeReducer =createSlice({
    name: "membership_types",
    initialState: [] as MembershipTypeT[],
    reducers: {
        addMembershipTypeList: (state, action: PayloadAction<MembershipTypeT[]>) => {
            return state = action.payload;
        },
        addMembershipType: (state, action: PayloadAction<MembershipTypeT>) => {
            return state = [action.payload, ...state];
        }
    }
})

export const { addMembershipType, addMembershipTypeList } = membershipTypeReducer.actions
export default membershipTypeReducer.reducer;
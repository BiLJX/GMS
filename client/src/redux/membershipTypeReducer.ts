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
        },
        removeMembershipType: (state, action: PayloadAction<string>) => {
            return state = state.filter(x=>x.membership_type_id !== action.payload);
        }
    }
})

export const { addMembershipType, addMembershipTypeList, removeMembershipType } = membershipTypeReducer.actions
export default membershipTypeReducer.reducer;
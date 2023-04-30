import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MemberT } from "@shared/Member";

const memberReducer = createSlice({
    name: "members",
    initialState: [] as MemberT[],
    reducers: {
        addMemberList: (state, action: PayloadAction<MemberT[]>) => {
            return state = action.payload;
        },
        addMember: (state, action: PayloadAction<MemberT>) => {
            return state = [action.payload, ...state];
        },
        removeAddon: (state, action: PayloadAction<string>) => {
            return state = state.filter(x=>x.member_id !== action.payload);
        }
    }
})

export default memberReducer.reducer;
export const { removeAddon, addMember, addMemberList } = memberReducer.actions;
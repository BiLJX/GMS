import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateMemberDataT } from "@shared/Api";

const initialState: CreateMemberDataT = {
    full_name: "",
    email: "",
    address: "",
    DOB: null,
    contact_no: null,
    profile_pic_url: "",
    membership_type: null,
    gender: null,
    weight: null,
    height: null,
    addons: [],
    discount: 0
}

const createMemberReducer = createSlice({
    name: "create_member",
    initialState,
    reducers: {
        changeCreateMemberData: (state, action: PayloadAction<CreateMemberDataT>) => {
            return state = action.payload;
        },
        resetCreateMemberData: (state) =>{
            return state = initialState;
        }
    }
})

export default createMemberReducer.reducer;
export const { changeCreateMemberData, resetCreateMemberData } = createMemberReducer.actions;
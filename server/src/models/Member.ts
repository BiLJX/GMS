import { Schema, model } from "mongoose";
import { MemberT } from "@shared/Member"
const schema = new Schema<MemberT>({
    member_id: {
        unique: true,
        type: String,
        required: true
    },
    membership_type_id: {
        type: String,
        required: true
    },
    gym_id: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact_no: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    profile_pic_url: {
        type: String,
        required: true
    }
}, {timestamps: true});

export const Member = model("member", schema);
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
    addon_ids: {
        type: [String],
        default: []
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
    full_name: {
        type: String,
        required: true
    },
    joined_date: {
        type: Date,
    },
    height: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    profile_pic_url: {
        type: String,
        default: ""
    }
}, {timestamps: true});

export const Member = model("member", schema);
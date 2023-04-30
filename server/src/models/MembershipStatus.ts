import { Schema, model } from "mongoose";
import { MembershipStatusT } from "@shared/MembershipStatus"
const schema = new Schema<MembershipStatusT>({
    membership_status_id: {
        required: true,
        type: String,
        unique: true,
    },
    member_id: {
        required: true,
        type: String,
    },
    gym_id: {
        required: true,
        type: String,
    },
    expire_date: {
        required: true,
        type: Date
    },
    renew_date: {
        required: true,
        type: Date
    }
}, {timestamps: true});

export const MembershipStatus = model("membership_status", schema);


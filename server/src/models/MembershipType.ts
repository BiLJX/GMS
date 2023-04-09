import { Schema, model } from "mongoose";
import { MembershipTypeT } from "@shared/MembershipTypes"
const schema = new Schema<MembershipTypeT>({
    membership_type_id: {
        unique: true,
        type: String,
        required: true
    },
    gym_id: {
        type: String,
        required: true
    },
    membership_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    period: {
        type: Number,
        required: true
    }
}, {timestamps: true});

export const MembershipType = model("membership_type", schema);
import { Schema, model } from "mongoose";
import { MemberWeightT } from "@shared/Weight";
import { makeId } from "utils/idgen";

const schema = new Schema<MemberWeightT>({
    member_weight_id: {
        default: () => makeId(),
        unique: true
    },
    gym_id: {
        required: true,
        type: String,
    },
    member_id: {
        required: true,
        type: String,
    },
    weight: {
        required: true,
        type: Number,
    }
}, {timestamps: true})

export const MemberWeight = model("member_weight", schema);
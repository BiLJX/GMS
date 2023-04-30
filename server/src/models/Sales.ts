import { Schema, model } from "mongoose";
import { SalesT } from "@shared/Sales"
const schema = new Schema<SalesT>({
    sale_id: {
        type: String,
        required: true,
        unique: true
    },
    gym_id: {
        type: String,
        required: true,
    },
    membership_type_id: {
        type: String,
        required: true,
    },
    discount_percentage: {
        type: Number,
        default: 0
    },
    sub_total: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    }
}, {timestamps: true});

export const Sales = model("sale", schema);
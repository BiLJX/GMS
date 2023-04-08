import { Schema, model } from "mongoose";
import { AdminT } from "@shared/Admin"
const schema = new Schema<AdminT>({
    admin_id: {
        unique: true,
        type: String,
        required: true
    },
    gym_id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile_pic_url: {
        type: String,
        required: true
    }
}, {timestamps: true});

export const Admin = model("admin", schema);
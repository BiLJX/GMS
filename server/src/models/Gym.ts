import { Schema, model } from "mongoose";
import { GymT } from "@shared/Gym"
const schema = new Schema<GymT>({
    gym_id: {
        unique: true,
        type: String,
        required: true
    },
    gym_name: {
        type: String,
        required: true
    },
    gym_location: {
        type: String,
        required: true
    },
    gym_logo_url: {
        type: String,
        required: true
    }
}, {timestamps: true});

export const Gym = model("gym", schema);
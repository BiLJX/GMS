import { Schema, model } from "mongoose";
import { AddonT } from "@shared/Addon"
const schema = new Schema<AddonT>({
    addon_id: String,
    gym_id: String,
    addon_name: String,
    price: Number
}, {timestamps: true})

export const Addon = model("addon", schema);


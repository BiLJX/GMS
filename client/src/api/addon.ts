import { AddAddonsDataT } from "@shared/Api"
import axios from "./axios"
import { AddonT } from "@shared/Addon";
export const createAddon = async(data: AddAddonsDataT) => {
    const res = await axios.post("/api/addons/add", data);
    return res.data as ApiResponse<AddonT>;
}

export const getAddonList = async(search_name: string) => {
    const res = await axios.get("/api/addons", {
        params: {search_name}
    });
    return res.data as ApiResponse<AddonT[]>
}
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

export const getAddonById = async(id: string) => {
    const res = await axios.get("/api/addons/"+id);
    return res.data as ApiResponse<AddonT>
}

export const editAddon = async(edit_data: AddAddonsDataT & {addon_id: string}) => {
    const res = await axios.patch("/api/addons/edit", edit_data);
    return res.data as ApiResponse<AddonT>;
}

export const deleteAddon = async(addon_id: string) => {
    const res = await axios.delete("/api/addons/delete/"+addon_id);
    return res.data as ApiResponse;
}
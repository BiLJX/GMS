import JsonResponse from "../utils/Response";
import { Controller } from "../types/controller";
import { AddAddonsDataT } from "@shared/Api";
import { Addon } from "../models/Addon";
import { makeId } from "../utils/idgen";

export const addAddons: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const client_data = req.body as AddAddonsDataT;
        if(client_data.price === null) return jsonResponse.clientError("Please enter a price");
        if(!client_data.addon_name) return jsonResponse.clientError("Please enter a name");
        const data = new Addon({
            addon_id: makeId(),
            gym_id: res.locals.admin.gym_id,
            addon_name: client_data.addon_name,
            price: client_data.price
        });
        await data.save();
        jsonResponse.success(data);
    } catch (error) {
        console.log(error);
        jsonResponse.success(error);
    }
}

export const getAddonById: Controller  = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const addon_id = req.params.id;
        const gym_id = res.locals.admin.gym_id
        const addon = await Addon.findOne({addon_id, gym_id});
        if(!addon) return jsonResponse.notFound("Addon not found");
        jsonResponse.success(addon);
    } catch (error) {
        console.log(error);
        jsonResponse.success(error);
    }
}

export const editAddon: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const client_data = req.body as AddAddonsDataT & {addon_id: string};
        if(client_data.price === null) return jsonResponse.clientError("Please enter a price");
        if(!client_data.addon_name) return jsonResponse.clientError("Please enter a name");
        const addon = await Addon.findOneAndUpdate({addon_id: client_data.addon_id, gym_id: res.locals.admin.gym_id},{
            $set: {
                addon_name: client_data.addon_name,
                price: client_data.price
            }
        });
        jsonResponse.success(addon);
    } catch (error) {
        console.log(error);
        jsonResponse.success(error);
    }
}

export const getAddons: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const gym_id = res.locals.admin.gym_id;
        const search_query = req.query.search_name || "";
        const addons = await Addon.aggregate([
            {
                $match: {
                    gym_id,
                    addon_name: {$regex: search_query, $options: "i"}
                }
            }
        ])
        jsonResponse.success(addons);
    } catch (error) {
        console.log(error);
        jsonResponse.success(error);
    }
}

export const deleteAddon: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const gym_id = res.locals.admin.gym_id;
        const addon_id = req.params.id;
        await Addon.findOneAndDelete({gym_id, addon_id});
        jsonResponse.success();
    } catch (error) {
        console.log(error);
        jsonResponse.success(error);
    }
}
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

export const getAddons: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const gym_id = res.locals.admin.gym_id;
        const search_query = req.query.search_name || "";
        const addons = await Addon.aggregate([
            {
                $match: {
                    gym_id,
                    // addon_name: {$regex: search_query, $options: "i"}
                }
            }
        ])
        jsonResponse.success(addons);
    } catch (error) {
        console.log(error);
        jsonResponse.success(error);
    }
}
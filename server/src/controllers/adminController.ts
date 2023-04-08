import JsonResponse from "../utils/Response";
import { Controller } from "../types/controller";

export const getCurrentAdmin: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        jsonResponse.success(res.locals.admin);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}
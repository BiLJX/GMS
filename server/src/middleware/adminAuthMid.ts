import { NextFunction, Request, Response } from "express";
import JsonResponse from "../utils/Response";
import jwt from "jsonwebtoken";
import { ADMIN_SECRET } from "../secret";
import { Admin } from "../models/Admin";
import { AdminT } from "@shared/Admin";


export const adminAuthMid = async(req: Request, res: Response, next: NextFunction) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const session = req.cookies.session;
        if(!session) return jsonResponse.notAuthorized();
        const decoded: {admin_id: string}|undefined = <any>jwt.verify(session, ADMIN_SECRET);
        if(!decoded) return jsonResponse.notAuthorized();
        const admin = (await Admin.aggregate<AdminT>([
            {
                $match: {
                    admin_id: decoded?.admin_id
                }
            },
            {
                $lookup: {
                    from: "gyms",
                    as: "gym_data",
                    localField: "gym_id",
                    foreignField: "gym_id"
                }
            },
            {
                $unwind: "$gym_data"
            }
        ]))[0];
        if(!admin) return jsonResponse.notAuthorized();
        res.locals.admin = admin;
        next();
    } catch (error) { 
        console.log(error);
        jsonResponse.serverError();
    }
}   
import JsonResponse from "../utils/Response";
import { Controller } from "../types/controller";
import { Admin } from "../models/Admin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AdminT } from "@shared/Admin";
import { ADMIN_SECRET } from "../secret";

const expiresIn = 60*60*24*14*1000;
const options = {maxAge: expiresIn, httpOnly: false};
export const adminLogin: Controller = async(req, res) => {
    const jsonResponse = new JsonResponse(res);
    try {
        const { email, password } = req.body;
        const admin = (await Admin.aggregate<AdminT>([
            {
                $match: {email}
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
        if(!admin) return jsonResponse.clientError("Admin not found");
        const valid = await bcrypt.compare(password, admin?.password||"");
        if(!valid) return jsonResponse.clientError("Password did not match");
        const token = jwt.sign({admin_id: admin.admin_id}, ADMIN_SECRET, {expiresIn: "10d"});
        res.cookie("session", token, options);
        return jsonResponse.success(admin);
    } catch (error) {
        console.log(error);
        jsonResponse.serverError();
    }
}
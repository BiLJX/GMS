import { Admin } from "./models/Admin";
import { Gym } from "./models/Gym";
import { makeId } from "./utils/idgen";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
const CONNECTION_URL = ""

async function _INIT_(){
}


mongoose.connect(CONNECTION_URL).then(_INIT_)

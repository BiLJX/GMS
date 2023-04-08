import { Admin } from "./models/Admin";
import { Gym } from "./models/Gym";
import { makeId } from "./utils/idgen";
import mongoose from "mongoose";
import bcrypt from "bcrypt"
const CONNECTION_URL = "mongodb+srv://BiLJX:42a3RePvN1DGXkDh@cluster0.vyegx.mongodb.net/GMS?retryWrites=true&w=majority"

async function _INIT_(){
}


mongoose.connect(CONNECTION_URL).then(_INIT_)

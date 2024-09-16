//apps
import "./fire";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import jwt from "jsonwebtoken";
//middlewares
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ApiRoutes } from "./routes/apiRoutes";

//constants
const CONNECTION_URL = ""
//const CONNECTION_URL = "mongodb+srv://cluster0.vyegx.mongodb.net/myFirstDatabase"
const PORT = process.env.PORT || 5000


//app
const app = express()

//using middlewares
app.use(bodyParser.json())
app.use(cors({credentials: true, origin: true}));
app.use(cookieParser())
app.use(express.static(path.join("build")))

//api
app.use("/api", ApiRoutes)

// app.get("/*", (req, res)=>{
//     res.sendFile(path.join(__dirname,"..", "build", "index.html"));
// })
//init app

async function _INIT_(){
    const server = app.listen(PORT, ()=>{
        console.log("listening on port "+PORT+"...")
    });
}
mongoose.connect(CONNECTION_URL).then(_INIT_)

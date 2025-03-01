import express from "express";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path"

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app,server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

app.use(express.json()); // to parse the incoming requests with json payloads
app.use(cookieParser()); // to parse the incoming requests for cookies

app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Example app listening on port ${PORT}`);
})
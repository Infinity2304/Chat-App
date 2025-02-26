import express from "express";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDb.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // to parse the incoming requests with json payloads
app.use(cookieParser()); // to parse the incoming requests for cookies

app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes);

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// })


app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Example app listening on port ${PORT}`);
})
import express from "express";
import * as dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDb.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // to parse the incoming requests with json payloads

app.use('/api/auth',authRoutes);

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// })


app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Example app listening on port ${PORT}`);
})
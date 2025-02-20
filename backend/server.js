import express from "express";
import * as dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
const app = express();
dotenv.config;
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
})

console.log(process.env.REACT_APP_PORT);


app.use('/api/auth',authRoutes);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
})
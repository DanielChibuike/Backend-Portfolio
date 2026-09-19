const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
import type { Request, Response } from "express";
type AuthRequest = Request & {
    user?: {
        userId: string;
        role: string;
    };
};
const connectDB = require("./Config/db");
const app = express();
app.use(express.json());//middleware to parse JSON request bodies
app.get("/", (req: Request, res: Response) => {
  res.send("Portfolio API is running");
});

//routes
const messageRoute = require("./Route/MessageRoute");
const projectRoute = require("./Route/projectRoute");
const userRoute = require("./Route/userRoute");
import protect = require("./Middleware/authMiddleware");
import adminOnly = require("./Middleware/authorization");


app.use("/api", messageRoute);
app.use("/api/projects", projectRoute);
app.use("/api/users",userRoute);
app.get("/api/test-auth", protect,adminOnly, (req: AuthRequest, res: Response) => {
    return res.status(200).json({
        message: "You are authenticated",
        user: req.user
    });
});


connectDB();//connect to the database



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";


dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import cartroutes from"./routes/cart.routes.js";
import chechoutroutes from "./routes/checkout.routes.js"
import projectroutes from "./routes/project.routes.js";
import contactusroutes from "./routes/conactus.routes.js";

const app = express();

app.use(
    cors({
    origin: "http://localhost:5174",
    credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/review", reviewRoutes);
app.use("/cart",cartroutes);
app.use("/checkout",chechoutroutes);
app.use("/projects",projectroutes);
app.use("/contactus",contactusroutes);

export default app;
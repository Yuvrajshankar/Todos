// IMPORTS
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import authRoutes from "./routes/auth.js"
import todoRoutes from "./routes/todo.js"
import { ErrorHandler } from "./middlewares/ErrorHandler.js";

// CONFIGURATION
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3050;

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(ErrorHandler);

// ROUTES
app.use(authRoutes);
app.use(todoRoutes);

// ------------ Deployment ------------ 
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "/frontend/build")));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
    })
} else {
    console.log("API is Running Successfully");
}

// CONNECTION
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
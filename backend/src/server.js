//const express = require("express");
import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import path from "path";

import notesRoutes from './routes/notesRoutes.js';
import { connectDb } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();


const app = express();
const port = process.env.PORT || 5001;
const ___dirname = path.resolve();

if(process.env.NODE_ENV !== "production"){
app.use(cors({
    origin:["http://localhost:5173", "http://localhost:3000"],
    credentials: true
}));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(rateLimiter);
app.use("/api/notes",notesRoutes);


if(process.env.NODE_ENV === "production"){
app.use(express.static(path.join(___dirname,"../frontend/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(___dirname,"../frontend","dist","index.html"))
})}

connectDb().then(()=>{
    app.listen(port,()=>{
    console.log(`Server started on port: ${port}`);
})
});


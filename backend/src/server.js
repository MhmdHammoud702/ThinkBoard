//const express = require("express");
import express from "express";
import cors from 'cors';
import dotenv from "dotenv";

import notesRoutes from './routes/notesRoutes.js';
import { connectDb } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();


const app = express();
const port = process.env.port || 5001;



app.use(cors({
    origin:"http://localhost:5173",
}));
app.use(express.json());

// app.use((req,res,next)=>{
//     console.log(`Req method is ${req.method} and url is ${req.url}`);
//     next();
// });

app.use(rateLimiter);
app.use("/api/notes",notesRoutes);


connectDb().then(()=>{
    app.listen(port,()=>{
    console.log("server started on port: 5001");
})
});


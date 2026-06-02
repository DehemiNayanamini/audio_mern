import userRouter from './routes/userRouter.js';
import express from "express";
import cors from "cors";
import jwt from 'jsonwebtoken';
import productRouter from './routes/productRouter.js';
import reviewRouter from './routes/reviewRouter.js';
import dotenv from "dotenv";
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res,next)=>{
    let token = req.header("Authorization");
    if(token != null){
        token = token.replace("Bearer ", "");
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if(!err){
                console.log(decoded);
                req.user = decoded; 
            }
        });
    }
    next();
});



app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/reviews", reviewRouter);

export default app;
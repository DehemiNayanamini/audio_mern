import userRouter from './routes/userRouter.js';
import express from "express";
import cors from "cors";
import jwt from 'jsonwebtoken';
import productRouter from './routes/productRouter.js';
const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res,next)=>{
    let token = req.header("Authorization");
    if(token != null){
        token = token.replace("Bearer ", "");
        jwt.verify(token, 'kv-secret-key24',
    (err, decoded)=>{
        if(!err){
            req.user = decoded; 
        }
    });
    }
    next();
});



app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

export default app;
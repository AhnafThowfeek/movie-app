import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;


mongoose.connect(MONGOURL).then(() =>{
    console.log("Database connected")
    app.listen(PORT, () =>{
        console.log(`server is on port ${PORT}`);
    });
})
.catch((error) => console.log(error));

app.use(cors({
    origin: 'http://localhost:3000', //frontend url
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    
}))

app.use(express.json());

app.use('/user', userRouter);
app.use('/auth', authRouter);

app.use((err, req, res, next) =>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
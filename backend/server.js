import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config'
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoute.js";


import profileRouter from "./routes/profileRoute.js"


import authRouter from "./routes/authRoute.js"; 



const app = express();
const port = process.env.PORT || 4000;


app.use(express.json())
app.use(cors())


connectDB();


// api endpoints
app.use("/api/food", foodRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)


app.use('/api/profile', profileRouter);


app.use('/auth', authRouter); 



app.get("/",(req, res)=>{
    res.send("API Working")
})


app.listen(port, ()=>{
    console.log(`Server Started on http://localhost:${port}`);
})






import express from "express";
import cors from "cors";
import { PORT } from "./config";
import { userRouter } from "./routes/user";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/user",userRouter)

app.listen(PORT,()=>{
    console.log("Server running on port 3000");
    
})
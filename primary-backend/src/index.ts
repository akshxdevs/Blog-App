import express from "express";
import cors from "cors";
import { PORT } from "./config";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/user",userRouter)
app.use("/api/v1/user",blogRouter)

app.listen(PORT,()=>{
    console.log("Server running on port 3000");
    
})
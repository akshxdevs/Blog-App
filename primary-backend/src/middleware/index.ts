import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

interface AuthRequest extends Request{
    id?:string
}
export function authenticateJWT(req:AuthRequest,res:Response,next:NextFunction){
    try {
        const token = req.headers["authorization"] as unknown as string
        if (!token) return res.status(403).json({message:"Token not Found/Provided !!"})
        const payload = jwt.verify(token,JWT_SECRET as string) as {id:string}
        req.id = payload.id
        console.log(payload);
        next();
    } catch (error) {
        console.error(error);
        res.status(411).json({message:"Something went wrong!!"})   
    }
}
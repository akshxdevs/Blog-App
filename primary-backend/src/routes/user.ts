import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { signinSchema, signupSchema } from "../types";
import { prismaClient } from "../db/db";
import { JWT_SECRET } from "../config";
import Redis from "ioredis";

const router = Router();
const redis = new Redis({
    host:"localhost",
    port:6379
});

const OTP_EXPIRY = 300
const OTP_LIMIT = 5

router.post("/signup",async(req,res)=>{
    try {
        const parsedBody = signupSchema.safeParse(req.body);
        if (!parsedBody.success) {
            console.log(parsedBody.error?.errors);
            return res.status(403).json({message:"Invalid inputs!"})
        }
        const {name,username,password}  = parsedBody.data;
        const existingUser = await prismaClient.user.findFirst({
            where:{
                username:username
            }
        })
        if (existingUser) {
            return res.status(402).json({
                message:"User Exist!"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const generateHandle = name + Math.floor(100000 + Math.random()*900000); 
        const user = await prismaClient.user.create({
            data:{
                username:username,
                password:hashedPassword,
                name:name,
                handle:generateHandle
            }
        })
        res.json({
            message:"User Created Successfully!",
            user:user
        })
    } catch (error) {
        console.error(error);
        res.status(411).json({message:"Something went wrong!!"})   
    }
});
router.post("/signin",async(req,res)=>{
    try {
        const parsedBody = signinSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(403).json({message:"Invalid inputs!"})
        }
        const {username}  = parsedBody.data;
        const user = await prismaClient.user.findFirst({
            where:{
                username,
            }
        })
        const generateOtp = Math.floor(100000+Math.random()*900000);
        if (!user) {
            return res.status(402).json({
                message:"User Not Exist / Signup!"
            })
        }
        const Otpkey = `otp:${String(username)}`
        const optrequestCount = await redis.get(`otp_count:${username}`)
        if (optrequestCount && Number(optrequestCount)>OTP_LIMIT) {
            res.status(429).json({message:"Too Many Otp Reqest. Try again later!!"})
        }
        await redis.setex(Otpkey,OTP_EXPIRY,generateOtp);
        await redis.incr(`otp_count:${username}`);
        await redis.expire(`otp_count:${username}`,OTP_EXPIRY);
        res.json({
            message:"Otp Generated Successfully!",
            username:username,
            otp:generateOtp
        })
    } catch (error) {
        console.error(error);
        res.status(411).json({message:"Something went wrong!!"})   
    }
});

router.post("/signin/verify-otp",async(req,res)=>{
    try {
        const parsedBody = signinSchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(403).json({message:"Invalid inputs!"})
        }
        const {username,otp}  = parsedBody.data;
        const user = await prismaClient.user.findFirst({
            where:{
                username,
            }
        })
        if (!user) {
            return res.status(402).json({
                message:"User Not Exist / Signup!"
            })
        }
        const storedOtp = await redis.get(`otp:${username}`);
        if (!storedOtp || storedOtp !== otp) {
            return res.status(401).json({message:"Otp Not Found | Otp Mismatch!!"})
        }
        const token = jwt.sign({
            id:user.id
        },JWT_SECRET as string);
        await redis.del(`otp:${username}`);
        await redis.del(`otp_count:${username}`);
        res.json({
            message:"User Login Successfully!",
            token:token,
            user:user
        });
    } catch (error) {
        console.error(error);
        res.status(411).json({message:"Something went wrong!!"})   
    }
});

export const userRouter = router;

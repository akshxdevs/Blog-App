import { Router } from "express";
import { blogSchema } from "../types";
import { prismaClient } from "../db/db";

const router = Router();

router.post("/getblogs",async(req,res)=>{
    try {
        const getAllBlogs = await prismaClient.blog.findMany({
        })
        if (!getAllBlogs) return res.status(403).json({message:[]})
        res.json({
            blogs:getAllBlogs
        })
    }catch (error) {
        console.error(error);
        res.status(411).json({message:"Something went wrong!!"})   
    }
});

router.post("/getblog/:id",async(req,res)=>{
    try {
        const userId = req.params.id
        const getAllBlogs = await prismaClient.blog.findMany({
            where:{
                userId:userId
            }
        })
        if (!getAllBlogs) return res.status(403).json({message:"No Blogs Published Yet!!"})
        res.json({
            blogs:getAllBlogs
        })
    }catch (error) {
        console.error(error);
        res.status(411).json({message:"Something went wrong!!"})   
    }
});

router.post("/createblog/:id",async(req,res)=>{
    try {
        const userId = req.params.id
        const parsedBody = blogSchema.safeParse(req.body);
        if (!parsedBody.success) {
            console.log(parsedBody.error?.errors);
            return res.status(403).json({message:"Invalid inputs!"})
        } 
        const {blogImg,title,subTitle,writings,tags} = parsedBody.data;
        const blog = await prismaClient.blog.create({
            data:{                
                title:title,
                blogImg:blogImg,
                subtitle:subTitle,
                writings:writings,
                tags:tags,
                userId:userId
            }
        })
        res.json({
            mesage:"Blog Published Successfully!!",
            blog:blog
        })
    }catch (error) {
        console.error(error);
        res.status(411).json({message:"Something went wrong!!"})   
    }
});

router.post("/like/:id",async(req,res)=>{
    try {
        const blogId = req.params.id
        const userId = req.body.userId
        const blog = await prismaClient.blog.findFirst({
            where:{
                id:blogId
            }
        })
        const user = await prismaClient.user.findFirst({
            where:{
                id:userId
            }
        })
        if (!user || !blog) {
            res.status(403).json({message:"User/blog Not Exist!!"})
        }
        await prismaClient.likes.create({
            data:{                
                userId:userId,
                blogId:blogId,
            }
        })
        res.json({
            mesage:"Liked Blog Successfully!!",
        })
    }catch (error) {
        console.error(error);
        res.status(411).json({message:"Something went wrong!!"})   
    }
});
router.post("/comment/:id",async(req,res)=>{
    try {
        const blogId = req.params.id
        const { userId,comments } = req.body 
        const blog = await prismaClient.blog.findFirst({
            where:{
                id:blogId
            }
        })
        const user = await prismaClient.user.findFirst({
            where:{
                id:userId
            }
        })
        if (!user || !blog) {
            res.status(403).json({message:"User/blog Not Exist!!"})
        }
        await prismaClient.comments.create({
            data:{
                comment:comments,              
                userId:userId,
                blogId:blogId,
            }
        })
        res.json({
            mesage:"Liked Blog Successfully!!",
        })
    }catch (error) {
        console.error(error);
        res.status(411).json({message:"Something went wrong!!"})   
    }
});

router.post("/getlikes/:id",async(req,res)=>{
    try {
        const blogId = req.params.id 
        const getAllLikes = await prismaClient.likes.findMany({
            where:{
                id:blogId
            }
        })
        if (!getAllLikes) {
            res.status(403).json({message:"User/blog Not Exist!!"})
        }
        res.json({
            getAllLikes
        })
    }catch (error) {
        console.error(error);
        res.status(411).json({message:"Something went wrong!!"})   
    }
});

router.post("/getcomments/:id",async(req,res)=>{
    try {
        const blogId = req.params.id 
        const getAllComments = await prismaClient.comments.findMany({
            where:{
                id:blogId
            }
        })
        if (!getAllComments) {
            res.status(403).json({message:"User/blog Not Exist!!"})
        }
        res.json({
            getAllComments
        })
    }catch (error) {
        console.error(error);
        res.status(411).json({message:"Something went wrong!!"})   
    }
});

router.post("/subscribe/:id",async(req,res)=>{
    try {
        const userId = req.params.id
        const user = await prismaClient.user.findFirst({
            where:{
                id:userId
            }
        })
        if (!user) {
            res.status(403).json({message:"User/blog Not Exist!!"})
        }
        await prismaClient.subscribers.create({
            data:{
                subscribersId:userId
            }
        })
        res.json({
            mesage:"Subscribed Successfully!!",
        })
    }catch (error) {
        console.error(error);
        res.status(411).json({message:"Something went wrong!!"})   
    }
});

router.post("/savepost/:id",async(req,res)=>{
    try {
        const blogId = req.params.id
        const userId = req.body.userId 
        const blog = await prismaClient.blog.findFirst({
            where:{
                id:blogId
            }
        })
        const user = await prismaClient.user.findFirst({
            where:{
                id:userId
            }
        })
        if (!user || !blog) {
            res.status(403).json({message:"User/blog Not Exist!!"})
        }
        await prismaClient.saveBlog.create({
            data:{
                userId:userId,
                blogId:blogId,
            }
        })
        res.json({
            mesage:"Blog Saved Successfully!!",
        })
    }catch (error) {
        console.error(error);
        res.status(411).json({message:"Something went wrong!!"})   
    }
});

router.post("/getsavedpost/:id",async(req,res)=>{
    try {
        const blogId = req.params.id;
        const userId = req.body.userId;
        const getAllSavedPost = await prismaClient.saveBlog.findMany({
            where:{
                blogId:blogId,
                userId:userId
            }
        })
        if (!getAllSavedPost) {
            res.status(403).json({message:"User/blog Not Exist!!"})
        }
        res.json({
            getAllSavedPost
        })
    }catch (error) {
        console.error(error);
        res.status(411).json({message:"Something went wrong!!"})   
    }
});
export const blogRouter = router;
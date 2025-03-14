import { string, z } from "zod";

export const signupSchema = z.object({
    name:z.string().min(1).max(10),
    username:z.string().email(),
    password:z.string().min(5).max(15),
});

export const signinSchema = z.object({
    username:z.string().email(),
    password:z.string().min(5).max(15).optional(),
    mobileNo:z.string().min(10).max(10).optional(),
    otp:z.string().min(6).max(6).optional()
});

export const blogSchema = z.object({
    title:z.string().min(5).max(20),
    subTitle:z.string().min(5).max(30),
    writings:z.string().min(5).max(100),
    blogImg:z.string().optional(),
    tags:z.string().optional()
});

  
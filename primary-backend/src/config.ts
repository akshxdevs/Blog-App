import dotenv from "dotenv"
dotenv.config();
export const PORT = process.env.PORT;
export const ADMIN_JWT = process.env.ADMIN_JWT
export const USER_JWT = process.env.USER_JWT;
export const JWT_SECRET = process.env.JWT_SECRET;
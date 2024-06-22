import dotenv from "dotenv";
dotenv.config();

export const APP_PORT = process.env.PORT;
export const DB_URI = process.env.DATABASE_URI;

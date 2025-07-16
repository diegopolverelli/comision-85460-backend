import dotenv from "dotenv"

dotenv.config({path:"./.env", override: true, quiet:true})

export const config={
    PORT: process.env.PORT || 3009,
    MONGO_URL: process.env.MONGO_URL, 
    DB_NAME: process.env.DB_NAME, 
    SECRET: process.env.SECRET
}
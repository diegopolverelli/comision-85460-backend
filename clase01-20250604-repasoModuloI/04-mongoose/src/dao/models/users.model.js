import mongoose from "mongoose"

export const usersModel=mongoose.model(
    "users",
    new mongoose.Schema(
        {
            first_name: String,
            email: {
                type: String, unique: true, required: true
            },
            password: String
        },
        {
            timestamps: true,
            // collection: "users2021uruguay",
            strict: false,
        }
    )
)
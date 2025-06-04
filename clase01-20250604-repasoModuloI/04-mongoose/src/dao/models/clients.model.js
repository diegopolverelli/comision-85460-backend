import mongoose from "mongoose";

const clientsModelName="clients"

const clientsSchema=new mongoose.Schema(
    {
        name: String, 
        email: String, 
        account: {
            type: String, unique: true
        },
        creditLimit: {
            type: Number, default:0 
        }
    },
    {
        timestamps: true
    }
)

export const clientsModel=mongoose.model(
    clientsModelName,
    clientsSchema
)



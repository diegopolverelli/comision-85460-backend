import mongoose from "mongoose";

export const productsModel=mongoose.model(
    "productos", 
    new mongoose.Schema(
        {
            title: String, 
            price: Number, 
            Stock: Number
        },
        {
            timestamps:true,
            collection: "productos20250716"
        }
    )
)

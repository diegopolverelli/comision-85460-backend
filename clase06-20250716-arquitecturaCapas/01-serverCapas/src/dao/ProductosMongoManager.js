import { productsModel } from "./models/productModel.js";

export class ProductosMongoManager{
    static async get(){
        return await productsModel.find().lean()
    }

    static async create(producto){
        return await productsModel.create(producto)
    }
}
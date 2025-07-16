// import { ProductosManager } from "../dao/ProductosManager.js";

import { productsService } from "../services/productos.service.js";


export class ProductsController{
    static async getProduct(req, res){
        try {
            // let productos=await ProductosManager.get()
            let productos=await productsService.getProducts()
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({payload:productos});
        } catch (error) {
            console.log(error)
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Internal Server Error`})
        }
    }

    static async createProduct(req, res){
        let {title, price, stock, descrip}=req.body
        // validare... 

        try {
            // let nuevoProducto=await ProductosManager.create({title, price, stock, descrip})
            let nuevoProducto=await productsService.createProducto({title, price, stock, descrip})
            res.setHeader('Content-Type','application/json');
            return res.status(200).json({payload:nuevoProducto});
        } catch (error) {
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Internal Server Error`})
        }
    }
}
import { ProductosMongoManager as ProductosManager } from "../dao/ProductosMongoManager.js"

// import { ProductosManager } from "../dao/ProductosManager.js"

class ProductsService{
    #productsDAO
    constructor(dao){
        this.#productsDAO=dao
    }

    async getProducts(){
        // acciones... 
        let productos=await this.#productsDAO.get()
        console.log(productos)
        return productos.map(p=>{
            return {
                title: p.title.toUpperCase(), 
                stock: p.stock,
                codigo: "completar"
            }
        }
        )
    }

    async createProducto(producto){
        // acciones
        return await this.#productsDAO.create(producto)
    }
}

export const productsService=new ProductsService(ProductosManager)


// productsService.getProducts()
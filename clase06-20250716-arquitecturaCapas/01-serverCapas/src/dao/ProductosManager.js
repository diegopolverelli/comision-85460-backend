import { productos } from "../data/productos.js";

export class ProductosManager{
    static get(){
        return productos
    }

    static create(producto){
        let id=1
        if(productos.length>0){
            id=Math.max(...productos.map(d=>d.id))+1
        }

        let nuevoProducto={id, ...producto}
        
        productos.push(nuevoProducto)
        return nuevoProducto
    }
}
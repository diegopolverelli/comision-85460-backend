import { clientes } from "../data/clientes.js";

export class ClientesManager{
    static get(){
        return clientes
    }

    static create(cliente){
        let id=1
        if(clientes.length>0){
            id=Math.max(...clientes.map(d=>d.id))+1
        }

        let nuevoCliente={
            id, ...cliente
        }
        
        clientes.push(nuevoCliente)

        return nuevoCliente
    }
}
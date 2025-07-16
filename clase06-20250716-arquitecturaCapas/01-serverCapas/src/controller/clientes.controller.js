import { ClientesManager } from "../dao/ClientesManager.js"

export const leeClientes=async(req,res)=>{

    try {
        // let clientes="listado clientes"
        let clientes=await ClientesManager.get()
    
        res.setHeader('Content-Type','application/json')
        res.status(200).json({clientes})
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal Server Error`})
    }
}

export const creaCliente=async(req,res)=>{

    let {first_name, last_name, email}=req.body
    // validar datos cliente
    try {
        let nuevoCliente=await ClientesManager.create({first_name, last_name, email})

        res.setHeader('Content-Type','application/json')
        res.status(200).json({nuevoCliente})        
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Internal Server Error`})
    }

}

export const leeCliente=async(req, res)=>{
    let {id}=req.params

    // resto logica... 
}
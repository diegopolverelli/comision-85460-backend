import { Router } from 'express';
import { creaCliente, leeCliente, leeClientes } from '../controller/clientes.controller.js';
export const router=Router()

router.get('/', leeClientes)
router.post('/', creaCliente)


// router.get("/:id", (req, res)=>{
//     let {id}=req.params

//     // resto logica... 
// })

router.get("/:id", leeCliente)
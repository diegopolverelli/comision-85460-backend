import { Router } from 'express';
export const router=Router()

router.get('/',(req,res)=>{

    

    res.setHeader('Content-Type','application/json')
    res.status(200).json({payload:"Listado de clientes"})
})

router.post('/',(req,res)=>{

    

    res.setHeader('Content-Type','application/json')
    res.status(201).json({payload:"Cliente generado...!!!"})
})
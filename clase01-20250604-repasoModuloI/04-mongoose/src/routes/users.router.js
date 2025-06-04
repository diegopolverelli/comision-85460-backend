import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { UsersManager } from '../dao/UsersManager.js';
export const router=Router()

router.get('/', async(req,res)=>{
    // let usuarios=[
    //     {id:1, nombre:"Luciana", email:"luciana@test.com", password:"123", rol:"user"},
    //     {id:2, nombre:"Juan", email:"juan@test.com", password:"123", rol:"user"},
    //     {id:3, nombre:"Romina", email:"romina@test.com", password:"123", rol:"admin"},
    // ]

    try {
        let usuarios=await UsersManager.getUsers()
    
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({usuarios});
        
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Error`, detalle: error.message})
    }

})

router.post("/", auth, async(req, res)=>{

    // logica de creación de users
    try {
        let {first_name, email, password}=req.body
        if(!first_name || !email || !password){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Complete los datos`})
        }

        let existe=await UsersManager.getUserByEmail(email)
        if(existe){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Ya existe un usuario con email ${email}`})
        }

        let nuevoUsuario=await UsersManager.createUser({first_name, email, password})

        console.log(nuevoUsuario)

        res.setHeader('Content-Type','application/json');
        return res.status(201).json({message:"Usuario creado...!!!", nuevoUsuario});
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Error`, detalle: error.message})
    }

})
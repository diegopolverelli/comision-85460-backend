import { Router } from 'express';
import { usuariosModelo } from '../models/usuario.model.js';
import bcrypt from "bcrypt"
import passport from 'passport';
export const router=Router()

// router.post('/register',async(req,res)=>{

//     let {nombre, apellido, email, password} = req.body
//     if(!nombre || !apellido || !email || !password){
//         res.setHeader('Content-Type','application/json');
//         return res.status(400).json({error:`nombre | apellido | email | password son requeridos`})
//     }

//     // validaciones varias... 
//     try {
//         password=bcrypt.hashSync(password, 10)
//         let nuevoUsuario=await usuariosModelo.create({nombre, apellido, email, password})

//         res.setHeader('Content-Type','application/json')
//         res.status(201).json({
//             message:"Registro exitoso",
//             nuevoUsuario
//         })
//     } catch (error) {
//         console.log(error)
//         res.setHeader('Content-Type','application/json');
//         return res.status(500).json({error:`Internal server error`})
//     }

// })

router.post(
    "/register",
    // paso 3
    passport.authenticate("registro", {failureRedirect:"/api/sessions/error"}),
    (req, res)=>{

        // si passport.authenticate sale OK crea un req.user

        res.setHeader('Content-Type','application/json');
        return res.status(201).json({message:`Registro exitoso para ${req.user.nombre}`, nuevoUsuario:req.user});
    }
)

// router.post("/login", async(req, res)=>{
//     // let email=req.body.email
//     // let password=req.body.password
//     let {email, password} = req.body
//     if(!email || !password){
//         res.setHeader('Content-Type','application/json');
//         return res.status(400).json({error:`email | password son requeridos`})
//     }

//     try {
//         let usuario=await usuariosModelo.findOne({email}).lean()
//         if(!usuario){
//             res.setHeader('Content-Type','application/json');
//             return res.status(401).json({error:`Unauthorized - credenciales inválidas`})
//         }
        
//         if(!bcrypt.compareSync(password, usuario.password)){
//             res.setHeader('Content-Type','application/json');
//             return res.status(401).json({error:`Unauthorized - credenciales inválidas`})
//         }

//         console.log(Object.keys(usuario))

//         console.log(usuario)
//         delete usuario.password   // eliminar datos sensibles
//         delete usuario.createdAt
//         delete usuario.updatedAt

//         req.session.usuario=usuario

//         res.setHeader('Content-Type','application/json');
//         return res.status(200).json({message:`Login exitoso para ${usuario.nombre}`, usuario});

//     } catch (error) {
//         res.setHeader('Content-Type','application/json');
//         return res.status(500).json({error:`Internal server Error`})
//     }
// })

router.get("/error", (req, res)=>{
    res.setHeader('Content-Type','application/json');
    return res.status(401).json({error:`Unauthorized - credenciales invalidas`})
})

router.post(
    "/login", 
    // paso 3
    passport.authenticate("login", {failureRedirect:"/api/sessions/error"}),
    (req, res)=>{
        // si passport.authenticate sale OK crea un req.user

        req.session.usuario=req.user

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({message:`Login exitoso para ${req.user.nombre}`, usuarioLogueado:req.user});
    }
)

router.get("/logout", (req, res)=>{
    req.session.destroy(e=>{
        if(e){
            res.setHeader('Content-Type','application/json');
            return res.status(500).json({error:`Error al procesar Logout`})
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({message:"Logout exitoso"});
    })
})


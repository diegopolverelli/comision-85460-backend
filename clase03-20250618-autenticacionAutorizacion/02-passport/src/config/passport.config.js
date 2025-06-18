import passport from "passport"
import local from "passport-local"
import bcrypt from "bcrypt"
import { usuariosModelo } from "../models/usuario.model.js"
// import { isError } from "util"

export const iniciarPassport=()=>{

    // paso 1: 
    passport.use("registro", 
        new local.Strategy(
            {
                usernameField: "email",
                passReqToCallback: true
            },
            async(req, username, password, done)=>{
                try {
                    // return done(null, false)   |   return done(null, nuevoUsuario)
                    let {nombre, apellido} =req.body
                    if(!nombre || !apellido){
                        return done(null, false)
                    }

                    // validaciones

                    password=bcrypt.hashSync(password, 10)
                    let nuevoUsuario=await usuariosModelo.create({
                        nombre, apellido, email: username, password
                    })

                    return done(null, nuevoUsuario)                    
                } catch (error) {
                    return done(error)  // hubo un error
                }
            }
        )
    )

    passport.use("login", 
        new local.Strategy(
            {usernameField:"email"},
            async(username, password, done)=>{
                try {
                    let usuario=await usuariosModelo.findOne({email:username}).lean()
                    if(!usuario){
                        // res.setHeader('Content-Type','application/json');
                        // return res.status(401).json({error:`Unauthorized - credenciales inválidas`})
                        return done(null, false)
                    }
                    
                    if(!bcrypt.compareSync(password, usuario.password)){
                        // res.setHeader('Content-Type','application/json');
                        // return res.status(401).json({error:`Unauthorized - credenciales inválidas`})
                        return done(null, false)
                    }

                    delete usuario.password   // limpiar datos confidenciales...
                    delete usuario.createdAt
                    delete usuario.updatedAt

                    return done(null, usuario)
                    
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    

    // pasto 1 bis / paso 1'   // solo si uso sessions
    passport.serializeUser((usuario, done)=>{
        return done(null, usuario._id)
    })

    passport.deserializeUser(async(id, done)=>{
        let usuario=await usuariosModelo.findOne({_id:id})
        return done(null, usuario)
    })


}

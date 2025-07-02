import {Router} from "express"

export class CustomRouter{
    constructor(){
        this.router=Router()
        this.router.authGet=(path, ...funciones)=>{   // ... son aqui el operador rest
            this.router.get(path, this.customResponse, this.procesaFunciones(funciones))
        }
        this.router.authPost=(path, ...funciones)=>{   // ... son aqui el operador rest
            this.router.post(path, this.customResponse, this.procesaFunciones(funciones))
        }
    }

    procesaFunciones=(funciones=[])=>{   // (req, res, next)=>{}   o (req, res)=>{}
        return funciones.map(fn=>{
            return async(...args)=>{   // ... son op rest (guardo en un array args)
                try {
                    return await fn(...args)  // ... son op spread (desparramo ese array args)
                } catch (error) {
                    return args[1].badRequest(`Error: ${error.message}`)
                }
            }
        })
    }


    customResponse(req, res, next){
        res.success=(statusCode, message, data)=>res.status(statusCode).json({status:"OK", message, data})
        res.badRequest=error=>res.status(400).json({status:"bad Request", error})
        res.notFound=error=>res.status(404).json({status:"not Found", error})
        res.unauthorize=error=>res.status(401).json({status:"unauthorized", error})
        res.forbbidden=error=>res.status(403).json({status:"forbbiden", error})

        next()
    }

}
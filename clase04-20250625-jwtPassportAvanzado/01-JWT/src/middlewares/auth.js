import jwt from "jsonwebtoken"
export const auth=(req, res, next)=>{
    // if(!req.session.usuario) saliamos con 401

    if(!req.headers.authorization){

        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`No hay token / no hay usuario autenticado`})
    }

    // Bearer TOKEN: BEARER asddf88fda8dfa.asdfasdf8asdf8ads8f.asdf90asdf9asd9f
    let token=req.headers.authorization.split(" ")[1]

    try {
        let usuario=jwt.verify(token, "CoderCoder123")
        req.user = usuario
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`${error.message}`})
    }


    next()
}
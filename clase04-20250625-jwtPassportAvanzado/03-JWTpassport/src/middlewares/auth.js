import jwt from "jsonwebtoken"
export const auth=(req, res, next)=>{
    console.log(req.cookies)
    // if(!req.session.usuario) saliamos con 401

    // if(!req.headers.authorization){
    if(!req.cookies.cookieToken){

        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`No hay token / no hay usuario autenticado`})
    }

    let token=req.cookies.cookieToken

    try {
        let usuario=jwt.verify(token, "CoderCoder123")
        req.user = usuario
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`${error.message}`})
    }


    next()
}
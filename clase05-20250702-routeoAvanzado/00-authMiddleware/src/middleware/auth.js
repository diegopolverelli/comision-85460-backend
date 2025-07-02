export const auth=(permisos=[])=>{
    return (req, res, next)=>{
        permisos=permisos.map(p=>p.toLowerCase())

        if(permisos.includes("public")) return next()

        if(!permisos.includes(req.user.rol)){
            res.setHeader('Content-Type','application/json');
            return res.status(403).json({error:`No tiene privilegios suficientes para acceder al recurso solicitado`})
        }

        next()
    }
}
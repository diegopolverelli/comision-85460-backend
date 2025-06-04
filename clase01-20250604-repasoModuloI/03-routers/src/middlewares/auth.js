export const auth=(req, res, next)=>{
    let {user, password} =req.query
    if(!user || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`No hay usuarios autenticados`})
    }

    if(user!="admin" || password!="CoderCoder123"){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Credenciales inválidas`})
    }

    next()
}
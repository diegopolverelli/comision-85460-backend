import express from 'express';
import sessions from "express-session"
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(sessions(
    {
        secret:"Secret001",
        resave: true, 
        saveUninitialized: true, 
        // store: ...
    }
))


app.get('/',(req,res)=>{
    if(req.session.contador){
        req.session.contador++
    }else{
        req.session.contador=1
    }

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`Visitas realizadas: ${req.session.contador}`});
})

app.get("/logout", (req, res)=>{
    req.session.destroy(error=>{
        if(error){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Error al hacer logout`})
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"Logout realizado (sessions eliminada)"});
    })

})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

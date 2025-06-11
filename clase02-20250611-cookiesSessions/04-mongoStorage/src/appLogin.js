import express from 'express';
import session from "express-session"
import MongoStore from "connect-mongo"
import { auth } from './middleware/auth.js';
const PORT=3000;

const app=express();

app.use(session({
    secret:"PassSecret123",
    resave:true,
    saveUninitialized:true,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://coderhouse:codercoder2023@cluster0.wpxpupc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
        // ttl:3600,
        dbName: "comisPrueba"
    })
}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));


let usuarios=[
    {
        nombre:'Diego', password:'123', 
        rol: 'usuario'
    },
    {
        nombre:'Laura', password:'123', 
        rol: 'usuario'
    },
    {
        nombre:'Admin', password:'codercoder', 
        rol: 'admin'
    },
]

app.get('/',(req,res)=>{


    res.setHeader('Content-Type','text/plain');
    res.status(200).send("OK");
})

app.get('/login',(req,res)=>{
    let {username, password}=req.query
    if(!username || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`username | password son requeridos`})
    }

    let usuario=usuarios.find(u=>u.nombre==username && u.password==password)
    if(!usuario){
        res.setHeader('Content-Type','application/json');
        return res.status(401).json({error:`Unauthorized | credenciales incorrectas`})
    }

    req.session.usuario=usuario  // solo en el login (y login correcto...)

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Login exitoso"});
})

app.get("/datos", auth, (req, res)=>{


    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Datos confidenciales", usuarioLogueado: req.session.usuario});
})

app.get("/logout", (req, res)=>{

    req.session.destroy(e=>{
        if(e){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Error al hacer logout`})
        }

        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload: "Logout exitoso"});
    })

})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

import express from 'express';
import { logger } from './middlewares/logger.js';
import { auth } from './middlewares/auth.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(logger)

app.get('/',(req,res)=>{

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get('/api/users', (req,res)=>{
    let usuarios=[
        {id:1, nombre:"Luciana", email:"luciana@test.com", password:"123", rol:"user"},
        {id:2, nombre:"Juan", email:"juan@test.com", password:"123", rol:"user"},
        {id:3, nombre:"Romina", email:"romina@test.com", password:"123", rol:"admin"},
    ]

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({usuarios});
})

app.post("/api/users", auth, (req, res)=>{

    // logica de creación de users

    res.setHeader('Content-Type','application/json');
    return res.status(201).json({payload:"Usuario creado...!!!"});
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

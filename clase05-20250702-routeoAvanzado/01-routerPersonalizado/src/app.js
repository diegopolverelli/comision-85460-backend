import express from 'express';
import { router as pruebasRouter } from './routes/pruebas.router.js';
import { heroesRouter } from './routes/heroesRouter.js';
const PORT=3000;



const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/pruebas", pruebasRouter)
app.use("/api/heroes", heroesRouter.router)

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

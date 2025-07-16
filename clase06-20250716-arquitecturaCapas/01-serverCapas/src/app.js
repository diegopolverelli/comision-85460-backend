import express from 'express';
import cors from "cors"
import { router as clientesRouter } from './routes/clientesRouter.js';
import { router as productosRouter } from './routes/productosRouter.js';
import { config } from './config/config.js';
import { connDB } from './config/db.js';
const PORT=config.PORT;

const app=express();

// app.use(cors({origin:[], methods:["GET"]}))
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/clientes", clientesRouter)
app.use("/api/productos", productosRouter)

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

connDB(config.MONGO_URL, config.DB_NAME)
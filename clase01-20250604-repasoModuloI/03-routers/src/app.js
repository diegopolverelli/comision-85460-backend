import express from 'express';
import { logger } from './middlewares/logger.js';

import { router as clientsRouter } from './routes/clients.router.js';
import { router as usersRouter } from './routes/users.router.js';
// import { auth } from './middlewares/auth.js';
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(logger)

app.use("/api/users", usersRouter)
app.use("/api/clients", clientsRouter)

app.get('/',(req,res)=>{

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})



const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

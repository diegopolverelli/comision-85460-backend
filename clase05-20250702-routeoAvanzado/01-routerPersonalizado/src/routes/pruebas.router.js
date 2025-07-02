import { Router } from 'express';
export const router=Router()

// router.use(auth)

router.get('/', (req,res)=>{

    

    res.setHeader('Content-Type','application/json')
    res.status(200).json({message:"Pruebas router GET"})
})
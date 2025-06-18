import { Router } from 'express';
export const router=Router()

router.get('/',(req,res)=>{

    res.status(200).render('home')
})

router.get('/register',(req,res)=>{

    res.status(200).render('register')
})

router.get('/login',(req,res)=>{

    res.status(200).render('login')
})


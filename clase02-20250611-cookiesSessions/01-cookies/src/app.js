import express from 'express';
import cookieParser from "cookie-parser"
const PORT=3000;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('./src/public'))
app.use(cookieParser("Secret001"))

app.get('/',(req,res)=>{
    console.log(req.headers)
    let data=req.headers.cookie.split(";")[0]
    let nombreCookie=data.split("=")[0]
    data=data.split("=")[1]
    console.log(nombreCookie)
    console.log(data)

    res.setHeader('Content-Type','text/plain');
    res.status(200).send('OK');
})

app.get("/getcookies", (req, res)=>{
    let cookies=req.cookies
    let cookiesFirmadas=req.signedCookies

    console.log(cookies.cookieNavegador01)

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({message:`Cookies del cliente`, cookies, cookiesFirmadas});
})

app.get("/setcookies", (req, res)=>{

    let datos={
        theme: "Dark",
        fontSize: 14, 
        fontColor: "#CCC"
    }

    res.cookie("cookieServer01", datos, {})
    res.cookie("cookieServer02exp01", datos, {maxAge: 1000 * 5})
    res.cookie("cookieServer02exp02", datos, {maxAge: 1000 * 60 * 15}) // 15 min
    res.cookie("cookieServer02exp03", datos, {expires: new Date(2025, 11, 18)}) // 15 min
    res.cookie("cookieServer03signed", datos, {maxAge: 1000 * 60 * 30, signed:true})
    
    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Cookies generada...!!!"});
})

app.get("/delcookies", (req, res)=>{

    let usuario={
        nombre:"Juan", 
        edad: 32
    }

    // res.clearCookie("cookieServer02exp03")
    let cookies=Object.keys(req.cookies)
    cookies.forEach(nc=>res.clearCookie(nc))

    cookies=Object.keys(req.signedCookies)
    cookies.forEach(nc=>res.clearCookie(nc))

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"Cookies eliminadas...!!!"});
})


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

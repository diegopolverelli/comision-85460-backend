import express from 'express';
import fs from 'fs'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import { auth } from './middlewares/auth.js';
import passport from 'passport';
import { iniciarPassport } from './config/passport.config.js';
import { passportCall } from './utils.js';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

// paso 2:
iniciarPassport()
app.use(passport.initialize())
// app.use(passport.session())  // solo si uso Sessions

app.use(express.static("./src/public"))

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
})

let usuarios = []
if (fs.existsSync('./src/usuarios.json')) {
    usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json', 'utf-8'))
}

// app.post('/registro', passport.authenticate("registro", { session: false, failureRedirect: "/error" }), (req, res) => {
app.post(
    '/registro',
    // passport.authenticate("registro", { session: false, failureRedirect: "/error" }),
    // function (req, res, next) {
    //     passport.authenticate('registro', function (err, user, info, status) {
    //         if (err) { return next(err) } // passport puede hacer return done(error)
            
    //         if (!user) {  // passport puede hacer return done(null, false)
    //             // return res.redirect('/signin')
    //             return res.status(400).json({error: info.message?info.message:info.toString()})
    //         }

    //         // para el caso en que passport retorne return done(null, usuario)
    //         // res.redirect('/account');
    //         req.user=user
    //         return next()
    //     })(req, res, next);
    // },
    passportCall("registro"),
    (req, res) => {

        res.json({
            usuarioCreado: req.user
        })
    }
)

// app.get('/protected', function (req, res, next) {
//     passport.authenticate('local', function (err, user, info, status) {
//         if (err) { return next(err) }
//         if (!user) { return res.redirect('/signin') }
//         res.redirect('/account');
//     })(req, res, next);
// });

// app.post('/login', passport.authenticate("login", { session: false, failureRedirect: "/error" }), (req, res) => {
app.post('/login', passportCall("login"), (req, res) => {
    let usuario = req.user
    delete usuario.password // no enviar datos confidenciales o sensibles dentro del token
    let token = jwt.sign(usuario, "CoderCoder123", { expiresIn: '1h' })

    res.cookie("cookieToken", token, { httpOnly: true })
    return res.status(200).json({
        usuarioLogueado: usuario,
        // token
    })

})

app.get("/error", (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    return res.status(401).json({ error: `Error al autenticar... :(` })
})

// app.get('/usuario', auth, (req,res)=>{
// app.get('/usuario', passport.authenticate("current", { session: false, failureRedirect: "/error" }), (req, res) => {
app.get('/usuario', passportCall("current"), (req, res) => {

    // si passport.authenticate sale OK, deja un req.user con los datos
    // del usuario autenticado

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        mensaje: 'Perfil usuario ' + req.user.nombre,
        datos: `email: ${req.user.email}`
    });
});

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});

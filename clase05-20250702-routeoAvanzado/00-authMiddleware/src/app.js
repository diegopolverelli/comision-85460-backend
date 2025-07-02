import express from 'express';
import fs from 'fs'
import bcrypt from "bcrypt"
import passport from 'passport';
import { initPassport } from './config/passport.config.js';
import jwt from "jsonwebtoken"
import { auth } from './middleware/auth.js';
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initPassport()
app.use(passport.initialize())

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
})

let usuarios = []
if (fs.existsSync('./src/usuarios.json')) {
    usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json', 'utf-8'))
}

app.post('/registro', (req, res) => {
    let { nombre, email, password } = req.body
    if (!nombre || !email || !password) return res.status(400).send({ error: 'Ingrese todos los datos' })

    let usuario = usuarios.find(u => u.email === email)
    if (usuario) return res.status(400).send({ error: `El usuario ${email} ya existe en la DB` })

    let id = 1
    if (usuarios.length > 0) id = usuarios[usuarios.length - 1].id + 1

    usuario = {
        id,
        nombre,
        email,
        password: bcrypt.hashSync(password, 10),
        rol: "user"
    }

    usuarios.push(usuario)

    fs.writeFileSync('./src/usuarios.json', JSON.stringify(usuarios, null, 5))

    res.json({
        usuarioCreado: usuario
    })
})

app.post('/login', passport.authenticate("login", { session: false }), (req, res) => {
    // let {email, password}=req.body
    // if(!email || !password) return res.status(400).send({error:'Ingrese email y password'})

    // usuarios=JSON.parse(fs.readFileSync('./src/usuarios.json','utf8'))

    // let usuario=usuarios.find(u=>u.email===email)
    // if(!usuario) return res.status(400).send({error:`Error credenciales`})

    // if(!bcrypt.compareSync(password, usuario.password)) return res.status(400).send({error:`Error credenciales`})

    let token = jwt.sign(req.user, "CoderCoder123", { expiresIn: "1h" })

    return res.status(200).json({
        usuarioLogueado: req.user,
        token
    })

})

app.get(
    '/usuario',
    passport.authenticate("current", { session: false }),
    auth(["user", "admin", "manager"]),
    (req, res) => {


        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            mensaje: 'Perfil usuario',
            datosUserLogueado: req.user
        });
    }
);

app.get(
    '/usuarios',
    passport.authenticate("current", { session: false }),
    auth(["PUBLIC"]),
    (req, res) => {


        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            mensaje: 'Perfil usuario',
            datosUserLogueado: req.user
        });
    }
);


app.get(
    '/admin',
    passport.authenticate("current", { session: false }),
    auth(["ADMIN", "MANAGER"]),
    (req, res) => {


        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            mensaje: 'Perfil administrador',
            datosUserLogueado: req.user
        });
    }
);

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});

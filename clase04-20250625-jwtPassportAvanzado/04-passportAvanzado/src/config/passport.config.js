import passport from "passport"
import local from "passport-local"
import passportJWT from "passport-jwt"
import fs from "fs"
import bcrypt from "bcrypt"

const buscarToken = req => {
    let token = null

    if (req.cookies.cookieToken) token = req.cookies.cookieToken

    return token
}

// paso 1
export const iniciarPassport = () => {

    passport.use("current",
        new passportJWT.Strategy(
            {
                secretOrKey: "CoderCoder123",
                jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([buscarToken]),
                // jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
            },
            async (contenidoToken, done) => {
                try {
                    return done(null, contenidoToken)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use("login",
        new local.Strategy(
            {
                usernameField: "email",
                // passReqToCallback:true
            },
            async (username, password, done) => {
                try {
                    let usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json', 'utf8'))

                    let usuario = usuarios.find(u => u.email === username)
                    if (!usuario) { //return res.status(400).send({error:`Error credenciales`})
                        return done(null, false, )
                    }

                    if (!bcrypt.compareSync(password, usuario.password)) { //return res.status(400).send({error:`Error credenciales`})
                        return done(null, false, {message:"Credenciales inválidas"})
                    }

                    return done(null, usuario)

                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use("registro",
        new local.Strategy(
            {
                usernameField: "email",
                passReqToCallback: true
            },
            async (req, username, password, done) => {
                try {
                    
                    let { nombre } = req.body
                    if (!nombre) return done(null, false, {message:`El nombre es requerido`})

                    let usuarios = []
                    if (fs.existsSync('./src/usuarios.json')) {
                        usuarios = JSON.parse(fs.readFileSync('./src/usuarios.json', 'utf-8'))
                    }

                    let usuario = usuarios.find(u => u.email === username)
                    if (usuario) return done(null, false, `El usuario con email ${username} ya existe en db`)

                    let id = 1
                    if (usuarios.length > 0) id = usuarios[usuarios.length - 1].id + 1

                    usuario = {
                        id,
                        nombre,
                        email: username,
                        password: bcrypt.hashSync(password, 10),
                        rol: "user"
                    }

                    usuarios.push(usuario)

                    fs.writeFileSync('./src/usuarios.json', JSON.stringify(usuarios, null, 5))

                    return done(null, usuario)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    // paso 1' SOLO PARA SESSIONS
    // passport.serializeUser()
    // passport.deserializeUser()

}
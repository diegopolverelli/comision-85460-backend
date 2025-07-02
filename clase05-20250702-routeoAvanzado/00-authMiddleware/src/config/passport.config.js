import passport from "passport"
import local from "passport-local"
import passportJWT from "passport-jwt"
import fs from "fs"
import bcrypt from "bcrypt"

export const initPassport=()=>{

    passport.use("login", 
        new local.Strategy(
            {
                usernameField:"email"
            },
            async(username, password, done)=>{
                try {
                    
                    let usuarios=[]
                    usuarios=JSON.parse(fs.readFileSync('./src/usuarios.json','utf8'))

                    let usuario=usuarios.find(u=>u.email===username)
                    if(!usuario){
                        return done(null, false)
                    } 
                        // return res.status(400).send({error:`Error credenciales`})
                    
                    if(!bcrypt.compareSync(password, usuario.password)) {
                        return done(null, false)
                    }

                        // return res.status(400).send({error:`Error credenciales`})
                    return done(null, usuario)

                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use("current", new passportJWT.Strategy(
        {
            secretOrKey: "CoderCoder123",
            jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async(usuario, done)=>{
            try {
                return done(null, usuario)
            } catch (error) {
                return done(error)
            }
        }
    ))

    // serializer, pero no voy a usar sessions

}
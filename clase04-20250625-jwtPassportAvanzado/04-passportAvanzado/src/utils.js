import {fileURLToPath} from 'url';
import passport from 'passport';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;


export const passportCall=estrategia=>{
    return function (req, res, next) {
        passport.authenticate(estrategia, function (err, user, info, status) {
            if (err) { return next(err) } // passport puede hacer return done(error)
            
            if (!user) {  // passport puede hacer return done(null, false)
                // return res.redirect('/signin')
                if(!info) return res.status(400).json({error:`Error en proceso de autenticacion`})
                    
                return res.status(400).json({error: info.message?info.message:info.toString()})
            }

            // para el caso en que passport retorne return done(null, usuario)
            // res.redirect('/account');
            req.user=user
            return next()
        })(req, res, next);
    }
}


import fs from "fs"

const rutaLog="./src/logs/log.log"

export const logger=(req, res, next)=>{
    if(fs.existsSync(rutaLog)){
        fs.appendFileSync(rutaLog, `\nLog fecha ${new Date().toLocaleDateString()} - url: ${req.url}`)
    }else{
        fs.writeFileSync(rutaLog, `Log fecha ${new Date().toLocaleDateString()} - url: ${req.url}`)
    }

    next()
}
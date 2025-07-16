import dotenv from "dotenv"



const [ , , ...argumentos]=process.argv   // ... son el operador rest

let mode="dev"
let indiceMode=argumentos.findIndex(a=>a=="--mode")
if(indiceMode!=-1){
    if(argumentos[indiceMode+1]!="dev" && argumentos[indiceMode+1]!="prod"){
        console.log(`Solo de admiten valores dev o prod para el flag --mode`)
        process.exit()
    }else{
        mode=argumentos[indiceMode+1]
    }
}
// process.loadEnvFile(mode=="dev"?"./.env":"./.env.production")

dotenv.config({
    path:mode=="dev"?"./.env":"./.env.production",
    override: true, 
    quiet: true
})

console.log(process.env.PRUEBA_PORT)
console.log(process.env.PRUEBA_SECRET)
console.log(process.env.PORT)
console.log(process.env.DB_NAME)
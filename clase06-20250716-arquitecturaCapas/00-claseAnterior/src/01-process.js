import fs from "fs"

console.log("pid:", process.pid)
console.log("cwd", process.cwd())
console.log("Uso de memoria:", process.memoryUsage())

console.log("Argumentos:", process.argv)
console.log("Variables de entorno:", process.env)
console.log("Variables de entorno - JAVAHOME", process.env.JAVA_HOME)

// const [dirNode, rutaScrit, ...argumentos]=process.argv
const [ , , ...argumentos]=process.argv   // ... son el operador rest
console.log(argumentos)
let indicePort=argumentos.findIndex(a=>a=="--port")
if(indicePort==-1){
    console.log(`El flag --port es requerido!`)
    process.exit()
}

console.log(`Server on line en puerto ${argumentos[indicePort+1]}`)
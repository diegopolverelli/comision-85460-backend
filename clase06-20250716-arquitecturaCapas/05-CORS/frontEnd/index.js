const divDatos=document.getElementById("datos")
const btnDatos=document.getElementById("btnDatos")

btnDatos.addEventListener("click", async(e)=>{
    e.preventDefault()

    try {
        let rta=await fetch("http://localhost:3000/api/productos", {
            method:"get"
        })
        let datos=await rta.json()
        if(rta.status>=400){
            divDatos.textContent=datos.error
        }else{
            divDatos.textContent=JSON.stringify(datos.payload, null, 5)
        }
    } catch (error) {
        divDatos.textContent="Error al obtener datos..."
    }
})
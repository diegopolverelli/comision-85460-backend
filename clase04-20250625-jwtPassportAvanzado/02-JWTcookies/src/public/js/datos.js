const divDatos=document.getElementById("datos")

const getDatos=async()=>{

    // let headers={}
    // if(localStorage.getItem("token")){
    //     headers={
    //         "Authorization":`BEARER ${localStorage.getItem("token")}`
    //     }
    // }


    let rta=await fetch("/usuario", {
        // headers
    })

    let datos=await rta.json()
    if(rta.status>=400){
        divDatos.textContent=datos.error
    }else{
        divDatos.textContent=datos.mensaje
    }

}

getDatos()
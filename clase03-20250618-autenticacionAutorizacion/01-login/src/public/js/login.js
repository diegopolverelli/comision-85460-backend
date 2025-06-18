console.log("script cargado ok...!!!")

let inputEmail=document.getElementById("email")
let inputPassword=document.getElementById("password")

let divMensajes=document.getElementById("mensajes")
let btnSubmit=document.getElementById("btnSubmit")

btnSubmit.addEventListener("click", async(e)=>{
    e.preventDefault()

    let email=inputEmail.value.trim()
    let password=inputPassword.value.trim()
    if(!email || !password){
        divMensajes.textContent=`email y password son requeridos`
        setTimeout(() => {
            divMensajes.textContent=``
        }, 3000);
        return 
    }

    let respuesta=await fetch("/api/sessions/login", {
        method:"post", 
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({email, password})
    })
    let datos=await respuesta.json()
    if(respuesta.status>=400){
        divMensajes.textContent=datos.error
        setTimeout(() => {
            divMensajes.textContent=``
        }, 3000);
        return 
    }else{
        window.location.href="/datos"
    }

})
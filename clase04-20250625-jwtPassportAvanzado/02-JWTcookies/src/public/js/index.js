const inputEmail=document.getElementById("email")
const inputPassword=document.getElementById("password")
const btnSubmit=document.getElementById("btnSubmit")

btnSubmit.addEventListener("click", async(e)=>{
    e.preventDefault()

    // validaciones
    let rta=await fetch("/login", {
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email: inputEmail.value.trim(),
            password: inputPassword.value.trim()
        })
    })

    let datos=await rta.json()
    if(rta.status>=400){
        // localStorage.removeItem("token")
        alert(datos.error)
    }else{
        // localStorage.setItem("token", datos.token)
        alert("Login correcto para "+datos.usuarioLogueado.nombre)
    }
})
const textoIngresado = document.querySelector("#textoIngresado"),
      btnEncriptar = document.querySelector(".btnEncriptar"),
      btnDesencriptar = document.querySelector(".btnDesencriptar"),
      btnCopiar = document.querySelector(".btnCopiar"),
      cajaResultado = document.querySelector(".caja-resultado"),
      mensajeError = document.querySelector(".mensaje-error"),
      darkLight = document.querySelector(".toggle")

      //obteniendo el tema del localstorage
      let getMode = localStorage.getItem("encriptadorTema")
      if(getMode === "dark"){
            document.body.classList.toggle("dark")
      }

//la expresion regular valida que solamente se ingresen letras minusculas y sin ningun acento o caracter especial
const recursos = {
    expresion: /^[a-z\s]+$/,
    texto: false
}

const encriptarDesencriptar = (llaves, expresion) => {
    let textoEncriptado = document.querySelector(".encriptadoDesencriptado")
    if (!textoEncriptado) {
        textoEncriptado = document.createElement("p")
        textoEncriptado.classList.add("encriptadoDesencriptado")
        textoEncriptado.style.color = "#0A3871"
        textoEncriptado.style.fontSize = "20px"
        cajaResultado.insertAdjacentElement("afterbegin", textoEncriptado)
    }

    //Utilizo el metodo replace para buscar coincidencias, en este caso paso una expresion regular de vocales, si encuentran vocales la reemplazara con las llaves que guarde en el objeto gracias a la funcion que esta como segundo parametro, ya que esta guarda en su argumento cada conincidencia encontrada
    textoEncriptado.textContent = textoIngresado.value.replace(expresion, (coincidencia) => llaves[coincidencia])

    document.querySelector(".caja-resultado2").style.visibility = "hidden"
    btnCopiar.classList.add("active")

    textoIngresado.value = ""
    recursos.texto = false
}


textoIngresado.addEventListener("keyup", () => {
    //aqui valido si se cumple la expresion regular, si se cumple no pasara nada, si no se cumple mostrara una pequena animacion al mensaje de error
    if(recursos.expresion.test(textoIngresado.value)){
        mensajeError.classList.remove("active")
        recursos.texto = true
    }else{
        mensajeError.classList.add("active")
        recursos.texto = false
    }
})

//Para no agregar varios eventos click, utilizo delegacion de eventos, asignandolo al document el evento
document.addEventListener("click", (e) => {
    
    
    if(e.target === btnEncriptar){
        if(recursos.texto){
            const llaves = {
                a: "ai",
                e: "enter",
                i: "imes",
                o: "ober",
                u: "ufat"
            }
            const expresion = /[a,e,i,o,u]/gi

            encriptarDesencriptar(llaves, expresion)

        }else{
            mensajeError.innerHTML = `<i class='bx bxs-error-circle'></i>Ingrese texto`
            mensajeError.classList.add("active")
            setTimeout(() => {
                mensajeError.innerHTML = `<i class='bx bxs-error-circle'></i>Solo letras minusculas y sin acentos`
                mensajeError.classList.remove("active")
            }, 700)
        }
    }

    if(e.target === btnDesencriptar){
        if(recursos.texto){
            const llaves = {
                ai: "a",
                enter: "e",
                imes: "i",
                ober: "o",
                ufat: "u"
            }
            const expresion = /(ai|enter|imes|ober|ufat)/gi

            encriptarDesencriptar(llaves, expresion)
        }else{
            mensajeError.innerHTML = `<i class='bx bxs-error-circle'></i>Copie y pegue el texto encriptado`
            mensajeError.classList.add("active")
            setTimeout(() => {
                mensajeError.innerHTML = `<i class='bx bxs-error-circle'></i>Solo letras minusculas y sin acentos`
                mensajeError.classList.remove("active")
            }, 1500)
        }

    }

    if(e.target === btnCopiar){
        navigator.clipboard.writeText(document.querySelector(".encriptadoDesencriptado").textContent).then(() => {
            btnCopiar.textContent = "Copiado"
            setTimeout(() => btnCopiar.textContent = "Copiar", 1000)
        }).catch(() => alert("Error al copiar"))

    }

    if(e.target === darkLight || e.target.matches(".icon")){
        document.body.classList.toggle("dark")

        //guardando el tema en el local storage
        if(document.body.classList.contains("dark")){
            localStorage.setItem("encriptadorTema","dark")
        }else{
            localStorage.setItem("encriptadorTema","light")
        }
    }
})
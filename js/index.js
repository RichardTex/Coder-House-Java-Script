/*
Preentrega 1 , utilizar:
variables
condicionales (if / else / switch)
ciclos
funciones para la estructura logica
*/ 
let costo = ""
const mensajeInicia = "Seleccione la consola que desea consultar: \n" + 
                        "a. Nintendo switch \n" +
                        "b. Xbox 360 \n" +
                        "c. Playstation 1 \n" +
                        "d. Playstation 2 \n" +
                        "e. PLaystation 4 \n" +
                        "f. Pc \n"

function preguntarPrecios() {
    let consolas = prompt(mensajeInicia)

    if (consolas !== "a" && consolas !== "b" && consolas !== "c" && consolas !== "d" &&consolas !== "e" &&consolas !== "f" ) {
        alert("Se debe ingresar un producto valido")
        return
    } else {
        switch(consolas) {
            case "a":
                costo = "La consola Nintendo Switch vale $300.000"
                break
            case "b":
                costo = "La consola Xbox 360 vale $100.000"
                break
            case "c":
                costo = "La consola Playstation 1 vale $50.000"
                break
            case "d":
                costo = "La consola Playstation 2 vale $75.000"
                break
            case "e":
                costo = "La consola Playstation 4 vale $600.000"
                break
            case "f":
                costo = "La consola Pc vale $3.000.000"
                break
        }
        alert(costo)
    }
    const respuesta = confirm("¿Queres consultar sobre otra consola?")

    while(respuesta){
        preguntarPrecios()
    }
}
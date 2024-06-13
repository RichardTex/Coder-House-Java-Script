/*
Preentrega 2 */

const productos = [
    { nombre: "nintendoSwitch", precio: 300000},
    { nombre: "playstation1", precio: 100000},
    { nombre: "playstation2", precio: 200000},
    { nombre: "playstation4", precio: 500000},
    { nombre: "playstation5", precio: 900000},
    { nombre: "xbox360", precio: 200000},
];

let carrito = []

let seleccion = prompt("Bienvenido desea comprar alguna consola , responda si o no")

while (seleccion != "si" && seleccion != "no"){
    alert("por favor ingrese si o no")
    seleccion = prompt("Desea comprar alguna consola , si o no")
}

if(seleccion == "si"){
    alert("Muy bien aca tiene nuestra lista de consolas")
    let todaslosProductos = productos.map((producto) => producto.nombre + " " + producto.precio + "$");
    alert (todaslosProductos.join(" - "))
} else if (seleccion == "no"){
    alert("gracias por visitar nuestra pagina nos vemos !!!");
}

while(seleccion != "no"){
    let producto = prompt("agrega una consola al carrito")
    let precio = 0

    if(producto == "nintendoSwitch" || producto == "playstation1" ||    producto == "playstation2"|| producto == "playstation4"|| producto == "playstation5"|| producto == "xbox360"){
        switch(producto) {
            case "nintendoSwitch" :
            precio = 300000
            break;
            case "playstation1" :
            precio = 100000
            break;
            case "playstation2" :
            precio = 200000
            break;
            case "playstation4" :
            precio = 500000
            break;
            case "playstation5" :
            precio = 900000
            break;
            case "xbox360" :
            precio = 200000
            break;
            default:
                break;
        }
        let unidades = parseInt(prompt("cuantas unidades quiere llevar"))

        carrito.push({producto, unidades, precio})
        console.log(carrito)
    }else {
        alert("no tenemos esa consola")
    }

    seleccion = prompt("desea seguir comprando ??")

    while (seleccion === "no"){
        alert("gracias por la compra! nos vemos luego")
        carrito.forEach((carritoFinal) => {
            console.log(`producto:${carritoFinal.producto}, unidades: ${carrito.unidades}, total a pagar de los productos ${carritoFinal.unidades * carritoFinal.precio}`)
        })
        break;
    }
}
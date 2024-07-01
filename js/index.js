/*
Preentrega 2 */

/*const productos = [
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
            console.log(`producto:${carritoFinal.producto}, unidades: ${carritoFinal.unidades}, total a pagar de los productos ${carritoFinal.unidades * carritoFinal.precio}`)
        })
        break;
    }
}*/
const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
	'.container-cart-products'
);

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});

/* ========================= */
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productsList = document.querySelector('.container-items');

// Variable de arreglos de Productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

productsList.addEventListener('click', e => {
	if (e.target.classList.contains('btn-add-cart')) {
		const product = e.target.parentElement;

		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h2').textContent,
			price: product.querySelector('p').textContent,
		};

		const exits = allProducts.some(
			product => product.title === infoProduct.title
		);

		if (exits) {
			const products = allProducts.map(product => {
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
				}
			});
			allProducts = [...products];
		} else {
			allProducts = [...allProducts, infoProduct];
		}

		showHTML();
	}
});

rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		allProducts = allProducts.filter(
			product => product.title !== title
		);

		console.log(allProducts);

		showHTML();
	}
});

// Funcion para mostrar  HTML
const showHTML = () => {
	if (!allProducts.length) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

	// Limpiar HTML
	rowProduct.innerHTML = '';

	let total = 0;
	let totalOfProducts = 0;

	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');

		containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

		rowProduct.append(containerProduct);

		total =
			total + parseInt(product.quantity * product.price.slice(1));
		totalOfProducts = totalOfProducts + product.quantity;
	});

	valorTotal.innerText = `$${total}`;
	countProducts.innerText = totalOfProducts;
};
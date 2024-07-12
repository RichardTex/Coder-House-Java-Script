/*
const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
	'.container-cart-products'
);

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});

/* ========================= *//*
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

		const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Producto añadido al carrito"
        });
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
*/
document.addEventListener('DOMContentLoaded', () => {
    const btnCart = document.querySelector('.container-cart-icon');
    const containerCartProducts = document.querySelector('.container-cart-products');

    btnCart.addEventListener('click', () => {
        containerCartProducts.classList.toggle('hidden-cart');
    });

    const rowProduct = document.querySelector('.row-product');
    const productsList = document.querySelector('.container-items');
    let allProducts = [];

    const valorTotal = document.querySelector('.total-pagar');
    const countProducts = document.querySelector('#contador-productos');
    const cartEmpty = document.querySelector('.cart-empty');
    const cartTotal = document.querySelector('.cart-total');

    // Función para obtener los productos desde el archivo JSON
    const fetchProducts = async () => {
        try {
            const response = await fetch('./js/products.json');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    };

    // Función para obtener el carrito desde el archivo JSON
    const fetchCart = async () => {
        try {
            const response = await fetch('./js/cart.json');
            return await response.json();
        } catch (error) {
            console.error('Error fetching cart:', error);
            return [];
        }
    };

    // Función para renderizar los productos en el HTML
    const renderProducts = (products) => {
        productsList.innerHTML = ''; // Limpiar productos previamente renderizados
        products.forEach(product => {
            const productContainer = document.createElement('div');
            productContainer.classList.add('item');
            productContainer.innerHTML = `
                <figure>
                    <img src="${product.image}" alt="${product.title}" />
                </figure>
                <div class="info-product">
                    <h2>${product.title}</h2>
                    <p class="price">$${product.price}</p>
                    <button class="btn-add-cart" data-id="${product.id}">Añadir al carrito</button>
                </div>
            `;
            productsList.appendChild(productContainer);
        });
    };

    productsList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('btn-add-cart')) {
            const productElement = e.target.parentElement;
            const productId = parseInt(e.target.getAttribute('data-id'));

            const infoProduct = {
                id: productId,
                quantity: 1,
                title: productElement.querySelector('h2').textContent,
                price: parseFloat(productElement.querySelector('p').textContent.slice(1))
            };

            const exists = allProducts.some(p => p.id === infoProduct.id);

            if (exists) {
                allProducts = allProducts.map(p => {
                    if (p.id === infoProduct.id) {
                        p.quantity++;
                    }
                    return p;
                });
            } else {
                allProducts = [...allProducts, infoProduct];
            }

            await saveCart(allProducts);
            showHTML();

            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Producto añadido al carrito"
            });
        }
    });

    rowProduct.addEventListener('click', async (e) => {
        if (e.target.classList.contains('icon-close')) {
            const productElement = e.target.parentElement;
            const productId = parseInt(productElement.getAttribute('data-id'));

            allProducts = allProducts.filter(p => p.id !== productId);

            await saveCart(allProducts);
            showHTML();
        }
    });

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

        rowProduct.innerHTML = '';

        let total = 0;
        let totalOfProducts = 0;

        allProducts.forEach(product => {
            const containerProduct = document.createElement('div');
            containerProduct.classList.add('cart-product');
            containerProduct.setAttribute('data-id', product.id);

            containerProduct.innerHTML = `
                <div class="info-cart-product">
                    <span class="cantidad-producto-carrito">${product.quantity}</span>
                    <p class="titulo-producto-carrito">${product.title}</p>
                    <span class="precio-producto-carrito">$${product.price}</span>
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

            total += product.quantity * product.price;
            totalOfProducts += product.quantity;
        });

        valorTotal.innerText = `$${total}`;
        countProducts.innerText = totalOfProducts;
    };

    const saveCart = async (cart) => {
        try {
            // Simulación de guardado local
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    };

    // Inicialización
    (async () => {
        const products = await fetchProducts();
        renderProducts(products);

        allProducts = await fetchCart();
        showHTML();
    })();
});

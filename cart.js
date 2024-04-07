// Array para almacenar los productos en el carrito
let cartItems = [];

// Función para cargar el carrito desde el almacenamiento local al cargar la página
function loadCartFromLocalStorage() {
    const cartItemsString = localStorage.getItem('cartItems');
    if (cartItemsString) {
        cartItems = JSON.parse(cartItemsString);
    }
}

// Función para guardar el carrito en el almacenamiento local
function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Función para agregar un producto al carrito
function addToCart(product) {
    // Verificar si el producto ya está en el carrito
    let productIndex = cartItems.findIndex(item => item.name === product.name);
    if (productIndex !== -1) {
        // Si el producto ya está en el carrito, actualiza la cantidad
        cartItems[productIndex].quantity++;
    } else {
        // Si el producto no está en el carrito, agrégalo al carrito
        cartItems.push(product);
    }
    // Guardar el carrito en el almacenamiento local
    saveCartToLocalStorage();
}

// Función para mostrar los productos en el carrito
function showCart() {
    // Limpiamos el contenido del modal para evitar duplicados
    $('#cartModalBody').empty();

    // Recorremos el array de productos en el carrito
    let totalCartPrice = 0; // Variable para almacenar el precio total del carrito
    cartItems.forEach(function(product) {
        // Obtenemos el precio del producto de la tarjeta
        let priceString = product.price.replace('Precio: $', '').replace(/\./g, '').replace(',', '').trim();
        let price = parseFloat(priceString);

        // Calculamos el precio total del producto y lo redondeamos a un número entero
        let totalPrice = Math.round(price * product.quantity);

        // Añadimos el precio total del producto al precio total del carrito
        totalCartPrice += totalPrice;

        // Creamos una carta para cada producto con su precio total
        let cardHtml = `
            <div class="card mb-3">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="${product.image}" class="card-img" alt="Imagen del producto">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">Cantidad: ${product.quantity}</p>
                            <p class="card-text">Precio Total: $${totalPrice}</p> <!-- Mostrar el precio total -->
                            <button class="btn btn-danger btn-sm remove-from-cart-btn">Eliminar</button> <!-- Botón para eliminar una unidad del producto -->
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Agregamos la carta al modal
        $('#cartModalBody').append(cardHtml);
    });

    // Agregamos el total del carrito al final del modal
    let totalPriceHtml = `
        <div class="row">
            <div class="col-md-12 text-center">
                <p>Total del Carrito: $${totalCartPrice}</p>
            </div>
        </div>
    `;
    $('#cartModalBody').append(totalPriceHtml);

    // Agregamos el botón "Ir a pagar" al final del modal
    let goToCheckoutBtnHtml = `
        <div class="row">
            <div class="col-md-12 text-center">
                <button class="btn btn-primary go-to-checkout-btn">Ir a pagar</button>
            </div>
        </div>
    `;
    $('#cartModalBody').append(goToCheckoutBtnHtml);

    // Mostramos el modal
    $('#cartModal').modal('show');

    // Manejamos el clic en el botón "Eliminar" dentro del carrito
    $('.remove-from-cart-btn').click(function() {
        // Obtenemos el índice del producto en el carrito
        let index = $('.remove-from-cart-btn').index(this);
        // Reducimos la cantidad del producto en el carrito
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
        } else {
            // Si la cantidad es 1, eliminamos el producto del carrito
            cartItems.splice(index, 1);
        }
        // Guardar el carrito en el almacenamiento local
        saveCartToLocalStorage();
        // Mostramos el carrito actualizado
        showCart();
    });

    // Manejamos el clic en el botón "Ir a pagar"
    $('.go-to-checkout-btn').click(function() {
        // Redirigir al usuario a la página "carrito.html"
        window.location.href = 'carrito.html';
    });
}

// Maneja el clic en el icono del carrito
$('#cartIcon').click(function() {
    console.log("Función showCart() ejecutada");
    showCart();
});

// Carrito de compras
$(document).ready(function() {
    // Cargar el carrito desde el almacenamiento local al cargar la página
    loadCartFromLocalStorage();

    // Maneja el clic en el botón "Agregar al carrito"
    $('.card-add-to-cart-btn').click(function() {
        // Obtiene los detalles del producto desde la tarjeta
        let productDetails = {
            name: $(this).closest('.card').find('.card-title').text(),
            description: $(this).closest('.card').find('.card-text').text(),
            price: $(this).closest('.card').find('.card-price').text(),
            availability: $(this).closest('.card').find('.card-availability').text(),
            image: $(this).closest('.card').find('.card-img-top').attr('src'), // Obtiene la URL de la imagen
            quantity: 1 // Establece la cantidad inicial del producto como 1
        };

        // Agrega el producto al carrito
        addToCart(productDetails);

        // Muestra un mensaje o realiza otras acciones si deseas
        console.log("Producto agregado al carrito:", productDetails);
    });
});

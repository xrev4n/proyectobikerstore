// Array para almacenar los productos en el carrito
let cartItems = [];

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
}

// Función para mostrar los productos en el carrito
function showCart() {
    // Limpiamos el contenido del modal para evitar duplicados
    $('#cartModalBody').empty();

    // Recorremos el array de productos en el carrito
    cartItems.forEach(function(product) {
        // Creamos una carta para cada producto
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
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Agregamos la carta al modal
        $('#cartModalBody').append(cardHtml);
    });

    // Mostramos el modal
    $('#cartModal').modal('show');
}

// Maneja el clic en el icono del carrito
$('#cartIcon').click(function() {
    console.log("Función showCart() ejecutada");
    showCart();
});

//Carrito de compras
$(document).ready(function() {
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

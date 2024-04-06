document.addEventListener('DOMContentLoaded', function() {
    // Función para obtener el nombre del usuario desde localStorage
    function getUserName() {
        return localStorage.getItem('userName');
    }

    // Función para mostrar el mensaje de bienvenida
    function showWelcomeMessage() {
        var userName = getUserName();
        if (userName) {
            document.getElementById('welcomeMessage').innerText = 'Bienvenido ' + userName;
        }
    }

    // Llama a la función para mostrar el mensaje de bienvenida cuando se carga la página
    showWelcomeMessage();
});

window.onload = function() { //cuando se cargue la pagina le escucho el boton envio
    document.querySelector('#send-form')
        .addEventListener('click', function(ev) {
            localStorage.username = document.querySelector('#username').value;
            localStorage.genero = document.querySelector('input[name=sex]:checked').value;
        });
}
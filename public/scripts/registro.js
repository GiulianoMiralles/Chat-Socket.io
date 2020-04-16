window.onload = function() { //cuando se cargue la pagina le escucho el boton envio
    document.querySelector('#send-form')
        .addEventListener('click', function(ev) {
            localStorage.username = document.querySelector('#username').value; //obtengo el nombre de ususario y lo guardo en la localstoage para luego poder mostrarlo en la pagina de chat
            localStorage.genero = document.querySelector('input[name=sex]:cheked').value;
        })
}
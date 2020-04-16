$(document).ready(function() {
    let socket = io('http://localhost:3000');
    username(socket);
    updateUsers(socket);
    newMessage(socket);
    updateMessage(socket);

});
//creo la funcion username en mi cliente y le paso el socket como parametro 
function username(socket) {
    socket.emit('username', { // creo el evento username y en socket.js lo escucho
        username: localStorage.username //esto lo recibo de registro.js
    });

}


function updateUsers(socket) { //Aqui escucho el evento que me manda el servidor
    socket.on('updateUsers', function(data) {
        $('#users').html('');
        for (var i = 0; i < data.users.length; i++) { //si mi varaible es menor que la lista de usuarios va a seguir recorriendo para mostras usuarios en linea
            html = '';
            html += '<div class="user">';
            html += '<i class="fa fa-circle online-icon"></i>';
            html += data.users[i];
            html += '</div';
            $('#users').append(html); //concateno el usuario que se conecto con el resto
        }
    });
}

function newMessge(socket) { //Envio de mensajes
    $('#message').keydown(function(ev) { //el mensaje se envia al tocar la tecla enter
        if (ev.keycode == 13) { // la tecla enter en la numero 13
            ev.preventDefault(); // evito enviar el mensaje en blanco
            $('#send-msg-form').submit();
            document.querySelector('#send-msg-form').reset(); //El input se vacia cuando mando un mensaje
        }
    })
    $('#send-msg-form').submit(function(ev) { //aqui evito que mande mensajes en blanco
        ev.preventDefault();
        socket.emit('newMessage'), { //Aqui tomo el valor del input junto con el nombre y el genero que estan en la localStorage
            username: localStorage.username,
            genero: localStorage.genero,
            message: $('#message').val()
        }

    })

}


function updateMessages(socket) {
    socket.on('updateMessages', function(data) {
        let html = '';
        if (data.username == localStorage.username) { //aqui verifico si el ususario es el mismo que tengo en la LocalStoarage quiere decir que soy yo, entonces los mensajes que mande se van a ver del lado derecho
            html += '<div class="my-msg full-width flex">';
            if (data.genero == 'Male') html += '<div class="my-style-m message"><h4> Tú </h4>';
            else html += '<div class="my-style-f message"><h4> Tú </h4>';
            html += '<p class="lighter">' + data.message + '</p>';
            html += '</div></div>';
        } else { //Por el contrario los mensajes que mande el resto se van a ver del lado izquierdo
            html += '<div class="full-width flex">';
            if (data.genero == 'Male') html += '<div class="blue message"><h4>' + data.username + '</h4>';
            else html += '<div class="pink message"><h4>' + data.username + '</h4>';
            html += '<p class="lighter">' + data.message + '</p>';
            html += '</div></div>';
        }
        $('#msg-list').append(html);
    });
}
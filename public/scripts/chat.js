$(document).ready(function() {
    let socket = io('http://localhost:3000');
    username(socket);
    updateUsers(socket);
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
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
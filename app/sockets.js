let users = require('./users'); // aqui voy a meter los usuario en linea en la funcion de abajo

// exporto esta funcion al server en este para saber cuando se conecta un usuario
module.exports = function(io) {
    io.on('connection', function(socket) {
        console.log('Nuevo Usuario Conectado');
        addUser(socket);
        disconnectUser(socket);
        newMessage(socket);
    });
}


//Aqui obtengo los datos del usuario para crear la lista de usuario en linea
function addUser(socket) {
    socket.on('username', (data) => { // escucha el evento username || on es como el listen para escuchar eventos
        socket.username = data.username; // del evento obtengo el un JSon (data) y de ese obtengo el nombre del usuario o lo meto en una lista
        users.push(data.username);
        socket.broadcast.emit('userOn', {
            user: data.username
        });
        updateUsers(socket);
    })
}

function updateUsers(socket) { //actualiza y muetra mi lista de usuarios conectados
    socket.emit('updateUsers', { users }); //mando la lista de ususarios conectados a mi cliente
    socket.broadcast.emit('updateUsers', { users }); //Esto hace a que todos los usuarios se les actulice

}

function disconnectUser(socket) {
    socket.on('disconnect', function() {
        if (socket.username) {
            socket.broadcast.emit('userOff', {
                user: socket.username
            }); // Esto envia un mensaje a todos los usuarios menos al que se desconecta
            users.splice(users.indexOf(socket.username), 1); //Busco el ususario que se desconecto y lo saco de la lista
        }
        updateUsers(socket); // una vez que saque al usuario de la lista la actualizo
    });
}


function newMessage(socket) { //tomo el evento envio de mensajes de chat.js (newMessage)
    socket.on('newMessage', function(data) {
        socket.emit('updateMessages', data); //actualizo los mensajes en mi cliente
        socket.broadcast.emit('updateMessages', data); //actualizo el mensaje que yo mande en los clientes del resto
    });
    socket.on('Typing', (data) => {
        socket.broadcast.emit('Typing', { data });
        console.log('El usuario ' + data.username + ' esta escribiendo..');
    });
}
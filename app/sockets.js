// exporto esta funcion al server en este para saber cuando se conecta un usuario
module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('Nuevo usuario conectado')
        addUser(socket);
        updateUsers(socket);
    });
}

let users = []; // aqui voy a meter los usuario en linea en la funcion de abajo

//Aqui obtengo los datos del usuario para crear la lista de usuario en linea
function addUser(socket) {
    socket.on('username', (data) => { // escucha el evento username || on es como el listen para escuchar eventos
        socket.username = data.username; // del evento obtengo el un JSon (data) y de ese obtengo el nombre del usuario o lo meto en una lista
        users.push(data.username);
    })


}

function updateUsers(socket) { //actualiza y muetra mi lista de usuarios conectados
    socket.emit('updateUsers', { users }) //mando la lista de ususarios conectados a mi cliente
    socket.broadcast.emit('updateUsers', { users }) //Esto hace a que todos los usuarios se les actulice

}
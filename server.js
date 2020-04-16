//Requiero mis modulos y los asigno a constantes
const express = require('express'),
    bodyParser = require('body-parser');

//Instancio Express que va a ser mi App
const app = express();

//Creo el server con el modulo http 
const server = require('http').Server(app);

//importo socket.io y se asigno mi server
const io = require('socket.io')(server);


//Importo las configuraciones de Router y las asigno a uan cosntante
const Router = require('./app/router');

//La app va a poder usar JSon y manejar formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Aqui va a buscar los archivos de html y css (vistas)
app.use(express.static('public'));

//inicio mi aplicacion en la ruta /

app.use('', Router);


//Asignos los motores de vista
app.set('view engine', 'pub');

//exporto la funcion que esta en mi archivo sockets y le paso por parametro (io)
require('./app/sockets')(io);


server.listen(3000, () => { //Escucha en el puerto 3000 y manda un call-Back por consola
    console.log('Server corriendo con exito y escuchando en el puerto 3000');
});
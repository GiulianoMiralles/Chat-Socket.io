//Importo la dependencia de express
const express = require('express');
//importo las funciones de controller
const controller = require('./controllers');

//Defino el router que es el que se encarga de manejar las rutas
const Router = express.Router();

// Creo las rutas y las trabajo en el archivo controller.js
Router.get('/', controller.index)
    .post('/chat', controller.chat);


//Exporto el modulo de Router
module.exports = Router;
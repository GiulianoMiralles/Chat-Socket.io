const users = require('./users');

function index(request, response) {
    response.render('index.pug', { validated: true });
}

function redirect(request, response) {
    if (request.validate) return response.render('chat.pug');
    return response.render('index.pug', { validated: false });
}

function validate(request, response, next) {
    request.validate = false;
    if (users.indexOf(request.body.username) == -1) request.validate = true;
    next();
}

//Exporto las funciones
module.exports = {
    index,
    validate,
    redirect
}